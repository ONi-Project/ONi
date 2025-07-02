import { Snackbar, snackbar } from "mdui"
import { endpoint, token } from "./settings"
import { closeLoginDialog, openLoginDialog, setText } from "./dialog/login"
import { initSlogan } from "./layout/topbar"

import { allMessageType, newWebToServerMessage as toServer, userModel, wsBaseGuard, wsServerToWebGuard } from "@oni/interface"

// 定义事件推送器

type Listener<T = any> = (data: T) => void

class EventEmitter<Events extends Record<string, any>> {
    private listeners: {
        [K in keyof Events]?: Listener<Events[K]>[]
    } = {}

    // 添加事件监听器
    on<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event]!.push(listener)
    }

    // 移除事件监听器
    off<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
        const eventListeners = this.listeners[event]
        if (!eventListeners) return
        this.listeners[event] = eventListeners.filter(l => l !== listener)
    }

    // 触发事件
    emit<K extends keyof Events>(event: K, data: Events[K]) {
        const eventListeners = this.listeners[event]
        if (!eventListeners) return
        for (const listener of eventListeners) {
            listener(data)
        }
    }
}

export const eventEmitter = new EventEmitter<{
    message: allMessageType.ServerToWeb
}>()

// 建立ws连接

export let user: userModel.User

export let session: WebSocket

export function init() {

    let disconectInfo: Snackbar | null
    let errorInfo: Snackbar | null
    let connectedOnce = false // 是否曾经连接成功过


    if (endpoint == "" && token == "") {
        setText("欢迎来到 ONi！请输入后端地址和令牌来登录。")
        openLoginDialog()
        return
    }

    tryConnect()

    function tryConnect() {
        session = new WebSocket("ws://" + endpoint + "/ws/web")

        session.onopen = () => {
            connectDeco()
            if (disconectInfo) { disconectInfo.open = false }
            if (errorInfo) { errorInfo.open = false }
            connectedOnce = true
            console.log("ws 连接成功")
            disconectInfo = null
            errorInfo = null
            send(toServer("AuthRequest", { token: token }))
        }

        session.onclose = () => {
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

        session.onerror = (event) => {
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
            session.close()
        }

        session.onmessage = (event) => {

            const json = JSON.parse(event.data)

            if (!wsBaseGuard.isMessage(json)) {
                console.warn("非法 ws 消息：", json)
                return
            }

            if (wsServerToWebGuard.isAuthResponse(json)) {
                if (json.data !== null) {
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
                eventEmitter.emit("message", json as allMessageType.ServerToWeb)
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

export function send(message: allMessageType.WebToServer) {
    session.send(JSON.stringify(message))
}