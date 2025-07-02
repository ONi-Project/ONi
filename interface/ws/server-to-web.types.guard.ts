/*
 * Generated type guards for "server-to-web.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthResponse, DataMcServerStatusSet, AeOrderResult, LayoutOverview, DataCommonInit, DataCommonSet, DataCommonAdd, DataCommonRemove, DataBotInit, DataBotComponentsSet, DataBotTasksSet, DataBotAdd, DataBotRemove, DataAeInit, DataAeItemsSet, DataAeCpusSet, DataAeAdd, DataAeRemove, DataEventInit, DataEventSet, DataEventAdd, DataEventRemove, DataRedstoneInit, DataRedstoneSet, DataRedstoneAdd, DataRedstoneRemove, StaticBotTask } from "./server-to-web.types";

export function isAuthResponse(obj: unknown): obj is AuthResponse {
    const typedObj = obj as AuthResponse
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AuthResponse" &&
        (typedObj["data"] === null ||
            (typedObj["data"] !== null &&
                typeof typedObj["data"] === "object" ||
                typeof typedObj["data"] === "function") &&
            typeof typedObj["data"]["uuid"] === "string" &&
            typeof typedObj["data"]["name"] === "string" &&
            typeof typedObj["data"]["token"] === "string")
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
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["name"] === "string"
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

export function isLayoutOverview(obj: unknown): obj is LayoutOverview {
    const typedObj = obj as LayoutOverview
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "LayoutOverview" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["type"] === "string" &&
            Array.isArray(e["content"]) &&
            e["content"].every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e["type"] === "string" &&
                typeof e["id"] === "string"
            )
        )
    )
}

export function isDataCommonInit(obj: unknown): obj is DataCommonInit {
    const typedObj = obj as DataCommonInit
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            (typeof e["unit"] === "undefined" ||
                typeof e["unit"] === "string") &&
            (typeof e["min"] === "undefined" ||
                typeof e["min"] === "number") &&
            (typeof e["max"] === "undefined" ||
                typeof e["max"] === "number") &&
            typeof e["value"] === "number" &&
            (typeof e["avgIO"] === "undefined" ||
                typeof e["avgIO"] === "number")
        )
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
        typeof typedObj["data"]["value"] === "number" &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number")
    )
}

export function isDataCommonAdd(obj: unknown): obj is DataCommonAdd {
    const typedObj = obj as DataCommonAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonAdd" &&
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
        typeof typedObj["data"]["value"] === "number" &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number")
    )
}

export function isDataCommonRemove(obj: unknown): obj is DataCommonRemove {
    const typedObj = obj as DataCommonRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonRemove" &&
        typeof typedObj["data"] === "string"
    )
}

export function isDataBotInit(obj: unknown): obj is DataBotInit {
    const typedObj = obj as DataBotInit
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            typeof e["token"] === "string" &&
            typeof e["timeCreated"] === "number" &&
            Array.isArray(e["components"]) &&
            e["components"].every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e["description"] === "string" &&
                typeof e["class"] === "string" &&
                typeof e["uuid"] === "string"
            ) &&
            Array.isArray(e["tasks"]) &&
            e["tasks"].every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e["task"] === "string" &&
                typeof e["interval"] === "number" &&
                typeof e["taskUuid"] === "string"
            )
        )
    )
}

export function isDataBotComponentsSet(obj: unknown): obj is DataBotComponentsSet {
    const typedObj = obj as DataBotComponentsSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotComponentsSet" &&
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

export function isDataBotTasksSet(obj: unknown): obj is DataBotTasksSet {
    const typedObj = obj as DataBotTasksSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotTasksSet" &&
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

export function isDataBotAdd(obj: unknown): obj is DataBotAdd {
    const typedObj = obj as DataBotAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotAdd" &&
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

export function isDataBotRemove(obj: unknown): obj is DataBotRemove {
    const typedObj = obj as DataBotRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataBotRemove" &&
        typeof typedObj["data"] === "string"
    )
}

export function isDataAeInit(obj: unknown): obj is DataAeInit {
    const typedObj = obj as DataAeInit
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            typeof e["timeCreated"] === "number" &&
            typeof e["timeUpdated"] === "number" &&
            Array.isArray(e["cpus"]) &&
            e["cpus"].every((e: any) =>
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
            Array.isArray(e["items"]) &&
            e["items"].every((e: any) =>
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
            Array.isArray(e["levelMaintains"]) &&
            e["levelMaintains"].every((e: any) =>
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
    )
}

export function isDataAeItemsSet(obj: unknown): obj is DataAeItemsSet {
    const typedObj = obj as DataAeItemsSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeItemsSet" &&
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

export function isDataAeCpusSet(obj: unknown): obj is DataAeCpusSet {
    const typedObj = obj as DataAeCpusSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeCpusSet" &&
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

export function isDataAeAdd(obj: unknown): obj is DataAeAdd {
    const typedObj = obj as DataAeAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeAdd" &&
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

export function isDataAeRemove(obj: unknown): obj is DataAeRemove {
    const typedObj = obj as DataAeRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataAeRemove" &&
        typeof typedObj["data"] === "string"
    )
}

export function isDataEventInit(obj: unknown): obj is DataEventInit {
    const typedObj = obj as DataEventInit
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataEventInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            typeof e["priority"] === "number" &&
            typeof e["status"] === "number" &&
            typeof e["timestamp"] === "number"
        )
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
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        typeof typedObj["data"]["priority"] === "number" &&
        typeof typedObj["data"]["status"] === "number" &&
        typeof typedObj["data"]["timestamp"] === "number"
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

export function isDataEventRemove(obj: unknown): obj is DataEventRemove {
    const typedObj = obj as DataEventRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataEventRemove" &&
        typeof typedObj["data"] === "string"
    )
}

export function isDataRedstoneInit(obj: unknown): obj is DataRedstoneInit {
    const typedObj = obj as DataRedstoneInit
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["botUuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            (e["type"] === "digital" ||
                e["type"] === "analog") &&
            typeof e["value"] === "number" &&
            (e["side"] === "up" ||
                e["side"] === "down" ||
                e["side"] === "north" ||
                e["side"] === "south" ||
                e["side"] === "west" ||
                e["side"] === "east")
        )
    )
}

export function isDataRedstoneSet(obj: unknown): obj is DataRedstoneSet {
    const typedObj = obj as DataRedstoneSet
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["botUuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typedObj["data"]["type"] === "digital" ||
            typedObj["data"]["type"] === "analog") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typedObj["data"]["side"] === "up" ||
            typedObj["data"]["side"] === "down" ||
            typedObj["data"]["side"] === "north" ||
            typedObj["data"]["side"] === "south" ||
            typedObj["data"]["side"] === "west" ||
            typedObj["data"]["side"] === "east")
    )
}

export function isDataRedstoneAdd(obj: unknown): obj is DataRedstoneAdd {
    const typedObj = obj as DataRedstoneAdd
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["botUuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typedObj["data"]["type"] === "digital" ||
            typedObj["data"]["type"] === "analog") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typedObj["data"]["side"] === "up" ||
            typedObj["data"]["side"] === "down" ||
            typedObj["data"]["side"] === "north" ||
            typedObj["data"]["side"] === "south" ||
            typedObj["data"]["side"] === "west" ||
            typedObj["data"]["side"] === "east")
    )
}

export function isDataRedstoneRemove(obj: unknown): obj is DataRedstoneRemove {
    const typedObj = obj as DataRedstoneRemove
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneRemove" &&
        typeof typedObj["data"] === "string"
    )
}

export function isStaticBotTask(obj: unknown): obj is StaticBotTask {
    const typedObj = obj as StaticBotTask
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "StaticBotTask" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["display"] === "string" &&
            typeof e["description"] === "string" &&
            typeof e["icon"] === "string" &&
            Array.isArray(e["mode"]) &&
            e["mode"].every((e: any) =>
                (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                typeof e["id"] === "string" &&
                typeof e["description"] === "string" &&
                typeof e["hidden"] === "boolean" &&
                Array.isArray(e["config"]) &&
                e["config"].every((e: any) =>
                    (e !== null &&
                        typeof e === "object" ||
                        typeof e === "function") &&
                    typeof e["id"] === "string" &&
                    typeof e["type"] === "string" &&
                    typeof e["description"] === "string" &&
                    typeof e["required"] === "boolean"
                )
            )
        )
    )
}
