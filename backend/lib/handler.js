import fs from "fs";
import Global from "./global/index.js";
import { loggerHandler as logger, loggerOcOverWs } from "./logger.js";
import { wsOcSendByBotUuid, wsWebBroadcast } from "./websocket.js";
import { wsBaseGuard, wsOcToServerGuard as fromOcGuard, wsWebToServerGuard as fromWebGuard } from "@oni/interface";
import { newServerToWebMessage as toWeb, newServerToOcMessage as toOc, newGeneralMessage } from "@oni/interface/utils/createMessage.js";
import { send } from "./utils.js";
const handler = {
    webMessage(msg, session) {
        // 解析 JSON
        let json;
        try {
            json = JSON.parse(msg);
        }
        catch (e) {
            logger.error("WEB RECEIVED INVALID JSON", msg);
            logger.error(e);
            return;
        }
        if (!wsBaseGuard.isMessage(json)) {
            logger.error("WEB RECEIVED INVALID MESSAGE", json);
            return;
        }
        logger.trace("WEB RECEIVED", json);
        // 登录请求
        if (fromWebGuard.isAuthRequest(json)) {
            processor.auth.web(json, session);
        }
        else if (!session.authenticated) {
            // 如果未登录
            send(session, newGeneralMessage("Error", { "message": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (fromWebGuard.isDataEventSet(json)) {
                // 事件数据
                processor.data.eventSet(json, session);
                return;
            }
            else if (fromWebGuard.isOcTaskRunSingle(json)) {
                // 运行单次任务
                processor.web2oc.taskRunSingle(json, session);
                return;
            }
            else if (fromWebGuard.isOcTaskAdd(json)) {
                // 添加任务
                processor.web2oc.taskAdd(json, session);
                return;
            }
            else if (fromWebGuard.isOcTaskRemove(json)) {
                // 移除任务
                processor.web2oc.taskRemove(json, session);
                return;
            }
            else if (fromWebGuard.isOcForward(json)) {
                // debug 转发
                processor.web2oc.forward(json, session);
                return;
            }
            else if (fromWebGuard.isAeOrder(json)) {
                // AE 订单
                processor.ae.order(json, session);
                return;
            }
            else {
                logger.error("WEB RECEIVED INVALID TYPE", json);
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
            logger.error("OC RECEIVED INVALID JSON", msg);
            logger.error(e);
            return;
        }
        if (!wsBaseGuard.isMessage(json)) {
            logger.error("OC RECEIVED INVALID MESSAGE", json);
            return;
        }
        if (json.type != "log") {
            logger.trace("OC RECEIVED", json);
        }
        if (fromOcGuard.isAuthRequest(json)) {
            // 登录请求
            processor.auth.oc(json, session);
        }
        else if (!session.authenticated) {
            // 如果未登录
            send(session, newGeneralMessage("Error", { "message": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (fromOcGuard.isDataCommonSet(json)) {
                processor.data.commonSet(json, session);
                return;
            }
            else if (fromOcGuard.isDataEventSet(json)) {
                processor.data.eventSet(json, session);
                return;
            }
            else if (fromOcGuard.isDataEventAdd(json)) {
                processor.data.eventAdd(json, session);
                return;
            }
            else if (fromOcGuard.isDataBotComponent(json)) {
                processor.data.bot.component(json, session);
                return;
            }
            else if (fromOcGuard.isDataAeItemList(json)) {
                processor.data.ae.itemList(json, session);
                return;
            }
            else if (fromOcGuard.isDataAeCpuList(json)) {
                processor.data.ae.cpus(json, session);
                return;
            }
            else if (fromOcGuard.isAeOrderResult(json)) {
                processor.ae.orderResult(json, session);
                return;
            }
            else if (fromOcGuard.isLog(json)) {
                processor.oc.log(json, session);
                return;
            }
            else {
                logger.warn("OC RECEIVED INVALID TYPE", json);
            }
        }
    }
};
export default handler;
const processor = {
    data: {
        commonSet(json, session) {
            let target = Global.common.list.find(data => data.uuid === json.data.uuid);
            if (target) {
                const data = Object.assign({}, target, json.data);
                Global.common.set(data);
            }
            else {
                send(session, newGeneralMessage("Error", { "message": "Data not found" }));
            }
        },
        eventSet(json, session) {
            let target = Global.event.list.find(event => event.uuid === json.data.uuid);
            if (target) {
                const event = Object.assign({}, target, json.data);
                send(session, newGeneralMessage("Error", { "message": "Event not found" }));
            }
            else {
                send(session, newGeneralMessage("Error", { "message": "Event not found" }));
            }
        },
        eventAdd(json, session) {
            Global.event.add(json.data);
        },
        ae: {
            itemList(json, session) {
                Global.ae.items.set(json.data.uuid, json.data.items);
            },
            cpus(json, session) {
                json.data.cpus.forEach((cpu) => {
                    var _a;
                    const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid);
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
                        send(session, newGeneralMessage("Error", { "message": "AE not found" }));
                    }
                });
                Global.ae.cpus.set(json.data.uuid, json.data.cpus);
            }
        },
        bot: {
            component(json, session) {
                Global.bot.components.set(json.data.uuid, json.data.components);
            },
        }
    },
    ae: {
        order(json, session) {
            const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid);
            if (!ae) {
                logger.error(`processor.ae.order: AE ${json.data.uuid} not found`);
                return;
            }
            let targetBot = [];
            Global.bot.list.forEach(bot => {
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
                logger.error(`processor.ae.order: No bot found for AE ${json.data.uuid}`);
                return;
            }
            let runner = targetBot[0];
            if (targetBot.length > 1) {
                logger.warn(`processor.ae.order: More than one bot found for AE ${json.data.uuid}, using ${runner.name}`);
            }
            Global.bot.tasks.runSingle(runner.uuid, {
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
            wsWebBroadcast(toWeb("AeOrderResult", json.data));
        }
    },
    web2oc: {
        taskRunSingle(json, session) {
            Global.bot.tasks.runSingle(json.target, json.data);
        },
        taskAdd(json, session) {
            Global.bot.tasks.add(json.target, json.data);
        },
        taskRemove(json, session) {
            Global.bot.tasks.remove(json.target, json.data.taskUuid);
        },
        forward(json, session) {
            if (!wsOcSendByBotUuid(json.target, json.data)) {
                logger.error(`Trying to forward debug message to oc but bot ${json.target} not found or offline`);
            }
        }
    },
    oc: {
        log(json, session) {
            fs.writeFileSync(`./logs/oc.log`, `[${new Date().toLocaleString()}] [${json.data.level}/${json.data.file}:${json.data.location}] (${json.data.taskUuid}) ${json.data.message}\n`, { flag: "a+" });
            const { level, file, location, taskUuid, message } = json.data;
            loggerOcOverWs.log(level, `[${level}/${file}:${location}] (${taskUuid}) ${message}`);
        }
    },
    auth: {
        web(json, session) {
            const user = Global.user.list.find(user => user.token === json.data.token);
            if (user) {
                session.authenticated = true;
                session.user = user;
                // 返回用户信息
                send(session, toWeb("AuthResponse", session.user));
                // 发送 overview 布局文件
                send(session, toWeb("LayoutOverview", JSON.parse(fs.readFileSync('./data/layout/overview.json', 'utf8'))));
                // 初始化各种数据
                send(session, toWeb("DataCommonInit", Global.common.list));
                send(session, toWeb("DataEventInit", Global.event.list));
                send(session, toWeb("DataBotInit", Global.bot.list));
                send(session, toWeb("DataAeInit", Global.ae.list));
                send(session, toWeb("DataRedstoneInit", Global.redstone.list));
                send(session, toWeb("DataMcServerStatusSet", Global.mcServerStatus.status));
                send(session, toWeb("StaticBotTask", Global.staticResources.botTask));
            }
            else {
                logger.warn(`Invalid token ${json.data.token} for user ${session.sessionId.substring(0, 8)}`);
                send(session, toWeb("AuthResponse", null));
            }
        },
        oc(json, session) {
            // 登录请求
            const bot = Global.bot.list.find(bot => bot.token === json.data.token);
            if (bot) {
                session.authenticated = true;
                session.bot = bot;
                // 返回用户信息
                send(session, toOc("AuthResponse", bot));
                // 发送 tasks 数据
                send(session, toOc("Task", bot.tasks));
            }
            else {
                logger.warn(`Invalid token ${json.data.token} for bot ${session.sessionId.substring(0, 8)}`);
                send(session, toOc("AuthResponse", null));
            }
        },
    }
};
