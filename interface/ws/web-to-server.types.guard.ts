/*
 * Generated type guards for "web-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthRequest, OcTaskRunSingle, OcTaskAdd, OcTaskRemove, DataEventSet, OcForward, AeOrder, RedstoneTask, BotComponentUpdate, DataAeLevelMaintainsSet } from "./web-to-server.types";

export function isAuthRequest(obj: unknown): obj is AuthRequest {
    const typedObj = obj as AuthRequest
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AuthRequest" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["token"] === "string"
    )
}

export function isOcTaskRunSingle(obj: unknown): obj is OcTaskRunSingle {
    const typedObj = obj as OcTaskRunSingle
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["target"] === "string" &&
        typedObj["type"] === "OcTaskRunSingle" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["task"] === "string" &&
        typeof typedObj["data"]["interval"] === "number" &&
        typeof typedObj["data"]["taskUuid"] === "string"
    )
}

export function isOcTaskAdd(obj: unknown): obj is OcTaskAdd {
    const typedObj = obj as OcTaskAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["target"] === "string" &&
        typedObj["type"] === "OcTaskAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["task"] === "string" &&
        typeof typedObj["data"]["interval"] === "number" &&
        typeof typedObj["data"]["taskUuid"] === "string"
    )
}

export function isOcTaskRemove(obj: unknown): obj is OcTaskRemove {
    const typedObj = obj as OcTaskRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["target"] === "string" &&
        typedObj["type"] === "OcTaskRemove" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["task"] === "string" &&
        typeof typedObj["data"]["interval"] === "number" &&
        typeof typedObj["data"]["taskUuid"] === "string"
    )
}

export function isDataEventSet(obj: unknown): obj is DataEventSet {
    const typedObj = obj as DataEventSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataEventSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        (typeof typedObj["data"]["name"] === "undefined" ||
            typeof typedObj["data"]["name"] === "string") &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["priority"] === "undefined" ||
            typeof typedObj["data"]["priority"] === "number") &&
        (typeof typedObj["data"]["status"] === "undefined" ||
            typeof typedObj["data"]["status"] === "number") &&
        (typeof typedObj["data"]["timestamp"] === "undefined" ||
            typeof typedObj["data"]["timestamp"] === "number")
    )
}

export function isOcForward(obj: unknown): obj is OcForward {
    const typedObj = obj as OcForward
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["target"] === "string" &&
        typedObj["type"] === "OcForward"
    )
}

export function isAeOrder(obj: unknown): obj is AeOrder {
    const typedObj = obj as AeOrder
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AeOrder" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["taskUuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["damage"] === "number" &&
        typeof typedObj["data"]["amount"] === "number"
    )
}

export function isRedstoneTask(obj: unknown): obj is RedstoneTask {
    const typedObj = obj as RedstoneTask
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "RedstoneTask" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["taskUuid"] === "string" &&
        typeof typedObj["data"]["value"] === "number"
    )
}

export function isBotComponentUpdate(obj: unknown): obj is BotComponentUpdate {
    const typedObj = obj as BotComponentUpdate
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "BotComponentUpdate" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["taskUuid"] === "string"
    )
}

export function isDataAeLevelMaintainsSet(obj: unknown): obj is DataAeLevelMaintainsSet {
    const typedObj = obj as DataAeLevelMaintainsSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeLevelMaintainsSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        typedObj["data"]["levelMaintains"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["enabled"] === "boolean" &&
            Array.isArray(e["list"]) &&
            e["list"].every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                typeof e["damage"] === "number" &&
                typeof e["request"] === "number" &&
                typeof e["amount"] === "number" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string"
            )
        )
    )
}
