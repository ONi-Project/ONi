import { useRef, useState, useCallback } from "react"
import type { Dialog } from "mdui"
import { useDataStore } from "../../stores/useDataStore"
import { numberDisplayConvert } from "../../lib/utils"
import { showOrderDialog } from "./AeOrderDialog"

const picSource = "https://akyuu.cn/oni/itempanel"

export default function AeItemInfoDialog() {
  const dialogRef = useRef<Dialog>(null)
  const ae = useDataStore((s) => s.ae)

  const [display, setDisplay] = useState("")
  const [amount, setAmount] = useState("")
  const [iconSrc, setIconSrc] = useState("")
  const [craftable, setCraftable] = useState(false)

  // Store item info for order request
  const itemRef = useRef<{ aeuuid: string; item: any } | null>(null)

  const showItemInfo = useCallback(
    (aeuuid: string, id: number, damage: number, itemType: string) => {
      const targetAe = ae.find((a) => a.uuid === aeuuid)
      if (!targetAe) return

      let item: any

      if (itemType === "item") {
        item = targetAe.items.find(
          (i: any) => i.type === "item" && i.id === id && i.damage === damage
        )
      } else if (itemType === "fluid") {
        item = targetAe.items.find(
          (i: any) => i.type === "fluid" && i.id === id
        )
      } else if (itemType === "vis") {
        return
      }

      if (!item) return

      let link = ""
      if (itemType === "item") {
        link = `item/${item.id}_${item.damage}.png`
      } else if (itemType === "fluid") {
        link = `fluid/${item.id}.png`
      } else if (itemType === "vis") {
        link = `vis/${item.id}.png`
      }

      setDisplay(item.display)
      setAmount(numberDisplayConvert(item.amount))
      setIconSrc(`${picSource}/${link}`)
      setCraftable(item.craftable)
      itemRef.current = { aeuuid, item }

      if (dialogRef.current) {
        dialogRef.current.open = true
      }
    },
    [ae]
  )

  // Always keep window.showItemInfo pointing to latest callback
  const showItemInfoRef = useRef(showItemInfo)
  showItemInfoRef.current = showItemInfo
  ;(window as any).showItemInfo = (...args: any[]) =>
    showItemInfoRef.current(...(args as [string, number, number, string]))

  const handleRequestOrder = () => {
    if (itemRef.current) {
      showOrderDialog(itemRef.current.aeuuid, itemRef.current.item)
    }
    if (dialogRef.current) {
      dialogRef.current.open = false
    }
  }

  return (
    <mdui-dialog
      ref={dialogRef}
      close-on-overlay-click
      id="ae__item-info-dialog"
      style={{ padding: "0 !important" }}
    >
      <div
        className="card-title"
        style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
      >
        <mdui-icon name="category" style={{ marginRight: "0.5rem" }}></mdui-icon>
        <div>物品信息</div>
      </div>

      <mdui-card
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "1rem",
          padding: "1rem",
          width: "20rem",
        }}
      >
        <img
          id="ae__item-info-dialog-icon"
          src={iconSrc || "./resources/itempanel/item/2_0.png"}
          style={{ height: "3rem" }}
          alt=""
        />
        <div id="ae__item-info-dialog-display">{display}</div>
        <div
          id="ae__item-info-dialog-amount"
          style={{ marginLeft: "auto", opacity: 0.5 }}
        >
          {amount}
        </div>
      </mdui-card>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <mdui-button
          full-width
          id="ae__item-info-dialog-close-button"
          variant="outlined"
          style={{ flex: 1 }}
          onClick={() => { dialogRef.current!.open = false }}
        >
          关闭
        </mdui-button>
        <mdui-button
          full-width
          id="ae__item-info-dialog-request-button"
          style={{ flex: 4 }}
          disabled={!craftable}
          onClick={handleRequestOrder}
        >
          请求合成
        </mdui-button>
      </div>
    </mdui-dialog>
  )
}
