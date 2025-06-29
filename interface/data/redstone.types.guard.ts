/*
 * Generated type guards for "redstone.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Redstone, RedstoneArray } from "./redstone.types";

export function isRedstone(obj: unknown): obj is Redstone {
    const typedObj = obj as Redstone
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["botUuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typedObj["type"] === "digital" ||
            typedObj["type"] === "analog") &&
        typeof typedObj["value"] === "number" &&
        (typedObj["side"] === "up" ||
            typedObj["side"] === "down" ||
            typedObj["side"] === "north" ||
            typedObj["side"] === "south" ||
            typedObj["side"] === "west" ||
            typedObj["side"] === "east")
    )
}

export function isRedstoneArray(obj: unknown): obj is RedstoneArray {
    const typedObj = obj as RedstoneArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isRedstone(e) as boolean
        )
    )
}
