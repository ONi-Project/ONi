/*
 * Generated type guards for "general.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Error } from "./general.types";

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
