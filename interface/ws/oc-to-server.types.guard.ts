/*
 * Generated type guards for "oc-to-server.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthRequest, DataCommonSet, DataAeItemList, DataAeCpuList, DataEventAdd, DataEventSet, DataBotComponent } from "./oc-to-server.types";

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
        Array.isArray(typedObj["data"]) &&
        (typedObj["data"][0] !== null &&
            typeof typedObj["data"][0] === "object" ||
            typeof typedObj["data"][0] === "function") &&
        typeof typedObj["data"][0]["name"] === "string" &&
        typeof typedObj["data"][0]["type"] === "string" &&
        typeof typedObj["data"][0]["amount"] === "number" &&
        (typeof typedObj["data"][0]["damage"] === "undefined" ||
            typeof typedObj["data"][0]["damage"] === "number") &&
        typeof typedObj["data"][0]["craftable"] === "boolean" &&
        typeof typedObj["data"][0]["id"] === "number" &&
        typeof typedObj["data"][0]["display"] === "string"
    )
}

export function isDataAeCpuList(obj: unknown): obj is DataAeCpuList {
    const typedObj = obj as DataAeCpuList
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeCpuList" &&
        Array.isArray(typedObj["data"]) &&
        (typedObj["data"][0] !== null &&
            typeof typedObj["data"][0] === "object" ||
            typeof typedObj["data"][0] === "function") &&
        typeof typedObj["data"][0]["name"] === "string" &&
        typeof typedObj["data"][0]["coprocessors"] === "number" &&
        typeof typedObj["data"][0]["storage"] === "number" &&
        typeof typedObj["data"][0]["busy"] === "boolean" &&
        typeof typedObj["data"][0]["timeStarted"] === "number" &&
        typeof typedObj["data"][0]["active"] === "boolean" &&
        (typeof typedObj["data"][0]["finalOutputs"] === "undefined" ||
            (typedObj["data"][0]["finalOutputs"] !== null &&
                typeof typedObj["data"][0]["finalOutputs"] === "object" ||
                typeof typedObj["data"][0]["finalOutputs"] === "function") &&
            typeof typedObj["data"][0]["finalOutputs"]["name"] === "string" &&
            typeof typedObj["data"][0]["finalOutputs"]["damage"] === "number" &&
            typeof typedObj["data"][0]["finalOutputs"]["amount"] === "number" &&
            typeof typedObj["data"][0]["finalOutputs"]["id"] === "number" &&
            typeof typedObj["data"][0]["finalOutputs"]["display"] === "string" &&
            typeof typedObj["data"][0]["finalOutputs"]["total"] === "number")
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
        Array.isArray(typedObj["data"]) &&
        (typedObj["data"][0] !== null &&
            typeof typedObj["data"][0] === "object" ||
            typeof typedObj["data"][0] === "function") &&
        typeof typedObj["data"][0]["description"] === "string" &&
        typeof typedObj["data"][0]["class"] === "string" &&
        typeof typedObj["data"][0]["uuid"] === "string"
    )
}
