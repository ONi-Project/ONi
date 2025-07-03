import { Config } from "../interface"
import { loggerGlobal as logger } from "../logger"
import { wsWebBroadcast } from "../websocket"
import { mcServerStatusModel, newServerToWebMessage } from "@oni/interface"

let mcServerStatus = {
    // MC 服务器状态
    status: {
        ip: "",
        online: false,
        motd: "",
        players: {
            max: 0,
            online: 0,
            list: []
        }
    } as mcServerStatusModel.McServerStatus,

    set(status: mcServerStatusModel.McServerStatus) {
        this.status = status
        wsWebBroadcast(newServerToWebMessage("DataMcServerStatusSet", this.status))
    },

    init(config: Config) {
        if (!config.mc_server_ip) {
            logger.warn("mcServerStatus", "mc_server_ip is not set in config.")
        } else {
            this.status.ip = config.mc_server_ip
            logger.debug("mcServerStatus", "mc_server_ip is set to " + config.mc_server_ip)
            logger.trace("mcServerStatus", mcServerStatus)
        }

    }
}

export default mcServerStatus