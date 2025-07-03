"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const websocket_1 = require("../websocket");
const interface_1 = require("@oni/interface");
let bot = {
    // BOT 列表
    list: [],
    get(uuid) {
        return this.list.find(item => item.uuid == uuid);
    },
    add(bot) {
        this.list.push(bot);
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataBotAdd", bot));
    },
    remove(uuid) {
        let index = this.list.findIndex(item => item.uuid == uuid);
        if (index >= 0) {
            let data = this.list[index];
            this.list.splice(index, 1);
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataBotRemove", uuid));
        }
        else {
            logger_1.loggerGlobal.error("bot.remove", "Bot not found.");
        }
    },
    components: {
        set(uuid, components) {
            let targetBot = bot.list.find(item => item.uuid == uuid);
            if (targetBot) {
                targetBot.components = components;
                bot.components.update(targetBot);
            }
            else {
                logger_1.loggerGlobal.error("bot.components.set", "Bot not found.");
            }
        },
        update(bot) {
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataBotComponentsSet", bot));
        }
    },
    tasks: {
        runSingle(uuid, task) {
            if (!(0, websocket_1.wsOcSendByBotUuid)(uuid, (0, interface_1.newServerToOcMessage)("Task", [task]))) {
                logger_1.loggerGlobal.error("bot.tasks.runSingleTask", `Trying to send task to oc but bot ${uuid} not found or offline.`);
            }
        },
        add(uuid, task) {
            let targetBot = bot.list.find(item => item.uuid == uuid);
            if (targetBot) {
                targetBot.tasks.push(task);
                bot.tasks.update(targetBot);
            }
            else {
                logger_1.loggerGlobal.error("bot.tasks.add", "Bot not found.");
            }
        },
        remove(uuid, taskUuid) {
            let targetBot = bot.list.find(item => item.uuid == uuid);
            if (targetBot) {
                let targetTask = targetBot.tasks.find(item => item.taskUuid == taskUuid);
                if (targetTask) {
                    targetBot.tasks.splice(targetBot.tasks.indexOf(targetTask), 1);
                    bot.tasks.update(targetBot);
                }
                else {
                    logger_1.loggerGlobal.error("bot.tasks.remove", "Task not found.");
                }
            }
            else {
                logger_1.loggerGlobal.error("bot.tasks.remove", "Bot not found.");
            }
        },
        update(bot) {
            if (!(0, websocket_1.wsOcSendByBotUuid)(bot.uuid, (0, interface_1.newServerToOcMessage)("Task", bot.tasks))) {
                logger_1.loggerGlobal.error("bot.tasks.update", `Trying to send task to oc but bot ${bot.uuid} not found or offline`);
            }
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataBotTasksSet", bot));
        }
    },
    save() {
        const MODULE_NAME = "bot.save";
        const FILE_PATH = "./data/bot/bot.json";
        try {
            fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8');
            logger_1.loggerGlobal.debug(MODULE_NAME, "Json saved successfully.");
        }
        catch (e) {
            logger_1.loggerGlobal.error(MODULE_NAME, "Json save failed.");
            logger_1.loggerGlobal.error(MODULE_NAME, e);
        }
    },
    init(config) {
        const MODULE_NAME = "bot.init";
        const FILE_PATH = "./data/bot/bot.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.botModelGuard.isBotArray(json)) {
                this.list = json;
                logger_1.loggerGlobal.debug(MODULE_NAME, "Json initialized successfully.");
                logger_1.loggerGlobal.trace(MODULE_NAME, this.list);
            }
            else {
                logger_1.loggerGlobal.error(MODULE_NAME, "Json initialization failed. Invalid data format.");
            }
        }
        catch (e) {
            logger_1.loggerGlobal.error(MODULE_NAME, "Json initialization failed.");
            logger_1.loggerGlobal.error(MODULE_NAME, e);
        }
    }
};
exports.default = bot;
