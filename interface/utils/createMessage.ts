import { messageTypeMap, wsBase } from "../index"

export function newServerToWebMessage<T extends keyof messageTypeMap.MessageServerToWebDataMap>(
    type: T,
    data: messageTypeMap.MessageServerToWebDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageServerToWebDataMap[T]> {
    return new wsBase.Message(type, data)
}

export function newWebToServerMessage<T extends keyof messageTypeMap.MessageWebToServerDataMap>(
    type: T,
    data: messageTypeMap.MessageWebToServerDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageWebToServerDataMap[T]> {
    return new wsBase.Message(type, data)
}

export function newServerToOcMessage<T extends keyof messageTypeMap.MessageServerToOcDataMap>(
    type: T,
    data: messageTypeMap.MessageServerToOcDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageServerToOcDataMap[T]> {
    return new wsBase.Message(type, data)
}

export function newOcToServerMessage<T extends keyof messageTypeMap.MessageOcToServerDataMap>(
    type: T,
    data: messageTypeMap.MessageOcToServerDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageOcToServerDataMap[T]> {
    return new wsBase.Message(type, data)
}

export function newGeneralMessage<T extends keyof messageTypeMap.MessageGeneralDataMap>(
    type: T,
    data: messageTypeMap.MessageGeneralDataMap[T]
): wsBase.Message<T, messageTypeMap.MessageGeneralDataMap[T]> {
    return new wsBase.Message(type, data)
}