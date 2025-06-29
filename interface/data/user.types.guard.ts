/*
 * Generated type guards for "user.types.ts".
 * WARNING: Do not manually change this file.
 */
import { User, UserArray } from "./user.types";

export function isUser(obj: unknown): obj is User {
    const typedObj = obj as User
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["token"] === "string"
    )
}

export function isUserArray(obj: unknown): obj is UserArray {
    const typedObj = obj as UserArray
    return (
        Array.isArray(typedObj) &&
        typedObj.every((e: any) =>
            isUser(e) as boolean
        )
    )
}
