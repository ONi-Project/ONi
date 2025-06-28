/*
 * Generated type guards for "web-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthRequest, OcTaskRunSingle, OcTaskAdd, OcTaskRemove, DataEventSet } from "./web-to-server.types";

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
        typedObj["type"] === "dataEventSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        typeof typedObj["data"]["priority"] === "number" &&
        typeof typedObj["data"]["status"] === "number" &&
        typeof typedObj["data"]["timestamp"] === "number"
    )
}
