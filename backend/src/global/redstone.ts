import { Config } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { newServerToWebMessage, redstoneModel, redstoneModelGuard } from "@oni/interface"
import { wsWebBroadcast } from "src/websocket.js"

let redstone = {
    // 红石控制组件
    list: [] as redstoneModel.Redstone[],

    // getLayout() {
    //     let content: PageContentElement[] = []

    //     this.list.forEach(redstone => {
    //         if (redstone.type == "digital") {
    //             content.push({
    //                 type: "card",
    //                 id: "control-redstone-digital",
    //                 config: {
    //                     uuid: redstone.uuid,
    //                     botUuid: redstone.botUuid,
    //                     name: redstone.name,
    //                     description: redstone.description,
    //                     value: redstone.value,
    //                     side: redstone.side
    //                 }
    //             })
    //         } else if (redstone.type == "analog") {
    //             content.push({
    //                 type: "card",
    //                 id: "control-redstone-analog",
    //                 config: {
    //                     uuid: redstone.uuid,
    //                     botUuid: redstone.botUuid,
    //                     name: redstone.name,
    //                     description: redstone.description,
    //                     value: redstone.value,
    //                     side: redstone.side
    //                 }
    //             })
    //         }
    //     })

    //     let _ = [{
    //         type: "grid-m",
    //         content: content
    //     }]

    //     return _
    // },

    get(uuid: string) {
        return this.list.find(redstone => redstone.uuid == uuid)
    },

    set(redstone: redstoneModel.Redstone) {
        this.list.forEach((item, index) => {
            if (item.uuid == redstone.uuid) {
                this.list[index] = redstone
                wsWebBroadcast(newServerToWebMessage("DataRedstoneSet", redstone))
                return
            }
        })
    },

    add(redstone: redstoneModel.Redstone) {
        this.list.push(redstone)
        wsWebBroadcast(newServerToWebMessage("DataRedstoneAdd", redstone))
    },

    remove(uuid: string) {
        let index = this.list.findIndex(redstone => redstone.uuid == uuid)
        if (index >= 0) {
            let redstone = this.list[index]
            this.list.splice(index, 1)
            wsWebBroadcast(newServerToWebMessage("DataRedstoneRemove", uuid))
        } else {
            logger.error("redstone.remove", "Redstone not found.")
        }
    },

    save() {
        const MODULE_NAME = "redstone.save"
        const FILE_PATH = "./data/redstone/redstone.json"
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8')
            logger.debug(MODULE_NAME, "Json saved successfully.")
        } catch (e) {
            logger.error(MODULE_NAME, "Json save failed.")
            logger.error(MODULE_NAME, e)
        }
    },

    init(config: Config) {
        const MODULE_NAME = "redstone.init"
        const FILE_PATH = "./data/redstone/redstone.json"
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
            if (redstoneModelGuard.isRedstoneArray(json)) {
                this.list = json
                logger.debug(MODULE_NAME, "Json initialized successfully.")
                logger.trace(MODULE_NAME, this.list)
            } else {
                logger.error(MODULE_NAME, "Json initialization failed. Invalid data format.")
            }
        } catch (e) {
            logger.error(MODULE_NAME, "Json initialization failed.")
            logger.error(MODULE_NAME, e)
        }
    }
}

export default redstone