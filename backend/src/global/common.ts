import { Config, Common } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { wsWebBroadcast } from "../websocket.js"

var common = {
    // 通用数据
    list: [] as Common[],

    set(data: Common) {
        this.list.forEach((item, index) => {
            if (item.uuid == data.uuid) {
                this.list[index] = data
                wsWebBroadcast("data/common/set", data)
                return
            }
        })
    },

    init(config: Config) {
        try {
            this.list = JSON.parse(fs.readFileSync('./data/variable/common_data.json', 'utf8'))
            logger.debug("data", "Json initialized successfully.")
            logger.trace("data", this.list)
        } catch (e) {
            logger.error("data", "Json initialization failed.")
            logger.error("data", e)
        }
    }
}

export default common