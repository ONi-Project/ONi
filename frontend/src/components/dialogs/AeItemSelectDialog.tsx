import { useRef, useState, useCallback, useEffect } from "react"
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

  const filteredItems = useCallback(() => {
    if (!currentAe) return { items: [], total: 0, hasMore: false }

    let items = [...currentAe.items]

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
  }, [currentAe, search])

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
      style={{ padding: "0 !important" }}
    >
      <div
        className="card-title"
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          width: "30rem",
        }}
      >
        <mdui-icon
          name="category"
          style={{ marginRight: "0.5rem" }}
        ></mdui-icon>
        <div>选择一个物品</div>
      </div>

      {/* Type filter chips */}
      <div style={{ display: "flex", marginTop: "1.5rem", gap: "0.5rem" }}>
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
        style={{ marginTop: "0.5rem" }}
        className="ae__item-select-storage-filter-search-input"
        label="检索库存..."
        value={search.word}
        onInput={throttle((e: any) => {
          setSearch((prev) => ({ ...prev, word: e.target.value, page: 1 }))
        }, 100)}
      ></mdui-text-field>

      {/* Filter/sort controls */}
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          gap: "0.5rem",
          marginBottom: "0.5rem",
          alignItems: "center",
        }}
      >
        <mdui-chip
          className="ae__item-select-storage-filter-craftable-button"
          elevated
          icon="settings_suggest"
          selectedIcon="settings_suggest"
          onClick={cycleCraftable}
        >
          {craftableLabel}
        </mdui-chip>
        <mdui-chip
          className="ae__item-select-storage-filter-sort-button"
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
          className="ae__item-select-item-list"
          style={{
            display: "grid",
            padding: "0.75rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(3rem, 1fr))",
            gap: "0.25rem",
          }}
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
                className="hover-highlight ae__item-select-item-list-item"
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={`${picSource}/${link}`}
                  style={{ height: "3rem" }}
                  alt=""
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1px",
                    right: "1px",
                    textAlign: "right",
                    textShadow: "0px 0px 4px rgba(0,0,0,1)",
                  }}
                >
                  {numberDisplayConvert(item.amount)}
                </div>
                {item.craftable && (
                  <mdui-icon
                    name="settings_suggest"
                    style={{
                      position: "absolute",
                      top: "1px",
                      right: "1px",
                      fontSize: "18px",
                      color: "rgb(var(--mdui-color-primary))",
                      textShadow: "0px 0px 4px rgba(0,0,0,1)",
                    }}
                  ></mdui-icon>
                )}
              </div>
            )
          })}

          {result.hasMore && (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "large", opacity: 0.75 }}>...</div>
            </div>
          )}
        </mdui-card>
      ) : (
        <mdui-card
          className="ae__item-select-item-list-nothing"
          style={{ padding: "0.75rem" }}
        >
          <div
            style={{
              textAlign: "center",
              opacity: 0.5,
              marginTop: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            没有找到符合条件的物品
          </div>
        </mdui-card>
      )}

      {/* Show more button */}
      {result.hasMore && (
        <mdui-chip
          style={{ marginTop: "0.5rem", padding: "0.5rem", height: "auto" }}
          className="ae__item-select-item-list-more-button"
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
        style={{ marginTop: "1.5rem" }}
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
