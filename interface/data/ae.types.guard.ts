/*
 * Generated type guards for "ae.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Ae, AeArray, AeCpu, AeCpuFinalOutput, AeItem, AeLevelMaintain, AeOrder, AeOrderResult } from "./ae.types";

export function isAe(obj: unknown): obj is Ae {
    const typedObj = obj as Ae
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["timeCreated"] === "number" &&
        typeof typedObj["timeUpdated"] === "number" &&
        Array.isArray(typedObj["cpus"]) &&
        typedObj["cpus"].every((e: any) =>
            isAeCpu(e) as boolean
        ) &&
        Array.isArray(typedObj["items"]) &&
        typedObj["items"].every((e: any) =>
            isAeItem(e) as boolean
        ) &&
        Array.isArray(typedObj["levelMaintains"]) &&
        typedObj["levelMaintains"].every((e: any) =>
            isAeLevelMaintain(e) as boolean
        )
    )
}

export function isAeArray(obj: unknown): obj is AeArray {
    const typedObj = obj as AeArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isAe(e) as boolean
        )
    )
}

export function isAeCpu(obj: unknown): obj is AeCpu {
    const typedObj = obj as AeCpu
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["coprocessors"] === "number" &&
        typeof typedObj["storage"] === "number" &&
        typeof typedObj["busy"] === "boolean" &&
        (typeof typedObj["timeStarted"] === "undefined" ||
            typeof typedObj["timeStarted"] === "number") &&
        typeof typedObj["active"] === "boolean" &&
        (typeof typedObj["finalOutput"] === "undefined" ||
            (typedObj["finalOutput"] !== null &&
                typeof typedObj["finalOutput"] === "object" ||
                typeof typedObj["finalOutput"] === "function") &&
            typeof typedObj["finalOutput"]["name"] === "string" &&
            (typeof typedObj["finalOutput"]["damage"] === "undefined" ||
                typeof typedObj["finalOutput"]["damage"] === "number") &&
            typeof typedObj["finalOutput"]["amount"] === "number")
    )
}

export function isAeCpuFinalOutput(obj: unknown): obj is AeCpuFinalOutput {
    const typedObj = obj as AeCpuFinalOutput
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["damage"] === "number" &&
        typeof typedObj["amount"] === "number" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string" &&
        typeof typedObj["total"] === "number"
    )
}

export function isAeItem(obj: unknown): obj is AeItem {
    const typedObj = obj as AeItem
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["type"] === "string" &&
        typeof typedObj["amount"] === "number" &&
        (typeof typedObj["damage"] === "undefined" ||
            typeof typedObj["damage"] === "number") &&
        typeof typedObj["craftable"] === "boolean" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string"
    )
}

export function isAeLevelMaintain(obj: unknown): obj is AeLevelMaintain {
    const typedObj = obj as AeLevelMaintain
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["enabled"] === "boolean" &&
        Array.isArray(typedObj["list"]) &&
        typedObj["list"].every((e: any) =>
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
}

export function isAeOrder(obj: unknown): obj is AeOrder {
    const typedObj = obj as AeOrder
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["taskUuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["damage"] === "number" &&
        typeof typedObj["amount"] === "number"
    )
}

export function isAeOrderResult(obj: unknown): obj is AeOrderResult {
    const typedObj = obj as AeOrderResult
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["success"] === "boolean" &&
        typeof typedObj["taskUuid"] === "string" &&
        typeof typedObj["craftUuid"] === "string"
    )
}
