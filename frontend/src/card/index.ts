import * as aeOverview from "./ae-overview.js"
import * as botOverview from "./bot-overview.js"
import * as controlRedstoneAnalog from "./control-redstone-analog.js"
import * as controlRedstoneDigital from "./control-redstone-digital.js"
import * as createBot from "./create-bot.js"
import * as indicatorBar from "./indicator-bar.js"
import * as indicatorCircular from "./indicator-circular.js"
import * as noEvent from "./no-event.js"
import * as serverStatus from "./server-status.js"
import * as userInfo from "./user-info.js"
import * as welcome from "./welcome.js"

export const html = {
    aeOverview: aeOverview.html,
    botOverview: botOverview.html,
    controlRedstoneAnalog: controlRedstoneAnalog.html,
    controlRedstoneDigital: controlRedstoneDigital.html,
    createBot: createBot.html,
    indicatorBar: indicatorBar.html,
    indicatorCircular: indicatorCircular.html,
    noEvent: noEvent.html,
    serverStatus: serverStatus.html,
    userInfo: userInfo.html,
    welcome: welcome.html
}

export const init = {
    aeOverview: aeOverview.init,
    botOverview: botOverview.init,
    controlRedstoneAnalog: controlRedstoneAnalog.init,
    controlRedstoneDigital: controlRedstoneDigital.init,
    createBot: createBot.init,
    indicatorBar: indicatorBar.init,
    indicatorCircular: indicatorCircular.init,
    noEvent: noEvent.init,
    serverStatus: serverStatus.init,
    userInfo: userInfo.init,
    welcome: welcome.init
}
