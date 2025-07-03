import fs from "fs";
import { loggerGlobal as logger } from "../logger.js";
import { wsWebBroadcast } from "../websocket.js";
import Global from "./index.js";
import { aeModelGuard, newServerToWebMessage } from "@oni/interface";
let ae = {
    // AE 列表
    list: [],
    get(uuid) {
        return this.list.find(ae => ae.uuid === uuid);
    },
    add(ae) {
        this.list.push(ae);
        wsWebBroadcast(newServerToWebMessage("DataAeAdd", ae));
    },
    remove(uuid) {
        let index = this.list.findIndex(ae => ae.uuid === uuid);
        if (index >= 0) {
            let ae = this.list[index];
            this.list.splice(index, 1);
            wsWebBroadcast(newServerToWebMessage("DataAeRemove", uuid));
        }
        else {
            logger.warn("ae.remove", "Ae not found.");
        }
    },
    cpus: {
        set(uuid, cpus) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                cpus.forEach((cpu) => {
                    if (cpu.busy && cpu.finalOutput) {
                        const finalOutput = cpu.finalOutput;
                        const itemPanelItem = Global.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == finalOutput.name) && (itemPanelItem.damage == finalOutput.damage));
                        const itemPanelFluid = Global.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == finalOutput.name);
                        if (itemPanelItem) {
                            cpu.finalOutput.id = itemPanelItem.id;
                            cpu.finalOutput.display = itemPanelItem.display;
                        }
                        else if (itemPanelFluid) {
                            cpu.finalOutput.id = itemPanelFluid.id;
                            cpu.finalOutput.display = itemPanelFluid.display;
                        }
                        else {
                            logger.warn(`Item/Fluid ${cpu.finalOutput.name} not found in staticResources.itemPanel`);
                        }
                    }
                });
                targetAe.cpus = cpus;
                ae.cpus.update(targetAe);
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            wsWebBroadcast(newServerToWebMessage("DataAeCpusSet", ae));
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
                logger.warn("ae.items.set", "Ae not found.");
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            wsWebBroadcast(newServerToWebMessage("DataAeItemsSet", ae));
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
                logger.warn("ae.levelMaintains.set", "Ae not found.");
            }
        },
        update(ae) {
            ae.timeUpdated = new Date().getTime();
            wsWebBroadcast(newServerToWebMessage("DataAeLevelMaintainsSet", ae));
        }
    },
    save() {
        const MODULE_NAME = "ae.save";
        const FILE_PATH = "./data/ae/ae.json";
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8');
            logger.debug(MODULE_NAME, "Json saved successfully.");
        }
        catch (e) {
            logger.error(MODULE_NAME, "Json save failed.");
            logger.error(MODULE_NAME, e);
        }
    },
    init(config) {
        const MODULE_NAME = "ae.init";
        const FILE_PATH = "./data/ae/ae.json";
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
            if (aeModelGuard.isAeArray(json)) {
                this.list = json;
                logger.debug(MODULE_NAME, "Json initialized successfully.");
                logger.trace(MODULE_NAME, this.list);
            }
            else {
                logger.error(MODULE_NAME, "Json initialization failed. Invalid data format.");
            }
        }
        catch (e) {
            logger.error(MODULE_NAME, "Json initialization failed.");
            logger.error(MODULE_NAME, e);
        }
    }
};
export default ae;
