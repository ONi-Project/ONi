import { initSettingsContent } from "./dialog/settings"

// 设置项初始化
export let endpoint = ""
export let token = ""
export let picSource = "https://akyuu.cn/oni/itempanel"

export function init() {
    // 读入设置
    endpoint = localStorage.getItem("endpoint") || endpoint
    token = localStorage.getItem("token") || token
    initSettingsContent()
}

export function setEndpoint(value: string) {
    localStorage.setItem("endpoint", value)
    endpoint = value
}

export function setToken(value: string) {
    localStorage.setItem("token", value)
    token = value
}