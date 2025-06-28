/*
 * Generated type guards for "web-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Message, OcMessage } from "./base.types";
import { AuthRequest, OcTaskRunSingle, OcTaskAdd, OcTaskRemove, DataEventSet, OcForward, AeOrder } from "./web-to-server.types";

export function isAuthRequest(obj: unknown): obj is AuthRequest {
    const typedObj = obj as AuthRequest
    return (
        typedObj instanceof Message
    )
}

export function isOcTaskRunSingle(obj: unknown): obj is OcTaskRunSingle {
    const typedObj = obj as OcTaskRunSingle
    return (
        typedObj instanceof OcMessage
    )
}

export function isOcTaskAdd(obj: unknown): obj is OcTaskAdd {
    const typedObj = obj as OcTaskAdd
    return (
        typedObj instanceof OcMessage
    )
}

export function isOcTaskRemove(obj: unknown): obj is OcTaskRemove {
    const typedObj = obj as OcTaskRemove
    return (
        typedObj instanceof OcMessage
    )
}

export function isDataEventSet(obj: unknown): obj is DataEventSet {
    const typedObj = obj as DataEventSet
    return (
        typedObj instanceof Message
    )
}

export function isOcForward(obj: unknown): obj is OcForward {
    const typedObj = obj as OcForward
    return (
        typedObj instanceof OcMessage
    )
}

export function isAeOrder(obj: unknown): obj is AeOrder {
    const typedObj = obj as AeOrder
    return (
        typedObj instanceof OcMessage
    )
}
