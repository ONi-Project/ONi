import user from "./user"
import bot from "./bot"
import ae from "./ae"
import common from "./common"
import redstone from "./redstone"
import event from "./event"
import mcServerStatus from "./mcServerStatus"
import staticResources from "./staticResources"

import { Config } from "../interface"

let Global = {
    user: user,
    bot: bot,
    ae: ae,
    common: common,
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
