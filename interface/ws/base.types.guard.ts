import { Message, OcMessage } from "./base.types";

export function isMessage(obj: unknown): obj is Message<string, unknown> {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "type" in obj &&
        typeof (obj as any).type === "string" &&
        "data" in obj
    )
}

export function isOcMessage(obj: unknown): obj is OcMessage<string, unknown, string> {
    return (
        isMessage(obj) &&
        "target" in obj &&
        typeof (obj as any).target === "string"
    )
}