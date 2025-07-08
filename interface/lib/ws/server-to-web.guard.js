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
                typeof typedObj["data"]["token"] === "string"));
}
export function isDataMcServerStatusSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataMcServerStatusSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["ip"] === "string" &&
        typeof typedObj["data"]["online"] === "boolean" &&
        typeof typedObj["data"]["motd"] === "string" &&
        (typedObj["data"]["players"] !== null &&
            typeof typedObj["data"]["players"] === "object" ||
            typeof typedObj["data"]["players"] === "function") &&
        typeof typedObj["data"]["players"]["max"] === "number" &&
        typeof typedObj["data"]["players"]["online"] === "number" &&
        Array.isArray(typedObj["data"]["players"]["list"]) &&
        typedObj["data"]["players"]["list"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["name"] === "string"));
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
export function isLayoutOverview(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "LayoutOverview" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["type"] === "string" &&
            Array.isArray(e["content"]) &&
            e["content"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["type"] === "string" &&
                typeof e["id"] === "string")));
}
export function isDataCommonInit(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            (typeof e["unit"] === "undefined" ||
                typeof e["unit"] === "string") &&
            (typeof e["min"] === "undefined" ||
                typeof e["min"] === "number") &&
            (typeof e["max"] === "undefined" ||
                typeof e["max"] === "number") &&
            typeof e["value"] === "number" &&
            (typeof e["avgIO"] === "undefined" ||
                typeof e["avgIO"] === "number")));
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
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["unit"] === "undefined" ||
            typeof typedObj["data"]["unit"] === "string") &&
        (typeof typedObj["data"]["min"] === "undefined" ||
            typeof typedObj["data"]["min"] === "number") &&
        (typeof typedObj["data"]["max"] === "undefined" ||
            typeof typedObj["data"]["max"] === "number") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number"));
}
export function isDataCommonAdd(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typeof typedObj["data"]["unit"] === "undefined" ||
            typeof typedObj["data"]["unit"] === "string") &&
        (typeof typedObj["data"]["min"] === "undefined" ||
            typeof typedObj["data"]["min"] === "number") &&
        (typeof typedObj["data"]["max"] === "undefined" ||
            typeof typedObj["data"]["max"] === "number") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typeof typedObj["data"]["avgIO"] === "undefined" ||
            typeof typedObj["data"]["avgIO"] === "number"));
}
export function isDataCommonRemove(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataCommonRemove" &&
        typeof typedObj["data"] === "string");
}
export function isDataBotInit(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            typeof e["token"] === "string" &&
            typeof e["timeCreated"] === "number" &&
            Array.isArray(e["components"]) &&
            e["components"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["description"] === "string" &&
                typeof e["class"] === "string" &&
                typeof e["uuid"] === "string") &&
            Array.isArray(e["tasks"]) &&
            e["tasks"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["task"] === "string" &&
                typeof e["interval"] === "number" &&
                typeof e["taskUuid"] === "string")));
}
export function isDataBotComponentsSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotComponentsSet" &&
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
            typeof e["taskUuid"] === "string"));
}
export function isDataBotTasksSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotTasksSet" &&
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
            typeof e["taskUuid"] === "string"));
}
export function isDataBotAdd(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotAdd" &&
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
            typeof e["taskUuid"] === "string"));
}
export function isDataBotRemove(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataBotRemove" &&
        typeof typedObj["data"] === "string");
}
export function isDataAeInit(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            typeof e["timeCreated"] === "number" &&
            typeof e["timeUpdated"] === "number" &&
            Array.isArray(e["cpus"]) &&
            e["cpus"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["coprocessors"] === "number" &&
                typeof e["storage"] === "number" &&
                typeof e["busy"] === "boolean" &&
                (typeof e["timeStarted"] === "undefined" ||
                    typeof e["timeStarted"] === "number") &&
                typeof e["active"] === "boolean" &&
                (typeof e["finalOutput"] === "undefined" ||
                    (e["finalOutput"] !== null &&
                        typeof e["finalOutput"] === "object" ||
                        typeof e["finalOutput"] === "function") &&
                        typeof e["finalOutput"]["name"] === "string" &&
                        (typeof e["finalOutput"]["damage"] === "undefined" ||
                            typeof e["finalOutput"]["damage"] === "number") &&
                        typeof e["finalOutput"]["amount"] === "number" &&
                        typeof e["finalOutput"]["id"] === "number" &&
                        typeof e["finalOutput"]["display"] === "string" &&
                        typeof e["finalOutput"]["total"] === "number")) &&
            Array.isArray(e["items"]) &&
            e["items"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                typeof e["amount"] === "number" &&
                (typeof e["damage"] === "undefined" ||
                    typeof e["damage"] === "number") &&
                typeof e["craftable"] === "boolean" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string") &&
            Array.isArray(e["levelMaintains"]) &&
            e["levelMaintains"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["uuid"] === "string" &&
                typeof e["enabled"] === "boolean" &&
                Array.isArray(e["list"]) &&
                e["list"].every((e) => (e !== null &&
                    typeof e === "object" ||
                    typeof e === "function") &&
                    typeof e["name"] === "string" &&
                    typeof e["type"] === "string" &&
                    (typeof e["damage"] === "undefined" ||
                        typeof e["damage"] === "number") &&
                    typeof e["request"] === "number" &&
                    typeof e["amount"] === "number" &&
                    typeof e["id"] === "number" &&
                    typeof e["display"] === "string"))));
}
export function isDataAeItemsSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeItemsSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        typeof typedObj["data"]["timeUpdated"] === "number" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        typedObj["data"]["cpus"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            (typeof e["timeStarted"] === "undefined" ||
                typeof e["timeStarted"] === "number") &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                    typeof e["finalOutput"]["name"] === "string" &&
                    (typeof e["finalOutput"]["damage"] === "undefined" ||
                        typeof e["finalOutput"]["damage"] === "number") &&
                    typeof e["finalOutput"]["amount"] === "number" &&
                    typeof e["finalOutput"]["id"] === "number" &&
                    typeof e["finalOutput"]["display"] === "string" &&
                    typeof e["finalOutput"]["total"] === "number")) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string") &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        typedObj["data"]["levelMaintains"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["enabled"] === "boolean" &&
            Array.isArray(e["list"]) &&
            e["list"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                (typeof e["damage"] === "undefined" ||
                    typeof e["damage"] === "number") &&
                typeof e["request"] === "number" &&
                typeof e["amount"] === "number" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string")));
}
export function isDataAeCpusSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeCpusSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        typeof typedObj["data"]["timeUpdated"] === "number" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        typedObj["data"]["cpus"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            (typeof e["timeStarted"] === "undefined" ||
                typeof e["timeStarted"] === "number") &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                    typeof e["finalOutput"]["name"] === "string" &&
                    (typeof e["finalOutput"]["damage"] === "undefined" ||
                        typeof e["finalOutput"]["damage"] === "number") &&
                    typeof e["finalOutput"]["amount"] === "number" &&
                    typeof e["finalOutput"]["id"] === "number" &&
                    typeof e["finalOutput"]["display"] === "string" &&
                    typeof e["finalOutput"]["total"] === "number")) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string") &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        typedObj["data"]["levelMaintains"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["enabled"] === "boolean" &&
            Array.isArray(e["list"]) &&
            e["list"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                (typeof e["damage"] === "undefined" ||
                    typeof e["damage"] === "number") &&
                typeof e["request"] === "number" &&
                typeof e["amount"] === "number" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string")));
}
export function isDataAeLevelMaintainsSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeLevelMaintainsSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        typeof typedObj["data"]["timeUpdated"] === "number" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        typedObj["data"]["cpus"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            (typeof e["timeStarted"] === "undefined" ||
                typeof e["timeStarted"] === "number") &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                    typeof e["finalOutput"]["name"] === "string" &&
                    (typeof e["finalOutput"]["damage"] === "undefined" ||
                        typeof e["finalOutput"]["damage"] === "number") &&
                    typeof e["finalOutput"]["amount"] === "number" &&
                    typeof e["finalOutput"]["id"] === "number" &&
                    typeof e["finalOutput"]["display"] === "string" &&
                    typeof e["finalOutput"]["total"] === "number")) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string") &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        typedObj["data"]["levelMaintains"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["enabled"] === "boolean" &&
            Array.isArray(e["list"]) &&
            e["list"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                (typeof e["damage"] === "undefined" ||
                    typeof e["damage"] === "number") &&
                typeof e["request"] === "number" &&
                typeof e["amount"] === "number" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string")));
}
export function isDataAeAdd(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        typeof typedObj["data"]["timeCreated"] === "number" &&
        typeof typedObj["data"]["timeUpdated"] === "number" &&
        Array.isArray(typedObj["data"]["cpus"]) &&
        typedObj["data"]["cpus"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["coprocessors"] === "number" &&
            typeof e["storage"] === "number" &&
            typeof e["busy"] === "boolean" &&
            (typeof e["timeStarted"] === "undefined" ||
                typeof e["timeStarted"] === "number") &&
            typeof e["active"] === "boolean" &&
            (typeof e["finalOutput"] === "undefined" ||
                (e["finalOutput"] !== null &&
                    typeof e["finalOutput"] === "object" ||
                    typeof e["finalOutput"] === "function") &&
                    typeof e["finalOutput"]["name"] === "string" &&
                    (typeof e["finalOutput"]["damage"] === "undefined" ||
                        typeof e["finalOutput"]["damage"] === "number") &&
                    typeof e["finalOutput"]["amount"] === "number" &&
                    typeof e["finalOutput"]["id"] === "number" &&
                    typeof e["finalOutput"]["display"] === "string" &&
                    typeof e["finalOutput"]["total"] === "number")) &&
        Array.isArray(typedObj["data"]["items"]) &&
        typedObj["data"]["items"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["name"] === "string" &&
            typeof e["type"] === "string" &&
            typeof e["amount"] === "number" &&
            (typeof e["damage"] === "undefined" ||
                typeof e["damage"] === "number") &&
            typeof e["craftable"] === "boolean" &&
            typeof e["id"] === "number" &&
            typeof e["display"] === "string") &&
        Array.isArray(typedObj["data"]["levelMaintains"]) &&
        typedObj["data"]["levelMaintains"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["enabled"] === "boolean" &&
            Array.isArray(e["list"]) &&
            e["list"].every((e) => (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
                typeof e["name"] === "string" &&
                typeof e["type"] === "string" &&
                (typeof e["damage"] === "undefined" ||
                    typeof e["damage"] === "number") &&
                typeof e["request"] === "number" &&
                typeof e["amount"] === "number" &&
                typeof e["id"] === "number" &&
                typeof e["display"] === "string")));
}
export function isDataAeRemove(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataAeRemove" &&
        typeof typedObj["data"] === "string");
}
export function isDataEventInit(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataEventInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            (e["priority"] === 0 ||
                e["priority"] === 1 ||
                e["priority"] === 2) &&
            (e["status"] === 0 ||
                e["status"] === 1) &&
            typeof e["timestamp"] === "number"));
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
export function isDataEventRemove(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataEventRemove" &&
        typeof typedObj["data"] === "string");
}
export function isDataRedstoneInit(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneInit" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["uuid"] === "string" &&
            typeof e["botUuid"] === "string" &&
            typeof e["name"] === "string" &&
            (typeof e["description"] === "undefined" ||
                typeof e["description"] === "string") &&
            (e["type"] === "digital" ||
                e["type"] === "analog") &&
            typeof e["value"] === "number" &&
            (e["side"] === "up" ||
                e["side"] === "down" ||
                e["side"] === "north" ||
                e["side"] === "south" ||
                e["side"] === "west" ||
                e["side"] === "east")));
}
export function isDataRedstoneSet(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneSet" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["botUuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typedObj["data"]["type"] === "digital" ||
            typedObj["data"]["type"] === "analog") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typedObj["data"]["side"] === "up" ||
            typedObj["data"]["side"] === "down" ||
            typedObj["data"]["side"] === "north" ||
            typedObj["data"]["side"] === "south" ||
            typedObj["data"]["side"] === "west" ||
            typedObj["data"]["side"] === "east"));
}
export function isDataRedstoneAdd(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneAdd" &&
        (typedObj["data"] !== null &&
            typeof typedObj["data"] === "object" ||
            typeof typedObj["data"] === "function") &&
        typeof typedObj["data"]["uuid"] === "string" &&
        typeof typedObj["data"]["botUuid"] === "string" &&
        typeof typedObj["data"]["name"] === "string" &&
        (typeof typedObj["data"]["description"] === "undefined" ||
            typeof typedObj["data"]["description"] === "string") &&
        (typedObj["data"]["type"] === "digital" ||
            typedObj["data"]["type"] === "analog") &&
        typeof typedObj["data"]["value"] === "number" &&
        (typedObj["data"]["side"] === "up" ||
            typedObj["data"]["side"] === "down" ||
            typedObj["data"]["side"] === "north" ||
            typedObj["data"]["side"] === "south" ||
            typedObj["data"]["side"] === "west" ||
            typedObj["data"]["side"] === "east"));
}
export function isDataRedstoneRemove(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "DataRedstoneRemove" &&
        typeof typedObj["data"] === "string");
}
export function isStaticBotTask(obj) {
    const typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        typedObj["type"] === "StaticBotTask" &&
        Array.isArray(typedObj["data"]) &&
        typedObj["data"].every((e) => (e !== null &&
            typeof e === "object" ||
            typeof e === "function") &&
            typeof e["id"] === "string" &&
            typeof e["display"] === "string" &&
            typeof e["description"] === "string" &&
            typeof e["icon"] === "string" &&
            Array.isArray(e["mode"]) &&
            e["mode"].every((e) => (e !== null &&
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
                    typeof e["required"] === "boolean"))));
}
