import user from "./user.js"
import bot from "./bot.js"
import ae from "./ae.js"
import common from "./common.js"
import redstone from "./redstone.js"
import event from "./event.js"
import mcServerStatus from "./mcServerStatus.js"
import staticResources from "./staticResources.js"

import { Config } from "../interface.js"

let Global = {
    user: user,
    bot: bot,
    ae: ae,
    data: common,
    redstone: redstone,
    event: event,
    mcServerStatus: mcServerStatus,
    staticResources: staticResources,

    init(config: Config) {
        user.init(config)
        bot.init(config)
        ae.init(config)
        common.init(config)
        redstone.init(config)
        event.init(config)
        mcServerStatus.init(config)
        staticResources.init(config)
    }
}

export default Global
