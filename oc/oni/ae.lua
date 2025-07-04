local ocComponent = require("component")
local ws_log = require("oni/ws_log")
local json = require("dkjson")
local ocUuid = require("uuid")
local internet = require("internet")

local file = "/lib/oni/ae.lua"

ae = {}

local maxHistoryTask = 100

local aeComponents = {}

-- craftTaskQueue 和 queuePointer 共同组成一个大小为 maxHistoryTask 的循环队列
-- craftTaskQueue: queue index -> craft uuid
-- craftTasks: craft uuid -> crafting status
local craftTasks = {}
local carftTaskQueue = {}
local queuePointer = 1

function ae.updateAeComponents()
    aeComponents = {}

    -- 所有的 AE 组件均以 "me_" 开头
    for k, v in pairs(ocComponent.list("me_")) do
        aeComponents[k] = ocComponent.proxy(k)
    end
end

--- Unused
function ae.getAeComponents(ws, taskUuid)
    local message = {
        type = "Unused",
        data = {
            taskUuid = taskUuid,
            components = {}
        }
    }

    for k, v in pairs(aeComponents) do
        message.data.components[#message.data.components + 1] = k
    end

    ws:send(json.encode(message))
end

function ae.getCpus(ws, taskUuid, uuid, targetAeUuid)
    local comp = aeComponents[uuid]

    local message = {
        type = "DataAeCpuList",
        data = {
            uuid = targetAeUuid,
            cpus = {}
        }
    }

    local cpus = comp.getCpus()

    for k, v in pairs(cpus) do
        local output = v.cpu.finalOutput()
        local info = {
            name = v.name,
            coprocessors = v.coprocessors,
            storage = v.storage,
            busy = v.busy,
            active = v.cpu.isActive()
        }
        if output ~= nil then
            info.finalOutput = {
                name = output.name,
                damage = output.damage,
                amount = output.size
            }
        end

        message.data.cpus[#message.data.cpus + 1] = info
    end

    ws:send(json.encode(message))
end

-- 在 uuid 表示的 AE 部件所在的网络下单数量为 amount 的物品
-- 物品 id（游戏内物品描述中形如 minecraft:stone 的部分）为 name，物品 damage（游戏内物品 id 斜杠后的部分）为 damage
-- 发送一个包含 craftUuid 的信息，用于调用 check 函数查询合成状态
-- 发送的信息格式如下：
-- {
--     "type": "update/ae/craftRequest",
--     "data": {
--         "craftUuid": "...",
--         "taskUuid": "..."
--     }
-- }
-- TODO: 支持含有不同 NBT 的物品合成
function ae.request(ws, taskUuid, uuid, name, damage, amount)
    local comp = aeComponents[uuid]

    if name == nil or damage == nil or amount == nil then
        ws_log.error(ws, "missing necessary argument", file, "request", taskUuid)
        return
    end

    local craftable = comp.getCraftables({
        name = name,
        damage = damage
    })

    if #craftable == 0 then
        ws_log.error(ws, "no item with name = " .. name .. ", damage = " .. damage, file, "request", taskUuid)
        return
    end

    if #craftable > 1 then
        ws_log.error(ws,
            "Craft same items with different nbt is not supported now. name = " .. name .. ", damage = " .. damage,
            file, "request", taskUuid)
        return
    end

    if carftTaskQueue[queuePointer] ~= nil then
        craftTasks[carftTaskQueue[queuePointer]] = nil
    end
    carftTaskQueue[queuePointer] = ocUuid.next()

    local status = craftable[1].request(amount)

    craftTasks[carftTaskQueue[queuePointer]] = status

    local message = {
        type = "AeOrderResult",
        data = {
            success = false,
            taskUuid = taskUuid,
            craftUuid = carftTaskQueue[queuePointer]
        }
    }

    queuePointer = queuePointer + 1

    if queuePointer > maxHistoryTask + 1 then
        queuePointer = 1
    end

    local timeout = 60

    for _ = 1, timeout do
        os.sleep(1)
        if status.hasFailed() or status.isCanceled() then
            local reason = ""
            if status.hasFailed() then
                reason = "crafting failed"
            else
                reason = "crafting canceled"
            end

            ws:send(json.encode(message))
            ws_log.warn(ws, "craft failed due to " .. reason, file, "request", taskUuid)
            return
        end

        if not status.isComputing() then
            message.data.success = true
            ws:send(json.encode(message))
            return
        end
    end

    ws:send(json.encode(message))
    ws_log.error(ws, "request time out", file, "request", taskUuid)
    
end

-- 使用 craft uuid 查询合成状态
-- 发送的合成信息格式如下：
-- {
--     "type": "update/ae/craftStatus",
--     "data": { "canceled": false, "done": true, "computing": false, "failed": false }
-- }
---Unused
function ae.check(ws, taskUuid, craftUuid)
    local status = craftTasks[craftUuid]

    if status == nil then
        ws_log.error(ws, "invalid craft uuid or uuid expired", file, "check", taskUuid)
        return
    end

    local message = {
        type = "Unused",
        data = {
            taskUuid = taskUuid,
            computing = status.isComputing(),
            failed = status.hasFailed(),
            canceled = status.isCanceled(),
            done = status.isDone()
        }
    }

    ws:send(json.encode(message))
end

-- 查询网络中存储的所有物品/流体
-- 返回信息格式为：
-- {
--     "type" = "data/ae/itemList",
--     "data" = {
--         "uuid" = targetAeUuid,
--         "itemList" = itemList
--     }
-- }
-- 每个物品的格式为：
-- {
--     "name": <string>,
--     "damage": <integer>,
--     "craftable": <bool>,
--     "amount": <integer>,
--     "type": <string>
-- }
-- TODO: 加入 tag 以区分含有不同 NBT 的物品
function ae.getItems(ws, taskUuid, uuid, targetAeUuid)
    local comp = aeComponents[uuid]

    local itemList = {}

    for k, v in pairs(comp.getItemsInNetwork()) do
        local item = {
            name = v.name,
            damage = v.damage,
            craftable = v.isCraftable,
            amount = v.size,
            type = "item"
        }
        itemList[#itemList + 1] = item
    end

    for k, v in pairs(comp.getFluidsInNetwork()) do
        local item = {
            name = v.name,
            damage = v.damage, -- fluids seems having no damage, this should be nil
            craftable = v.isCraftable,
            amount = v.amount,
            type = "fluid"
        }
        itemList[#itemList + 1] = item
    end

    local message = {
        token = "CWN78VN0MB00WFYIL8AN",
        data = {
            type = "DataAeItemList",
            data = {
                uuid = targetAeUuid,
                items = itemList
            }
        }
    }

    local url = "http://localhost:5600/api/oc/wsSend"

    local header = {}
    header["content-type"] = "application/json"

    local response = internet.request(url, json.encode(message), header, "POST")

    -- ws:send(json.encode(message))
end

-- taskUuid -> name .. ":" .. damage -> {status: ..., cpuName: ...}
local levelMaintainList = {}

-- 维持 AE 网络中物品的数量
-- TODO: 合成出现问题时的处理
-- enabled 为 false 时，忽略 list 参数，并取消当前正在进行的合成
-- enabledCpuList 为字符串数组，表示维持物品数量时允许使用的 CPU 列表，为空或 nil 时，会使用全部的 CPU
-- 其中的字符串表示 CPU 的名称，故使用此参数时需要 CPU 已命名
-- list 是包含需要维持数量的物品的数组，每个物品的格式如下：
-- {
--     "name": <string>,
--     "damage": <number>,
--     "request": <number>,
--     "amount": <number>
-- }
-- 其中 request 表示单次合成的物品数量
-- amount 表示库存维持的目标数量
function ae.levelMaintain(ws, taskUuid, uuid, enabled, list, enabledCpuList)
    -- print("maintain list", json.encode(list))

    local comp = aeComponents[uuid]

    local maintainList = levelMaintainList[taskUuid]
    local aeCpuList = comp.getCpus()

    local cpuNameMap = {}
    
    for _, cpu in pairs(aeCpuList) do
        cpuNameMap[cpu.name] = cpu.cpu
    end

    local enabledCpuNameMap = {}

    if enabledCpuList == nil or #enabledCpuList == 0 then
        enabledCpuNameMap = cpuNameMap
    else
        for _, cpuName in pairs(enabledCpuList) do
            enabledCpuNameMap[cpuName] = cpuNameMap[cpuName]
        end
    end

    -- enable 为 false 时，取消该 taskUuid 对应的合成任务
    if not enabled then
        -- print("cancel maintain task")
        if maintainList == nil or #maintainList == 0 then
            return
        end
        for _, info in pairs(maintainList) do
            local status = info.status
            if not status.isCanceled() and not status.hasFailed() and not status.isDone() then
                cpuNameMap[info.cpuName].cancel()
            end
        end

        return
    end

    -- 过滤正在合成的物品
    local filteredList = {}

    for _, item in pairs(list) do

        local maintainListKey = item.name .. ":" .. item.damage

        local info = nil
        local status = nil

        if levelMaintainList[taskUuid] ~= nil then
            info = levelMaintainList[taskUuid][maintainListKey]
        end

        if info ~= nil then
            status = info.status
        end

        if info == nil or status == nil or status.isCanceled() or status.hasFailed() or status.isDone() then
            filteredList[#filteredList + 1] = item
        end
    end

    -- enable 为 true，执行库存维持
    levelMaintainList[taskUuid] = {}
    local cpuIteratePointer = 1

    local enabledCpuNameList = {}

    for name, _ in pairs(enabledCpuNameMap) do
        enabledCpuNameList[#enabledCpuNameList + 1] = name
    end

    for _, item in pairs(filteredList) do
        local name = item.name
        local damage = item.damage
        local filter = {
            name = name,
            damage = damage
        }

        local storage = comp.getItemsInNetwork(filter)


        if #storage > 1 then
            -- print("more than one item found, skip")
            ws_log.error(ws,
                "Craft same items with different nbt is not supported now. name = " .. name .. ", damage = " .. damage,
                file, "levelMaintain", taskUuid)
        end

        -- 若库存充足，则跳过合成
        if #storage == 1 and storage[1].size >= item.amount then
            -- print("item already meet the target amount, skip")
            goto item_craft_loop_continue
        end

        local maintainListKey = name .. ":" .. damage

        local craftable = comp.getCraftables(filter)

        if #craftable == 0 then
            -- print("no craftable item found, skip")
            ws_log.error(ws, "no item with name = " .. name .. ", damage = " .. damage, file, "levelMaintain", taskUuid)
            goto item_craft_loop_continue
        end
    
        if #craftable > 1 then
            -- print("craftable item found, but more than one, skip")
            ws_log.error(ws,
                "Craft same items with different nbt is not supported now. name = " .. name .. ", damage = " .. damage,
                file, "levelMaintain", taskUuid)
            goto item_craft_loop_continue
        end

        local cpuName = enabledCpuNameList[cpuIteratePointer]

        while cpuIteratePointer + 1 <= #enabledCpuNameMap and enabledCpuNameMap[cpuName].busy == true do
            -- print("cpu busy, skip")
            cpuIteratePointer = cpuIteratePointer + 1
            cpuName = enabledCpuNameList[cpuIteratePointer]
        end

        -- 所有 CPU 均已被占用则直接跳过
        if enabledCpuNameMap[cpuName].busy == true then
            return
        end

        local cpuName = enabledCpuNameMap[cpuName].name
        local status = craftable[1].request(item.request, true, cpuName)

        levelMaintainList[taskUuid][maintainListKey] = {
            status = status,
            cpuName = cpuName
        }

        ::item_craft_loop_continue::
    end
end

-- 返回与 config 内容对应的处理任务的函数
-- config 中 mode 参数可以为："getCpus", "request", "check", "getItems"
-- config 参数请查看对应函数的描述
-- TODO: 自动写样板，库存维持
function ae.newTask(ws, taskUuid, config)
    local function checkUuid(uuid)
        ae.updateAeComponents()

        if uuid == nil then
            for k, v in pairs(aeComponents) do
                uuid = k
                break
            end
        end

        if uuid == nil then
            ws_log.error(ws, "no AE component attached", file, "newTask", taskUuid)
            return nil
        end

        if aeComponents[uuid] == nil then
            ws_log.error(ws, "AE component with uuid = " .. uuid .. " dosen't exist", file, "newTask", taskUuid)
            return nil
        end

        return uuid
    end

    if config.mode == "getCpus" then
        return (function()
            config.uuid = checkUuid(config.uuid)
            ae.getCpus(ws, taskUuid, config.uuid, config.targetAeUuid)
        end)
    elseif config.mode == "getComponent" then
        return (function()
            ae.getAeComponents(ws, taskUuid)
        end)
    elseif config.mode == "request" then
        return (function()
            config.uuid = checkUuid(config.uuid)
            ae.request(ws, taskUuid, config.uuid, config.name, config.damage, config.amount)
        end)
    elseif config.mode == "check" then
        return (function()
            ae.check(ws, taskUuid, config.craftUuid)
        end)
    elseif config.mode == "getItems" then
        return (function()
            config.uuid = checkUuid(config.uuid)
            ae.getItems(ws, taskUuid, config.uuid, config.targetAeUuid)
        end)
    elseif config.mode == "levelMaintain" then
        return (function()
            config.uuid = checkUuid(config.uuid)
            ae.levelMaintain(ws, taskUuid, config.uuid, config.enabled, config.list, config.enabledCpuList)
        end)
    end
end

return ae
