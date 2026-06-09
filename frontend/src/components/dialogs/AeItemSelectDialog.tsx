import { useRef, useState, useCallback } from "react"
import type { Dialog } from "mdui"
import { throttle } from "mdui"
import * as pinyinPro from "pinyin-pro"
import type { aeModel } from "@oni/interface"
import { numberDisplayConvert } from "../../lib/utils"

const picSource = "https://akyuu.cn/oni/itempanel"
const ITEMS_PER_PAGE = 20

interface SearchState {
  craftable: "all" | "yes" | "no"
  word: string
  sort: "amount" | "amountr" | "id" | "idr"
  type: "all" | "item" | "fluid" | "vis"
  page: number
}

interface ReturnItem {
  display: string
  name: string
  type: string
  damage: number
  id: number
}

let currentResolve: ((item: ReturnItem) => void) | null = null
let currentReject: (() => void) | null = null

export default function AeItemSelectDialog() {
  const dialogRef = useRef<Dialog>(null)
  const [search, setSearch] = useState<SearchState>({
    craftable: "all",
    word: "",
    sort: "amount",
    type: "all",
    page: 1,
  })
  const [currentAe, setCurrentAe] = useState<aeModel.Ae | null>(null)

  // Store current AE data for filtering
  const aeRef = useRef(currentAe)
  aeRef.current = currentAe

  const filteredItems = useCallback(() => {
    if (!aeRef.current) return { items: [], total: 0, hasMore: false }

    let items = [...aeRef.current.items]

    // Filter by type
    if (search.type !== "all") {
      items = items.filter((item: any) => item.type === search.type)
    }

    // Filter by craftable
    if (search.craftable === "yes") {
      items = items.filter((item: any) => item.craftable)
    } else if (search.craftable === "no") {
      items = items.filter((item: any) => !item.craftable)
    }

    // Filter by search word
    if (search.word) {
      const word = search.word
      if (word.startsWith("@")) {
        const modName = word.slice(1).toLowerCase()
        items = items.filter((item: any) =>
          item.name.split(":")[0].toLowerCase().includes(modName)
        )
      } else {
        items = items.filter((item: any) => {
          const display = item.display || ""
          return (
            pinyinPro.match(display, word) ||
            item.name.toLowerCase().includes(word.toLowerCase()) ||
            String(item.id) === word
          )
        })
      }
    }

    // Sort
    items.sort((a: any, b: any) => {
      switch (search.sort) {
        case "amount":
          return b.amount - a.amount
        case "amountr":
          return a.amount - b.amount
        case "id":
          return b.id - a.id
        case "idr":
          return a.id - b.id
        default:
          return 0
      }
    })

    const total = items.length
    const sliced = items.slice(0, search.page * ITEMS_PER_PAGE)
    const hasMore = sliced.length < total

    return { items: sliced, total, hasMore }
  }, [search]) // safe because we use aeRef

  const result = filteredItems()

  const selectItem = useCallback((ae: aeModel.Ae): Promise<ReturnItem> => {
    setCurrentAe(ae)
    setSearch({
      craftable: "all",
      word: "",
      sort: "amount",
      type: "all",
      page: 1,
    })
    if (dialogRef.current) {
      dialogRef.current.open = true
    }

    return new Promise((resolve, reject) => {
      currentResolve = resolve
      currentReject = reject
    })
  }, [])

  // Expose globally
  ;(window as any).selectItem = selectItem

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.open = false
    }
    if (currentReject) {
      currentReject()
      currentReject = null
    }
  }

  const handleItemClick = (item: any) => {
    if (dialogRef.current) {
      dialogRef.current.open = false
    }
    if (currentResolve) {
      currentResolve({
        display: item.display,
        name: item.name,
        type: item.type,
        damage: item.damage || 0,
        id: item.id,
      })
      currentResolve = null
    }
  }

  const updateSearch = (updates: Partial<SearchState>) => {
    setSearch((prev) => ({ ...prev, ...updates, page: 1 }))
  }

  const cycleCraftable = () => {
    setSearch((prev) => {
      const next =
        prev.craftable === "all"
          ? "yes"
          : prev.craftable === "yes"
          ? "no"
          : "all"
      return { ...prev, craftable: next, page: 1 }
    })
  }

  const cycleSort = () => {
    setSearch((prev) => {
      const order = ["amount", "amountr", "id", "idr"] as const
      const idx = order.indexOf(prev.sort)
      const next = order[(idx + 1) % order.length]
      return { ...prev, sort: next, page: 1 }
    })
  }

  const craftableLabel =
    search.craftable === "all"
      ? "库存 / 可合成"
      : search.craftable === "yes"
      ? "仅可合成"
      : "仅库存"

  const sortLabel = {
    amount: "数量排序 ↓",
    amountr: "数量排序 ↑",
    id: "ID 排序 ↓",
    idr: "ID 排序 ↑",
  }[search.sort]

  return (
    <mdui-dialog
      ref={dialogRef}
      id="ae__item-select"
      className="p-0!"
    >
      <div className="card-title flex items-center mb-2 w-[30rem]">
        <mdui-icon
          name="category"
          className="mr-2"
        ></mdui-icon>
        <div>选择一个物品</div>
      </div>

      {/* Type filter chips */}
      <div className="flex mt-6 gap-2">
        {[
          { filter: "all", label: "全部", icon: "all_inclusive" },
          { filter: "item", label: "物品", icon: "category" },
          { filter: "fluid", label: "流体", icon: "water_drop" },
          { filter: "vis", label: "源质", icon: "auto_awesome" },
        ].map((chip) => (
          <mdui-chip
            key={chip.filter}
            className="ae__item-select-filter-button"
            selected={search.type === chip.filter}
            elevated
            icon={chip.icon}
            selectedIcon={chip.icon}
            onClick={() =>
              updateSearch({ type: chip.filter as SearchState["type"] })
            }
          >
            {chip.label}
          </mdui-chip>
        ))}
      </div>

      {/* Search input */}
      <mdui-text-field
        className="mt-2"
        label="检索库存..."
        value={search.word}
        onInput={throttle((e: any) => {
          setSearch((prev) => ({ ...prev, word: e.target.value, page: 1 }))
        }, 100)}
      ></mdui-text-field>

      {/* Filter/sort controls */}
      <div className="flex mt-4 gap-2 mb-2 items-center">
        <mdui-chip
          elevated
          icon="settings_suggest"
          selectedIcon="settings_suggest"
          onClick={cycleCraftable}
        >
          {craftableLabel}
        </mdui-chip>
        <mdui-chip
          elevated
          icon="sort"
          selectedIcon="settings_suggest"
          onClick={cycleSort}
        >
          {sortLabel}
        </mdui-chip>
      </div>

      {/* Item grid */}
      {result.items.length > 0 ? (
        <mdui-card
          className="grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-1 p-3"
        >
          {result.items.map((item: any, idx: number) => {
            let link = ""
            if (item.type === "item") {
              link = `item/${item.id}_${item.damage || 0}.png`
            } else if (item.type === "fluid") {
              link = `fluid/${item.id}.png`
            } else if (item.type === "vis") {
              return null
            }

            return (
              <div
                key={`${item.id}-${item.damage || 0}-${idx}`}
                className="hover-highlight relative cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={`${picSource}/${link}`}
                  className="h-12"
                  alt=""
                />
                <div className="absolute bottom-[1px] right-[1px] text-right [text-shadow:0px_0px_4px_rgba(0,0,0,1)]">
                  {numberDisplayConvert(item.amount)}
                </div>
                {item.craftable && (
                  <mdui-icon
                    name="settings_suggest"
                    className="absolute top-[1px] right-[1px] text-lg text-[rgb(var(--mdui-color-primary))] [text-shadow:0px_0px_4px_rgba(0,0,0,1)]"
                  ></mdui-icon>
                )}
              </div>
            )
          })}

          {result.hasMore && (
            <div className="relative flex items-center justify-center">
              <div className="text-lg opacity-75">...</div>
            </div>
          )}
        </mdui-card>
      ) : (
        <mdui-card className="p-3">
          <div className="text-center opacity-50 my-3">
            没有找到符合条件的物品
          </div>
        </mdui-card>
      )}

      {/* Show more button */}
      {result.hasMore && (
        <mdui-chip
          className="mt-2 p-2 h-auto"
          elevated
          icon="keyboard_arrow_down"
          onClick={() =>
            setSearch((prev) => ({ ...prev, page: prev.page + 1 }))
          }
        >
          显示更多... （还有 {result.total - search.page * ITEMS_PER_PAGE} 项）
        </mdui-chip>
      )}

      <mdui-button
        id="ae__item-select-close"
        className="mt-6"
        variant="outlined"
        full-width
        onClick={handleClose}
      >
        取消
      </mdui-button>
    </mdui-dialog>
  )
}

// Exported for external use
export async function selectItem(ae: aeModel.Ae): Promise<ReturnItem> {
  const fn = (window as any).selectItem
  if (fn) {
    return fn(ae)
  }
  throw new Error("AeItemSelectDialog not initialized")
}
