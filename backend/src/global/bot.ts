import { Config, SessionOc, SessionWeb } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { wsOcSendByBotUuid, wssOc, wssWeb, wsWebBroadcast } from "../websocket.js"
import { botModel, botModelGuard, layoutModel, newServerToOcMessage, newServerToWebMessage, newWebToServerMessage } from "@oni/interface"
import { send } from "src/utils.js"


let bot = {
    // BOT 列表
    list: [] as botModel.Bot[],

    get(uuid: string) {
        return this.list.find(item => item.uuid == uuid)
    },

    add(bot: botModel.Bot) {
        this.list.push(bot)
        wsWebBroadcast(newServerToWebMessage("DataBotAdd", bot))
    },

    remove(uuid: string) {
        let index = this.list.findIndex(item => item.uuid == uuid)
        if (index >= 0) {
            let data = this.list[index]
            this.list.splice(index, 1)
            wsWebBroadcast(newServerToWebMessage("DataBotRemove", uuid))
        } else {
            logger.error("bot.remove", "Bot not found.")
        }
    },

    components: {
        set(uuid: string, components: botModel.BotComponent[]) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                targetBot.components = components
                bot.components.update(targetBot)
            } else {
                logger.error("bot.components.set", "Bot not found.")
            }
        },
        update(bot: botModel.Bot) {
            wsWebBroadcast(newServerToWebMessage("DataBotComponentsSet", bot))
        }
    },

    tasks: {
        runSingle(uuid: string, task: botModel.BotTask) {
            if (!wsOcSendByBotUuid(uuid, newServerToOcMessage("Task", [task]))) {
                logger.error("bot.tasks.runSingleTask", `Trying to send task to oc but bot ${uuid} not found or offline.`)
            }
        },
        add(uuid: string, task: botModel.BotTask) {
            let targetBot = bot.list.find(item => item.uuid == uuid)
            if (targetBot) {
                targetBot.tasks.push(task)
                bot.tasks.update(targetBot)
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
                    bot.tasks.update(targetBot)
                } else {
                    logger.error("bot.tasks.remove", "Task not found.")
                }
            } else {
                logger.error("bot.tasks.remove", "Bot not found.")
            }
        },
        update(bot: botModel.Bot) {

            if (!wsOcSendByBotUuid(bot.uuid, newServerToOcMessage("Task", bot.tasks))) {
                logger.error("bot.tasks.update", `Trying to send task to oc but bot ${bot.uuid} not found or offline`)
            }
            wsWebBroadcast(newServerToWebMessage("DataBotTasksSet", bot))

        }
    },

    save() {
        const MODULE_NAME = "bot.save"
        const FILE_PATH = "./data/bot/bot.json"
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8')
            logger.debug(MODULE_NAME, "Json saved successfully.")
        } catch (e) {
            logger.error(MODULE_NAME, "Json save failed.")
            logger.error(MODULE_NAME, e)
        }
    },

    init(config: Config) {
        const MODULE_NAME = "bot.init"
        const FILE_PATH = "./data/bot/bot.json"
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
            if (botModelGuard.isBotArray(json)) {
                this.list = json
                logger.debug(MODULE_NAME, "Json initialized successfully.")
                logger.trace(MODULE_NAME, this.list)
            } else {
                logger.error(MODULE_NAME, "Json initialization failed. Invalid data format.")
            }
        } catch (e) {
            logger.error(MODULE_NAME, "Json initialization failed.")
            logger.error(MODULE_NAME, e)
        }
    }
}

export default bot