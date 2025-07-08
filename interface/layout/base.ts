export interface Card {
    type: string
    id: string
    config: any
}

export interface Block {
    type: string
    content: Card[]
}

export type Layout = Block[]
