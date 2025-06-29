import fs from 'fs'
import { Config } from '../interface.js'
import { loggerGlobal as logger } from '../logger.js'
import { staticModel, staticModelGuard } from '@oni/interface'

let staticResources = {

    itemPanelItem: [] as staticModel.ItemPanelItem[],
    itemPanelFluid: [] as staticModel.ItemPanelLiquid[],
    itemPanelItemMap: new Map() as Map<string, staticModel.ItemPanelItem>,
    itemPanelFluidMap: new Map() as Map<string, staticModel.ItemPanelLiquid>,
    botTask: [] as staticModel.BotTask[],

    init(config: Config) {

        try {
            const itemPanelItemRaw = fs.readFileSync('./data/itempanel/item.csv', 'utf8')
            let itemPanel = itemPanelItemRaw.split('\r\n').map(line => line.split(','))
            itemPanel.shift() // remove header row
            itemPanel = itemPanel.filter(row => row.length === 5) // remove empty rows
            itemPanel.forEach(row => {
                this.itemPanelItem.push({
                    name: row[0],
                    id: parseInt(row[1]),
                    damage: parseInt(row[2]),
                    hasNBT: row[3] === 'true',
                    display: row[4]
                })
                if(row[0]==undefined||row[1]==undefined||row[2]==undefined||row[3]==undefined||row[4]==undefined){
                    logger.warn(row)
                }
            })
            if (!staticModelGuard.isItemPanelItemArray(this.itemPanelItem)) {
                logger.error("staticResourcesItemPanelItem", "Item panel item data is not valid.")
            }
            logger.debug("staticResourcesItemPanelItem", "Initialized successfully.")
            // logger.trace("staticResourcesItemPanelItem", this.itemPanelItem)
        } catch (e) {
            logger.error("staticResourcesItemPanelItem", "Initialization failed.")
            logger.error("staticResourcesItemPanelItem", e)
        }


        try {
            const itemPanelFluidRaw = fs.readFileSync('./data/itempanel/liquid.json', 'utf8')
            this.itemPanelFluid = JSON.parse(itemPanelFluidRaw)
            if (!staticModelGuard.isItemPanelLiquidArray(this.itemPanelFluid)) {
                logger.error("staticResourcesItemPanelFluid", "Item panel liquid data is not valid.")
            }
            logger.debug("staticResourcesItemPanelFluid", "Initialized successfully.")
            // logger.trace("staticResourcesItemPanelFluid", this.itemPanelFluid)
        } catch (e) {
            logger.error("staticResourcesItemPanelFluid", "Initialization failed.")
            logger.error("staticResourcesItemPanelFluid", e)
        }

        this.itemPanelItem.forEach(item => {
            this.itemPanelItemMap.set(item.name + "/" + item.damage, item)
        })

        this.itemPanelFluid.forEach(fluid => {
            this.itemPanelFluidMap.set(fluid.name, fluid)
        })

        try {
            const botTaskRaw = fs.readFileSync('./data/bot/task.json', 'utf8')
            this.botTask = JSON.parse(botTaskRaw)
            if (!staticModelGuard.isBotTaskArray(this.botTask)) {
                logger.error("staticResourcesBotTask", "Bot task data is not valid.")
            }
            logger.debug("staticResourcesBotTask", "Initialized successfully.")
            // logger.trace("staticResourcesBotTask", this.botTask)
        } catch (e) {
            logger.error("staticResourcesBotTask", "Initialization failed.")
            logger.error("staticResourcesBotTask", e)
        }

    }
}

export default staticResources