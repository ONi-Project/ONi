local json = require("dkjson")

ws_log = {}

ws_log.debugLevel = 2


function ws_log.trace(ws, message, file, location, taskUuid)
    if ws_log.debugLevel >= 4 then
        return
    end

    local message = {
        type = "log",
        data = {
            level = "trace",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end


function ws_log.debug(ws, message, file, location, taskUuid)
    if ws_log.debugLevel >= 3 then
        return
    end

    local message = {
        type = "log",
        data = {
            level = "debug",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end


function ws_log.info(ws, message, file, location, taskUuid)
    if ws_log.debugLevel >= 2 then
        return
    end

    local message = {
        type = "log",
        data = {
            level = "info",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end

function ws_log.warn(ws, message, file, location, taskUuid)
    if ws_log.debugLevel >= 1 then
        return
    end

    local message = {
        type = "log",
        data = {
            level = "warn",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end

function ws_log.error(ws, message, file, location, taskUuid)
    if ws_log.debugLevel >= 0 then
        return
    end

    local message = {
        type = "log",
        data = {
            level = "error",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end


return ws_log
