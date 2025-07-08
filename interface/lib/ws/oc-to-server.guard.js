export function isAuthRequest(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "AuthRequest" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["token"] === "string");
}
export function isDataCommonSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        (typeof typedObj["data"]["name"] === "undefined" ||
            typeof typedObj["data"]["name"] === "string") &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["unit"] === "undefined" ||
            typeof typedObj["data"]["unit"] === "string") &&
        (typeof typedObj["data"]["min"] === "undefined" ||
            typeof typedObj["data"]["min"] === "number") &&
        (typeof typedObj["data"]["max"] === "undefined" ||
            typeof typedObj["data"]["max"] === "number") &&
        (typeof typedObj["data"]["value"] === "undefined" ||
            typeof typedObj["data"]["value"] === "number") &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number"));
}
export function isDataAeItemList(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeItemList" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            (e["type"] === "item" ||
                e["type"] === "fluid" ||
                e["type"] === "vis") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["name"] === "string" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["amount"] === "number"));
}
export function isDataAeCpuList(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeCpuList" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        typedObj["data"]["cpus"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                    typeof e["finalOutput"]["name"] === "string" &&
                    (typeof e["finalOutput"]["damage"] === "undefined" ||
                        typeof e["finalOutput"]["damage"] === "number") &&
                    typeof e["finalOutput"]["amount"] === "number")));
}
export function isAeOrderResult(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "AeOrderResult" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["success"] === "boolean" &&
        typeof typedObj["data"]["taskUuid"] === "string" &&
        typeof typedObj["data"]["craftUuid"] === "string");
}
export function isDataEventAdd(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataEventAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typedObj["data"]["priority"] === 0 ||
            typedObj["data"]["priority"] === 1 ||
            typedObj["data"]["priority"] === 2) &&
        (typedObj["data"]["status"] === 0 ||
            typedObj["data"]["status"] === 1) &&
        typeof typedObj["data"]["timestamp"] === "number");
}
export function isDataEventSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataEventSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        (typeof typedObj["data"]["name"] === "undefined" ||
            typeof typedObj["data"]["name"] === "string") &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["priority"] === "undefined" ||
            typeof typedObj["data"]["priority"] === "number") &&
        (typeof typedObj["data"]["status"] === "undefined" ||
            typeof typedObj["data"]["status"] === "number") &&
        (typeof typedObj["data"]["timestamp"] === "undefined" ||
            typeof typedObj["data"]["timestamp"] === "number"));
}
export function isDataBotComponent(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotComponent" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        Array.isArray(typedObj["data"]["components"]) &&
        typedObj["data"]["components"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["description"] === "string" &&
            typeof e["class"] === "string" &&
            typeof e["uuid"] === "string"));
}
export function isLog(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "Log" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["level"] === "string" &&
        typeof typedObj["data"]["message"] === "string" &&
        typeof typedObj["data"]["file"] === "string" &&
        typeof typedObj["data"]["location"] === "string" &&
        typeof typedObj["data"]["taskUuid"] === "string");
}
