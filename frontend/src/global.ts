import { botTaskUpdate } from "./dialog/bot-task"
import { eventEmitter } from "./websocket"

export let common: any = []
export let mcServerStatus: any = {}
export let bot: any = []
export let botTask: any = []
export let ae: any = []

export function init() {
    eventEmitter.addEventListener("message", (event: any) => {
        const { type, data } = event.data

        if (type == "global/common") {
            common = data
        } else if (type == "data/common/set") {
            let target = data.find((data: any) => data.uuid === data.uuid)
            if (target) {
                Object.assign(target, data)
            }

        } else if (type == "global/bot") {
            bot = data
        } else if (type == "data/bot/set") {
            let target = bot.find((bot: any) => bot.uuid === data.uuid)
            if (target) {
                Object.assign(target, data)
            }
        } else if (type == "global/botTask") {
            botTask = data
            botTaskUpdate(null)
        }

        else if (type == "global/ae") {
            ae = data
        } else if (type == "data/ae/set") {
            let target = ae.find((ae: any) => ae.uuid === data.uuid)
            if (target) {
                Object.assign(target, data)
            }
        }

        else if (type == "global/mcServerStatus") {
            mcServerStatus = data
        } else if (type == "data/mcServerStatus/set") {
            mcServerStatus = data
        }

    })

    // setTimeout(() => {
    //     console.log(common)
    //     console.log(bot)
    //     console.log(botTask)
    //     console.log(ae)
    //     console.log(mcServerStatus)
    // }, 1000)
}