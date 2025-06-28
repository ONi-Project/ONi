import { Config } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { userModel } from "@oni/interface"

let user = {
    // 用户列表
    list: [] as userModel.User[],

    init(config: Config) {
        this.list = JSON.parse(fs.readFileSync('./data/user/user.json', 'utf8'))
        logger.trace("userList", this.list)
    }
}


export default user