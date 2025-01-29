import { user } from "../websocket"

export function html(config: any) {
    return /*html*/`
<mdui-card variant="filled" class="card">

  <div style="display: flex;align-items: center;">
    <div style="font-size: x-large;"><b>${config.title}</b></div>
  </div>

  <div style="display: flex;align-items: center;">
    <div style="opacity: 0.5;">ONi Authourized Staff
    </div>
  </div>

  <div style="opacity: 0.25;display: flex;align-items: center;align-self: flex-end;margin-top: auto;">
    <mdui-icon name="account_circle"></mdui-icon>
    &nbsp;
    <div style="font-size: larger;" class="card-user-info__name"><b></b></div>
  </div>

</mdui-card>
`}

export function init() {
    document.querySelectorAll('.card-user-info__name').forEach(element => {
        element.textContent = user.name
    })
}