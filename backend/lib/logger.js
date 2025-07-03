"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerOcOverWs = exports.loggerPerformance = exports.loggerHandler = exports.loggerTask = exports.loggerServer = exports.loggerWebsocket = exports.loggerGlobal = exports.loggerMain = void 0;
const log4js_1 = __importDefault(require("log4js"));
let Logger = {
    init(config) {
        log4js_1.default.configure({
            appenders: {
                file: { type: "file", filename: "logs/oni.log", maxLogSize: 1048576, compress: true, keepFileExt: true, backups: 3 },
                console: { type: "console" }
            },
            categories: {
                default: { appenders: ["file", "console"], level: config.log_level || "trace" }
            },
        });
    }
};
exports.default = Logger;
exports.loggerMain = log4js_1.default.getLogger("main");
exports.loggerGlobal = log4js_1.default.getLogger("global");
exports.loggerWebsocket = log4js_1.default.getLogger("websocket");
exports.loggerServer = log4js_1.default.getLogger("server");
exports.loggerTask = log4js_1.default.getLogger("task");
exports.loggerHandler = log4js_1.default.getLogger("handler");
exports.loggerPerformance = log4js_1.default.getLogger("performance");
exports.loggerOcOverWs = log4js_1.default.getLogger("ocWsLog");
