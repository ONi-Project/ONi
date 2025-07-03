import { layoutModel, wsServerToWebGuard } from "@oni/interface"
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
    eventEmitter.on("message", m => {
        if (wsServerToWebGuard.isDataBotInit(m)) {

            let layoutList: layoutModel.Layout = [{
                type: "grid-m",
                content: []
            }]

            m.data.forEach(bot => {
                layoutList[0].content.push({
                    type: "card",
                    id: "bot-overview",
                    config: {
                        uuid: bot.uuid,
                        name: bot.name,
                    }
                })
            })


            renderLayout(layoutList, document.getElementById("bot__list")!)



            let layoutEdit: layoutModel.Layout = [{
                type: "raw",
                content: []
            }]

            m.data.forEach(bot => {
                layoutEdit[0].content.push({
                    type: "tab",
                    id: "bot-edit",
                    config: {
                        uuid: bot.uuid,
                        name: bot.name,
                    }
                })
            })


            renderLayout(layoutEdit, document.getElementById("bot__edit")!, false)


        }
    })
}