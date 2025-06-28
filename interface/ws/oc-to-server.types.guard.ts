/*
 * Generated type guards for "oc-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthRequest, DataCommonSet, DataAeItemList, DataAeCpuList, DataEventAdd, DataEventSet, DataBotComponent, AeOrderResult, Log } from "./oc-to-server.types";

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

export function isDataAeItemList(obj: unknown): obj is DataAeItemList {
    const typedObj = obj as DataAeItemList
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeItemList" &&
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
        (typeof typedObj["data"]["cpus"][0]["finalOutput"] === "undefined" ||
            (typedObj["data"]["cpus"][0]["finalOutput"] !== null &&
                typeof typedObj["data"]["cpus"][0]["finalOutput"] === "object" ||
                typeof typedObj["data"]["cpus"][0]["finalOutput"] === "function") &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["name"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["damage"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["amount"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["id"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["display"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["total"] === "number") &&
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

export function isDataAeCpuList(obj: unknown): obj is DataAeCpuList {
    const typedObj = obj as DataAeCpuList
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeCpuList" &&
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
        (typeof typedObj["data"]["cpus"][0]["finalOutput"] === "undefined" ||
            (typedObj["data"]["cpus"][0]["finalOutput"] !== null &&
                typeof typedObj["data"]["cpus"][0]["finalOutput"] === "object" ||
                typeof typedObj["data"]["cpus"][0]["finalOutput"] === "function") &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["name"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["damage"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["amount"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["id"] === "number" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["display"] === "string" &&
            typeof typedObj["data"]["cpus"][0]["finalOutput"]["total"] === "number") &&
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

export function isDataEventAdd(obj: unknown): obj is DataEventAdd {
    const typedObj = obj as DataEventAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataEventAdd" &&
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

export function isDataBotComponent(obj: unknown): obj is DataBotComponent {
    const typedObj = obj as DataBotComponent
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotComponent" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["description"] === "string" &&
        typeof typedObj["data"]["class"] === "string" &&
        typeof typedObj["data"]["uuid"] === "string"
    )
}

export function isAeOrderResult(obj: unknown): obj is AeOrderResult {
    const typedObj = obj as AeOrderResult
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AeOrderResult" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["success"] === "boolean" &&
        typeof typedObj["data"]["taskUuid"] === "string" &&
        typeof typedObj["data"]["craftUuid"] === "string"
    )
}

export function isLog(obj: unknown): obj is Log {
    const typedObj = obj as Log
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "Log" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["level"] === "string" &&
        typeof typedObj["data"]["message"] === "string" &&
        typeof typedObj["data"]["file"] === "string" &&
        typeof typedObj["data"]["location"] === "string" &&
        typeof typedObj["data"]["taskUuid"] === "string"
    )
}
