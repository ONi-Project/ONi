import { useState, useCallback, useRef, useEffect } from "react"
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          gap: "0.5rem",
        }}
      >
        <mdui-button-icon
          icon="arrow_back"
          className="ae__view-back"
          onClick={onBack}
        ></mdui-button-icon>
        <div style={{ fontWeight: "bold", fontSize: "large" }}>
          查看 - {aeData.name}
        </div>
      </div>

      {/* Info card */}
      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <mdui-icon
              name="grid_on--outlined"
              style={{ fontSize: "2rem" }}
            ></mdui-icon>
            <div>
              <div style={{ fontSize: "larger", whiteSpace: "nowrap" }}>
                <b>{aeData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            ></mdui-divider>
            <div>
              <div className="ae__overview-time-updated" style={{ opacity: 1 }}>
                {timePassedDisplayConvert(aeData.timeUpdated)}
              </div>
              <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                {aeData.uuid}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="schedule"></mdui-icon>
              <div className="ae__overview-time-created">
                {timeDisplayConvert(aeData.timeCreated)}
              </div>
            </div>
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="memory"></mdui-icon>
              <div className="ae__overview-cpu-status">
                {aeData.cpus?.filter((c: any) => !c.busy).length || 0} /{" "}
                {aeData.cpus?.length || 0} 核心空闲
              </div>
            </div>
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="category"></mdui-icon>
              <div className="ae__overview-maintain">test</div>
            </div>
          </div>
        </mdui-card>
      </div>

      {/* CPU and Inventory */}
      <div className="grid-l">
        {/* CPU Card */}
        <mdui-card className="card" variant="filled">
          <div
            className="card-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <mdui-icon
              name="memory"
              style={{ fontSize: "32px", alignSelf: "center" }}
            ></mdui-icon>
            <div>CPU</div>
          </div>

          <div
            className="ae__view-cpu-list"
            style={{
              marginTop: "0.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "0.5rem",
            }}
          >
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
                    style={{
                      padding: "1rem",
                      paddingLeft: "1.25rem",
                      paddingRight: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <mdui-icon
                        name={iconBig}
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          opacity: 0.1,
                          fontSize: "3rem",
                        }}
                      ></mdui-icon>
                      <mdui-icon name={icon}></mdui-icon>
                      &nbsp;&nbsp;
                      <div>
                        <div>
                          CPU {i}{" "}
                          <span style={{ opacity: 0.7 }}>{nameStr}</span>
                        </div>
                        <div
                          style={{
                            fontWeight: "normal",
                            fontSize: ".8rem",
                            opacity: 0.5,
                          }}
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
              <mdui-card
                className="ae__view-cpu-list-nothing"
                style={{ padding: "0.75rem" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    opacity: 0.5,
                    margin: "0.75rem 0",
                  }}
                >
                  没有找到 CPU 信息
                </div>
              </mdui-card>
            )}
          </div>

          {cpus.length > cpusPerPage && (
            <mdui-chip
              className={
                cpusShowMore
                  ? "ae__view-cpu-list-less-button"
                  : "ae__view-cpu-list-more-button"
              }
              elevated
              icon={
                cpusShowMore ? "keyboard_arrow_up" : "keyboard_arrow_down"
              }
              style={{ padding: "0.5rem", height: "auto" }}
              onClick={() => setCpusShowMore(!cpusShowMore)}
            >
              {cpusShowMore ? "收起 CPU 列表" : "展开 CPU 列表..."}
            </mdui-chip>
          )}
        </mdui-card>

        {/* Inventory Card */}
        <mdui-card className="card" variant="filled">
          <div
            className="card-title"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <mdui-icon
              name="storage"
              style={{ fontSize: "28px", alignSelf: "center" }}
            ></mdui-icon>
            <div>库存</div>
          </div>

          {/* Type filter buttons */}
          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              gap: "0.5rem",
            }}
          >
            {[
              { filter: "all", label: "全部", icon: "all_inclusive" },
              { filter: "item", label: "物品", icon: "category" },
              { filter: "fluid", label: "流体", icon: "water_drop" },
              { filter: "vis", label: "源质", icon: "auto_awesome" },
            ].map((btn) => (
              <mdui-chip
                key={btn.filter}
                className="ae__view-storage-filter-button"
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
            className="ae__view-storage-filter-search-input"
            label="检索库存..."
            value={filterWord}
            onInput={throttle((e: any) => {
              setFilterWord(e.target.value)
              setFilterPage(1)
            }, 100)}
          ></mdui-text-field>

          {/* Sort/filter controls */}
          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              gap: "0.5rem",
              marginBottom: "0rem",
              alignItems: "center",
            }}
          >
            <mdui-chip
              className="ae__view-storage-filter-craftable-button"
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
              className="ae__view-storage-filter-sort-button"
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
            <mdui-card
              className="ae__view-item-list"
              style={{
                display: "grid",
                padding: "0.75rem",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(3rem, 1fr))",
                gap: "0.25rem",
              }}
            >
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
                    className="hover-highlight ae__view-item-list-item"
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={() => handleItemClick(item)}
                    onMouseMove={(e) => handleItemMouseOver(e, item)}
                    onMouseOut={handleItemMouseOut}
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

              {filteredItems.hasMore && (
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "large", opacity: 0.75 }}>
                    ...
                  </div>
                </div>
              )}
            </mdui-card>
          ) : (
            <mdui-card
              className="ae__view-item-list-nothing"
              style={{ padding: "0.75rem" }}
            >
              <div
                style={{
                  textAlign: "center",
                  opacity: 0.5,
                  margin: "0.75rem 0",
                }}
              >
                没有找到符合条件的物品
              </div>
            </mdui-card>
          )}

          {/* Show more button */}
          {filteredItems.hasMore && (
            <mdui-chip
              className="ae__view-item-list-more-button"
              elevated
              icon="keyboard_arrow_down"
              style={{ padding: "0.5rem", height: "auto" }}
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
