import { type Switch } from "mdui"
import { randomUUID } from "../utils"
import { send } from "../websocket"

export function html(config: any) {
  return /*html*/`<mdui-card variant="filled" class="card control-redstone-digital__card">

  <div style="display: flex;align-items: center;">
    <div style="font-size: x-large;font-weight: bold;">${config.name}</div>
  </div>

  <div style="opacity: 0.5;">
    ${config.description}
  </div>

  <div style="display: flex;align-items: center;margin-top: 0.5rem;">
    <mdui-switch></mdui-switch>
    <div style="opacity: 0.25;margin-left: 0.5rem;">${config.value == 0 ? '关' : '开'}
    </div>
  </div>


  <data hidden uuid="${config.uuid}" botUuid="${config.botUuid}" side="${config.side}"></data>

</mdui-card>`}

export function init() {
  document.querySelectorAll(".control-redstone-digital__card").forEach(element => {
    let uuid = element.querySelector("data")!.getAttribute("uuid")
    let botUuid = element.querySelector("data")!.getAttribute("botUuid")
    let side = element.querySelector("data")!.getAttribute("side")

    element.querySelector("mdui-switch")!.addEventListener("change", event => {
      send({
        "type": "oc/task/runSingle",
        "target": botUuid,
        "data": {
          "task": "redstone",
          "interval": -1,
          "taskUuid": randomUUID(),
          "config": {
            "mode": "setOutput",
            "strength": (event.target as Switch).checked ? 15 : 0,
            "uuid": uuid,
            "side": side
          }
        }
      })
    })
  })
}