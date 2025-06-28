


import fs from "fs"
import Global from "./global/index.js"
import { Bot, Common, SessionOc, SessionWeb } from "./interface.js"
import { loggerHandler as logger, loggerOcOverWs } from "./logger.js"
import { wssOc, wsWebBroadcast } from "./websocket.js"
import { wsBase, wsBaseGuard, wsOcToServer, wsOcToServerGuard, wsWebToServer, wsWebToServerGuard, messageTypeMap } from "@oni/interface"
const handler = {
    webMessage(msg: string, ws: SessionWeb) {

        // 解析 JSON
        let json
        try {
            json = JSON.parse(msg)
        } catch (e) {
            logger.error("WEB RECEIVED INVALID JSON", msg)
            logger.error(e)
            return
        }

        if (!wsBaseGuard.isMessage(json)) {
            logger.error("WEB RECEIVED INVALID MESSAGE", json)
            return
        }

        logger.trace("WEB RECEIVED", json)


        // 登录请求
        if (wsWebToServerGuard.isAuthRequest(json)) {
            processor.auth.web(json, ws)
        } else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }))
        } else {
            // 如果已登录，处理数据
            if (wsWebToServerGuard.isDataEventSet(json)) {
                // 事件数据
                processor.data.eventSet(json, ws)
                return
            } else if (wsWebToServerGuard.isOcTaskRunSingle(json)) {
                // 运行单次任务
                processor.web2oc.taskRunSingle(json, ws)
            } else if (json.type == "oc/task/add") {
                // 添加任务
                processor.web2oc.taskAdd(json, ws)
            } else if (json.type == "oc/task/remove") {
                // 移除任务
                processor.web2oc.taskRemove(json, ws)
            } else if (json.type == "oc/forward") {
                // debug 转发
                processor.web2oc.forward(json, ws)
            } else if (json.type == "ae/order") {
                // AE 订单
                processor.ae.order(json, ws)
            } else {
                logger.warn(`Unknown message type ${json.type}`)
            }
        }

    },
    ocMessage(msg: string, ws: SessionOc) {

        // 解析 JSON
        let json: any
        try {
            json = JSON.parse(msg)
        } catch (e) {
            logger.error("OC RECEIVED INVALID", msg)
            logger.error(e)
            return
        }

        if (json.type != "log") {
            logger.trace("OC RECEIVED", json)
        }

        if (json.type == "auth/request") {
            // 登录请求
            processor.auth.oc(json, ws)
        } else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }))
        } else {
            // 如果已登录，处理数据
            if (json.type == "data/common/set") {
                processor.data.commonSet(json, ws)
            } else if (json.type == "data/event/set") {
                processor.data.eventSet(json, ws)
            } else if (json.type == "data/event/add") {
                processor.data.eventAdd(json, ws)
            } else if (json.type == "data/bot/component") {
                processor.data.bot.component(json, ws)
            } else if (json.type == "data/ae/itemList") {
                processor.data.ae.itemList(json, ws)
            } else if (json.type == "data/ae/cpus") {
                processor.data.ae.cpus(json, ws)
            } else if (json.type == "ae/order/result") {
                processor.ae.orderResult(json, ws)
            } else if (json.type == "log") {
                processor.oc.log(json, ws)
            } else {
                logger.warn(`Unknown message type ${json.type}`)
            }
        }
    }
}

export default handler

