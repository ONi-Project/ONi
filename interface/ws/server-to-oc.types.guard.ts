/*
 * Generated type guards for "server-to-oc.types.ts".
 * WARNING: Do not manually change this file.
 */
import { AuthResponse, Task } from "./server-to-oc.types";

export function isAuthResponse(obj: unknown): obj is AuthResponse {
    const typedObj = obj as AuthResponse
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "AuthResponse" &&
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

export function isTask(obj: unknown): obj is Task {
    const typedObj = obj as Task
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typedObj["type"] === "Task" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e["task"] === "string" &&
            typeof e["interval"] === "number" &&
            typeof e["taskUuid"] === "string"
        )
    )
}
