import type { Button, Dialog } from "mdui"
import { setToken } from "../settings"

export const html = /*html*/`
<mdui-dialog id="settings-dialog">
    <span slot="headline">Oni Settings</span>
    <mdui-button full-width id="button-settings-logout">退出登录</mdui-button>
    <mdui-button variant="outlined" id="button-settings-discard" style="margin-top: 1rem;">取消</mdui-button>
    <mdui-button variant="filled" id="button-settings-apply">保存</mdui-button>
</mdui-dialog>
`

export function init() {
    // 设置项
    // const dialog = document.getElementById("settings-dialog") as Dialog

    // document.getElementById("buttonSettings")!.addEventListener("click", () => {
    //     dialog.open = true
    // })
    // document.getElementById("button-settings-discard")!.addEventListener("click", () => {
    //     dialog.open = false
    // })
    // document.getElementById("button-settings-apply")!.addEventListener("click", () => {
    //     dialog.open = false
    //     location.reload()
    // })
}

export function initSettingsContent() {
    const tokenTextField = document.getElementById("button-settings-logout") as Button
    tokenTextField.addEventListener("click", () => {
        setToken("")
        location.reload()
    })
}