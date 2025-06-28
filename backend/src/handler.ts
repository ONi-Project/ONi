


import fs from "fs"
import Global from "./global/index.js"
import { SessionOc, SessionWeb } from "./interface.js"
import { loggerHandler as logger, loggerOcOverWs } from "./logger.js"
import { wssOc, wsWebBroadcast } from "./websocket.js"
import { wsBase, wsBaseGuard, wsOcToServer, wsOcToServerGuard, wsWebToServer, wsWebToServerGuard, messageTypeMap, wsGeneral, wsGeneralGuard, aeModel } from "@oni/interface"
import { botModel, commonModel } from "@oni/interface"
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
                return

            } else if (wsWebToServerGuard.isOcTaskAdd(json)) {
                // 添加任务
                processor.web2oc.taskAdd(json, ws)
                return

            } else if (wsWebToServerGuard.isOcTaskRemove(json)) {
                // 移除任务
                processor.web2oc.taskRemove(json, ws)
                return

            } else if (wsWebToServerGuard.isOcForward(json)) {
                // debug 转发
                processor.web2oc.forward(json, ws)
                return

            } else if (wsWebToServerGuard.isAeOrder(json)) {
                // AE 订单
                processor.ae.order(json, ws)
                return

            } else {
                logger.error("WEB RECEIVED INVALID TYPE", json)
                return
            }
        }

    },
    ocMessage(msg: string, ws: SessionOc) {

        // 解析 JSON
        let json
        try {
            json = JSON.parse(msg)
        } catch (e) {
            logger.error("OC RECEIVED INVALID JSON", msg)
            logger.error(e)
            return
        }

        if (!wsBaseGuard.isMessage(json)) {
            logger.error("OC RECEIVED INVALID MESSAGE", json)
            return
        }

        if (json.type != "log") {
            logger.trace("OC RECEIVED", json)
        }

        if (wsOcToServerGuard.isAuthRequest(json)) {
            // 登录请求
            processor.auth.oc(json, ws)
        } else if (!ws.authenticated) {
            // 如果未登录
            ws.send(JSON.stringify({ "type": "error", "data": "Not authenticated" }))
        } else {
            // 如果已登录，处理数据
            if (wsOcToServerGuard.isDataCommonSet(json)) {
                processor.data.commonSet(json, ws)
                return

            } else if (wsOcToServerGuard.isDataEventSet(json)) {
                processor.data.eventSet(json, ws)
                return

            } else if (wsOcToServerGuard.isDataEventAdd(json)) {
                processor.data.eventAdd(json, ws)
                return

            } else if (wsOcToServerGuard.isDataBotComponent(json)) {
                processor.data.bot.component(json, ws)
                return

            } else if (wsOcToServerGuard.isDataAeItemList(json)) {
                processor.data.ae.itemList(json, ws)
                return

            } else if (wsOcToServerGuard.isDataAeCpuList(json)) {
                processor.data.ae.cpus(json, ws)
                return

            } else if (wsOcToServerGuard.isAeOrderResult(json)) {
                processor.ae.orderResult(json, ws)
                return

            } else if (wsOcToServerGuard.isLog(json)) {
                processor.oc.log(json, ws)
                return

            } else {
                logger.warn("OC RECEIVED INVALID TYPE", json)
            }
        }
    }
}

export default handler

const processor = {
    data: {
        commonSet(json: wsOcToServer.DataCommonSet, ws: SessionOc) {
            let target = Global.data.list.find(data => data.uuid === json.data.uuid)
            if (target) {
                const data: commonModel.Common = Object.assign({}, target, json.data)
                Global.data.set(data)
            } else {
                ws.send(JSON.stringify({ "type": "error", "data": "Data not found" }))
            }
        },
        eventSet(json: wsWebToServer.DataEventSet | wsOcToServer.DataEventSet, ws: SessionWeb | SessionOc) {
            let target = Global.event.list.find(event => event.uuid === json.data.uuid)
            if (target) {
                const event = Object.assign({}, target, json.data)
                Global.event.set(event)
            } else {
                ws.send(JSON.stringify({ "type": "error", "data": "Event not found" }))
            }
        },
        eventAdd(json: wsOcToServer.DataEventAdd, ws: SessionOc) {
            Global.event.add(json.data)
        },
        ae: {
            itemList(json: wsOcToServer.DataAeItemList, ws: SessionOc) {
                Global.ae.items.set(json.data.uuid, json.data.items)
            },
            cpus(json: wsOcToServer.DataAeCpuList, ws: SessionOc) {
                json.data.cpus.forEach((cpu: aeModel.AeCpu) => {
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
            component(json: wsOcToServer.DataBotComponent, ws: SessionOc) {
                Global.bot.components.set(json.data.uuid, json.data.components)
            },
        }
    },
    ae: {
        order(json: wsWebToServer.AeOrder, ws: SessionWeb) {
            const ae = Global.ae.list.find(ae => ae.uuid === json.data.uuid)
            if (!ae) { logger.error(`processor.ae.order: AE ${json.data.uuid} not found`); return }
            let targetBot: botModel.Bot[] = []
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
        orderResult(json: wsOcToServer.AeOrderResult, ws: SessionOc) {
            wsWebBroadcast("ae/order/result", json.data)
        }
    },
    web2oc: {
        taskRunSingle(json: wsWebToServer.OcTaskRunSingle, ws: SessionWeb) {
            Global.bot.tasks.runSingle(json.target, json.data)
        },
        taskAdd(json: wsWebToServer.OcTaskAdd, ws: SessionWeb) {
            Global.bot.tasks.add(json.target, json.data)
        },
        taskRemove(json: wsWebToServer.OcTaskRemove, ws: SessionWeb) {
            Global.bot.tasks.remove(json.target, json.data.taskUuid)
        },
        forward(json: wsWebToServer.OcForward, ws: SessionWeb) {
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
        log(json: wsOcToServer.Log, ws: SessionOc) {
            fs.writeFileSync(`./logs/oc.log`, `[${new Date().toLocaleString()}] [${json.data.level}/${json.data.file}:${json.data.location}] (${json.data.taskUuid}) ${json.data.message}\n`, { flag: "a+" })
            const { level, file, location, taskUuid, message } = json.data
            loggerOcOverWs.log(level, `[${level}/${file}:${location}] (${taskUuid}) ${message}`)
        }
    },
    auth: {
        web(json: wsWebToServer.AuthRequest, ws: SessionWeb) {
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
        oc(json: wsOcToServer.AuthRequest, ws: SessionOc) {
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