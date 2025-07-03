"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("./global/index"));
const logger_1 = require("./logger");
const websocket_1 = require("./websocket");
const interface_1 = require("@oni/interface");
const createMessage_1 = require("@oni/interface/utils/createMessage");
const utils_1 = require("./utils");
const handler = {
    webMessage(msg, session) {
        // 解析 JSON
        let json;
        try {
            json = JSON.parse(msg);
        }
        catch (e) {
            logger_1.loggerHandler.error("WEB RECEIVED INVALID JSON", msg);
            logger_1.loggerHandler.error(e);
            return;
        }
        if (!interface_1.wsBaseGuard.isMessage(json)) {
            logger_1.loggerHandler.error("WEB RECEIVED INVALID MESSAGE", json);
            return;
        }
        logger_1.loggerHandler.trace("WEB RECEIVED", json);
        // 登录请求
        if (interface_1.wsWebToServerGuard.isAuthRequest(json)) {
            processor.auth.web(json, session);
        }
        else if (!session.authenticated) {
            // 如果未登录
            (0, utils_1.send)(session, (0, createMessage_1.newGeneralMessage)("Error", { "message": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (interface_1.wsWebToServerGuard.isDataEventSet(json)) {
                // 事件数据
                processor.data.eventSet(json, session);
                return;
            }
            else if (interface_1.wsWebToServerGuard.isOcTaskRunSingle(json)) {
                // 运行单次任务
                processor.web2oc.taskRunSingle(json, session);
                return;
            }
            else if (interface_1.wsWebToServerGuard.isOcTaskAdd(json)) {
                // 添加任务
                processor.web2oc.taskAdd(json, session);
                return;
            }
            else if (interface_1.wsWebToServerGuard.isOcTaskRemove(json)) {
                // 移除任务
                processor.web2oc.taskRemove(json, session);
                return;
            }
            else if (interface_1.wsWebToServerGuard.isOcForward(json)) {
                // debug 转发
                processor.web2oc.forward(json, session);
                return;
            }
            else if (interface_1.wsWebToServerGuard.isAeOrder(json)) {
                // AE 订单
                processor.ae.order(json, session);
                return;
            }
            else {
                logger_1.loggerHandler.error("WEB RECEIVED INVALID TYPE", json);
                return;
            }
        }
    },
    ocMessage(msg, session) {
        // 解析 JSON
        let json;
        try {
            json = JSON.parse(msg);
        }
        catch (e) {
            logger_1.loggerHandler.error("OC RECEIVED INVALID JSON", msg);
            logger_1.loggerHandler.error(e);
            return;
        }
        if (!interface_1.wsBaseGuard.isMessage(json)) {
            logger_1.loggerHandler.error("OC RECEIVED INVALID MESSAGE", json);
            return;
        }
        if (json.type != "log") {
            logger_1.loggerHandler.trace("OC RECEIVED", json);
        }
        if (interface_1.wsOcToServerGuard.isAuthRequest(json)) {
            // 登录请求
            processor.auth.oc(json, session);
        }
        else if (!session.authenticated) {
            // 如果未登录
            (0, utils_1.send)(session, (0, createMessage_1.newGeneralMessage)("Error", { "message": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (interface_1.wsOcToServerGuard.isDataCommonSet(json)) {
                processor.data.commonSet(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isDataEventSet(json)) {
                processor.data.eventSet(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isDataEventAdd(json)) {
                processor.data.eventAdd(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isDataBotComponent(json)) {
                processor.data.bot.component(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isDataAeItemList(json)) {
                processor.data.ae.itemList(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isDataAeCpuList(json)) {
                processor.data.ae.cpus(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isAeOrderResult(json)) {
                processor.ae.orderResult(json, session);
                return;
            }
            else if (interface_1.wsOcToServerGuard.isLog(json)) {
                processor.oc.log(json, session);
                return;
            }
            else {
                logger_1.loggerHandler.warn("OC RECEIVED INVALID TYPE", json);
            }
        }
    }
};
exports.default = handler;
const processor = {
    data: {
        commonSet(json, session) {
            const target = index_1.default.common.list.find(common => common.uuid === json.data.uuid);
            if (target) {
                const common = Object.assign({}, target, json.data);
                index_1.default.common.set(common);
            }
            else {
                (0, utils_1.send)(session, (0, createMessage_1.newGeneralMessage)("Error", { "message": "Common not found" }));
                logger_1.loggerHandler.error(`processor.data.commonSet: Common ${json.data.uuid} not found`);
            }
        },
        eventSet(json, session) {
            let target = index_1.default.event.list.find(event => event.uuid === json.data.uuid);
            if (target) {
                const event = Object.assign({}, target, json.data);
                index_1.default.event.set(event);
            }
            else {
                (0, utils_1.send)(session, (0, createMessage_1.newGeneralMessage)("Error", { "message": "Event not found" }));
                logger_1.loggerHandler.error(`processor.data.eventSet: Event ${json.data.uuid} not found`);
            }
        },
        eventAdd(json, session) {
            index_1.default.event.add(json.data);
        },
        ae: {
            itemList(json, session) {
                let itemList = json.data.items;
                let _ = [];
                (0, utils_1.performanceTimer)("ae.itemList.set", () => {
                    itemList = itemList.filter((item) => item.name !== "ae2fc:fluid_drop");
                    itemList.forEach((item, index) => {
                        if (item.type === "item" || item.type === "fluid") {
                            let id, display;
                            const resourceType = item.type === "item" ? index_1.default.staticResources.itemPanelItemMap : index_1.default.staticResources.itemPanelFluidMap;
                            const resource = resourceType.get(item.type === "item" ? item.name + "/" + item.damage : item.name);
                            if (resource) {
                                id = resource.id;
                                display = resource.display;
                            }
                            else {
                                logger_1.loggerHandler.warn(`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.name} not found in staticResources.itemPanel`);
                            }
                            _.push({
                                id: id || -1,
                                name: item.name,
                                damage: item.damage,
                                amount: item.amount,
                                display: display || "",
                                type: item.type,
                                craftable: item.craftable
                            });
                        }
                        else if (item.type === "vis") {
                            // TODO: 处理 vis 类型
                        }
                        else {
                            logger_1.loggerHandler.error(`Unknown item type ${item.type}`);
                        }
                    });
                });
                index_1.default.ae.items.set(json.data.uuid, _);
            },
            cpus(json, session) {
                json.data.cpus.forEach((cpu) => {
                    var _a;
                    const ae = index_1.default.ae.list.find(ae => ae.uuid === json.data.uuid);
                    if (ae) {
                        const cpuPrev = ae.cpus.find(c => c.name === cpu.name);
                        if (cpuPrev) {
                            if (cpuPrev.busy && cpu.busy && cpuPrev.timeStarted && ((_a = cpuPrev.finalOutput) === null || _a === void 0 ? void 0 : _a.total) && cpu.finalOutput) {
                                cpu.timeStarted = cpuPrev.timeStarted;
                                cpu.finalOutput.total = cpuPrev.finalOutput.total;
                            }
                            else if (!cpu.busy || cpu.finalOutput === undefined) {
                                cpu.timeStarted = 0;
                            }
                            else {
                                cpu.timeStarted = Date.now();
                                cpu.finalOutput.total = cpu.finalOutput.amount;
                            }
                        }
                    }
                    else {
                        (0, utils_1.send)(session, (0, createMessage_1.newGeneralMessage)("Error", { "message": "AE not found" }));
                    }
                });
                index_1.default.ae.cpus.set(json.data.uuid, json.data.cpus);
            }
        },
        bot: {
            component(json, session) {
                index_1.default.bot.components.set(json.data.uuid, json.data.components);
            },
        }
    },
    ae: {
        order(json, session) {
            const ae = index_1.default.ae.list.find(ae => ae.uuid === json.data.uuid);
            if (!ae) {
                logger_1.loggerHandler.error(`processor.ae.order: AE ${json.data.uuid} not found`);
                return;
            }
            let targetBot = [];
            index_1.default.bot.list.forEach(bot => {
                let flag = false;
                bot.tasks.forEach(task => {
                    if (task.task === "ae" && task.config.targetAeUuid === ae.uuid) {
                        flag = true;
                    }
                });
                if (flag) {
                    targetBot.push(bot);
                }
            });
            if (targetBot.length === 0) {
                logger_1.loggerHandler.error(`processor.ae.order: No bot found for AE ${json.data.uuid}`);
                return;
            }
            let runner = targetBot[0];
            if (targetBot.length > 1) {
                logger_1.loggerHandler.warn(`processor.ae.order: More than one bot found for AE ${json.data.uuid}, using ${runner.name}`);
            }
            index_1.default.bot.tasks.runSingle(runner.uuid, {
                "task": "ae",
                "interval": -1,
                "taskUuid": json.data.taskUuid,
                "config": {
                    "mode": "request",
                    "name": json.data.name,
                    "damage": json.data.damage,
                    "amount": json.data.amount
                }
            });
        },
        orderResult(json, session) {
            (0, websocket_1.wsWebBroadcast)((0, createMessage_1.newServerToWebMessage)("AeOrderResult", json.data));
        }
    },
    web2oc: {
        taskRunSingle(json, session) {
            index_1.default.bot.tasks.runSingle(json.target, json.data);
        },
        taskAdd(json, session) {
            index_1.default.bot.tasks.add(json.target, json.data);
        },
        taskRemove(json, session) {
            index_1.default.bot.tasks.remove(json.target, json.data.taskUuid);
        },
        forward(json, session) {
            if (!(0, websocket_1.wsOcSendByBotUuid)(json.target, json.data)) {
                logger_1.loggerHandler.error(`Trying to forward debug message to oc but bot ${json.target} not found or offline`);
            }
        }
    },
    oc: {
        log(json, session) {
            fs_1.default.writeFileSync(`./logs/oc.log`, `[${new Date().toLocaleString()}] [${json.data.level}/${json.data.file}:${json.data.location}] (${json.data.taskUuid}) ${json.data.message}\n`, { flag: "a+" });
            const { level, file, location, taskUuid, message } = json.data;
            logger_1.loggerOcOverWs.log(level, `[${level}/${file}:${location}] (${taskUuid}) ${message}`);
        }
    },
    auth: {
        web(json, session) {
            const user = index_1.default.user.list.find(user => user.token === json.data.token);
            if (user) {
                session.authenticated = true;
                session.user = user;
                // 返回用户信息
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("AuthResponse", session.user));
                // 发送 overview 布局文件
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("LayoutOverview", JSON.parse(fs_1.default.readFileSync('./data/layout/overview.json', 'utf8'))));
                // 初始化各种数据
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataCommonInit", index_1.default.common.list));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataEventInit", index_1.default.event.list));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataBotInit", index_1.default.bot.list));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataAeInit", index_1.default.ae.list));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataRedstoneInit", index_1.default.redstone.list));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("DataMcServerStatusSet", index_1.default.mcServerStatus.status));
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("StaticBotTask", index_1.default.staticResources.botTask));
            }
            else {
                logger_1.loggerHandler.warn(`Invalid token ${json.data.token} for user ${session.sessionId.substring(0, 8)}`);
                (0, utils_1.send)(session, (0, createMessage_1.newServerToWebMessage)("AuthResponse", null));
            }
        },
        oc(json, session) {
            // 登录请求
            const bot = index_1.default.bot.list.find(bot => bot.token === json.data.token);
            if (bot) {
                session.authenticated = true;
                session.bot = bot;
                // 返回用户信息
                (0, utils_1.send)(session, (0, createMessage_1.newServerToOcMessage)("AuthResponse", bot));
                // 发送 tasks 数据
                (0, utils_1.send)(session, (0, createMessage_1.newServerToOcMessage)("Task", bot.tasks));
            }
            else {
                logger_1.loggerHandler.warn(`Invalid token ${json.data.token} for bot ${session.sessionId.substring(0, 8)}`);
                (0, utils_1.send)(session, (0, createMessage_1.newServerToOcMessage)("AuthResponse", null));
            }
        },
    }
};