const processor = {
    data: {
        commonSet(json: any, ws: SessionOc) {
            let target = Global.data.list.find(data => data.uuid === json.data.uuid)
            if (target) {
                const data: Common = Object.assign({}, target, json.data)
                Global.data.set(data)
            } else {
                ws.send(JSON.stringify({ "type": "error", "data": "Data not found" }))
            }
        },
        eventSet(json: any, ws: SessionWeb | SessionOc) {
            let target = Global.event.list.find(event => event.uuid === json.data.uuid)
            if (target) {
                const event = Object.assign({}, target, json.data)
                Global.event.set(event)
            } else {
                ws.send(JSON.stringify({ "type": "error", "data": "Event not found" }))
            }
        },
        eventAdd(json: any, ws: SessionWeb | SessionOc) {
            Global.event.add(json.data)
        },
        ae: {
            itemList(json: any, ws: SessionOc) {
                Global.ae.itemList.set(json.data.uuid, json.data.itemList)
            },
            cpus(json: any, ws: SessionOc) {
                json.data.cpus.forEach((cpu: any) => {
                    const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid)
                    if (ae) {
                        const cpuPrev = ae.cpus.find(c => c.name === cpu.name)
                        if (cpuPrev) {
                            if (cpuPrev.busy && cpu.busy && cpuPrev.timeStarted && cpuPrev.finalOutput?.total && cpu.finalOutput) {
                                cpu.timeStarted = cpuPrev.timeStarted
                                cpu.finalOutput.total = cpuPrev.finalOutput.total
                            } else if (!cpu.busy || cpu.finalOutput === undefined) {
                                cpu.timeStarted = 0
                            } else {
                                cpu.timeStarted = Date.now()
                                cpu.finalOutput.total = cpu.finalOutput.amount
                            }
                        }
                    } else {
                        ws.send(JSON.stringify({ "type": "error", "data": "AE not found" }))
                    }
                })
                Global.ae.cpus.set(json.data.uuid, json.data.cpus)
            }
        },
        bot: {
            component(json: any, ws: SessionOc) {
                Global.bot.components.set(ws.bot.uuid, json.data.components)
            },
        }
    },
    ae: {
        order(json: any, ws: SessionWeb) {
            const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid)
            if (!ae) { logger.error(`processor.ae.order: AE ${json.data.uuid} not found`); return }
            let targetBot: Bot[] = []
            Global.bot.list.forEach(bot => {
                let flag = false
                bot.tasks.forEach(task => {
                    if (task.task === "ae" && task.config.targetAeUuid === ae.uuid) { flag = true }
                })
                if (flag) { targetBot.push(bot) }
            })
            if (targetBot.length === 0) { logger.error(`processor.ae.order: No bot found for AE ${json.data.uuid}`); return }
            let runner = targetBot[0]
            if (targetBot.length > 1) {
                logger.warn(`processor.ae.order: More than one bot found for AE ${json.data.uuid}, using ${runner.name}`)
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
            })
        },
        orderResult(json: any, ws: SessionOc) {
            wsWebBroadcast("ae/order/result", json.data)
        }
    },
    web2oc: {
        taskRunSingle(json: any, ws: SessionWeb) {
            Global.bot.tasks.runSingle(json.target, json.data)
        },
        taskAdd(json: any, ws: SessionWeb) {
            Global.bot.tasks.add(json.target, json.data)
        },
        taskRemove(json: any, ws: SessionWeb) {
            Global.bot.tasks.remove(json.target, json.data.taskUuid)
        },
        forward(json: any, ws: SessionWeb) {
            let ok = false
            wssOc.clients.forEach(ws => {
                if ((ws as SessionOc).authenticated && (ws as SessionOc).bot?.uuid == json.target) {
                    ws.send(JSON.stringify(json.data))
                    ok = true
                }
            })
            if (!ok) {
                logger.warn(`Trying to forward debug message to oc but bot ${json.target} not found or offline`)
            }

        }
    },
    oc: {
        log(json: any, ws: SessionOc) {
            fs.writeFileSync(`./logs/oc.log`, `[${new Date().toLocaleString()}] [${json.data.level}/${json.data.file}:${json.data.location}] (${json.data.taskUuid}) ${json.data.message}\n`, { flag: "a+" })
            const { level, file, location, taskUuid, message } = json.data
            loggerOcOverWs.log(level, `[${level}/${file}:${location}] (${taskUuid}) ${message}`)
        }
    },
    auth: {
        web(json: any, ws: SessionWeb) {
            const user = Global.user.list.find(user => user.token === json.data.token)
            if (user) {
                ws.authenticated = true
                ws.user = user
                // 返回用户信息
                ws.send(JSON.stringify({ type: "auth/response", data: ws.user }))

                // 发送 overview 布局文件
                ws.send(JSON.stringify({ type: "layout/overview", data: JSON.parse(fs.readFileSync('./data/layout/overview.json', 'utf8')) }))

                // 发送 control 布局文件
                ws.send(JSON.stringify({ type: "layout/control", data: Global.redstone.getLayout() }))

                // 发送 data 数据
                ws.send(JSON.stringify({ type: "global/common", data: Global.data.list }))

                // 发送 mcServerStatus 数据
                ws.send(JSON.stringify({ type: "global/mcServerStatus", data: Global.mcServerStatus.status }))

                // 发送 events 布局
                ws.send(JSON.stringify({ type: "layout/event", data: Global.event.getLayout() }))

                // 发送 bot 数据
                ws.send(JSON.stringify({ type: "global/bot", data: Global.bot.list }))

                // 发送 bot list 布局
                ws.send(JSON.stringify({ type: "layout/botList", data: Global.bot.getListLayout() }))

                // 发送 bot task 列表
                ws.send(JSON.stringify({ type: "global/botTask", data: Global.staticResources.botTask }))

                // 发送 bot 编辑布局
                ws.send(JSON.stringify({ type: "layout/botEdit", data: Global.bot.getEditLayout() }))

                // 发送 ae 数据
                ws.send(JSON.stringify({ type: "global/ae", data: Global.ae.list }))

                // 发送 ae list 布局
                ws.send(JSON.stringify({ type: "layout/aeList", data: Global.ae.getListLayout() }))

                // 发送 ae 查看布局
                ws.send(JSON.stringify({ type: "layout/aeView", data: Global.ae.getViewLayout() }))

                // 发送 ae 编辑布局
                ws.send(JSON.stringify({ type: "layout/aeEdit", data: Global.ae.getEditLayout() }))


            } else {
                logger.warn(`Invalid token ${json.data.token} for user ${ws.sessionId.substring(0, 8)}`)
                ws.send(JSON.stringify({ type: "auth/response", data: { user: undefined } }))
            }

        },
        oc(json: any, ws: SessionOc) {
            // 登录请求
            const bot = Global.bot.list.find(bot => bot.token === json.data.token)
            if (bot) {
                ws.authenticated = true
                ws.bot = bot
                // 返回用户信息
                ws.send(JSON.stringify({ type: "auth/response", data: bot }))
                // 发送 tasks 数据
                ws.send(JSON.stringify({ type: "task", data: bot.tasks }))
            } else {
                logger.warn(`Invalid token ${json.data.token} for bot ${ws.sessionId.substring(0, 8)}`)
                ws.send(JSON.stringify({ type: "auth/response", data: undefined }))
            }
        },
    }

}