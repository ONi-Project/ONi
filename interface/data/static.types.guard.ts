/*
 * Generated type guards for "static.types.ts".
 * WARNING: Do not manually change this file.
 */
import { BotTask, BotTaskArray, ItemPanelItem, ItemPanelItemArray, ItemPanelLiquid, ItemPanelLiquidArray } from "./static.types";

export function isBotTask(obj: unknown): obj is BotTask {
    const typedObj = obj as BotTask
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["id"] === "string" &&
        typeof typedObj["display"] === "string" &&
        typeof typedObj["description"] === "string" &&
        typeof typedObj["icon"] === "string" &&
        Array.isArray(typedObj["mode"]) &&
        typedObj["mode"].every((e: any) =>
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
}

export function isBotTaskArray(obj: unknown): obj is BotTaskArray {
    const typedObj = obj as BotTaskArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isBotTask(e) as boolean
        )
    )
}

export function isItemPanelItem(obj: unknown): obj is ItemPanelItem {
    const typedObj = obj as ItemPanelItem
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["damage"] === "number" &&
        typeof typedObj["hasNBT"] === "boolean" &&
        typeof typedObj["display"] === "string"
    )
}

export function isItemPanelItemArray(obj: unknown): obj is ItemPanelItemArray {
    const typedObj = obj as ItemPanelItemArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isItemPanelItem(e) as boolean
        )
    )
}

export function isItemPanelLiquid(obj: unknown): obj is ItemPanelLiquid {
    const typedObj = obj as ItemPanelLiquid
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string"
    )
}

export function isItemPanelLiquidArray(obj: unknown): obj is ItemPanelLiquidArray {
    const typedObj = obj as ItemPanelLiquidArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isItemPanelLiquid(e) as boolean
        )
    )
}
