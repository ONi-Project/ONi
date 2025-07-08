export interface McServerStatus {
    ip: string
    online: boolean
    motd: string
    players: {
        max: number
        online: number
        list: {
            id: string
            name: string
        }[]
    }
}

export type McServerStatusArray = McServerStatus[]