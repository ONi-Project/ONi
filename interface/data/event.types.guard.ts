/*
 * Generated type guards for "event.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Event, EventArray } from "./event.types";

export function isEvent(obj: unknown): obj is Event {
    const typedObj = obj as Event
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typedObj["priority"] === 0 ||
            typedObj["priority"] === 1 ||
            typedObj["priority"] === 2) &&
        (typedObj["status"] === 0 ||
            typedObj["status"] === 1) &&
        typeof typedObj["timestamp"] === "number"
    )
}

export function isEventArray(obj: unknown): obj is EventArray {
    const typedObj = obj as EventArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isEvent(e) as boolean
        )
    )
}
