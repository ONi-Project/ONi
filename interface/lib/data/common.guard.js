export function isCommon(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typeof typedObj["unit"] === "undefined" ||
            typeof typedObj["unit"] === "string") &&
        (typeof typedObj["min"] === "undefined" ||
            typeof typedObj["min"] === "number") &&
        (typeof typedObj["max"] === "undefined" ||
            typeof typedObj["max"] === "number") &&
        typeof typedObj["value"] === "number" &&
        (typeof typedObj["avgIO"] === "undefined" ||
            typeof typedObj["avgIO"] === "number"));
}
export function isCommonArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isCommon(e)));
}
