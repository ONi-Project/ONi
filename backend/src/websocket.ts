import { WebSocketServer } from "ws"
import http from "http"
import { Config, SessionWeb, SessionOc } from "./interface"
import { loggerWebsocket as logger } from "./logger"
import handler from "./handler"
import { allMessageType } from "@oni/interface"
import { send } from "./utils"

export const wssWeb = new WebSocketServer({ noServer: true })
export const wssOc = new WebSocketServer({ noServer: true })

let Websocket = {
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

export function wsWebBroadcast(message: allMessageType.ServerToWeb) {
    wssWeb.clients.forEach(session => {
        if ((session as SessionWeb).authenticated) {
            session.send(JSON.stringify(message))
        }
    })
}

export function wsOcBroadcast(message: allMessageType.ServerToOc) {
    wssOc.clients.forEach(session => {
        if ((session as SessionOc).authenticated) {
            session.send(JSON.stringify(message))
        }
    })
}

export function wsOcSendByBotUuid(uuid: string, message: allMessageType.ServerToOc) {
    let ok = false
    wssOc.clients.forEach(session => {
        if ((session as SessionOc).authenticated && (session as SessionOc).bot.uuid == uuid) {
            send((session as SessionOc), message)
            ok = true
        }
    })
    return ok
}