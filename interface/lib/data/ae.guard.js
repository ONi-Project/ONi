export function isAe(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["timeCreated"] === "number" &&
        typeof typedObj["timeUpdated"] === "number" &&
        Array.isArray(typedObj["cpus"]) &&
        typedObj["cpus"].every((e) => isAeCpu(e)) &&
        Array.isArray(typedObj["items"]) &&
        typedObj["items"].every((e) => isAeItem(e)) &&
        Array.isArray(typedObj["levelMaintains"]) &&
        typedObj["levelMaintains"].every((e) => isAeLevelMaintain(e)));
}
export function isAeArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isAe(e)));
}
export function isAeCpu(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["coprocessors"] === "number" &&
        typeof typedObj["storage"] === "number" &&
        typeof typedObj["busy"] === "boolean" &&
        (typeof typedObj["timeStarted"] === "undefined" ||
            typeof typedObj["timeStarted"] === "number") &&
        typeof typedObj["active"] === "boolean" &&
        (typeof typedObj["finalOutput"] === "undefined" ||
            isAeCpuFinalOutput(typedObj["finalOutput"])));
}
export function isAeCpuFinalOutput(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["damage"] === "undefined" ||
            typeof typedObj["damage"] === "number") &&
        typeof typedObj["amount"] === "number" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string" &&
        typeof typedObj["total"] === "number");
}
export function isAeItem(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["type"] === "string" &&
        typeof typedObj["amount"] === "number" &&
        (typeof typedObj["damage"] === "undefined" ||
            typeof typedObj["damage"] === "number") &&
        typeof typedObj["craftable"] === "boolean" &&
        typeof typedObj["id"] === "number" &&
        typeof typedObj["display"] === "string");
}
export function isAeLevelMaintain(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["enabled"] === "boolean" &&
        Array.isArray(typedObj["list"]) &&
        typedObj["list"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["request"] === "number" &&
            typeof e["amount"] === "number" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string"));
}
export function isAeOrder(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["taskUuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["damage"] === "undefined" ||
            typeof typedObj["damage"] === "number") &&
        typeof typedObj["amount"] === "number");
}
export function isAeOrderResult(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["success"] === "boolean" &&
        typeof typedObj["taskUuid"] === "string" &&
        typeof typedObj["craftUuid"] === "string");
}
