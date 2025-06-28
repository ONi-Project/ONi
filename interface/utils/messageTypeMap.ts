import { allMessageType } from "../"
import { Message } from "../ws/base.types.js"

// 提取 type 属性信息
export type ExtractType<T> = T extends Message<infer U, any> ? U : never

export type TypeToObject<T> = {
    [K in ExtractType<T> & string]: Extract<T, { type: K }>
}

export type MessageTypeMap = TypeToObject<allMessageType.All>

export type MessageDataMap = {
    [K in allMessageType.All as K["type"]]: K extends Message<K["type"], infer D> ? D : never
}
