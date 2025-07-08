export function isBotTask(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["id"] === "string" &&
        typeof typedObj["display"] === "string" &&
        typeof typedObj["description"] === "string" &&
        typeof typedObj["icon"] === "string" &&
        Array.isArray(typedObj["mode"]) &&
        typedObj["mode"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["description"] === "string" &&
            typeof e["hidden"] === "boolean" &&
            Array.isArray(e["config"]) &&
            e["config"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["id"] === "string" &&
                typeof e["type"] === "string" &&
                typeof e["description"] === "string" &&
                typeof e["required"] === "boolean")));
}
export function isBotTaskArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isBotTask(e)));
}
export function isItemPanelItem(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["damage"] === "number" &&
        typeof typedObj["hasNBT"] === "boolean" &&
        typeof typedObj["display"] === "string");
}
export function isItemPanelItemArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isItemPanelItem(e)));
}
export function isItemPanelLiquid(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string");
}
export function isItemPanelLiquidArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isItemPanelLiquid(e)));
}
