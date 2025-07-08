export function isMessage(obj) {
    return (typeof obj === "object" &&
        obj !== null &&
        "type" in obj &&
        typeof obj.type === "string" &&
        "data" in obj);
}
export function isOcMessage(obj) {
    return (isMessage(obj) &&
        "target" in obj &&
        typeof obj.target === "string");
}
