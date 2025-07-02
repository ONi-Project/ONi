import * as aeOverview from "./ae-overview"
import * as botOverview from "./bot-overview"
import * as controlRedstoneAnalog from "./control-redstone-analog"
import * as controlRedstoneDigital from "./control-redstone-digital"
import * as createBot from "./create-bot"
import * as indicatorBar from "./indicator-bar"
import * as indicatorCircular from "./indicator-circular"
import * as noEvent from "./no-event"
import * as serverStatus from "./server-status"
import * as userInfo from "./user-info"
import * as welcome from "./welcome"

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
