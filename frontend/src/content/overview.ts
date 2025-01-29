import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="overview__content" class="panel-content">

  <mdui-card variant="filled" class="card">
    <div style="font-size: larger;">
      少女祈祷中...
    </div>
    <mdui-linear-progress></mdui-linear-progress>
  </mdui-card>

</div>
`

export function init() {
    eventEmitter.addEventListener("message", (event: any) => {
        const { type, data } = event.data
        if (type == "layout/overview") {
            renderLayout(data, document.getElementById("overview__content"))
        }
    })
}