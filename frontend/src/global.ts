import { aeModel, botModel, commonModel, eventModel, mcServerStatusModel, redstoneModel, staticModel } from "@oni/interface"
import { botTaskUpdate } from "./dialog/bot-task"
import { eventEmitter } from "./websocket"
import { wsServerToWebGuard as toWebGuard } from "@oni/interface"

export let common: commonModel.CommonArray = []
export let mcServerStatus: mcServerStatusModel.McServerStatus
export let bot: botModel.BotArray = []
export let botTask: staticModel.BotTask[] = []
export let ae: aeModel.AeArray = []
export let event: eventModel.EventArray = []
export let redstone: redstoneModel.RedstoneArray = []

export function init() {

    eventEmitter.on("message", (m) => {
        if (toWebGuard.isDataCommonInit(m)) {
            common = m.data
        } else if (toWebGuard.isDataMcServerStatusSet(m)) {
            mcServerStatus = m.data
        } else if (toWebGuard.isDataBotInit(m)) {
            bot = m.data
        } else if (toWebGuard.isStaticBotTask(m)) {
            botTask = m.data
        } else if (toWebGuard.isDataAeInit(m)) {
            ae = m.data
        } else if (toWebGuard.isDataEventInit(m)) {
            event = m.data
        } else if (toWebGuard.isDataAeAdd(m)) {
            ae.push(m.data)
        } else if (toWebGuard.isDataAeRemove(m)) {
            ae = ae.filter((ae) => ae.uuid !== m.data)
        } else if (toWebGuard.isDataAeItemsSet(m)) {
            let target = ae.find((ae) => ae.uuid === m.data.uuid)
            if (target) {
                target.items = m.data.items
            }
        } else if (toWebGuard.isDataAeCpusSet(m)) {
            let target = ae.find((ae) => ae.uuid === m.data.uuid)
            if (target) {
                target.cpus = m.data.cpus
            }
        } else if (toWebGuard.isDataBotAdd(m)) {
            bot.push(m.data)
        } else if (toWebGuard.isDataBotRemove(m)) {
            bot = bot.filter((bot) => bot.uuid !== m.data)
        } else if (toWebGuard.isDataBotComponentsSet(m)) {
            let target = bot.find((bot) => bot.uuid === m.data.uuid)
            if (target) {
                target.components = m.data.components
            }
        } else if (toWebGuard.isDataBotTasksSet(m)) {
            let target = bot.find((bot) => bot.uuid === m.data.uuid)
            if (target) {
                target.tasks = m.data.tasks
            }
        } else if (toWebGuard.isDataCommonAdd(m)) {
            common.push(m.data)
        } else if (toWebGuard.isDataCommonRemove(m)) {
            common = common.filter((common) => common.uuid !== m.data)
        } else if (toWebGuard.isDataCommonSet(m)) {
            let target = common.find((common) => common.uuid === m.data.uuid)
            if (target) {
                target = m.data
            }
        } else if (toWebGuard.isDataEventAdd(m)) {
            event.push(m.data)
        } else if (toWebGuard.isDataEventRemove(m)) {
            event = event.filter((event) => event.uuid !== m.data)
        } else if (toWebGuard.isDataEventSet(m)) {
            let target = event.find((event) => event.uuid === m.data.uuid)
            if (target) {
                target = m.data
            }
        } else if (toWebGuard.isDataRedstoneAdd(m)) {
            redstone.push(m.data)
        } else if (toWebGuard.isDataRedstoneRemove(m)) {
            redstone = redstone.filter((redstone) => redstone.uuid !== m.data)
        } else if (toWebGuard.isDataRedstoneSet(m)) {
            let target = redstone.find((redstone) => redstone.uuid === m.data.uuid)
            if (target) {
                target = m.data
            }
        }
    })

    setTimeout(() => {
        // console.log(common)
        // console.log(bot)
        // console.log(botTask)
        // console.log(ae)
        console.log(mcServerStatus)
    }, 1000)
}