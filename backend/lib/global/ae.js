"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../logger");
const websocket_1 = require("../websocket");
const index_1 = __importDefault(require("./index"));
const interface_1 = require("@oni/interface");
let ae = {
    // AE 列表
    list: [],
    get(uuid) {
        return this.list.find(ae => ae.uuid === uuid);
    },
    add(ae) {
        this.list.push(ae);
        (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataAeAdd", ae));
    },
    remove(uuid) {
        let index = this.list.findIndex(ae => ae.uuid === uuid);
        if (index >= 0) {
            let ae = this.list[index];
            this.list.splice(index, 1);
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataAeRemove", uuid));
        }
        else {
            logger_1.loggerGlobal.warn("ae.remove", "Ae not found.");
        }
    },
    cpus: {
        set(uuid, cpus) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                cpus.forEach((cpu) => {
                    if (cpu.busy && cpu.finalOutput) {
                        const finalOutput = cpu.finalOutput;
                        const itemPanelItem = index_1.default.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == finalOutput.name) && (itemPanelItem.damage == finalOutput.damage));
                        const itemPanelFluid = index_1.default.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == finalOutput.name);
                        if (itemPanelItem) {
                            cpu.finalOutput.id = itemPanelItem.id;
                            cpu.finalOutput.display = itemPanelItem.display;
                        }
                        else if (itemPanelFluid) {
                            cpu.finalOutput.id = itemPanelFluid.id;
                            cpu.finalOutput.display = itemPanelFluid.display;
                        }
                        else {
                            logger_1.loggerGlobal.warn(`Item/Fluid ${cpu.finalOutput.name} not found in staticResources.itemPanel`);
                        }
                    }
                });
                targetAe.cpus = cpus;
                ae.cpus.update(targetAe);
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataAeCpusSet", ae));
        }
    },
    items: {
        set(uuid, itemList) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                targetAe.items = itemList;
                ae.items.update(targetAe);
            }
            else {
                logger_1.loggerGlobal.warn("ae.items.set", "Ae not found.");
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataAeItemsSet", ae));
        }
    },
    levelMaintains: {
        set(uuid, levelMaintains) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                targetAe.levelMaintains = levelMaintains;
                ae.levelMaintains.update(targetAe);
            }
            else {
                logger_1.loggerGlobal.warn("ae.levelMaintains.set", "Ae not found.");
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            (0, websocket_1.wsWebBroadcast)((0, interface_1.newServerToWebMessage)("DataAeLevelMaintainsSet", ae));
        }
    },
    save() {
        const MODULE_NAME = "ae.save";
        const FILE_PATH = "./data/ae/ae.json";
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
        const MODULE_NAME = "ae.init";
        const FILE_PATH = "./data/ae/ae.json";
        try {
            let json = JSON.parse(fs_1.default.readFileSync(FILE_PATH, 'utf8'));
            if (interface_1.aeModelGuard.isAeArray(json)) {
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
exports.default = ae;
