export interface Bot {
    uuid: string
    name: string
    token: string
    timeCreated: number

    components: BotComponent[]
    tasks: BotTask[]
}

export type BotArray = Bot[]

export interface BotTask {
    task: string
    interval: number
    taskUuid: string
    config?: any
}

export interface BotComponent {
    description: string
    class: string
    uuid: string
}