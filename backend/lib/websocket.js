"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wssOc = exports.wssWeb = void 0;
exports.wsWebBroadcast = wsWebBroadcast;
exports.wsOcBroadcast = wsOcBroadcast;
exports.wsOcSendByBotUuid = wsOcSendByBotUuid;
const ws_1 = require("ws");
const logger_1 = require("./logger");
const handler_1 = __importDefault(require("./handler"));
const utils_1 = require("./utils");
exports.wssWeb = new ws_1.WebSocketServer({ noServer: true });
exports.wssOc = new ws_1.WebSocketServer({ noServer: true });
let Websocket = {
    init(config) {
        exports.wssWeb.on('connection', (ws, socket, request) => {
            ws.sessionId = crypto.randomUUID();
            ws.authenticated = false;
            logger_1.loggerWebsocket.info(`New WEB WebSocket connection ${ws.sessionId.substring(0, 8)}`);
            ws.on('close', (code, reason) => {
                logger_1.loggerWebsocket.info(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`);
            });
            ws.on('error', (error) => {
                logger_1.loggerWebsocket.error(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error);
            });
            ws.on('message', (message) => {
                handler_1.default.webMessage(message, ws);
            });
        });
        exports.wssOc.on('connection', (ws, socket, request) => {
            ws.sessionId = crypto.randomUUID();
            ws.authenticated = false;
            logger_1.loggerWebsocket.info(`New OC WebSocket connection ${ws.sessionId.substring(0, 8)}`);
            ws.on('close', (code, reason) => {
                logger_1.loggerWebsocket.info(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`);
            });
            ws.on('error', (error) => {
                logger_1.loggerWebsocket.error(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error);
            });
            ws.on('message', (message) => {
                handler_1.default.ocMessage(message, ws);
            });
        });
    }
};
exports.default = Websocket;
function wsWebBroadcast(message) {
    exports.wssWeb.clients.forEach(session => {
        if (session.authenticated) {
            session.send(JSON.stringify(message));
        }
    });
}
function wsOcBroadcast(message) {
    exports.wssOc.clients.forEach(session => {
        if (session.authenticated) {
            session.send(JSON.stringify(message));
        }
    });
}
function wsOcSendByBotUuid(uuid, message) {
    let ok = false;
    exports.wssOc.clients.forEach(session => {
        if (session.authenticated && session.bot.uuid == uuid) {
            (0, utils_1.send)(session, message);
            ok = true;
        }
    });
    return ok;
}
