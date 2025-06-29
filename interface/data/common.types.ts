export interface Common {
    uuid: string
    name: string
    description?: string
    unit?: string
    min?: number
    max?: number

    value?: number
    avgIO?: number
}

export type CommonArray = Common[]