/*
 * Generated type guards for "general.types.ts".
 * WARNING: Do not manually change this file.
 */
import { Message } from "./base.types";
import { Error } from "./general.types";

export function isError(obj: unknown): obj is Error {
    const typedObj = obj as Error
    return (
        typedObj instanceof Message
    )
}
