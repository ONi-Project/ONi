export interface Ae {
    uuid: string
    name: string
    timeCreated: number
    timeUpdated: number

    cpus: [AeCpu]

    items: [AeItem]

    levelMaintains: [AeLevelMaintain]
}

export interface AeCpu {
    name: string
    coprocessors: number
    storage: number
    busy: boolean
    timeStarted: number
    active: boolean
    finalOutputs?: AeCpuFinalOutput
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
    list: [{
        name: string
        type: string
        damage: number
        request: number
        amount: number
        id: number
        display: string
    }]
}