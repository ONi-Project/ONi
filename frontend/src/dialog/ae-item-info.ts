import type { Button, Dialog } from "mdui"
import { ae } from "../global"
import { numberDisplayConvert } from "../utils"
import { showOrderDialog } from "./ae-order"
import { picSource } from "../settings"

export const html = /*html*/`
<mdui-dialog close-on-overlay-click id="ae__item-info-dialog" style="padding: 0 !important;">

  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="category" style="margin-right: 0.5rem;"></mdui-icon>
    <div>物品信息</div>
  </div>

  <mdui-card style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;padding: 1rem;width: 20rem;">
    <img id="ae__item-info-dialog-icon" src="./resources/itempanel/item/2_0.png" style="height: 3rem;">
    <div id="ae__item-info-dialog-display"></div>
    <div id="ae__item-info-dialog-amount" style="margin-left: auto;opacity: 0.5;">10K</div>
  </mdui-card>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width id="ae__item-info-dialog-close-button" variant="outlined" style="flex: 1">关闭</mdui-button>
    <mdui-button full-width id="ae__item-info-dialog-request-button" style="flex: 4">请求合成</mdui-button>
  </div>

</mdui-dialog>
`

export function init() {
  document.getElementById("ae__item-info-dialog-close-button")!.addEventListener("click", _event => {
    (document.getElementById("ae__item-info-dialog") as Dialog).open = false
  })

  document.getElementById("ae__item-info-dialog-request-button")!.addEventListener("click", _event => {
    (document.getElementById("ae__item-info-dialog") as Dialog).open = false
  })

}

export function showItemInfo(aeuuid: string, id: string, damage: string, type: string) {

  let item: any

  if (type == "item") {
    item = ae.find((ae: any) => ae.uuid == aeuuid).itemList.find((item: any) => item.type == "item" && item.id == id && item.damage == damage)
  } else if (type == "fluid") {
    item = ae.find((ae: any) => ae.uuid == aeuuid).itemList.find((item: any) => item.type == "fluid" && item.id == id)
  } else if (type == "vis") {
    // TODO: vis
  }

  let link = ""

  if (type == "item") {
    link = `item/${item.id}_${item.damage}.png`
  } else if (type == "fluid") {
    link = `fluid/${item.id}.png`
  } else if (type == "vis") {
    link = `vis/${item.id}.png`
  }

  console.log(item)

  document.getElementById("ae__item-info-dialog-display")!.innerHTML = item.display
  document.getElementById("ae__item-info-dialog-amount")!.innerHTML = numberDisplayConvert(item.amount)
  document.getElementById("ae__item-info-dialog-icon")!.setAttribute("src", `${picSource}/${link}`)
  const btn = document.getElementById("ae__item-info-dialog-request-button") as Button
  btn.disabled = !item.craftable
  btn.onclick = () => { showOrderDialog(aeuuid, item) }

  (document.getElementById("ae__item-info-dialog") as Dialog).open = true

}