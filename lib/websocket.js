import { WebSocketServer } from "ws";
import { loggerWebsocket as logger } from "./logger.js";
import handler from "./handler.js";
export const wssWeb = new WebSocketServer({ noServer: true });
export const wssOc = new WebSocketServer({ noServer: true });
var Websocket = {
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
export function wsWebBroadcast(type, data) {
    wssWeb.clients.forEach(ws => {
        if (ws.authenticated) {
            ws.send(JSON.stringify({ type: type, data: data }));
        }
    });
}
export function wsOcBroadcast(type, data) {
    // logger.trace("wsOcBroadcast")
    wssOc.clients.forEach(ws => {
        if (ws.authenticated) {
            ws.send(JSON.stringify({ type: type, data: data }));
        }
    });
}
