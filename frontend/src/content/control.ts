import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="control__content" class="panel-content" hidden>
</div>
`

export function init(){
    eventEmitter.addEventListener("message", (event: any) => {
        const { type, data } = event.data
        if (type == "layout/control") {
            renderLayout(data, document.getElementById("control__content"))
        }
    })
}