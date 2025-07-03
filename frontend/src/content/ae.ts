import { layoutModel, wsServerToWebGuard } from "@oni/interface"
import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`
<div id="ae__content" class="panel-content" hidden>

  <div id="ae__topbar">
    <div class="animate__animated animate__fadeInUp animate__faster" style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
      <mdui-text-field variant="outlined" icon="search" label="检索 AE 网络..."></mdui-text-field>
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
  eventEmitter.on("message", m => {
    if (wsServerToWebGuard.isDataAeInit(m)) {

      let layoutList: layoutModel.Layout = [{
        type: "grid-m",
        content: []
      }]

      m.data.forEach(ae => {
        layoutList[0].content.push({
          type: "card",
          id: "ae-overview",
          config: {
            uuid: ae.uuid,
            name: ae.name,
          }
        })
      })
      renderLayout(layoutList, document.getElementById("ae__list")!)

      let layoutEdit: layoutModel.Layout = [{
        type: "raw",
        content: []
      }]

      m.data.forEach(ae => {
        layoutEdit[0].content.push({
          type: "tab",
          id: "ae-edit",
          config: {
            uuid: ae.uuid,
            name: ae.name,
          }
        })
      })

      renderLayout(layoutEdit, document.getElementById("ae__edit")!, false)


      let layoutView: layoutModel.Layout = [{
        type: "raw",
        content: []
      }]

      m.data.forEach(ae => {
        layoutView[0].content.push({
          type: "tab",
          id: "ae-view",
          config: {
            uuid: ae.uuid,
            name: ae.name,
          }
        })
      })

      renderLayout(layoutView, document.getElementById("ae__view")!, false)


    }


  })
}