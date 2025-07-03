import { aeModel, botModel, commonModel, eventModel, mcServerStatusModel, redstoneModel, staticModel } from "@oni/interface"
import { eventEmitter } from "./websocket"
import { wsServerToWebGuard as toWebGuard } from "@oni/interface"
import * as contentEvent from "./content/event"
import { botTaskUpdate } from "./dialog/bot-task"

export let common: commonModel.CommonArray = []
export let bot: botModel.BotArray = []
export let ae: aeModel.AeArray = []
export let event: eventModel.EventArray = []
export let redstone: redstoneModel.RedstoneArray = []

export let botTask: staticModel.BotTask[] = []
export let mcServerStatus: mcServerStatusModel.McServerStatus

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
            botTaskUpdate()
        } else if (toWebGuard.isDataAeInit(m)) {
            ae = m.data
        } else if (toWebGuard.isDataEventInit(m)) {
            event = m.data
            contentEvent.update()
        } else if (toWebGuard.isDataRedstoneInit(m)) {
            redstone = m.data
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
            contentEvent.update()
        } else if (toWebGuard.isDataEventRemove(m)) {
            event = event.filter((event) => event.uuid !== m.data)
            contentEvent.update()
        } else if (toWebGuard.isDataEventSet(m)) {
            let index = event.findIndex((event) => event.uuid === m.data.uuid)
            if (index !== -1) {
                event[index] = m.data
            }
            contentEvent.update()
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
        console.log("global.common", common)
        console.log("global.bot", bot)
        console.log("global.ae", ae)
        console.log("global.event", event)
        console.log("global.redstone", redstone)
        console.log("global.botTask", botTask)
        console.log("global.mcServerStatus", mcServerStatus)
    }, 1000)
}