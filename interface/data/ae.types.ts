export interface Ae {
    uuid: string
    name: string
    timeCreated: number
    timeUpdated: number

    cpus: AeCpu[]

    items: AeItem[]

    levelMaintains: AeLevelMaintain[]
}

export type AeArray = Ae[]

export interface AeCpu {
    name: string
    coprocessors: number
    storage: number
    busy: boolean
    timeStarted: number
    active: boolean
    finalOutput?: AeCpuFinalOutput
}

export interface AeCpuFinalOutput {
    name: string
    damage: number
    amount: number
    id: number
    display: string
    total: number
}

export interface AeItem {
    name: string
    type: string
    amount: number
    damage?: number
    craftable: boolean
    id: number
    display: string
}

export interface AeLevelMaintain {
    uuid: string
    enabled: boolean
    list: {
        name: string
        type: string
        damage: number
        request: number
        amount: number
        id: number
        display: string
    }[]
}

export interface AeOrder {
    uuid: string
    taskUuid: string
    name: string
    damage: number
    amount: number
}

export interface AeOrderResult {
    success: boolean
    taskUuid: string
    craftUuid: string
}