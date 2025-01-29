import type { TextField } from "mdui"

export const html = /*html*/`
<mdui-dialog icon="person" id="dialog-login" headline="ONi Auth">
  <div id="dialog-login-text" style="opacity: 0.8;margin-bottom: 1rem;">请输入 Token 登录。</div>
  <mdui-text-field id="dialog-login-input" label="Token" style="width: 20rem;"></mdui-text-field>
  <mdui-button id="dialog-login-button" slot="action">登录</mdui-button>
</mdui-dialog>
`

export function init() {
    if (localStorage.getItem("token") != null) {
        document.getElementById("dialog-login-text")!.innerHTML = "Token 验证失败，请重新登录。"
    }
    document.getElementById("dialog-login-button")!.addEventListener("click", function () {
        localStorage.setItem("token", (document.getElementById("dialog-login-input")! as TextField).value)
        location.reload()
    })
}