import { common } from "../global"
import { eventEmitter } from "../websocket"
import { Circle } from "progressbar.js"

export function html(config: any) {
    return /*html*/`
<mdui-card variant="filled" class="card card-indicator-circular__card">
  <div class="card-indicator-circular__title" style="font-size: larger;font-weight: bold;margin-bottom: -0.5rem;">...</div>
  <div class="card-indicator-circular__value" style="opacity: 0.5;"></div>
  <div class="card-indicator-circular__indicator"></div>
  <div class="card-indicator-circular__bottom" style="opacity: 0.5;"></div>
  <data hidden uuid="${config.uuid}" bottom="${config.bottom}"></data>
</mdui-card>

<style>
  .card-indicator-circular__card {
    text-align: center;
  }
</style>
`}

export function init() {
    let cardIndicatorCircular__list: any = []

    // 卡片更新监听事件
    eventEmitter.addEventListener("message", async (event: any) => {
        const { type, data } = event.data
        if (type == "update/common") {
            document.querySelectorAll(".card-indicator-circular__card").forEach(element => {

                let uuid = element.querySelector("data")!.getAttribute("uuid")!
                let bottom = element.querySelector("data")!.getAttribute("bottom")!

                const target = data.find((item: any) => item.uuid == uuid)

                if (target) {
                    const { max, value, unit, avgIO } = target

                    // 更新文本
                    element.querySelector(".card-indicator-circular__value")!.innerHTML = `${value}/${max} ${unit}`
                    if (bottom == "avgIO") {
                        element.querySelector(".card-indicator-circular__bottom")!.innerHTML = `avg: ${avgIO} ${unit}/t`
                    }

                    // 更新环形进度条
                    cardIndicatorCircular__list[uuid].animate(value / max)

                }
            })
        }
    })

    // 初始化卡片
    document.querySelectorAll(".card-indicator-circular__card").forEach(element => {

        let uuid = element.querySelector("data")!.getAttribute("uuid")!
        let bottom = element.querySelector("data")!.getAttribute("bottom")!

        let target = common.find((item: any) => item.uuid == uuid)
        if (target) {
            element.querySelector(".card-indicator-circular__title")!.innerHTML = target.name
            const indicator = element.querySelector(".card-indicator-circular__indicator") as HTMLElement

            // 构建环形进度条
            cardIndicatorCircular__list[uuid] = new Circle(indicator, {
                color: '#aaa',
                strokeWidth: 4,
                trailWidth: 2,
                easing: 'easeInOut',
                duration: 1400,
                text: {
                    style: {
                        color: '#999',
                        fontSize: '2rem',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }
                },
                from: { color: '#f55' },
                to: { color: '#5f5' },

                step: function (state: any, circle: any) {
                    circle.path.setAttribute('stroke', state.color)

                    var value = Math.round(circle.value() * 100)
                    circle.setText(value + "%")

                }
            })

            const { max, value, unit, avgIO } = target

            if (value) {
                // 更新文本
                element.querySelector(".card-indicator-circular__value")!.innerHTML = `${value}/${max} ${unit}`
                if (bottom == "avgIO") {
                    element.querySelector(".card-indicator-circular__bottom")!.innerHTML = `avg: ${avgIO} ${unit}/t`
                }

                // 更新环形进度条
                cardIndicatorCircular__list[uuid].animate(value / max)
            } else {
                cardIndicatorCircular__list[uuid].setText("N/A")
            }



        }
    })
}