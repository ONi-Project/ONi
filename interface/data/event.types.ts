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
