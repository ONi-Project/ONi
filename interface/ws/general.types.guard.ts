/*
 * Generated type guards for "general.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Info, Warning, Error } from "./general.types";

export function isInfo(obj: unknown): obj is Info {
    const typedObj = obj as Info
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "Info" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["message"] === "string"
    )
}

export function isWarning(obj: unknown): obj is Warning {
    const typedObj = obj as Warning
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "Warning" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["message"] === "string"
    )
}

export function isError(obj: unknown): obj is Error {
    const typedObj = obj as Error
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "Error" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["message"] === "string"
    )
}
