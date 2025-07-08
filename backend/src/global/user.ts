import { Config } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { userModel, userModelGuard } from "@oni/interface"

let user = {
    // 用户列表
    list: [] as userModel.User[],

    get(uuid: string) {
        return this.list.find(user => user.uuid === uuid)
    },

    set(user: userModel.User) {
        return this.list.some((item, index) => {
            if (item.uuid == user.uuid) {
                this.list[index] = user
                return true
            }
            return false
        })
    },

    add(user: userModel.User) {
        this.list.push(user)
    },

    remove(uuid: string) {
        let index = this.list.findIndex(user => user.uuid === uuid)
        if (index >= 0) {
            let user = this.list[index]
            this.list.splice(index, 1)
        } else {
            logger.error("user.remove", "User not found.")
        }
    },

    save() {
        const MODULE_NAME = "user.save"
        const FILE_PATH = "./data/user/user.json"
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8')
            logger.debug(MODULE_NAME, "Json saved successfully.")
        } catch (e) {
            logger.error(MODULE_NAME, "Json save failed.")
            logger.error(MODULE_NAME, e)
        }
    },

    init(config: Config) {
        const MODULE_NAME = "user.init"
        const FILE_PATH = "./data/user/user.json"
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
            if (userModelGuard.isUserArray(json)) {
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


export default user