local json = require("dkjson")

oc_info = {}

oc_info.debugMode = false

function oc_info.error(ws, message, file, location, taskUuid)
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

function oc_info.warn(ws, message, file, location, taskUuid)
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

function oc_info.log(ws, message, file, location, taskUuid)
    local message = {
        type = "log",
        data = {
            level = "log",
            message = message,
            file = file,
            location = location,
            taskUuid = taskUuid
        }
    }

    ws:send(json.encode(message))
end

function oc_info.trace(ws, message, file, location, taskUuid)
    if ~oc_info.debugMode then
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

return oc_info
