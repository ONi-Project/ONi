import { type Slider } from "mdui"
import { randomUUID } from "../utils"
import { send } from "../websocket"

export function html(config: any) {
  return /*html*/`
<mdui-card variant="filled" class="card control-redstone-analog__card">
  <div style="display: flex;align-items: center;">
    <div style="font-size: x-large;"><b>${config.name}</b></div>
  </div>

  <div>
    ${config.description}
  </div>

  <div style="display: flex;align-items: center;">
    <div style="opacity: 0.5;">红石模拟信号：${config.value}
    </div>
  </div>

  <mdui-slider tickmarks max="15"></mdui-slider>

  <data hidden uuid="${config.uuid}" botUuid="${config.botUuid}" side="${config.side}"></data>
</mdui-card>
`}

export function init() {
  document.querySelectorAll(".control-redstone-analog__card").forEach(element => {
    let uuid = element.querySelector("data")!.getAttribute("uuid")
    let botUuid = element.querySelector("data")!.getAttribute("botUuid")
    let side = element.querySelector("data")!.getAttribute("side")

    element.querySelector("mdui-slider")!.addEventListener("change", event => {
      send({
        "type": "oc/task/runSingle",
        "target": botUuid,
        "data": [
          {
            "task": "redstone",
            "interval": -1,
            "taskUuid": randomUUID(),
            "config": {
              "mode": "setOutput",
              "strength": (event.target! as Slider).value,
              "uuid": uuid,
              "side": side
            }
          }
        ]
      })
    })
  })
}