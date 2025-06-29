export interface PageContentElement {
    type: string
    id: string
    config: any
}

export interface Layout {
    type: string
    content: PageContentElement[]
}[]