import { initSettingsContent } from "./dialog/settings"

// 设置项初始化
export let token = ""

export function init() {
    // 读入设置
    token = localStorage.getItem("token") || token
    initSettingsContent()
}