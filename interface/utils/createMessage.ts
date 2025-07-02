import { allMessageType, messageTypeMap, wsBase } from "../index"

const curriedCreateMessage = <M extends wsBase.Message<string, any>>(
    fixedM: M
) => {
    return function <T extends M["type"]>(
        type: T,
        ...args: messageTypeMap.IsOcMessage<Extract<M, { type: T }>> extends true
            ? [data: messageTypeMap.DataType<M>[T], target: messageTypeMap.TargetType<M>[T]]
            : [data: messageTypeMap.DataType<M>[T]]
    ): Extract<M, { type: T }> {
        const data = args[0]

        if (args.length === 2) {
            const target = args[1]
            return {
                type: type,
                data: data,
                target: target
            } as any
        }

        return {
            type: type,
            data: data
        } as any
    }
}

export let newServerToWebMessage = curriedCreateMessage({} as allMessageType.ServerToWeb)
export let newWebToServerMessage = curriedCreateMessage({} as allMessageType.WebToServer)
export let newServerToOcMessage = curriedCreateMessage({} as allMessageType.ServerToOc)
export let newOcToServerMessage = curriedCreateMessage({} as allMessageType.OcToServer)
export let newGeneralMessage = curriedCreateMessage({} as allMessageType.General)