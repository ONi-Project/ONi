/*
 * Generated type guards for "oc-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Message } from "./base.types";
import { AuthRequest, DataCommonSet, DataAeItemList, DataAeCpuList, DataEventAdd, DataEventSet, DataBotComponent, AeOrderResult, Log } from "./oc-to-server.types";

export function isAuthRequest(obj: unknown): obj is AuthRequest {
    const typedObj = obj as AuthRequest
    return (
        typedObj instanceof Message
    )
}

export function isDataCommonSet(obj: unknown): obj is DataCommonSet {
    const typedObj = obj as DataCommonSet
    return (
        typedObj instanceof Message
    )
}

export function isDataAeItemList(obj: unknown): obj is DataAeItemList {
    const typedObj = obj as DataAeItemList
    return (
        typedObj instanceof Message
    )
}

export function isDataAeCpuList(obj: unknown): obj is DataAeCpuList {
    const typedObj = obj as DataAeCpuList
    return (
        typedObj instanceof Message
    )
}

export function isDataEventAdd(obj: unknown): obj is DataEventAdd {
    const typedObj = obj as DataEventAdd
    return (
        typedObj instanceof Message
    )
}

export function isDataEventSet(obj: unknown): obj is DataEventSet {
    const typedObj = obj as DataEventSet
    return (
        typedObj instanceof Message
    )
}

export function isDataBotComponent(obj: unknown): obj is DataBotComponent {
    const typedObj = obj as DataBotComponent
    return (
        typedObj instanceof Message
    )
}

export function isAeOrderResult(obj: unknown): obj is AeOrderResult {
    const typedObj = obj as AeOrderResult
    return (
        typedObj instanceof Message
    )
}

export function isLog(obj: unknown): obj is Log {
    const typedObj = obj as Log
    return (
        typedObj instanceof Message
    )
}
