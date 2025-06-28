import { WebSocket } from 'ws'
import { userModel, botModel } from "@oni/interface"

export interface SessionWeb extends WebSocket {
    sessionId: string
    authenticated: boolean
    user: userModel.User
}

export interface SessionOc extends WebSocket {
    sessionId: string
    authenticated: boolean
    bot: botModel.Bot
}

export interface Config {
    log_level: string
    port: number
    mc_server_ip: string
    mc_server_status_update_interval: number
    debug: boolean
}

export interface PageContentElement {
    type: string
    id: string
    config: any
}