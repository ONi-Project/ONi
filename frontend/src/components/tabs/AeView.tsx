import { useState, useCallback, useRef } from "react"
import { throttle } from "mdui"
import * as pinyinPro from "pinyin-pro"
import { useDataStore } from "../../stores/useDataStore"
import {
  numberDisplayConvert,
  timePassedDisplayConvert,
  timeDisplayConvert,
  timeLengthDisplayConvert,
  commaNumberDisplayConvert,
  isMobileDevice,
} from "../../lib/utils"

const picSource = "https://akyuu.cn/oni/itempanel"

interface AeViewProps {
  uuid: string
  onBack: () => void
}

export default function AeView({ uuid, onBack }: AeViewProps) {
  const ae = useDataStore((s) => s.ae)
  const targetAe = ae.find((a) => a.uuid === uuid)

  const [filterType, setFilterType] = useState<string>("all")
  const [filterCraftable, setFilterCraftable] = useState<string>("all")
  const [filterSort, setFilterSort] = useState<string>("amount")
  const [filterWord, setFilterWord] = useState("")
  const [filterPage, setFilterPage] = useState(1)
  const [cpusShowMore, setCpusShowMore] = useState(false)
  const itemsPerPage = 40
  const cpusPerPage = 8
  const tooltipRef = useRef<HTMLDivElement>(null)

  if (!targetAe) {
    return <div>AE 网络未找到</div>
  }

  const aeData = targetAe

  // Item filtering logic
  const filteredItems = (() => {
    let items = [...(aeData.items || [])]

    // Type filter
    if (filterType !== "all") {
      items = items.filter((item: any) => item.type === filterType)
    }

    // Craftable filter
    if (filterCraftable === "yes") {
      items = items.filter((item: any) => item.craftable)
    } else if (filterCraftable === "no") {
      items = items.filter((item: any) => !item.craftable)
    }

    // Word search
    if (filterWord) {
      if (filterWord.startsWith("@")) {
        const modName = filterWord.slice(1).toLowerCase()
        items = items.filter((item: any) =>
          item.name.split(":")[0].toLowerCase().includes(modName)
        )
      } else {
        items = items.filter((item: any) => {
          const display = item.display || ""
          return (
            pinyinPro.match(display, filterWord) ||
            item.name.toLowerCase().includes(filterWord.toLowerCase()) ||
            String(item.id) === filterWord
          )
        })
      }
    }

    // Sort
    items.sort((a: any, b: any) => {
      switch (filterSort) {
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
    const sliced = items.slice(0, filterPage * itemsPerPage)
    const hasMore = sliced.length < total

    return { items: sliced, total, hasMore }
  })()

  // CPU list
  const cpus = [...(aeData.cpus || [])].sort((a: any, b: any) => {
    if (a.busy && b.busy) return 0
    if (a.busy) return -1
    return 1
  })
  const cpusDisplay = cpusShowMore
    ? cpus
    : cpus.slice(0, cpusPerPage)

  const handleItemClick = (item: any) => {
    const fn = (window as any).showItemInfo
    if (fn) {
      fn(uuid, item.id, item.damage || 0, item.type)
    }
  }

  const handleItemMouseOver = (e: React.MouseEvent, item: any) => {
    if (isMobileDevice()) return
    const tooltip = tooltipRef.current
    if (!tooltip) return

    let modBar = ""
    let craftableBar = ""

    if (item.type === "item") {
      modBar = `<div style="font-size: smaller; color: #88f;">${item.name.split(":")[0]}</div>`
    } else if (item.type === "fluid") {
      modBar = `<div style="font-size: smaller; color: #bbb;">${item.name}</div>`
    }
    if (item.craftable) {
      craftableBar = `<div style="font-size: smaller; color: #888;">可合成</div>`
    }

    tooltip.style.display = "block"
    tooltip.innerHTML = `
      <div>${item.display}</div>
      ${modBar}
      ${craftableBar}
      <div style="font-size: smaller; color: #888;">数量：${commaNumberDisplayConvert(Number(item.amount))}</div>
    `
    tooltip.style.left = e.pageX + 10 + "px"
    tooltip.style.top = e.pageY + 10 + "px"
  }

  const handleItemMouseOut = () => {
    const tooltip = tooltipRef.current
    if (tooltip) tooltip.style.display = "none"
  }

  const renderCraftableLabel = () => {
    if (filterCraftable === "all") return "库存 / 可合成"
    if (filterCraftable === "yes") return "仅可合成"
    return "仅库存"
  }

  const renderSortLabel = () => {
    const labels: Record<string, string> = {
      amount: "数量排序 ↓",
      amountr: "数量排序 ↑",
      id: "ID 排序 ↓",
      idr: "ID 排序 ↑",
    }
    return labels[filterSort] || ""
  }

  return (
    <div className="ae__view">
      {/* Header */}
      <div className="flex items-center mb-2 gap-2">
        <mdui-button-icon
          icon="arrow_back"
          onClick={onBack}
        ></mdui-button-icon>
        <div className="font-bold text-lg">
          查看 - {aeData.name}
        </div>
      </div>

      {/* Info card */}
      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div className="flex items-center gap-2">
            <mdui-icon
              name="grid_on--outlined"
              className="text-[2rem]"
            ></mdui-icon>
            <div>
              <div className="text-lg whitespace-nowrap">
                <b>{aeData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              className="ml-2 mr-2"
            ></mdui-divider>
            <div>
              <div className="opacity-100">
                {timePassedDisplayConvert(aeData.timeUpdated)}
              </div>
              <div className="opacity-25 text-sm">
                {aeData.uuid}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="schedule"></mdui-icon>
              <div>
                {timeDisplayConvert(aeData.timeCreated)}
              </div>
            </div>
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="memory"></mdui-icon>
              <div>
                {aeData.cpus?.filter((c: any) => !c.busy).length || 0} /{" "}
                {aeData.cpus?.length || 0} 核心空闲
              </div>
            </div>
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="category"></mdui-icon>
              <div>test</div>
            </div>
          </div>
        </mdui-card>
      </div>

      {/* CPU and Inventory */}
      <div className="grid-l">
        {/* CPU Card */}
        <mdui-card className="card" variant="filled">
          <div className="card-title flex items-center gap-2">
            <mdui-icon
              name="memory"
              className="text-[32px] self-center"
            ></mdui-icon>
            <div>CPU</div>
          </div>

          <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-2">
            {cpusDisplay.length > 0 ? (
              cpusDisplay.map((cpu: any, i: number) => {
                const finalOutputTotal =
                  cpu.busy && cpu.finalOutput ? cpu.finalOutput.total : -1
                const finalOutputAmount =
                  cpu.busy && cpu.finalOutput ? cpu.finalOutput.amount : 0
                const icon = cpu.busy
                  ? "settings_suggest"
                  : "download_done"
                const iconBig = cpu.busy
                  ? "hourglass_bottom"
                  : "schedule"
                const nameStr = cpu.name ? `- "${cpu.name}"` : ""
                const timeStarted = cpu.timeStarted || 0
                const timeStartedStr = cpu.timeStarted
                  ? timeLengthDisplayConvert(timeStarted)
                  : ""
                const finalOutputDisplay = cpu.finalOutput
                  ? cpu.finalOutput.display
                  : ""
                const statusStr = cpu.busy
                  ? `合成中 · ${timeStartedStr}`
                  : `空闲 · ${cpu.storage / 1024}K`

                const finalOutput =
                  cpu.busy
                    ? `<div style="margin-top: .5rem;margin-bottom: .5rem;"><b>${finalOutputDisplay}</b> - ${
                        finalOutputTotal - finalOutputAmount
                      } / ${finalOutputTotal}</div>`
                    : ""

                const percentage = (
                  ((finalOutputTotal - finalOutputAmount) /
                    finalOutputTotal) *
                  100
                ).toFixed(0)

                const progressBar = cpu.busy
                  ? `<div style="display: flex;align-items: center;margin-bottom: 0.25rem;">
                        <div style="opacity: 0.5;">${percentage}%&nbsp;&nbsp;</div>
                        <mdui-linear-progress value="${percentage}" min="0" max="100"></mdui-linear-progress>
                      </div>`
                  : ""

                return (
                  <mdui-card
                    key={cpu.uuid || i}
                    className="p-4 pl-5 pr-5 relative"
                  >
                    <div className="flex items-center">
                      <mdui-icon
                        name={iconBig}
                        className="absolute top-4 right-4 opacity-10 text-[3rem]"
                      ></mdui-icon>
                      <mdui-icon name={icon}></mdui-icon>
                      &nbsp;&nbsp;
                      <div>
                        <div>
                          CPU {i}{" "}
                          <span className="opacity-70">{nameStr}</span>
                        </div>
                        <div
                          className="font-normal text-sm opacity-50"
                          dangerouslySetInnerHTML={{ __html: statusStr }}
                        />
                      </div>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: finalOutput }}
                    />
                    <div
                      dangerouslySetInnerHTML={{ __html: progressBar }}
                    />
                  </mdui-card>
                )
              })
            ) : (
              <mdui-card className="p-3">
                <div className="text-center opacity-50 my-3">
                  没有找到 CPU 信息
                </div>
              </mdui-card>
            )}
          </div>

          {cpus.length > cpusPerPage && (
            <mdui-chip
              elevated
              icon={
                cpusShowMore ? "keyboard_arrow_up" : "keyboard_arrow_down"
              }
              className="p-2 h-auto"
              onClick={() => setCpusShowMore(!cpusShowMore)}
            >
              {cpusShowMore ? "收起 CPU 列表" : "展开 CPU 列表..."}
            </mdui-chip>
          )}
        </mdui-card>

        {/* Inventory Card */}
        <mdui-card className="card" variant="filled">
          <div className="card-title flex items-center gap-2">
            <mdui-icon
              name="storage"
              className="text-[28px] self-center"
            ></mdui-icon>
            <div>库存</div>
          </div>

          {/* Type filter buttons */}
          <div className="flex mt-2 gap-2">
            {[
              { filter: "all", label: "全部", icon: "all_inclusive" },
              { filter: "item", label: "物品", icon: "category" },
              { filter: "fluid", label: "流体", icon: "water_drop" },
              { filter: "vis", label: "源质", icon: "auto_awesome" },
            ].map((btn) => (
              <mdui-chip
                key={btn.filter}
                selected={filterType === btn.filter}
                elevated
                icon={btn.icon}
                selectedIcon={btn.icon}
                onClick={() => {
                  setFilterType(btn.filter)
                  setFilterPage(1)
                }}
              >
                {btn.label}
              </mdui-chip>
            ))}
          </div>

          {/* Search input */}
          <mdui-text-field
            label="检索库存..."
            value={filterWord}
            onInput={throttle((e: any) => {
              setFilterWord(e.target.value)
              setFilterPage(1)
            }, 100)}
          ></mdui-text-field>

          {/* Sort/filter controls */}
          <div className="flex mt-2 gap-2 mb-0 items-center">
            <mdui-chip
              elevated
              icon="settings_suggest"
              selectedIcon="settings_suggest"
              onClick={() => {
                setFilterCraftable((prev) => {
                  if (prev === "all") return "yes"
                  if (prev === "yes") return "no"
                  return "all"
                })
                setFilterPage(1)
              }}
            >
              {renderCraftableLabel()}
            </mdui-chip>
            <mdui-chip
              elevated
              icon="sort"
              selectedIcon="settings_suggest"
              onClick={() => {
                setFilterSort((prev) => {
                  const order = [
                    "amount",
                    "amountr",
                    "id",
                    "idr",
                  ]
                  const idx = order.indexOf(prev)
                  return order[(idx + 1) % order.length]
                })
                setFilterPage(1)
              }}
            >
              {renderSortLabel()}
            </mdui-chip>
          </div>

          {/* Item grid */}
          {filteredItems.items.length > 0 ? (
            <mdui-card className="grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-1 p-3">
              {filteredItems.items.map((item: any, idx: number) => {
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
                    onMouseMove={(e) => handleItemMouseOver(e, item)}
                    onMouseOut={handleItemMouseOut}
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

              {filteredItems.hasMore && (
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
          {filteredItems.hasMore && (
            <mdui-chip
              elevated
              icon="keyboard_arrow_down"
              className="p-2 h-auto"
              onClick={() =>
                setFilterPage((prev) => prev + 1)
              }
            >
              显示更多... （还有{" "}
              {filteredItems.total -
                filterPage * itemsPerPage}{" "}
              项）
            </mdui-chip>
          )}
        </mdui-card>
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        id="tooltip-ae"
        className="tooltip"
        style={{ display: "none", position: "fixed", zIndex: 9999 }}
      ></div>
    </div>
  )
}
