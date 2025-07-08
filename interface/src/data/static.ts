export interface BotTask {
    id: string
    display: string
    description: string
    icon: string
    mode: {
        id: string
        description: string
        hidden: boolean
        config: {
            id: string
            type: string
            description: string
            required: boolean
        }[]
    }[]
}

export type BotTaskArray = BotTask[]

export interface ItemPanelItem {
    name: string
    id: number
    damage: number // aka. meta
    hasNBT: boolean
    display: string
}

export type ItemPanelItemArray = ItemPanelItem[]

export interface ItemPanelLiquid {
    name: string
    id: number
    display: string
}

export type ItemPanelLiquidArray = ItemPanelLiquid[]