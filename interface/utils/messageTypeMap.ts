import { AllMessageType } from "../"
import { Message } from "../ws/base.types.js"

// 提取 type 属性信息
type ExtractType<T> = T extends Message<infer U, any> ? U : never

type TypeToObject<T> = {
    [K in ExtractType<T> & string]: Extract<T, { type: K }>
}

export type MessageTypeMap = TypeToObject<AllMessageType.All>