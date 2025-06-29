import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="bot__content" class="panel-content" hidden>

  <div id="bot__list">
  </div>


  <div id="bot__edit" class="animate__animated animate__fadeInRight animate__faster" hidden>
  </div>

</div>
`

export function init() {
    eventEmitter.on("message", (event: any) => {
        const { type, data } = event.data
        if (type == "layout/botList") {
            renderLayout(data, document.getElementById("bot__list"))
        } else if (type == "layout/botEdit") {
            renderLayout(data, document.getElementById("bot__edit"), false)
        }
    })
}