import { type Switch } from "mdui"
import { randomUUID } from "../utils"
import { send } from "../websocket"

export function html(config: any) {
  return /*html*/`
<mdui-card variant="filled" class="card control-redstone-digital__card">
  
  <div style="display: flex;align-items: center;">
    <div style="font-size: x-large;"><b>${config.name}</b></div>
  </div>

  <div>
    ${config.description}
  </div>

  <div style="display: flex;align-items: center;">
    <div style="opacity: 0.5;">红石信号：${config.value == 0 ? '未激活' : '激活'}
    </div>
  </div>

  <mdui-switch></mdui-switch>

  <data hidden uuid="${config.uuid}" botUuid="${config.botUuid}" side="${config.side}"></data>

</mdui-card>
`}

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