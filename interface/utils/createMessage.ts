import { messageTypeMap, wsBase } from "index";

export function createMessage<T extends keyof messageTypeMap.MessageDataMap> (
    type: T,
    data: messageTypeMap.MessageDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageDataMap[T]> {
    return new wsBase.Message(type, data)
}