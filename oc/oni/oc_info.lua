local json = require("dkjson")

oc_info = {}

oc_info.debugLevel = 2


function oc_info.trace(ws, message, file, location, taskUuid)
    if ~oc_info.debugLevel >= 4 then
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


function oc_info.debug(ws, message, file, location, taskUuid)
    if ~oc_info.debugLevel >= 3 then
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


function oc_info.info(ws, message, file, location, taskUuid)
    if ~oc_info.debugLevel >= 2 then
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

function oc_info.warn(ws, message, file, location, taskUuid)
    if ~oc_info.debugLevel >= 1 then
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

function oc_info.error(ws, message, file, location, taskUuid)
    if ~oc_info.debugLevel >= 0 then
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


return oc_info
