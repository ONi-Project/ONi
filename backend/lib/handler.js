import fs from "fs";
import Global from "./global/index.js";
import { loggerHandler as logger } from "./logger.js";
import { wssOc } from "./websocket.js";
var handler = {
    webMessage(msg, ws) {
        // 解析 JSON
        let json;
        try {
            json = JSON.parse(msg);
        }
        catch (e) {
            logger.error("WEB RECEIVED INVALID", msg);
            logger.error(e);
            return;
        }
        logger.trace("WEB RECEIVED", json);
        if (json.type == "auth/request") {
            // 登录请求
            processor.webAuth(json, ws);
        }
        else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (json.type == "data/event/set") {
                // 事件数据
                processor.data.eventSet(json, ws);
            }
            else if (json.type == "oc/task/runSingle") {
                // 运行单次任务
                processor.web2oc.taskRunSingle(json, ws);
            }
            else if (json.type == "oc/task/add") {
                // 添加任务
                processor.web2oc.taskAdd(json, ws);
            }
            else if (json.type == "oc/task/remove") {
                // 移除任务
                processor.web2oc.taskRemove(json, ws);
            }
            else if (json.type == "oc/forward") {
                // debug 转发
                processor.web2oc.forward(json, ws);
            }
            else if (json.type == "ae/order") {
                // AE 订单
                processor.ae.order(json, ws);
            }
            else {
                logger.warn(`Unknown message type ${json.type}`);
            }
        }
    },
    ocMessage(msg, ws) {
        // 解析 JSON
        let json;
        try {
            json = JSON.parse(msg);
        }
        catch (e) {
            logger.error("OC RECEIVED INVALID", msg);
            logger.error(e);
            return;
        }
        logger.trace("OC RECEIVED", json);
        if (json.type == "auth/request") {
            // 登录请求
            processor.ocAuth(json, ws);
        }
        else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }));
        }
        else {
            // 如果已登录，处理数据
            if (json.type == "data/common/set") {
                processor.data.commonSet(json, ws);
            }
            else if (json.type == "data/event/set") {
                processor.data.eventSet(json, ws);
            }
            else if (json.type == "data/event/add") {
                processor.data.eventAdd(json, ws);
            }
            else if (json.type == "data/bot/component") {
                processor.data.bot.component(json, ws);
            }
            else if (json.type == "data/ae/itemList") {
                processor.data.ae.itemList(json, ws);
            }
            else if (json.type == "data/ae/cpus") {
                processor.data.ae.cpus(json, ws);
            }
            else {
                logger.warn(`Unknown message type ${json.type}`);
            }
        }
    }
};
export default handler;
var processor = {
    data: {
        commonSet(json, ws) {
            let target = Global.data.list.find(data => data.uuid === json.data.uuid);
            if (target) {
                const data = Object.assign({}, target, json.data);
                Global.data.set(data);
            }
            else {
                ws.send(JSON.stringify({ "type": "error", "data": "Data not found" }));
            }
        },
        eventSet(json, ws) {
            let target = Global.event.list.find(event => event.uuid === json.data.uuid);
            if (target) {
                const event = Object.assign({}, target, json.data);
                Global.event.set(event);
            }
            else {
                ws.send(JSON.stringify({ "type": "error", "data": "Event not found" }));
            }
        },
        eventAdd(json, ws) {
            Global.event.add(json.data);
        },
        ae: {
            itemList(json, ws) {
                Global.ae.itemList.set(json.data.uuid, json.data.itemList);
            },
            cpus(json, ws) {
                json.data.cpus.forEach((cpu) => {
                    var _a;
                    const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid);
                    if (ae) {
                        const cpuPrev = ae.cpus.find(c => c.name === cpu.name);
                        if (cpuPrev) {
                            if (cpuPrev.busy && cpu.busy && cpuPrev.timeStarted && ((_a = cpuPrev.finalOutput) === null || _a === void 0 ? void 0 : _a.total)) {
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
                        ws.send(JSON.stringify({ "type": "error", "data": "AE not found" }));
                    }
                });
                Global.ae.cpus.set(json.data.uuid, json.data.cpus);
            }
        },
        bot: {
            component(json, ws) {
                Global.bot.components.set(ws.bot.uuid, json.data.components);
            },
        }
    },
    ae: {
        order(json, ws) {
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
        }
    },
    web2oc: {
        taskRunSingle(json, ws) {
            Global.bot.tasks.runSingle(json.target, json.data);
        },
        taskAdd(json, ws) {
            Global.bot.tasks.add(json.target, json.data);
        },
        taskRemove(json, ws) {
            Global.bot.tasks.remove(json.target, json.data.taskUuid);
        },
        forward(json, ws) {
            let ok = false;
            wssOc.clients.forEach(ws => {
                var _a;
                if (ws.authenticated && ((_a = ws.bot) === null || _a === void 0 ? void 0 : _a.uuid) == json.target) {
                    ws.send(JSON.stringify(json.data));
                    ok = true;
                }
            });
            if (!ok) {
                logger.warn(`Trying to forward debug message to oc but bot ${json.target} not found or offline`);
            }
        }
    },
    webAuth(json, ws) {
        const user = Global.user.list.find(user => user.token === json.data.token);
        if (user) {
            ws.authenticated = true;
            ws.user = user;
            // 返回用户信息
            ws.send(JSON.stringify({ type: "auth/response", data: ws.user }));
            // 发送 overview 布局文件
            ws.send(JSON.stringify({ type: "layout/overview", data: JSON.parse(fs.readFileSync('./data/layout/overview.json', 'utf8')) }));
            // 发送 control 布局文件
            ws.send(JSON.stringify({ type: "layout/control", data: Global.redstone.getLayout() }));
            // 发送 data 数据
            ws.send(JSON.stringify({ type: "global/common", data: Global.data.list }));
            // 发送 mcServerStatus 数据
            ws.send(JSON.stringify({ type: "global/mcServerStatus", data: Global.mcServerStatus.status }));
            // 发送 events 布局
            ws.send(JSON.stringify({ type: "layout/event", data: Global.event.getLayout() }));
            // 发送 bot 数据
            ws.send(JSON.stringify({ type: "global/bot", data: Global.bot.list }));
            // 发送 bot list 布局
            ws.send(JSON.stringify({ type: "layout/botList", data: Global.bot.getListLayout() }));
            // 发送 bot task 列表
            ws.send(JSON.stringify({ type: "global/botTask", data: Global.staticResources.botTask }));
            // 发送 bot 编辑布局
            ws.send(JSON.stringify({ type: "layout/botEdit", data: Global.bot.getEditLayout() }));
            // 发送 ae 数据
            ws.send(JSON.stringify({ type: "global/ae", data: Global.ae.list }));
            // 发送 ae list 布局
            ws.send(JSON.stringify({ type: "layout/aeList", data: Global.ae.getListLayout() }));
            // 发送 ae 查看布局
            ws.send(JSON.stringify({ type: "layout/aeView", data: Global.ae.getViewLayout() }));
            // 发送 ae 编辑布局
            ws.send(JSON.stringify({ type: "layout/aeEdit", data: Global.ae.getEditLayout() }));
        }
        else {
            logger.warn(`Invalid token ${json.data.token} for user ${ws.sessionId.substring(0, 8)}`);
            ws.send(JSON.stringify({ type: "auth/response", data: { user: undefined } }));
        }
    },
    ocAuth(json, ws) {
        // 登录请求
        const bot = Global.bot.list.find(bot => bot.token === json.data.token);
        if (bot) {
            ws.authenticated = true;
            ws.bot = bot;
            // 返回用户信息
            ws.send(JSON.stringify({ type: "auth/response", data: bot }));
            // 发送 tasks 数据
            ws.send(JSON.stringify({ type: "task", data: bot.tasks }));
        }
        else {
            logger.warn(`Invalid token ${json.data.token} for bot ${ws.sessionId.substring(0, 8)}`);
            ws.send(JSON.stringify({ type: "auth/response", data: undefined }));
        }
    },
};
