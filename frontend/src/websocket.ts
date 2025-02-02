import { randomUUID } from "./utils"
import { snackbar } from "mdui"
import { endpoint, token } from "./settings"
import { openLoginDialog, setText } from "./dialog/login"

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

    if (endpoint == "" && token == "") {
        setText("欢迎来到 ONi！请输入后端地址和令牌来登录。")
        openLoginDialog()
        return
    }

    ws = new WebSocket("ws://" + endpoint + "/ws/web")

    ws.onopen = () => {
        console.log("ws 连接成功")
        ws.send(JSON.stringify({ type: "auth/request", uuid: randomUUID(), data: { "token": token } }))
    }

    ws.onclose = () => {
        snackbar({
            message: "WebSocket 连接已断开。",
            autoCloseDelay: 0,
            closeable: true
        })
        // 向网页添加半透明遮罩层
        document.getElementById("bg-texture")!.children[0].setAttribute("hidden", "true")
        document.getElementById("bg-texture")!.children[1].removeAttribute("hidden")
        document.getElementById("bg-texture")!.style.opacity = "0.15"
        console.log("ws 连接断开")
    }

    ws.onerror = (event) => {
        console.log("ws 连接出错：", event)
        snackbar({
            message: "WebSocket 连接出错，请检查控制台日志。",
            autoCloseDelay: 0,
            closeable: true
        })
        setText("WebSocket 连接失败，请检查后端地址是否正确。")
        openLoginDialog()
        ws.close()
    }

    ws.onmessage = (event) => {

        const json = JSON.parse(event.data)

        if (json.type == "auth/response") {
            if (Object.keys(json.data).length !== 0) {
                user = json.data
                console.log("用户认证成功：", user)
                snackbar({
                    message: `欢迎回来，${user.name}！`,
                    autoCloseDelay: 1500,
                    closeable: false
                })
            } else {
                if (token === "") {
                    setText("欢迎来到 ONi！请输入后端地址和令牌来登录。")
                } else {
                    setText("令牌验证失败，请重新输入。")
                }
                openLoginDialog()
            }
        } else {
            eventEmitter.message(json)
        }

    }
}

export function send(data: any) {
    ws.send(JSON.stringify(data))
}