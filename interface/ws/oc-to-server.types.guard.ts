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
        typeof typedObj["data"]["description"] === "string" &&
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
        typedObj["data"]["cpus"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            typeof e["timeStarted"] === "number" &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                typeof e["finalOutput"]["name"] === "string" &&
                typeof e["finalOutput"]["damage"] === "number" &&
                typeof e["finalOutput"]["amount"] === "number" &&
                typeof e["finalOutput"]["id"] === "number" &&
                typeof e["finalOutput"]["display"] === "string" &&
                typeof e["finalOutput"]["total"] === "number")
        ) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string"
        ) &&
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
        typedObj["data"]["cpus"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            typeof e["timeStarted"] === "number" &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                typeof e["finalOutput"]["name"] === "string" &&
                typeof e["finalOutput"]["damage"] === "number" &&
                typeof e["finalOutput"]["amount"] === "number" &&
                typeof e["finalOutput"]["id"] === "number" &&
                typeof e["finalOutput"]["display"] === "string" &&
                typeof e["finalOutput"]["total"] === "number")
        ) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string"
        ) &&
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
