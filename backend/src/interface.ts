import { WebSocket } from 'ws'

export interface SessionWeb extends WebSocket {
    sessionId: string
    authenticated: boolean
    user: User
}

export interface SessionOc extends WebSocket {
    sessionId: string
    authenticated: boolean
    bot: Bot
}

export interface User {
    uuid: string
    name: string
    token: string
}

export interface Bot {
    uuid: string
    name: string
    token: string
    timeCreated: number

    components: [{
        description: string
        class: string
        uuid: string
    }]

    tasks: [{
        task: string
        interval: number
        taskUuid: string
        config?: any
    }]
}

export interface Ae {
    uuid: string
    name: string
    timeCreated: number
    timeUpdated: number

    cpus: [{
        name: string
        coproccessors: number
        storage: number
        busy: boolean
        timeStarted: number
        active: boolean
        finalOutput?: {
            name: string
            damage: number
            amount: number
            id: number
            display: string
            total: number
        }
    }]

    itemList: [{
        name: string
        type: string
        amount: number
        damage?: number
        craftable: boolean
        id: number
        display: string
    }]

    levelMaintain: [{
        uuid: string
        enabled: boolean
        list: [{
            name: string
            type: string
            damage: number
            request: number
            amount: number
            id: number
            display: string
        }]
    }]
}

export interface Common {
    uuid: string
    name: string
    description?: string
    unit?: string
    min?: number
    max?: number

    value?: number
    avgIO?: number
}

export interface Redstone {
    uuid: string
    botUuid: string
    name: string
    description?: string

    type: "digital" | "analog"
    value: number
    side: "up" | "down" | "north" | "south" | "west" | "east"
}

export interface Event {
    uuid: string
    name: string
    description?: string

    // 0=通知 1=警告 2=紧急
    priority: number
    // 0=未处理 1=已处理
    status: number
    timestamp: number
}

export interface McServerStatus {
    ip: string
    online: boolean
    motd: string
    players: {
        max: number
        online: number
        list: string[]
    }
}

export interface Config {
    log_level: string
    port: number
    mc_server_ip: string
    mc_server_status_update_interval: number
    debug: boolean
}
