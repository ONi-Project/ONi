export class Message<type extends string, data = unknown> {
    type: type
    data: data

    constructor(type: type, data: data) {
        this.type = type
        this.data = data
    }
}

export class OcMessage<type extends string, data = unknown, target = string> extends Message<type, data> {
    target: target

    constructor(type: type, data: data, target: target) {
        super(type, data)
        this.target = target
    }
}