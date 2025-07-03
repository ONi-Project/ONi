"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const websocket_1 = require("../websocket");
const interface_1 = require("@oni/interface");
const logger_1 = require("../logger");
let event = {
    // 事件
    list: [],
    get(uuid) {
        return this.list.find(event => event.uuid == uuid);
    },
    set(event) {
        return this.list.some((item, index) => {
            if (item.uuid == event.uuid) {
                this.list[index] = event;
                (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataEventSet", event));
                return true;
            }
            return false;
        });
    },
    add(event) {
        this.list.push(event);
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataEventAdd", event));
    },
    remove(uuid) {
        let index = this.list.findIndex(event => event.uuid == uuid);
        if (index >= 0) {
            let event = this.list[index];
            this.list.splice(index, 1);
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataEventRemove", uuid));
        }
        else {
            logger_1.loggerGlobal.error("event.remove", "Event not found.");
        }
    },
    save() {
        const MODULE_NAME = "event.save";
        const FILE_PATH = "./data/event/event.json";
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
        const MODULE_NAME = "event.init";
        const FILE_PATH = "./data/event/event.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.eventModelGuard.isEventArray(json)) {
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
exports.default = event;
