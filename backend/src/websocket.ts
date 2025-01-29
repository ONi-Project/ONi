import { WebSocketServer } from "ws"
import http from "http"
import { Config, SessionWeb, SessionOc } from "./interface.js"
import { loggerWebsocket as logger } from "./logger.js"
import handler from "./handler.js"

export const wssWeb = new WebSocketServer({ noServer: true })
export const wssOc = new WebSocketServer({ noServer: true })

var Websocket = {
    init(config: Config) {

        wssWeb.on('connection', (ws: SessionWeb, socket: http.IncomingMessage, request: http.IncomingMessage) => {

            ws.sessionId = crypto.randomUUID()
            ws.authenticated = false

            logger.info(`New WEB WebSocket connection ${ws.sessionId.substring(0, 8)}`)

            ws.on('close', (code: number, reason: string) => {
                logger.info(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`)
            })

            ws.on('error', (error: Error) => {
                logger.error(`WEB WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error)
            })

            ws.on('message', (message: string) => {
                handler.webMessage(message, ws)
            })

        })


        wssOc.on('connection', (ws: SessionOc, socket: http.IncomingMessage, request: http.IncomingMessage) => {

            ws.sessionId = crypto.randomUUID()
            ws.authenticated = false

            logger.info(`New OC WebSocket connection ${ws.sessionId.substring(0, 8)}`)

            ws.on('close', (code: number, reason: string) => {
                logger.info(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} closed with code ${code} and reason ${reason}`)
            })

            ws.on('error', (error: Error) => {
                logger.error(`OC WebSocket connection ${ws.sessionId.substring(0, 8)} error`, error)
            })

            ws.on('message', (message: string) => {
                handler.ocMessage(message, ws)
            })
            
        })

    }
}

export default Websocket

export function wsWebBroadcast(type: string, data: any) {
    wssWeb.clients.forEach(ws => {
        if ((ws as SessionWeb).authenticated) {
            ws.send(JSON.stringify({ type: type, data: data }))
        }
    })
}

export function wsOcBroadcast(type: string, data: any) {
    wssOc.clients.forEach(ws => {
        if ((ws as SessionOc).authenticated) {
            ws.send(JSON.stringify({ type: type, data: data }))
        }
    })
}