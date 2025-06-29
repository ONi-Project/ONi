/*
 * Generated type guards for "bot.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Bot, BotArray, BotTask, BotComponent } from "./bot.types";

export function isBot(obj: unknown): obj is Bot {
    const typedObj = obj as Bot
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["token"] === "string" &&
        typeof typedObj["timeCreated"] === "number" &&
        Array.isArray(typedObj["components"]) &&
        typedObj["components"].every((e: any) =>
            isBotComponent(e) as boolean
        ) &&
        Array.isArray(typedObj["tasks"]) &&
        typedObj["tasks"].every((e: any) =>
            isBotTask(e) as boolean
        )
    )
}

export function isBotArray(obj: unknown): obj is BotArray {
    const typedObj = obj as BotArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isBot(e) as boolean
        )
    )
}

export function isBotTask(obj: unknown): obj is BotTask {
    const typedObj = obj as BotTask
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["task"] === "string" &&
        typeof typedObj["interval"] === "number" &&
        typeof typedObj["taskUuid"] === "string"
    )
}

export function isBotComponent(obj: unknown): obj is BotComponent {
    const typedObj = obj as BotComponent
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["description"] === "string" &&
        typeof typedObj["class"] === "string" &&
        typeof typedObj["uuid"] === "string"
    )
}
