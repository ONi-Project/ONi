


import fs from "fs"
import Global from "./global/index.js"
import { Common, SessionOc, SessionWeb } from "./interface.js"
import { loggerHandler as logger } from "./logger.js"
import { wssOc } from "./websocket.js"

var handler = {
    webMessage(msg: string, ws: SessionWeb) {

        // 解析 JSON
        let json: any
        try {
            json = JSON.parse(msg)
        } catch (e) {
            logger.error("WEB RECEIVED INVALID", msg)
            logger.error(e)
            return
        }

        logger.trace("WEB RECEIVED", json)


        if (json.type == "auth/request") {
            // 登录请求
            processor.webAuth(json, ws)
        } else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }))
        } else {
            // 如果已登录，处理数据
            if (json.type == "data/event/set") {
                // 事件数据
                processor.data.eventSet(json, ws)
            } else if (json.type == "oc/task/runSingle") {
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

        logger.trace("OC RECEIVED", json)

        if (json.type == "auth/request") {
            // 登录请求
            processor.ocAuth(json, ws)
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
                processor.component(json, ws)
            } else if (json.type == "data/ae/itemList") {
                processor.data.ae.itemList(json, ws)
            } else if (json.type == "data/ae/cpus") {
                processor.data.ae.cpus(json, ws)
            } else {
                logger.warn(`Unknown message type ${json.type}`)
            }
        }
    }
}

export default handler

var processor = {
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
                            if (cpuPrev.busy && cpu.busy && cpuPrev.timeStarted && cpuPrev.finalOutput?.total) {
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
    component(json: any, ws: SessionOc) {
        Global.bot.components.set(ws.bot.uuid, json.data.components)
    },
    webAuth(json: any, ws: SessionWeb) {
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
    ocAuth(json: any, ws: SessionOc) {
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