import fs from 'fs';
import { loggerGlobal as logger } from '../logger.js';
var staticResources = {
    itemPanelItem: [],
    itemPanelFluid: [],
    itemPanelItemMap: new Map(),
    itemPanelFluidMap: new Map(),
    botTask: [],
    init(config) {
        try {
            const itemPanelItemRaw = fs.readFileSync('./data/itempanel/item.csv', 'utf8');
            let itemPanel = itemPanelItemRaw.split('\r\n').map(line => line.split(','));
            itemPanel.shift(); // remove header row
            itemPanel.forEach(row => {
                this.itemPanelItem.push({
                    name: row[0],
                    id: parseInt(row[1]),
                    damage: parseInt(row[2]),
                    hasNBT: row[3] === 'true',
                    display: row[4]
                });
            });
            logger.debug("staticResourcesItemPanelItem", "initialized successfully.");
            logger.trace("staticResourcesItemPanelItem", this.itemPanelItem);
        }
        catch (e) {
            logger.error("staticResourcesItemPanelItem", "initialization failed.");
            logger.error("staticResourcesItemPanelItem", e);
        }
        try {
            const itemPanelFluidRaw = fs.readFileSync('./data/itempanel/liquid.json', 'utf8');
            this.itemPanelFluid = JSON.parse(itemPanelFluidRaw);
            logger.debug("staticResourcesItemPanelFluid", "initialized successfully.");
            logger.trace("staticResourcesItemPanelFluid", this.itemPanelFluid);
        }
        catch (e) {
            logger.error("staticResourcesItemPanelFluid", "initialization failed.");
            logger.error("staticResourcesItemPanelFluid", e);
        }
        this.itemPanelItem.forEach(item => {
            this.itemPanelItemMap.set(item.name + "/" + item.damage, item);
        });
        this.itemPanelFluid.forEach(fluid => {
            this.itemPanelFluidMap.set(fluid.name, fluid);
        });
        try {
            const botTaskRaw = fs.readFileSync('./data/bot/task.json', 'utf8');
            this.botTask = JSON.parse(botTaskRaw);
            logger.debug("staticResourcesBotTask", "initialized successfully.");
            logger.trace("staticResourcesBotTask", this.botTask);
        }
        catch (e) {
            logger.error("staticResourcesBotTask", "initialization failed.");
            logger.error("staticResourcesBotTask", e);
        }
    }
};
export default staticResources;
