import { Dialog, snackbar } from "mdui"
import { picSource } from "../settings"
import { Parser } from "expr-eval"
import { eventEmitter, send } from "../websocket"
import { randomUUID } from "../utils"
import { newWebToServerMessage } from "@oni/interface"

export const html = /*html*/`
<mdui-dialog id="ae__order-dialog" style="padding: 0 !important;">

  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="send" style="margin-right: 0.5rem;"></mdui-icon>
    <div>请求订单</div>
  </div>

  <mdui-card style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;padding: 1rem;">
    <img id="ae__order-item-img" src="./resources/itempanel/item/8207_0.png" style="height: 3rem;">
    <div id="ae__order-item-display"></div>
    <div id="ae__order-item-amount" style="margin-left: auto;opacity: 0.5;"></div>
  </mdui-card>

  <div style="display: flex;align-items: center;gap: 0.25rem;margin-top: 1rem;">
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-minus-100" icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-100</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-minus-10" icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-10</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-minus-1" icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-1</div>
    </div>
    <mdui-text-field id="ae__order-amount-input" style="margin-top: 0.25rem;" label="请求数量" value="1"></mdui-text-field>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-plus-1" icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+1</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-plus-10" icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+10</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon id="ae__order-plus-100" icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+100</div>
    </div>
  </div>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button id="ae__order-cancel" full-width variant="outlined" style="flex: 1">取消</mdui-button>
    <mdui-button id="ae__order-submit" full-width style="flex: 4">提交</mdui-button>
  </div>

  <data hidden></data>

</mdui-dialog>
`

let aeUuid = ""
let item: any

export function init() {

  const minus100 = document.getElementById("ae__order-minus-100")!
  const minus10 = document.getElementById("ae__order-minus-10")!
  const minus1 = document.getElementById("ae__order-minus-1")!
  const plus1 = document.getElementById("ae__order-plus-1")!
  const plus10 = document.getElementById("ae__order-plus-10")!
  const plus100 = document.getElementById("ae__order-plus-100")!

  minus100.addEventListener("click", () => {
    numberAdjust(-100)
  })
  minus10.addEventListener("click", () => {
    numberAdjust(-10)
  })
  minus1.addEventListener("click", () => {
    numberAdjust(-1)
  })
  plus1.addEventListener("click", () => {
    numberAdjust(1)
  })
  plus10.addEventListener("click", () => {
    numberAdjust(10)
  })
  plus100.addEventListener("click", () => {
    numberAdjust(100)
  })

  const dialog = document.getElementById("ae__order-dialog") as Dialog
  const input = document.getElementById("ae__order-amount-input") as HTMLInputElement

  function numberAdjust(adjustValue: number) {
    const currentValue = parseInt(input.value)
    const result = currentValue + adjustValue
    if (isNaN(result) || result <= 0) {
      input.value = "1"
    } else {
      input.value = result.toString()
    }
  }

  document.getElementById("ae__order-cancel")!.addEventListener("click", () => {
    dialog.open = false
  })

  document.getElementById("ae__order-submit")!.addEventListener("click", () => {
    const taskUuid = randomUUID()
    send(newWebToServerMessage("AeOrder", {
      uuid: aeUuid,
      taskUuid: taskUuid,
      name: item.name,
      damage: item.damage,
      amount: parseInt(input.value)
    }))
    const submitBtn = document.getElementById("ae__order-submit")!
    let processed: boolean
    submitBtn.setAttribute("disabled", "true")
    submitBtn.setAttribute("loading", "true")
    function waitingForMessage(event: any) {
      const { type, data } = event.data
      if (type === "ae/order/result" && data.taskUuid === taskUuid) {
        submitBtn.removeAttribute("loading")
        submitBtn.removeAttribute("disabled")
        if (data.success) {
          dialog.open = false
          processed = true
          snackbar({
            message: "订单提交成功。",
            autoCloseDelay: 5000,
            closeable: true
          })
        } else {
          processed = true
          snackbar({
            message: "订单提交失败，可能是原料不足或没有可用的 CPU。",
            autoCloseDelay: 0,
            closeable: true
          })
        }
      }
    }
    eventEmitter.on("message", waitingForMessage)
    setTimeout(() => {
      eventEmitter.off("message", waitingForMessage)
      submitBtn.removeAttribute("loading")
      submitBtn.removeAttribute("disabled")
      if (!processed) {
        snackbar({
          message: "请求超时。",
          autoCloseDelay: 0,
          closeable: true
        })
      }
    }, 60000)
  })

  input.addEventListener("blur", () => {
    try {
      let result = Parser.parse(input.value).evaluate()
      if (isNaN(result) || result <= 0) {
        input.value = "1"
      } else {
        input.value = Math.floor(result).toString()
      }
    } catch (e) {
      input.value = "1"
    }
  })

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      input.blur()
    }
  })
}

export function showOrderDialog(uuid: string, itm: any) {
  const dialog = document.getElementById("ae__order-dialog") as Dialog
  const elemImg = document.getElementById("ae__order-item-img") as HTMLImageElement
  const elemDisplay = document.getElementById("ae__order-item-display") as HTMLElement
  const elemAmount = document.getElementById("ae__order-item-amount") as HTMLElement
  const input = document.getElementById("ae__order-amount-input") as HTMLInputElement

  let link = ""

  input.value = "1"

  if (itm.type == "item") {
    link = `item/${itm.id}_${itm.damage}.png`
  } else if (itm.type == "fluid") {
    link = `fluid/${itm.id}.png`
  } else if (itm.type == "vis") {
    link = `vis/${itm.id}.png`
  }

  elemImg.src = `${picSource}/${link}`
  elemDisplay.innerText = itm.display
  elemAmount.innerText = `库存数量：${itm.amount}`

  aeUuid = uuid
  item = itm

  dialog.open = true
}