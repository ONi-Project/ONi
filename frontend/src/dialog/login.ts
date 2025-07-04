import type { Dialog, TextField } from "mdui"
import { endpoint, setEndpoint, setToken } from "../settings"

export const html = /*html*/`
<mdui-dialog icon="person" id="dialog-login" headline="ONi 身份认证">
  <div id="dialog-login-text" style="opacity: 0.8;margin-bottom: 1rem;"></div>
  <mdui-text-field helper="示例：localhost:5600 或 oni.akyuu.cn" icon="dns" required clearable id="dialog-login-input-endpoint" label="后端地址" style="margin-bottom: 0.5rem;"></mdui-text-field>
  <mdui-text-field icon="key" required clearable id="dialog-login-input-token" label="令牌"></mdui-text-field>
  <mdui-button id="dialog-login-button" slot="action">登录</mdui-button>
</mdui-dialog>
`

export function init() {
    document.getElementById("dialog-login-button")!.addEventListener("click", function () {
        const endpointElement = document.getElementById("dialog-login-input-endpoint")! as TextField
        const tokenElement = document.getElementById("dialog-login-input-token")! as TextField
        const endpoint = endpointElement.value
        const token = tokenElement.value

        if (!endpoint || !token) {
            console.log(1)
            endpointElement.reportValidity()
            tokenElement.reportValidity()
        } else {
            setEndpoint(endpoint)
            setToken(token)
            location.reload()
        }

    })
}

export function setText(text: string) {
    document.getElementById("dialog-login-text")!.innerHTML = text
}

export function openLoginDialog() {
    document.getElementById("overview__loading")!.style.display = "none";
    (document.getElementById("dialog-login")! as Dialog).open = true
    initSettingsContent()
}

export function closeLoginDialog() {
    (document.getElementById("dialog-login")! as Dialog).open = false
    initSettingsContent()
}

export function initSettingsContent() {
    const endpointElement = document.getElementById("dialog-login-input-endpoint")! as TextField
    endpointElement.value = endpoint
}