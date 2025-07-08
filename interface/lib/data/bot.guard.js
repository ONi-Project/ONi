export function isBot(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["token"] === "string" &&
        typeof typedObj["timeCreated"] === "number" &&
        Array.isArray(typedObj["components"]) &&
        typedObj["components"].every((e) => isBotComponent(e)) &&
        Array.isArray(typedObj["tasks"]) &&
        typedObj["tasks"].every((e) => isBotTask(e)));
}
export function isBotArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isBot(e)));
}
export function isBotTask(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["task"] === "string" &&
        typeof typedObj["interval"] === "number" &&
        typeof typedObj["taskUuid"] === "string");
}
export function isBotComponent(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["description"] === "string" &&
        typeof typedObj["class"] === "string" &&
        typeof typedObj["uuid"] === "string");
}
