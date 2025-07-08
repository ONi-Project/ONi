export function isRedstone(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["botUuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        (typeof typedObj["description"] === "undefined" ||
            typeof typedObj["description"] === "string") &&
        (typedObj["type"] === "digital" ||
            typedObj["type"] === "analog") &&
        typeof typedObj["value"] === "number" &&
        (typedObj["side"] === "up" ||
            typedObj["side"] === "down" ||
            typedObj["side"] === "north" ||
            typedObj["side"] === "south" ||
            typedObj["side"] === "west" ||
            typedObj["side"] === "east"));
}
export function isRedstoneArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isRedstone(e)));
}
