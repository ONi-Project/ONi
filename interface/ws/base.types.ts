export interface Message<type = string, data = unknown> {
    type: type
    data: data
}

export interface OcMessage<type = string, data = unknown, target = string> extends Message<type, data> {
    target: target
}