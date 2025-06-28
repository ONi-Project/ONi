/*
 * Generated type guards for "server-to-web.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthResponse, DataCommonSet, DataBotSet, DataAeSet, DataMcServerStatusSet } from "./server-to-web.types";

export function isAuthResponse(obj: unknown): obj is AuthResponse {
    const typedObj = obj as AuthResponse
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AuthResponse" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["token"] === "string"
    )
}

export function isDataCommonSet(obj: unknown): obj is DataCommonSet {
    const typedObj = obj as DataCommonSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["unit"] === "undefined" ||
            typeof typedObj["data"]["unit"] === "string") &&
        (typeof typedObj["data"]["min"] === "undefined" ||
            typeof typedObj["data"]["min"] === "number") &&
        (typeof typedObj["data"]["max"] === "undefined" ||
            typeof typedObj["data"]["max"] === "number") &&
        (typeof typedObj["data"]["value"] === "undefined" ||
            typeof typedObj["data"]["value"] === "number") &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number")
    )
}

export function isDataBotSet(obj: unknown): obj is DataBotSet {
    const typedObj = obj as DataBotSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["token"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        Array.isArray(typedObj["data"]["components"]) &&
        typedObj["data"]["components"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["description"] === "string" &&
            typeof e["class"] === "string" &&
            typeof e["uuid"] === "string"
        ) &&
        Array.isArray(typedObj["data"]["tasks"]) &&
        typedObj["data"]["tasks"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["task"] === "string" &&
            typeof e["interval"] === "number" &&
            typeof e["taskUuid"] === "string"
        )
    )
}

export function isDataAeSet(obj: unknown): obj is DataAeSet {
    const typedObj = obj as DataAeSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        typeof typedObj["data"]["timeUpdated"] === "number" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        (typedObj["data"]["cpus"][0] !== null &&
            typeof typedObj["data"]["cpus"][0] === "object" ||
            typeof typedObj["data"]["cpus"][0] === "function") &&
        typeof typedObj["data"]["cpus"][0]["name"] === "string" &&
        typeof typedObj["data"]["cpus"][0]["coprocessors"] === "number" &&
        typeof typedObj["data"]["cpus"][0]["storage"] === "number" &&
        typeof typedObj["data"]["cpus"][0]["busy"] === "boolean" &&
        typeof typedObj["data"]["cpus"][0]["timeStarted"] === "number" &&
        typeof typedObj["data"]["cpus"][0]["active"] === "boolean" &&
        (typeof typedObj["data"]["cpus"][0]["finalOutputs"] === "undefined" ||
            (typedObj["data"]["cpus"][0]["finalOutputs"] !== null &&
                typeof typedObj["data"]["cpus"][0]["finalOutputs"] === "object" ||
                typeof typedObj["data"]["cpus"][0]["finalOutputs"] === "function") &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["name"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["damage"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["amount"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["id"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["display"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutputs"]["total"] === "number") &&
        Array.isArray(typedObj["data"]["items"]) &&
        (typedObj["data"]["items"][0] !== null &&
            typeof typedObj["data"]["items"][0] === "object" ||
            typeof typedObj["data"]["items"][0] === "function") &&
        typeof typedObj["data"]["items"][0]["name"] === "string" &&
        typeof typedObj["data"]["items"][0]["type"] === "string" &&
        typeof typedObj["data"]["items"][0]["amount"] === "number" &&
        (typeof typedObj["data"]["items"][0]["damage"] === "undefined" ||
            typeof typedObj["data"]["items"][0]["damage"] === "number") &&
        typeof typedObj["data"]["items"][0]["craftable"] === "boolean" &&
        typeof typedObj["data"]["items"][0]["id"] === "number" &&
        typeof typedObj["data"]["items"][0]["display"] === "string" &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        (typedObj["data"]["levelMaintains"][0] !== null &&
            typeof typedObj["data"]["levelMaintains"][0] === "object" ||
            typeof typedObj["data"]["levelMaintains"][0] === "function") &&
        typeof typedObj["data"]["levelMaintains"][0]["uuid"] === "string" &&
        typeof typedObj["data"]["levelMaintains"][0]["enabled"] === "boolean" &&
        Array.isArray(typedObj["data"]["levelMaintains"][0]["list"]) &&
        (typedObj["data"]["levelMaintains"][0]["list"][0] !== null &&
            typeof typedObj["data"]["levelMaintains"][0]["list"][0] === "object" ||
            typeof typedObj["data"]["levelMaintains"][0]["list"][0] === "function") &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["name"] === "string" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["type"] === "string" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["damage"] === "number" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["request"] === "number" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["amount"] === "number" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["id"] === "number" &&
        typeof typedObj["data"]["levelMaintains"][0]["list"][0]["display"] === "string"
    )
}

export function isDataMcServerStatusSet(obj: unknown): obj is DataMcServerStatusSet {
    const typedObj = obj as DataMcServerStatusSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataMcServerStatusSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["ip"] === "string" &&
        typeof typedObj["data"]["online"] === "boolean" &&
        typeof typedObj["data"]["motd"] === "string" &&
        (typedObj["data"]["players"] !== null &&
            typeof typedObj["data"]["players"] === "object" ||
            typeof typedObj["data"]["players"] === "function") &&
        typeof typedObj["data"]["players"]["max"] === "number" &&
        typeof typedObj["data"]["players"]["online"] === "number" &&
        Array.isArray(typedObj["data"]["players"]["list"]) &&
        typedObj["data"]["players"]["list"].every((e: any) =>
            typeof e === "string"
        )
    )
}
