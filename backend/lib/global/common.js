"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const websocket_1 = require("../websocket");
const interface_1 = require("@oni/interface");
let common = {
    // 通用数据
    list: [],
    get(uuid) {
        return this.list.find(item => item.uuid == uuid);
    },
    set(common) {
        return this.list.some((item, index) => {
            if (item.uuid == common.uuid) {
                this.list[index] = common;
                (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataCommonSet", common));
                return true;
            }
            return false;
        });
    },
    add(common) {
        this.list.push(common);
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataCommonAdd", common));
    },
    remove(uuid) {
        let index = this.list.findIndex(item => item.uuid == uuid);
        if (index >= 0) {
            let data = this.list[index];
            this.list.splice(index, 1);
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataCommonRemove", uuid));
        }
        else {
            logger_1.loggerGlobal.error("common.remove", "Bot not found.");
        }
    },
    save() {
        const MODULE_NAME = "common.save";
        const FILE_PATH = "./data/common/common.json";
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
        const MODULE_NAME = "common.init";
        const FILE_PATH = "./data/common/common.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.commonModelGuard.isCommonArray(json)) {
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
exports.default = common;
