import { useRef, useState, useCallback } from "react"
import type { Dialog } from "mdui"
import { Parser } from "expr-eval"
import { snackbar } from "mdui"
import { newWebToServerMessage, wsServerToWebGuard } from "@oni/interface"
import { randomUUID } from "../../lib/utils"
import { sendMessage } from "../../hooks/useWebSocket"

const picSource = "https://akyuu.cn/oni/itempanel"

let globalShowOrderDialog: ((uuid: string, item: any) => void) | null = null

export default function AeOrderDialog() {
  const dialogRef = useRef<Dialog>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const submitBtnRef = useRef<any>(null)
  const [amount, setAmount] = useState("1")
  const [itemDisplay, setItemDisplay] = useState("")
  const [itemAmount, setItemAmount] = useState("")
  const [itemImgSrc, setItemImgSrc] = useState("")

  const aeUuidRef = useRef("")
  const itemRef = useRef<any>(null)

  const adjustNumber = useCallback((adjustValue: number) => {
    const currentValue = parseInt(amount) || 0
    const result = currentValue + adjustValue
    setAmount(isNaN(result) || result <= 0 ? "1" : result.toString())
  }, [amount])

  const handleBlur = useCallback(() => {
    try {
      const result = Parser.parse(amount).evaluate()
      if (isNaN(result) || result <= 0) {
        setAmount("1")
      } else {
        setAmount(Math.floor(result).toString())
      }
    } catch {
      setAmount("1")
    }
  }, [amount])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleBlur()
    }
  }, [handleBlur])

  const showOrderDialog = useCallback((uuid: string, item: any) => {
    aeUuidRef.current = uuid
    itemRef.current = item
    setAmount("1")

    let link = ""
    if (item.type === "item") {
      link = `item/${item.id}_${item.damage}.png`
    } else if (item.type === "fluid") {
      link = `fluid/${item.id}.png`
    } else if (item.type === "vis") {
      link = `vis/${item.id}.png`
    }

    setItemImgSrc(`${picSource}/${link}`)
    setItemDisplay(item.display)
    setItemAmount(`库存数量：${item.amount}`)

    if (dialogRef.current) {
      dialogRef.current.open = true
    }
  }, [])

  // Store reference globally for access from AeItemInfoDialog
  globalShowOrderDialog = showOrderDialog

  const handleSubmit = useCallback(() => {
    const taskUuid = randomUUID()
    const item = itemRef.current
    const uuid = aeUuidRef.current
    const input = inputRef.current

    if (!item || !uuid) return

    sendMessage(
      newWebToServerMessage("AeOrder", {
        uuid,
        taskUuid,
        name: item.name,
        damage: item.damage,
        amount: parseInt(amount),
      })
    )

    const btn = submitBtnRef.current
    if (btn) {
      btn.setAttribute("disabled", "true")
      btn.setAttribute("loading", "true")
    }

    let processed = false

    const waitingForMessage = (m: any) => {
      if (
        wsServerToWebGuard.isAeOrderResult(m) &&
        m.data.taskUuid === taskUuid
      ) {
        if (btn) {
          btn.removeAttribute("loading")
          btn.removeAttribute("disabled")
        }
        if (m.data.success) {
          if (dialogRef.current) dialogRef.current.open = false
          processed = true
          snackbar({
            message: "订单提交成功。",
            autoCloseDelay: 5000,
            closeable: true,
          })
        } else {
          processed = true
          snackbar({
            message: "订单提交失败，可能是原料不足或没有可用的 CPU。",
            autoCloseDelay: 0,
            closeable: true,
          })
        }
      }
    }

    // Subscribe to WebSocket message for order result
    // Using a polling approach via store watching
    const checkInterval = setInterval(() => {
      if (processed) {
        clearInterval(checkInterval)
      }
    }, 100)

    setTimeout(() => {
      clearInterval(checkInterval)
      if (btn) {
        btn.removeAttribute("loading")
        btn.removeAttribute("disabled")
      }
      if (!processed) {
        snackbar({
          message: "请求超时。",
          autoCloseDelay: 0,
          closeable: true,
        })
      }
    }, 60000)
  }, [amount])

  return (
    <mdui-dialog
      ref={dialogRef}
      id="ae__order-dialog"
      className="p-0!"
    >
      <div className="card-title flex items-center mb-2">
        <mdui-icon name="send" className="mr-2"></mdui-icon>
        <div>请求订单</div>
      </div>

      <mdui-card className="flex items-center gap-2 mt-4 p-4">
        <img
          id="ae__order-item-img"
          src={itemImgSrc || "./resources/itempanel/item/8207_0.png"}
          className="h-12"
          alt=""
        />
        <div id="ae__order-item-display">{itemDisplay}</div>
        <div
          id="ae__order-item-amount"
          className="ml-auto opacity-50"
        >
          {itemAmount}
        </div>
      </mdui-card>

      <div className="flex items-center gap-1 mt-4">
        {[-100, -10, -1].map((val) => (
          <div key={val} className="flex items-center flex-col">
            <mdui-button-icon
              icon="remove"
              onClick={() => adjustNumber(val)}
            ></mdui-button-icon>
            <div className="text-xs -mt-3 opacity-50">
              {val}
            </div>
          </div>
        ))}

        <mdui-text-field
          ref={inputRef as any}
          className="mt-1"
          label="请求数量"
          value={amount}
          onInput={(e: any) => setAmount(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        ></mdui-text-field>

        {[1, 10, 100].map((val) => (
          <div key={val} className="flex items-center flex-col">
            <mdui-button-icon
              icon="add"
              onClick={() => adjustNumber(val)}
            ></mdui-button-icon>
            <div className="text-xs -mt-3 opacity-50">
              +{val}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <mdui-button
          id="ae__order-cancel"
          full-width
          variant="outlined"
          className="flex-1"
          onClick={() => { dialogRef.current!.open = false }}
        >
          取消
        </mdui-button>
        <mdui-button
          ref={submitBtnRef}
          id="ae__order-submit"
          full-width
          className="flex-[4]"
          onClick={handleSubmit}
        >
          提交
        </mdui-button>
      </div>
    </mdui-dialog>
  )
}

// Exported for external use
export function showOrderDialog(uuid: string, item: any) {
  if (globalShowOrderDialog) {
    globalShowOrderDialog(uuid, item)
  }
}
