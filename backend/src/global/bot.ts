import { Bot, Config, SessionOc, SessionWeb } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { wssOc, wssWeb, wsWebBroadcast } from "../websocket.js"

var bot = {
    // BOT 列表
    list: [] as Bot[],

    getListLayout() {
        let content: any = []

        this.list.forEach(bot => {
            content.push({
                type: "card",
                id: "bot-overview",
                config: {
                    uuid: bot.uuid,
                    name: bot.name,
                }
            })
        })

        let _ = [{
            type: "grid-m",
            content: content
        }]

        _.push({
            type: "raw",
            content: [{
                type: "card",
                id: "create-bot",
                config: {}
            }]
        })

        return _
    },

    getEditLayout() {
        let content: any = []

        this.list.forEach(bot => {
            content.push({
                type: "tab",
                id: "bot-edit",
                config: {
                    uuid: bot.uuid,
                    name: bot.name,
                }
            })
        })

        let _ = [{
            type: "raw",
            content: content
        }]

        return _
    },

    components: {
        set(uuid: string, components: any) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                targetBot.components = components
                bot.components.update(uuid)
            } else {
                logger.error("bot.components.set", "Bot not found.")
            }
        },
        update(uuid: string) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                wsWebBroadcast("update/bot", [targetBot])
            }
        }
    },

    tasks: {
        runSingle(uuid: string, task: any) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                let ok = false
                wssOc.clients.forEach(ws => {
                    if ((ws as SessionOc).authenticated && (ws as SessionOc).bot.uuid == uuid) {
                        ws.send(JSON.stringify({
                            type: "task",
                            data: [task]
                        }))
                        ok = true
                    }
                })
                if (!ok) {
                    logger.warn("bot.tasks.runSingleTask", `Trying to send task to oc but bot ${uuid} not found or offline`)
                }
            } else {
                logger.error("bot.tasks.runSingleTask", "Bot not found.")
            }
        },
        add(uuid: string, task: any) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                targetBot.tasks.push(task)
                bot.tasks.update(uuid)
            } else {
                logger.error("bot.tasks.add", "Bot not found.")
            }
        },
        remove(uuid: string, taskUuid: string) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                let targetTask = targetBot.tasks.find(item => item.taskUuid == taskUuid)
                if (targetTask) {
                    targetBot.tasks.splice(targetBot.tasks.indexOf(targetTask), 1)
                    bot.tasks.update(uuid)
                } else {
                    logger.error("bot.tasks.remove", "Task not found.")
                }
            } else {
                logger.error("bot.tasks.remove", "Bot not found.")
            }
        },
        update(uuid: string) {
            let ok = false
            wssOc.clients.forEach(ws => {
                if ((ws as SessionOc).authenticated && (ws as SessionOc).bot.uuid == uuid) {
                    let targetBot = bot.list.find(item => item.uuid == uuid)
                    if (targetBot) {
                        ws.send(JSON.stringify({
                            type: "task",
                            data: targetBot.tasks
                        }))
                        ok = true
                    }
                }
            })
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                wsWebBroadcast("update/bot", [targetBot])
            }
            if (!ok) {
                logger.warn("bot.tasks.updateTasks", `Trying to send task to oc but bot ${uuid} not found or offline`)
            }
        }
    },

    init(config: Config) {
        try {
            this.list = JSON.parse(fs.readFileSync('./data/bot/bot.json', 'utf8'))
            logger.debug("bot", "Json initialized successfully.")
            logger.trace("bot", this.list)
        } catch (e) {
            logger.error("bot", "Json initialization failed.")
            logger.error("bot", e)
        }
    }
}

export default bot