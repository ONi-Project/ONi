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
            if (json.type == "data/event") {
                // 事件数据
                processor.data.event(json, ws);
            }
            else if (json.type == "oc/task/runSingle") {
                // 添加任务
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
            if (json.type == "update/common") {
                processor.data.common(json, ws);
            }
            else if (json.type == "data/event") {
                processor.data.event(json, ws);
            }
            else if (json.type == "component") {
                processor.component(json, ws);
            }
            else if (json.type == "update/ae/itemList") {
                processor.data.ae.itemList(json, ws);
            }
            else if (json.type == "update/ae/cpus") {
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
        common(json, ws) {
            let target = Global.data.list.find(data => data.uuid === json.data.uuid);
            if (target) {
                const data = Object.assign({}, target, json.data);
                Global.data.set(data);
            }
            else {
                ws.send(JSON.stringify({ "type": "error", "data": "Data not found" }));
            }
        },
        event(json, ws) {
            let target = Global.event.list.find(event => event.uuid === json.data.uuid);
            if (target) {
                const event = Object.assign({}, target, json.data);
                Global.event.set(event);
            }
            else {
                Global.event.add(json.data);
            }
        },
        ae: {
            itemList(json, ws) {
                Global.ae.itemList.set(json.data.uuid, json.data.itemList);
            },
            cpus(json, ws) {
                Global.ae.cpus.set(json.data.uuid, json.data.cpus);
            }
        }
    },
    web2oc: {
        taskRunSingle(json, ws) {
            Global.bot.tasks.runSingle(json.target, json.data.task);
        },
        taskAdd(json, ws) {
            Global.bot.tasks.add(json.target, json.data.task);
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
    component(json, ws) {
        Global.bot.components.set(ws.bot.uuid, json.data.components);
    },
    webAuth(json, ws) {
        const user = Global.user.list.find(user => user.token === json.data.token);
        if (user) {
            ws.authenticated = true;
            ws.user = user;
            // 返回用户信息
            ws.send(JSON.stringify({ type: "auth/response", data: { user: ws.user } }));
            // 发送历史日志
            const logFile = fs.readFileSync('./logs/main.log', 'utf8');
            const _ = logFile.split('\n').slice(-100).join('\n');
            ws.send(JSON.stringify({ type: "event/log", data: _ }));
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
            ws.send(JSON.stringify({ type: "auth/response", data: { bot: bot } }));
            // 发送 tasks 数据
            ws.send(JSON.stringify({ type: "task", data: bot.tasks }));
        }
        else {
            logger.warn(`Invalid token ${json.data.token} for bot ${ws.sessionId.substring(0, 8)}`);
            ws.send(JSON.stringify({ type: "auth/response", data: { bot: undefined } }));
        }
    },
};
