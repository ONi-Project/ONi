export function isMcServerStatus(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["ip"] === "string" &&
        typeof typedObj["online"] === "boolean" &&
        typeof typedObj["motd"] === "string" &&
        (typedObj["players"] !== null &&
            typeof typedObj["players"] === "object" ||
            typeof typedObj["players"] === "function") &&
        typeof typedObj["players"]["max"] === "number" &&
        typeof typedObj["players"]["online"] === "number" &&
        Array.isArray(typedObj["players"]["list"]) &&
        typedObj["players"]["list"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["name"] === "string"));
}
export function isMcServerStatusArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isMcServerStatus(e)));
}
