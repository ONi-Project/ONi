/*
 * Generated type guards for "server-to-web.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Message } from "./base.types";
import { AuthResponse, DataCommonSet, DataBotSet, DataAeSet, DataMcServerStatusSet, AeOrderResult } from "./server-to-web.types";

export function isAuthResponse(obj: unknown): obj is AuthResponse {
    const typedObj = obj as AuthResponse
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

export function isDataBotSet(obj: unknown): obj is DataBotSet {
    const typedObj = obj as DataBotSet
    return (
        typedObj instanceof Message
    )
}

export function isDataAeSet(obj: unknown): obj is DataAeSet {
    const typedObj = obj as DataAeSet
    return (
        typedObj instanceof Message
    )
}

export function isDataMcServerStatusSet(obj: unknown): obj is DataMcServerStatusSet {
    const typedObj = obj as DataMcServerStatusSet
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
