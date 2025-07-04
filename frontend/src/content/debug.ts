import { Select, TextField } from "mdui"
import { eventEmitter, send } from "../websocket"
import { bot } from "../global"

export const html = /*html*/ `
<div id="debug__content" class="panel-content" hidden>
  <div class="grid-full animate__animated animate__fadeIn animate__faster">

    <mdui-card variant="filled" class="card">
      <div class="card-title" style="margin-bottom: 0.5rem;">Websocket 发送 · 服务端 → OC</div>
      <mdui-text-field autosize min-rows="3" clearable label="要发送的数据..." id="debug__ws-input"></mdui-text-field>
      <mdui-select label="选择目标 BOT..." id="debug__ws-select-bot">
        <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
        <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
      </mdui-select>
      <mdui-chip elevated style="margin-right: auto;margin-top: 0.5rem;" id="debug__ws-button-send">
        发送
        <mdui-icon slot="icon" name="send"></mdui-icon>
      </mdui-chip>
    </mdui-card>

    <mdui-card variant="filled" class="card">
      <div class="card-title" style="margin-bottom: 0.5rem;">Dialog</div>
      <div style="display: flex;flex-wrap: wrap;gap: 0.5rem;">
        <mdui-chip elevated style="margin-top: 0.5rem;" onclick="document.getElementById('ae__order-dialog').open=true">
          ae__order-dialog
          <mdui-icon slot="icon" name="grid_on"></mdui-icon>
        </mdui-chip>
        <mdui-chip elevated style="margin-top: 0.5rem;" onclick="dialog__botTaskUpdate();document.getElementById('bot__task-dialog-step1').open=true">
          bot__task-dialog-step1
          <mdui-icon slot="icon" name="add_task"></mdui-icon>
        </mdui-chip>
        <mdui-chip elevated style="margin-top: 0.5rem;" onclick="document.getElementById('ae__item-info-dialog').open=true">
          ae__item-info-dialog
          <mdui-icon slot="icon" name="category"></mdui-icon>
        </mdui-chip>
      </div>
    </mdui-card>

  </div>
</div>
`
export function init() {

    eventEmitter.on("message", (event: any) => {
        const { type, data } = event.data
        data //
        if (type == "global/bot") {
            const e = document.getElementById("debug__ws-select-bot")!
            let _ = ""
            bot.forEach((bot: any) => {
                _ += `<mdui-menu-item value="${bot.uuid}">${bot.name}</mdui-menu-item>`
            })
            e.innerHTML = _
        }
    })

    document.getElementById("debug__ws-button-send")!.addEventListener("click", async () => {
        // const data = (document.getElementById("debug__ws-input") as TextField).value
        // const target = (document.getElementById("debug__ws-select-bot") as Select)!.value
        // send({ type: "oc/forward", target: target, data: JSON.parse(data) })
    })

    // document.getElementById("ae__item-info-dialog").open = true
}