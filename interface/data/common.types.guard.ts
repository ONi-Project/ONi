/*
 * Generated type guards for "common.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Common, CommonArray } from "./common.types";

export function isCommon(obj: unknown): obj is Common {
    const typedObj = obj as Common
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["description"] === "string" &&
        (typeof typedObj["unit"] === "undefined" ||
            typeof typedObj["unit"] === "string") &&
        (typeof typedObj["min"] === "undefined" ||
            typeof typedObj["min"] === "number") &&
        (typeof typedObj["max"] === "undefined" ||
            typeof typedObj["max"] === "number") &&
        (typeof typedObj["value"] === "undefined" ||
            typeof typedObj["value"] === "number") &&
        (typeof typedObj["avgIO"] === "undefined" ||
            typeof typedObj["avgIO"] === "number")
    )
}

export function isCommonArray(obj: unknown): obj is CommonArray {
    const typedObj = obj as CommonArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isCommon(e) as boolean
        )
    )
}
