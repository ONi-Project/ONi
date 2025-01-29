import { randomUUID } from "./utils"
import { Dialog, snackbar } from "mdui"
import { token } from "./settings"

// 定义事件推送器

class EventEmitter extends EventTarget {
    constructor() {
        super()
    }

    // 推送事件的方法
    message(data: any) {
        const event: any = new Event("message")
        event.data = data
        this.dispatchEvent(event)
    }
}

export const eventEmitter = new EventEmitter()

// 建立ws连接

export let user: any = {}

export let ws: WebSocket

export function init() {

    ws = new WebSocket("ws://" + location.hostname + ":5600/ws/web")

    ws.onopen = () => {
        console.log("ws连接成功")
        ws.send(JSON.stringify({ type: "auth/request", uuid: randomUUID(), data: { "token": token } }))
    }

    ws.onclose = () => {
        snackbar({
            message: "WebSocket 连接已断开，请刷新页面。",
            autoCloseDelay: 0,
            closeable: true
        })
        // 向网页添加半透明遮罩层
        document.getElementById("bg-texture")!.children[0].setAttribute("hidden", "true")
        document.getElementById("bg-texture")!.children[1].removeAttribute("hidden")
        document.getElementById("bg-texture")!.style.opacity = "0.15"
        console.log("ws连接断开")
    }

    ws.onerror = (event) => {
        console.log("ws连接出错：" + event)
    }

    ws.onmessage = (event) => {

        const json = JSON.parse(event.data)

        if (json.type == "auth/response") {
            if (json.data.user != undefined) {
                user = json.data.user
                console.log("用户认证成功：" + JSON.stringify(user))
            } else {
                (document.getElementById("dialog-login")! as Dialog).open = true
            }
        } else {
            eventEmitter.message(json)
        }

    }
}

export function send(data: any) {
    ws.send(JSON.stringify(data))
}