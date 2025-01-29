import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="ae__content" class="panel-content" hidden>

  <div id="ae__topbar">
    <div class="animate__animated animate__fadeIn animate__faster" style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
      <mdui-text-field variant="outlined" icon="search" label="搜索 AE 网络..."></mdui-text-field>
      <mdui-button icon="add">添加</mdui-button>
    </div>
  </div>

  <div id="ae__list">

  </div>

  <div id="ae__view" class="animate__animated animate__fadeInRight animate__faster" hidden>
  </div>

  <div id="ae__edit" class="animate__animated animate__fadeInRight animate__faster" hidden>
  </div>

</div>
`

export function init() {
    eventEmitter.addEventListener("message", (event: any) => {
        const { type, data } = event.data
        if (type == "layout/aeList") {
            renderLayout(data, document.getElementById("ae__list"))
        } else if (type == "layout/aeView") {
            renderLayout(data, document.getElementById("ae__view"), false)
        } else if (type == "layout/aeEdit") {
            renderLayout(data, document.getElementById("ae__edit"), false)
        }
    })
}