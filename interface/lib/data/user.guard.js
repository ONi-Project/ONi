export function isUser(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typeof typedObj["uuid"] === "string" &&
        typeof typedObj["name"] === "string" &&
        typeof typedObj["token"] === "string");
}
export function isUserArray(obj) {
    const typedObj = obj;
    return (Array.isArray(typedObj) &&
        typedObj.every((e) => isUser(e)));
}
