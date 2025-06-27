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
