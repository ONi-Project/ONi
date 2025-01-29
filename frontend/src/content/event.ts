import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="event__content" class="panel-content">

</div>
`

export function init() {
    eventEmitter.addEventListener("message", (event: any) => {
        const { type, data } = event.data
        if (type == "layout/event") {
            renderLayout(data, document.getElementById("event__content"))
        }
    })
}