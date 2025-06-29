import { common } from "../global"
import { eventEmitter } from "../websocket"

export function html(config: any) {
    return /*html*/`
<mdui-card variant="filled" class="card card-indicator-bar__card">
  <div style="display: flex;align-items: baseline;">
    <div class="card-indicator-bar__title" style="font-size: larger;font-weight: bold;">...</div>
    <div class="card-indicator-bar__value" style="opacity: 0.5;margin-left: auto;"></div>
  </div>
  <mdui-linear-progress class="card-indicator-bar__indicator" value="0" max="100" style="height: 1rem;"></mdui-linear-progress>
  <div class="card-indicator-bar__percent" style="opacity: 0.5;"></div>
  <data hidden uuid="${config.uuid}"></data>
</mdui-card>
`}

export function init() {
    eventEmitter.on("message", async (event: any) => {
        const { type, data } = event.data
        if (type == "data/common/set") {
            document.querySelectorAll(".card-indicator-bar__card").forEach(element => {

                let uuid = element.querySelector("data")!.getAttribute("uuid")

                const target = data.find((item: any) => item.uuid == uuid)

                if (target) {
                    const { max, value, unit, avgIO } = target

                    // 更新文本
                    element.querySelector(".card-indicator-bar__value")!.innerHTML = `${value}/${max} ${unit}`
                    element.querySelector(".card-indicator-bar__percent")!.innerHTML = `${((value / max) * 100).toFixed(2)} %`;

                    // 更新进度条
                    (element.querySelector(".card-indicator-bar__indicator") as any).value = (value / max) * 100

                    avgIO
                }
            })
        }
    })
    document.querySelectorAll(".card-indicator-bar__card").forEach(element => {

        let uuid = element.querySelector("data")!.getAttribute("uuid")

        let target = common.find((item: any) => item.uuid == uuid)
        if (target) {
            element.querySelector(".card-indicator-bar__title")!.innerHTML = target.name

            const { max, value, unit, avgIO } = target

            if (value) {
                // 更新文本
                element.querySelector(".card-indicator-bar__value")!.innerHTML = `${value}/${max} ${unit}`
                element.querySelector(".card-indicator-bar__percent")!.innerHTML = `${((value / max) * 100).toFixed(2)} %`;

                // 更新进度条
                (element.querySelector(".card-indicator-bar__indicator")! as any).value = (value / max) * 100

            } else {
                (element.querySelector(".card-indicator-bar__indicator")! as any).value = 0
            }

            avgIO
        }
    })
}