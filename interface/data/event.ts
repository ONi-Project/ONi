export interface Event {
    uuid: string
    name: string
    description?: string

    // 0=通知 1=警告 2=紧急
    priority: 0 | 1 | 2
    // 0=未处理 1=已处理
    status: 0 | 1
    timestamp: number
}

export type EventArray = Event[]