export function isEvent(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typedObj["priority"] === 0 ||
            typedObj["priority"] === 1 ||
            typedObj["priority"] === 2) &&
        (typedObj["status"] === 0 ||
            typedObj["status"] === 1) &&
        typeof typedObj["timestamp"] === "number");
}
export function isEventArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isEvent(e)));
}
