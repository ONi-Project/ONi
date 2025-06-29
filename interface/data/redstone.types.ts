export interface Redstone {
    uuid: string
    botUuid: string
    name: string
    description?: string

    type: "digital" | "analog"
    value: number
    side: "up" | "down" | "north" | "south" | "west" | "east"
}

export type RedstoneArray = Redstone[]