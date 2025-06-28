/*
 * Generated type guards for "server-to-oc.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Message } from "./base.types";
import { AuthResponse, Task } from "./server-to-oc.types";

export function isAuthResponse(obj: unknown): obj is AuthResponse {
    const typedObj = obj as AuthResponse
    return (
        typedObj instanceof Message
    )
}

export function isTask(obj: unknown): obj is Task {
    const typedObj = obj as Task
    return (
        typedObj instanceof Message
    )
}
