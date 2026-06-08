import { useState, useMemo } from "react"
import { useDataStore } from "../stores/useDataStore"
import { sendMessage } from "../hooks/useWebSocket"
import { newWebToServerMessage } from "@oni/interface"

export default function EventPage() {
  const events = useDataStore((s) => s.event)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [priorityFilter, setPriorityFilter] = useState<number[]>([0, 1, 2])
  const [searchWord, setSearchWord] = useState("")

  const priorityMap: Record<number, string> = { 0: "info", 1: "warning", 2: "dangerous" }

  const togglePriority = (p: number) => {
    setPriorityFilter((prev) =>
      prev.includes(p) ? prev.filter((v) => v !== p) : [...prev, p]
    )
  }

  const filteredEvents = useMemo(() => {
    let result = [...events]

    // Priority filter
    result = result.filter((e) => priorityFilter.includes(e.priority))

    // Status filter
    if (statusFilter === "active") {
      result = result.filter((e) => e.status === 0)
    } else if (statusFilter === "inactive") {
      result = result.filter((e) => e.status === 1)
    }

    // Search
    if (searchWord) {
      const word = searchWord.toLowerCase()
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(word) ||
          (e.description || "").toLowerCase().includes(word)
      )
    }

    // Sort: active (status=0) first, resolved (status=1) last, then by timestamp
    result.sort((a, b) => {
      if (a.status < b.status) return -1
      if (a.status > b.status) return 1
      return a.timestamp - b.timestamp
    })

    return result
  }, [events, statusFilter, priorityFilter, searchWord])

  return (
    <div id="event__content" className="panel-content">
      {/* Search */}
      <div
        className="animate__animated animate__fadeInUp animate__faster"
        style={{
          marginBottom: "0.5rem",
          padding: "0.25rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <mdui-text-field
          variant="outlined"
          icon="search"
          label="检索事件..."
          value={searchWord}
          onChange={(e: any) => setSearchWord(e.target.value)}
        ></mdui-text-field>
      </div>

      {/* Filters */}
      <div
        className="animate__animated animate__fadeInUp animate__faster"
        style={{
          display: "flex",
          marginTop: "0.5rem",
          marginLeft: "0.25rem",
        }}
      >
        {/* Status filter */}
        <div>
          <div style={{ marginBottom: "0.25rem" }}>
            <mdui-icon
              name="filter_list"
              style={{ opacity: 0.5, fontSize: "small" }}
            ></mdui-icon>
            <span style={{ fontSize: "small", opacity: 0.5 }}>
              状态过滤器
            </span>
          </div>
          <mdui-chip
            selected={statusFilter === "all"}
            selectable
            selected-icon="all_inclusive"
            icon="all_inclusive"
            onClick={() => setStatusFilter("all")}
          >
            全部
          </mdui-chip>
          <mdui-chip
            selected={statusFilter === "active"}
            selectable
            selected-icon="clear"
            icon="clear"
            onClick={() => setStatusFilter("active")}
          >
            未处理
          </mdui-chip>
          <mdui-chip
            selected={statusFilter === "inactive"}
            selectable
            selected-icon="done"
            icon="done"
            onClick={() => setStatusFilter("inactive")}
          >
            已处理
          </mdui-chip>
        </div>

        <div
          style={{
            borderLeft: "1px solid rgba(128,128,128,0.5)",
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
          }}
        ></div>

        {/* Priority filter */}
        <div>
          <div style={{ marginBottom: "0.25rem" }}>
            <mdui-icon
              name="filter_list"
              style={{ opacity: 0.5, fontSize: "small" }}
            ></mdui-icon>
            <span style={{ fontSize: "small", opacity: 0.5 }}>
              级别过滤器
            </span>
          </div>
          <mdui-chip
            selected={priorityFilter.includes(0)}
            selectable
            selected-icon="info"
            icon="info"
            onClick={() => togglePriority(0)}
          >
            通知
          </mdui-chip>
          <mdui-chip
            selected={priorityFilter.includes(1)}
            selectable
            selected-icon="warning"
            icon="warning"
            onClick={() => togglePriority(1)}
          >
            警告
          </mdui-chip>
          <mdui-chip
            selected={priorityFilter.includes(2)}
            selectable
            selected-icon="dangerous"
            icon="dangerous"
            onClick={() => togglePriority(2)}
          >
            紧急
          </mdui-chip>
        </div>
      </div>

      {/* Event list */}
      <div
        id="event__list"
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {filteredEvents.map((event, index) => {
          const priorityStr = priorityMap[event.priority]
          const isActive = event.status === 0
          const className = isActive
            ? `event__card-${priorityStr}`
            : "event__card-inactive"

          return (
            <mdui-card
              key={event.uuid}
              variant="filled"
              className={`card event__card animate__animated animate__fadeInUp animate__faster ${className}`}
              style={{
                padding: "1rem",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                ...(isActive ? {} : { opacity: 0.5 }),
                animationDelay: `${index * 0.03}s`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <mdui-icon name={priorityStr}></mdui-icon>
                </div>
                <div>
                  <div>{event.name}</div>
                  <div style={{ fontSize: "small", opacity: 0.5 }}>
                    {event.description}
                  </div>
                  <div style={{ opacity: 0.25, fontSize: "small" }}>
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
                <mdui-checkbox
                  style={{ marginLeft: "auto" }}
                  checked={event.status === 1}
                  onChange={(e: any) => {
                    sendMessage(
                      newWebToServerMessage("DataEventSet", {
                        uuid: event.uuid,
                        status: e.target.checked ? 1 : 0,
                      })
                    )
                  }}
                ></mdui-checkbox>
              </div>
            </mdui-card>
          )
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div style={{ opacity: 0.5, textAlign: "center", marginTop: "2rem" }}>
          <div className="animate__animated animate__fadeInUp animate__faster">
            暂无事件
          </div>
        </div>
      )}

      <style>{`
        .event__card {
          padding: 1rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .event__card-warning {
          background-color: rgba(var(--mdui-color-secondary-container), 0.75) !important;
        }
        .event__card-dangerous {
          background-color: rgba(var(--mdui-color-tertiary-container), 0.75) !important;
        }
        .event__card-inactive {
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}
