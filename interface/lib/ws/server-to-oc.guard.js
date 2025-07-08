export function isAuthResponse(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "AuthResponse" &&
        (typedObj["data"] === null ||
            (typedObj["data"] !== null &&
                typeof typedObj["data"] === "object" ||
                typeof typedObj["data"] === "function") &&
                typeof typedObj["data"]["uuid"] === "string" &&
                typeof typedObj["data"]["name"] === "string" &&
                typeof typedObj["data"]["token"] === "string" &&
                typeof typedObj["data"]["timeCreated"] === "number" &&
                Array.isArray(typedObj["data"]["components"]) &&
                typedObj["data"]["components"].every((e) => (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                    typeof e["description"] === "string" &&
                    typeof e["class"] === "string" &&
                    typeof e["uuid"] === "string") &&
                Array.isArray(typedObj["data"]["tasks"]) &&
                typedObj["data"]["tasks"].every((e) => (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                    typeof e["task"] === "string" &&
                    typeof e["interval"] === "number" &&
                    typeof e["taskUuid"] === "string")));
}
export function isTask(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "Task" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["task"] === "string" &&
            typeof e["interval"] === "number" &&
            typeof e["taskUuid"] === "string"));
}
