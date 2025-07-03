import { Config } from "../interface"
import fs from "fs"
import { wsWebBroadcast } from "../websocket"
import { eventModel, eventModelGuard, newServerToWebMessage } from "@oni/interface"
import { loggerGlobal as logger } from "../logger"

let event = {
    // 事件
    list: [] as eventModel.Event[],

    get(uuid: string) {
        return this.list.find(event => event.uuid == uuid)
    },

    set(event: eventModel.Event) {
        return this.list.some((item, index) => {
            if (item.uuid == event.uuid) {
                this.list[index] = event
                wsWebBroadcast(newServerToWebMessage("DataEventSet", event))
                return true
            }
            return false
        })
    },

    add(event: eventModel.Event) {
        this.list.push(event)
        wsWebBroadcast(newServerToWebMessage("DataEventAdd", event))
    },

    remove(uuid: string) {
        let index = this.list.findIndex(event => event.uuid == uuid)
        if (index >= 0) {
            let event = this.list[index]
            this.list.splice(index, 1)
            wsWebBroadcast(newServerToWebMessage("DataEventRemove", uuid))
        } else {
            logger.error("event.remove", "Event not found.")
        }
    },

    save() {
        const MODULE_NAME = "event.save"
        const FILE_PATH = "./data/event/event.json"
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8')
            logger.debug(MODULE_NAME, "Json saved successfully.")
        } catch (e) {
            logger.error(MODULE_NAME, "Json save failed.")
            logger.error(MODULE_NAME, e)
        }
    },

    init(config: Config) {
        const MODULE_NAME = "event.init"
        const FILE_PATH = "./data/event/event.json"
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
            if (eventModelGuard.isEventArray(json)) {
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
export default event