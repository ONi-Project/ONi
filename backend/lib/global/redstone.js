"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const interface_1 = require("@oni/interface");
const websocket_1 = require("src/websocket");
let redstone = {
    // 红石控制组件
    list: [],
    get(uuid) {
        return this.list.find(redstone => redstone.uuid == uuid);
    },
    set(redstone) {
        return this.list.some((item, index) => {
            if (item.uuid == redstone.uuid) {
                this.list[index] = redstone;
                (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataRedstoneSet", redstone));
                return true;
            }
            return false;
        });
    },
    add(redstone) {
        this.list.push(redstone);
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataRedstoneAdd", redstone));
    },
    remove(uuid) {
        let index = this.list.findIndex(redstone => redstone.uuid == uuid);
        if (index >= 0) {
            let redstone = this.list[index];
            this.list.splice(index, 1);
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataRedstoneRemove", uuid));
        }
        else {
            logger_1.loggerGlobal.error("redstone.remove", "Redstone not found.");
        }
    },
    save() {
        const MODULE_NAME = "redstone.save";
        const FILE_PATH = "./data/redstone/redstone.json";
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
        const MODULE_NAME = "redstone.init";
        const FILE_PATH = "./data/redstone/redstone.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.redstoneModelGuard.isRedstoneArray(json)) {
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
exports.default = redstone;
