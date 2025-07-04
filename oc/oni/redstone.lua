local component = require("oni/component")
local ocComponent = require("component")
local ws_log = require("oni/ws_log")
local sides = require("sides")
local json = require("dkjson")

local file = "/lib/oni/redstone.lua"

redstone = {}

local redstoneComponents = {}

function redstone.isRedstoneEnabled()
    local enabled = false

    for address, name in ocComponent.list("redstone", false) do
        enabled = true
        redstoneComponents[address] = ocComponent.proxy(address)
    end

    return enabled
end

function redstone.updateComponent()
    redstoneComponents = {}
    for address, name in ocComponent.list("redstone", false) do
        redstoneComponents[address] = ocComponent.proxy(address)
    end
end

-- for less code, we ignore the color parameter
function redstone.setOutput(ws, uuid, taskUuid, side, color, strength)
    if strength == nil then
        strength = 255
    end

    if side ~= nil then
        redstoneComponents[uuid].setOutput(side, strength)
    else
        for s = 0, 5 do
            redstoneComponents[uuid].setOutput(s, strength)
        end
    end
end

function redstone.setBundledOutput(ws, uuid, taskUuid, side, color, strength)
    if strength == nil then
        strength = 255
    end

    local sideMin, sideMax, colorMin, colorMax

    if side == nil then
        sideMin = 0
        sideMax = 5
    else
        sideMin = side
        sideMax = side
    end

    if color == nil then
        colorMin = 0
        colorMax = 15
    else
        colorMin = color
        colorMax = color
    end

    for s = sideMin, sideMax do
        for c = colorMin, colorMax do
            redstoneComponents[uuid].setBundledOutput(side, color, strength)
        end
    end
end

function redstone.getInput(ws, uuid, taskUuid, side)
    local message = {
        type = "DataRedstone",
        data = {
            taskUuid = taskUuid,
            allColor = false,
            allSides = false,
            data = {}
        }
    }

    if side == nil then
        message.data.allSides = true
    end

    if side ~= nil then
        message.data.data = redstoneComponents[uuid].getInput(side)
        ws:send(json.encode(message))
        return
    end

    local result = redstoneComponents[uuid].getInput()
    for s = 0, 5 do
        message.data.data[sides[s]] = result[s]
    end
    ws:send(json.encode(message))
end

function redstone.getBundledInput(ws, uuid, taskUuid, side, color)
    local message = {
        type = "DataRedstone",
        data = {
            taskUuid = taskUuid,
            allColor = false,
            allSides = false,
            data = {}
        }
    }

    if side == nil then
        message.data.allSides = true
    end

    if color == nil then
        message.data.allColor = true
    end

    if side ~= nil then
        if color ~= nil then
            message.data.data = redstoneComponents[uuid].getBundledInput(side, color)
            ws:send(json.encode(message))
            return
        end

        message.data.data = redstoneComponents[uuid].getBundledInput(side)
        ws:send(json.encode(message))
        return
    end

    if color == nil then
        local result = redstoneComponents[uuid].getBundledInput()
        for s = 0, 5 do
            message.data.data[sides[s]] = result[s]
        end
        ws:send(json.encode(message))
        return
    end

    for s = 0, 5 do
        message.data.data[sides[s]] = redstoneComponents[uuid].getBundledInput(s, color)
    end
    ws:send(json.encode(message))
end

function redstone.getOutput(ws, uuid, taskUuid, side)
    local message = {
        type = "DataRedstone",
        data = {
            taskUuid = taskUuid,
            allColor = false,
            allSides = false,
            data = {}
        }
    }

    if side == nil then
        message.data.allSides = true
    end

    if side ~= nil then
        message.data.data = redstoneComponents[uuid].getOutput(side)
        ws:send(json.encode(message))
        return
    end

    local result = redstoneComponents[uuid].getOutput()
    for s = 0, 5 do
        message.data.data[sides[s]] = result[s]
    end
    ws:send(json.encode(message))
end

function redstone.getBundledOutput(ws, uuid, taskUuid, side, color)
    local message = {
        type = "DataRedstone",
        data = {
            taskUuid = taskUuid,
            allColor = false,
            allSides = false,
            data = {}
        }
    }

    if side == nil then
        message.data.allSides = true
    end

    if color == nil then
        message.data.allColor = true
    end

    if side ~= nil then
        if color ~= nil then
            message.data.data = redstoneComponents[uuid].getBundledOutput(side, color)
            ws:send(json.encode(message))
            return
        end

        message.data.data = redstoneComponents[uuid].getBundledOutput(side)
        ws:send(json.encode(message))
        return
    end

    if color == nil then
        local result = redstoneComponents[uuid].getBundledOutput()
        for s = 0, 5 do
            message.data.data[sides[s]] = result[s]
        end
        ws:send(json.encode(message))
        return
    end

    for s = 0, 5 do
        message.data.data[sides[s]] = redstoneComponents[uuid].getBundledOutput(s, color)
    end
    ws:send(json.encode(message))
end

-- 返回与 config 内容对应的处理任务的函数
-- config 中 mode 参数可以为："getComponent", "setOutput", "getOutput", "getInput", 以及与 IO 相关函数的Bundled版本
-- side 参数可以为："up", "down", "north", "south", "east", "west"
-- 当 side 参数缺省时，会获取/设置所有面的红石信号
-- 只有调用 Bundled 版本的函数时 color 参数才有效
-- color 参数可以为 16 种颜色，具体颜色请参考游戏或 OC 文档（使用0 ~ 15指定颜色）
-- 当 color 参数缺省时，会获取/设置所有颜色的红石信号
-- 只有使用 "setOutput" 以及 "setBundledOutput" 时 strength 参数才有效
-- 使用 "setOutput" 和 "setBundledOutput" 时，strength 参数取值范围为 0 ~ 255
-- 若缺省 strength 参数，则默认值为 255
-- 任务执行结果：
-- mode 为 getComponent 时返回信息包含数组 components, 即当前 OC 中所有红石 IO 端口的 uuid
-- 以 set 开头的函数除非报错，否则不会返回任何信息
-- 以 get 开头的函数返回信息包含布尔值 "allSides" 和 "allColor"， 表示是否缺省了对应参数（非 Bundled 版本 "allColor" 总是为 false）
-- 数据包含在 "data" 中
-- 当缺省 side 时，"data" 中包含六个方向的键值
-- 当 Bundled 版本缺省 color 时，返回值中的数值会被更换为包含 16 个元素的数组
-- TODO: wireless
function redstone.newTask(ws, taskUuid, config)
    if config.mode == "getComponent" then
        return (function()
            updateComponent()

            local message = {
                type = "data/redstone",
                data = {
                    taskUuid = taskUuid,
                    components = {}
                }
            }

            for k, v in pairs(redstoneComponents) do
                message.data.components[#message.data.components + 1] = k
            end

            ws:send(json.encode(message))
        end)
    end

    return (function()
        redstone.updateComponent()

        if redstoneComponents[config.uuid] == nil then
            ws_log.error(ws,
                "redstone I/O with uuid = " .. config.uuid .. " dosen't exist",
                file,
                "newTask",
                taskUuid
            )
            return
        end

        if config.strength ~= nil and (config.strength < 0 or config.strength > 255) then
            ws_log.error(
                "redstone strength: " .. tostring(config.strength) .. " out of bound (0 ~ 255)",
                file,
                "newTask",
                taskUuid
            )
        end

        if config.side ~= nil then
            config.side = sides[config.side]
        end
        redstone[config.mode](ws, config.uuid, taskUuid, config.side, config.color, config.strength)
    end)
end

return redstone
