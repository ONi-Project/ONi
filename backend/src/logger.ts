import log4js from "log4js"
import { Config } from "./interface.js"

var Logger = {
    init(config: Config) {

        log4js.configure({
            appenders: {
                file: { type: "file", filename: "logs/oni.log", maxLogSize: 1048576, compress: true, keepFileExt: true, backups: 3 },
                console: { type: "console" }
            },
            categories: {
                default: { appenders: ["file", "console"], level: config.log_level || "trace" }
            },
        })
    }
}
export default Logger

export const loggerMain = log4js.getLogger("main")
export const loggerGlobal = log4js.getLogger("global")
export const loggerWebsocket = log4js.getLogger("websocket")
export const loggerServer = log4js.getLogger("server")
export const loggerTask = log4js.getLogger("task")
export const loggerHandler = log4js.getLogger("handler")