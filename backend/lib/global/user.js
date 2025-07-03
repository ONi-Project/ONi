"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const interface_1 = require("@oni/interface");
let user = {
    // 用户列表
    list: [],
    get(uuid) {
        return this.list.find(user => user.uuid === uuid);
    },
    set(user) {
        return this.list.some((item, index) => {
            if (item.uuid == user.uuid) {
                this.list[index] = user;
                return true;
            }
            return false;
        });
    },
    add(user) {
        this.list.push(user);
    },
    remove(uuid) {
        let index = this.list.findIndex(user => user.uuid === uuid);
        if (index >= 0) {
            let user = this.list[index];
            this.list.splice(index, 1);
        }
        else {
            logger_1.loggerGlobal.error("user.remove", "User not found.");
        }
    },
    save() {
        const MODULE_NAME = "user.save";
        const FILE_PATH = "./data/user/user.json";
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
        const MODULE_NAME = "user.init";
        const FILE_PATH = "./data/user/user.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.userModelGuard.isUserArray(json)) {
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
exports.default = user;
