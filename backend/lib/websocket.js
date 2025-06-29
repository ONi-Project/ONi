import { WebSocketServer } from "ws";
import { loggerWebsocket as logger } from "./logger.js";
import handler from "./handler.js";
import { send } from "./utils.js";
export const wssWeb = new WebSocketServer({ noServer: true });
export const wssOc = new WebSocketServer({ noServer: true });
let Websocket = {
    init(config) {
        wssWeb.on('connection', (ws, socket, request) => {
            ws.sessionId = crypto.randomUUID();
            ws.authenticated = false;
            logger.info(`New WEB WebSocket connection ${ws.sessionId.substring(0, 8)}`);
            ws.on('close', (code, reason) => {
                logger.info(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`);
            });
            ws.on('error', (error) => {
                logger.error(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error);
            });
            ws.on('message', (message) => {
                handler.webMessage(message, ws);
            });
        });
        wssOc.on('connection', (ws, socket, request) => {
            ws.sessionId = crypto.randomUUID();
            ws.authenticated = false;
            logger.info(`New OC WebSocket connection ${ws.sessionId.substring(0, 8)}`);
            ws.on('close', (code, reason) => {
                logger.info(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`);
            });
            ws.on('error', (error) => {
                logger.error(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error);
            });
            ws.on('message', (message) => {
                handler.ocMessage(message, ws);
            });
        });
    }
};
export default Websocket;
export function wsWebBroadcast(message) {
    wssWeb.clients.forEach(session => {
        if (session.authenticated) {
            session.send(JSON.stringify(message));
        }
    });
}
export function wsOcBroadcast(message) {
    wssOc.clients.forEach(session => {
        if (session.authenticated) {
            session.send(JSON.stringify(message));
        }
    });
}
export function wsOcSendByBotUuid(uuid, message) {
    let ok = false;
    wssOc.clients.forEach(session => {
        if (session.authenticated && session.bot.uuid == uuid) {
            send(session, message);
            ok = true;
        }
    });
    return ok;
}
