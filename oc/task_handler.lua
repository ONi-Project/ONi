local webSocket = require("ws")
local event = require("event")
local json = require("dkjson")

local ws_log = require("oni/ws_log")
local component = require("oni/component")
local redstone = require("oni/redstone")
local ae = require("oni/ae")
local gt_machine = require("oni/gt_machine")

local config = require("config")

local file = "task_handler.lua"

local ws

function login(ws)
    -- 发送登录验证信息
    ws:send(json.encode({
        type = "AuthRequest",
        data = {
            token = "CWN78VN0MB00WFYIL8AN"
        }
    }))

    --login response
    -- print(await_message())
    await_message(ws)
end

function connect()
    ws = webSocket.new({
        address = config.address,
        port = config.port,
        path = config.path
    })

    -- 等待web socket连接建立完毕
    while true do
        os.sleep(0.05)
        local connected, err = ws:finishConnect()
        if connected then
            break
        end

        if err then
            print("failed to connect:" .. err)
            return nil
        end
    end

    login(ws)

    print("Successfully connected to " .. config.address .. ":" .. config.port .. config.path)
    return ws
end

-- 等待从服务器发送的web socket消息
function await_message()
    while true do
        local messageType, message, err = ws:readMessage()

        if err == "connection lost" then
            while true do
                local newWs = connect()

                if newWs ~= nil then
                    ws = newWs
                    break;
                end

                os.sleep(0.5)
            end
            err = nil
        end

        if err then return print('Websocket Error: ' .. err) end
        if messageType == webSocket.MESSAGE_TYPES.TEXT then
            print('Message Received: ' .. message)
            return message
        end
        os.sleep(0.05)
    end
end

while true do
    ws = connect()

    if ws ~= nil then
        break;
    end

    os.sleep(0.5)
end



-- 检测oc组件是否更新并上传组件信息
function updateComponent()
    local modified, componentList = component.update()
    if modified then
        local message = {
            type = "DataBotComponent",
            data = {
                uuid = config.uuid,
                components = componentList
            }
        }
        -- print(json.encode(message))
        ws:send(json.encode(message))
    end
end

-- 定时检测并上传oc组件的更新信息
event.timer(5, updateComponent, math.huge)

-- 将任务列表中的task值映射到具体的函数
-- 函数均返回执行操作的函数对象
-- 第一个参数固定为web socket对象，用于返回信息或报错
-- 第二个参数为该任务所需的参数(table)
local executeMap = {
    component = component.newTask,
    redstone = redstone.newTask,
    ae = ae.newTask,
    gt_machine = gt_machine.newTask
}

-- 事件timer对象，用于终止定时任务
local taskList = {}

-- 终止所有定时任务
function cleanTask()
    for k, v in pairs(taskList) do
        event.cancel(v)
        taskList[k] = nil
    end
end

function cancel(taskUuid)
    if taskList[taskUuid] == nil then
        ws_log.warn(
            "task with uuid: " .. taskUuid .. " dosen't exist",
            file,
            "cancel",
            taskUuid
        )
        return
    end
    event.cancel(taskList[taskUuid])
    taskList[taskUuid] = nil
end

print("start listening tasks")

while true do
    os.sleep(0.1)
    local message = await_message()

    if message == nil then
        print("unknown message error occured")
        goto task_loop_continue
    end

    local tasks = json.decode(message)

    if tasks.type ~= "Task" then
        print("received message: " .. message)
        print("unknown message type: " .. tasks.type)
        goto task_loop_continue
    end

    local list = tasks.data

    -- 如果任务列表为空，则终止所有任务
    if #list == 0 then
        cleanTask()
    end

    -- 如果任务列表包含任何重复任务，则终止此前的所有定时任务
    for k, v in pairs(list) do
        if v.interval ~= -1 then
            cleanTask()
            break
        end
    end

    for k, v in pairs(list) do
        if v.interval < 0 then
            event.timer(0, executeMap[v.task](ws, v.taskUuid, v.config))
        else
            -- math.huge为一个非常大的数，可以认为是无限循环
            local timerHandle = event.timer(v.interval, executeMap[v.task](ws, v.taskUuid, v.config), math.huge)
            taskList[v.taskUuid] = timerHandle
        end
    end

    ::task_loop_continue::
end
