"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../global/index"));
const logger_1 = require("../logger");
var mcServerStatus = {
    init(config) {
        // 定时更新 MC 服务器状态
        if (config.mc_server_ip) {
            setInterval(mcServerStatusUpdate, config.mc_server_status_update_interval * 1000);
            mcServerStatusUpdate();
        }
        else {
            logger_1.loggerTask.warn("mcServerStatus", "mc_server_ip is not set, mcServerStatusUpdate will not be executed.");
        }
        function mcServerStatusUpdate() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const mc = yield import('minecraftstatuspinger').then(mc => mc.default);
                    let address, port;
                    if (config.mc_server_ip.includes(":")) {
                        [address, port] = config.mc_server_ip.split(":");
                    }
                    else {
                        address = config.mc_server_ip;
                        port = "25565";
                    }
                    const result = yield mc.lookup({ host: address, port: parseInt(port) });
                    const data = result.status;
                    const status = {
                        ip: index_1.default.mcServerStatus.status.ip,
                        online: data == null ? false : true,
                        motd: data == null ? "" : data.description,
                        players: data == null ? {
                            max: 0, online: 0, list: []
                        } : {
                            max: data.players.max, online: data.players.online, list: data.players.sample || []
                        }
                    };
                    index_1.default.mcServerStatus.set(status);
                    logger_1.loggerTask.trace("mcServerStatus", index_1.default.mcServerStatus);
                }
                catch (error) {
                    const status = {
                        ip: index_1.default.mcServerStatus.status.ip,
                        online: false,
                        motd: "",
                        players: {
                            max: 0, online: 0, list: []
                        }
                    };
                    index_1.default.mcServerStatus.set(status);
                    logger_1.loggerTask.error("mcServerStatus", error);
                }
            });
        }
    }
};
exports.default = mcServerStatus;
