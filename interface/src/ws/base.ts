export interface Message<type extends string, data = unknown> {
    type: type
    data: data
}

export interface OcMessage<type extends string, data = unknown, target = string> extends Message<type, data> {
    target: target
}