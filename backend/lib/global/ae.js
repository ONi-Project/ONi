import fs from "fs";
import { loggerGlobal as logger } from "../logger.js";
import { wsWebBroadcast } from "../websocket.js";
import Global from "./index.js";
var ae = {
    // AE 列表
    list: [],
    getListLayout() {
        let content = [];
        this.list.forEach(ae => {
            content.push({
                type: "card",
                id: "ae-overview",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            });
        });
        let _ = [{
                type: "grid-m",
                content: content
            }];
        return _;
    },
    getEditLayout() {
        let content = [];
        this.list.forEach(ae => {
            content.push({
                type: "tab",
                id: "ae-edit",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            });
        });
        let _ = [{
                type: "raw",
                content: content
            }];
        return _;
    },
    getViewLayout() {
        let content = [];
        this.list.forEach(ae => {
            content.push({
                type: "tab",
                id: "ae-view",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            });
        });
        let _ = [{
                type: "raw",
                content: content
            }];
        return _;
    },
    cpus: {
        set(uuid, cpus) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                cpus.forEach((cpu) => {
                    if (cpu.busy && cpu.finalOutput) {
                        const itemPanelItem = Global.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == cpu.finalOutput.name) && (itemPanelItem.damage == cpu.finalOutput.damage));
                        const itemPanelFluid = Global.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == cpu.finalOutput.name);
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
                ae.cpus.update(uuid);
            }
        },
        update(uuid) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                targetAe.timeUpdated = new Date().getTime();
                wsWebBroadcast("data/ae/set", targetAe);
            }
        }
    },
    itemList: {
        set(uuid, itemList) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                itemList.forEach((item) => {
                    if (item.type == "item") {
                        const itemPanelItem = Global.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == item.name) && (itemPanelItem.damage == item.damage));
                        if (itemPanelItem) {
                            item.id = itemPanelItem.id;
                            item.display = itemPanelItem.display;
                        }
                        else {
                            logger.warn(`Item ${item.name} not found in staticResources.itemPanel`);
                        }
                    }
                    else if (item.type == "fluid") {
                        const itemPanelFluid = Global.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == item.name);
                        if (itemPanelFluid) {
                            item.id = itemPanelFluid.id;
                            item.display = itemPanelFluid.display;
                        }
                        else {
                            logger.warn(`Fluid ${item.name} not found in staticResources.itemPanel`);
                        }
                    }
                    else if (item.type == "vis") {
                        // TODO: 处理 vis 类型
                    }
                    else {
                        logger.error(`Unknown item type ${item.type}`);
                    }
                });
                targetAe.itemList = itemList;
                ae.itemList.update(uuid);
            }
        },
        update(uuid) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid);
            if (targetAe) {
                targetAe.timeUpdated = new Date().getTime();
                wsWebBroadcast("data/ae/set", targetAe);
            }
        }
    },
    init(config) {
        try {
            this.list = JSON.parse(fs.readFileSync('./data/ae/ae.json', 'utf8'));
            logger.debug("ae", "Json initialized successfully.");
            logger.trace("ae", this.list);
        }
        catch (e) {
            logger.error("ae", "Json initialization failed.");
            logger.error("ae", e);
        }
    }
};
export default ae;
