import { randomUUID } from "./utils"
import { Snackbar, snackbar } from "mdui"
import { endpoint, token } from "./settings"
import { closeLoginDialog, openLoginDialog, setText } from "./dialog/login"
import { initSlogan } from "./layout/topbar"

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

    let disconectInfo: Snackbar | undefined
    let errorInfo: Snackbar | undefined
    let connectedOnce = false // 是否曾经连接成功过


    if (endpoint == "" && token == "") {
        setText("欢迎来到 ONi！请输入后端地址和令牌来登录。")
        openLoginDialog()
        return
    }

    tryConnect()

    function tryConnect() {
        ws = new WebSocket("ws://" + endpoint + "/ws/web")

        ws.onopen = () => {
            connectDeco()
            if (disconectInfo) { disconectInfo.open = false }
            if (errorInfo) { errorInfo.open = false }
            connectedOnce = true
            console.log("ws 连接成功")
            disconectInfo = undefined
            errorInfo = undefined
            ws.send(JSON.stringify({ type: "auth/request", uuid: randomUUID(), data: { "token": token } }))
        }

        ws.onclose = () => {
            if (connectedOnce) {
                if (!disconectInfo) {
                    disconectInfo = snackbar({
                        message: "WebSocket 连接已断开，正在尝试重新连接...",
                        autoCloseDelay: 60000,
                        closeable: false
                    })
                }
                disconectDeco()
                setTimeout(() => {
                    tryConnect()
                }, 1000)
            }
            console.log("ws 连接断开")
        }

        ws.onerror = (event) => {
            console.log("ws 连接失败：", event)
            if (!errorInfo) {
                errorInfo = snackbar({
                    message: "WebSocket 连接失败。",
                    autoCloseDelay: 60000,
                    closeable: false
                })
            }
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
                    setTimeout(() => {
                        snackbar({
                            message: `欢迎回来，${user.name}！`,
                            autoCloseDelay: 1500,
                            closeable: false
                        })
                    }, 300)
                    initSlogan()
                    closeLoginDialog()
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

    function disconectDeco() {
        document.getElementById("bg-texture")!.children[0].setAttribute("hidden", "true")
        document.getElementById("bg-texture")!.children[1].removeAttribute("hidden")
        document.getElementById("bg-texture")!.style.opacity = "0.15"
    }

    function connectDeco() {
        document.getElementById("bg-texture")!.children[0].removeAttribute("hidden")
        document.getElementById("bg-texture")!.children[1].setAttribute("hidden", "true")
        document.getElementById("bg-texture")!.style.opacity = ""
    }
}

export function send(data: any) {
    ws.send(JSON.stringify(data))
}