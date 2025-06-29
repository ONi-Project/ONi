/*
 * Generated type guards for "mcServerStatus.types.ts".
 * WARNING: Do not manually change this file.
 */
import { McServerStatus, McServerStatusArray } from "./mcServerStatus.types";

export function isMcServerStatus(obj: unknown): obj is McServerStatus {
    const typedObj = obj as McServerStatus
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["ip"] === "string" &&
        typeof typedObj["online"] === "boolean" &&
        typeof typedObj["motd"] === "string" &&
        (typedObj["players"] !== null &&
            typeof typedObj["players"] === "object" ||
            typeof typedObj["players"] === "function") &&
        typeof typedObj["players"]["max"] === "number" &&
        typeof typedObj["players"]["online"] === "number" &&
        Array.isArray(typedObj["players"]["list"]) &&
        typedObj["players"]["list"].every((e: any) =>
            typeof e === "string"
        )
    )
}

export function isMcServerStatusArray(obj: unknown): obj is McServerStatusArray {
    const typedObj = obj as McServerStatusArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isMcServerStatus(e) as boolean
        )
    )
}
