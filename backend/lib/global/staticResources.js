"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const logger_js_1 = require("../logger.js");
const interface_1 = require("@oni/interface");
let staticResources = {
    itemPanelItem: [],
    itemPanelFluid: [],
    itemPanelItemMap: new Map(),
    itemPanelFluidMap: new Map(),
    botTask: [],
    init(config) {
        try {
            const itemPanelItemRaw = fs_1.default.readFileSync('./data/itempanel/item.csv', 'utf8');
            let itemPanel = itemPanelItemRaw.split('\r\n').map(line => line.split(','));
            itemPanel.shift(); // remove header row
            itemPanel = itemPanel.filter(row => row.length === 5); // remove empty rows
            itemPanel.forEach(row => {
                this.itemPanelItem.push({
                    name: row[0],
                    id: parseInt(row[1]),
                    damage: parseInt(row[2]),
                    hasNBT: row[3] === 'true',
                    display: row[4]
                });
                if (row[0] == undefined || row[1] == undefined || row[2] == undefined || row[3] == undefined || row[4] == undefined) {
                    logger_js_1.loggerGlobal.warn(row);
                }
            });
            if (!interface_1.staticModelGuard.isItemPanelItemArray(this.itemPanelItem)) {
                logger_js_1.loggerGlobal.error("staticResourcesItemPanelItem", "Item panel item data is not valid.");
            }
            logger_js_1.loggerGlobal.debug("staticResourcesItemPanelItem", "Initialized successfully.");
            // logger.trace("staticResourcesItemPanelItem", this.itemPanelItem)
        }
        catch (e) {
            logger_js_1.loggerGlobal.error("staticResourcesItemPanelItem", "Initialization failed.");
            logger_js_1.loggerGlobal.error("staticResourcesItemPanelItem", e);
        }
        try {
            const itemPanelFluidRaw = fs_1.default.readFileSync('./data/itempanel/liquid.json', 'utf8');
            this.itemPanelFluid = JSON.parse(itemPanelFluidRaw);
            if (!interface_1.staticModelGuard.isItemPanelLiquidArray(this.itemPanelFluid)) {
                logger_js_1.loggerGlobal.error("staticResourcesItemPanelFluid", "Item panel liquid data is not valid.");
            }
            logger_js_1.loggerGlobal.debug("staticResourcesItemPanelFluid", "Initialized successfully.");
            // logger.trace("staticResourcesItemPanelFluid", this.itemPanelFluid)
        }
        catch (e) {
            logger_js_1.loggerGlobal.error("staticResourcesItemPanelFluid", "Initialization failed.");
            logger_js_1.loggerGlobal.error("staticResourcesItemPanelFluid", e);
        }
        this.itemPanelItem.forEach(item => {
            this.itemPanelItemMap.set(item.name + "/" + item.damage, item);
        });
        this.itemPanelFluid.forEach(fluid => {
            this.itemPanelFluidMap.set(fluid.name, fluid);
        });
        try {
            const botTaskRaw = fs_1.default.readFileSync('./data/bot/task.json', 'utf8');
            this.botTask = JSON.parse(botTaskRaw);
            if (!interface_1.staticModelGuard.isBotTaskArray(this.botTask)) {
                logger_js_1.loggerGlobal.error("staticResourcesBotTask", "Bot task data is not valid.");
            }
            logger_js_1.loggerGlobal.debug("staticResourcesBotTask", "Initialized successfully.");
            // logger.trace("staticResourcesBotTask", this.botTask)
        }
        catch (e) {
            logger_js_1.loggerGlobal.error("staticResourcesBotTask", "Initialization failed.");
            logger_js_1.loggerGlobal.error("staticResourcesBotTask", e);
        }
    }
};
exports.default = staticResources;
