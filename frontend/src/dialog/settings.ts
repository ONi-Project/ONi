import type { Dialog, TextField } from "mdui"
import { token } from "../settings"

export const html = /*html*/`
<mdui-dialog id="settings-dialog">
    <span slot="headline">Oni Settings</span>
    <span slot="description">
      <mdui-text-field label="Token" id="text-field-settings-token"></mdui-text-field>
    </span>
    <mdui-button variant="outlined" id="button-settings-discard">取消</mdui-button>
    <mdui-button variant="filled" id="button-settings-apply">保存</mdui-button>
</mdui-dialog>
`

export function init() {
    // 设置项
    const tokenTextField = document.getElementById("text-field-settings-token") as TextField
    const dialog = document.getElementById("settings-dialog") as Dialog

    document.getElementById("buttonSettings")!.addEventListener("click", () => {
        dialog.open = true
    })
    document.getElementById("button-settings-discard")!.addEventListener("click", () => {
        dialog.open = false
    })
    document.getElementById("button-settings-apply")!.addEventListener("click", () => {
        dialog.open = false
        localStorage.setItem("token", tokenTextField.value)
        location.reload()
    })
}

export function initSettingsContent() {
    const tokenTextField = document.getElementById("text-field-settings-token") as TextField
    tokenTextField.value = token
}