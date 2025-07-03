"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const websocket_1 = require("../websocket");
const interface_1 = require("@oni/interface");
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
    },
    set(status) {
        this.status = status;
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataMcServerStatusSet", this.status));
    },
    init(config) {
        if (!config.mc_server_ip) {
            logger_1.loggerGlobal.warn("mcServerStatus", "mc_server_ip is not set in config.");
        }
        else {
            this.status.ip = config.mc_server_ip;
            logger_1.loggerGlobal.debug("mcServerStatus", "mc_server_ip is set to " + config.mc_server_ip);
            logger_1.loggerGlobal.trace("mcServerStatus", mcServerStatus);
        }
    }
};
exports.default = mcServerStatus;
