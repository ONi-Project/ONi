import { useState, useMemo } from "react"
import { motion } from "motion/react"
import { useDataStore } from "../stores/useDataStore"
import { sendMessage } from "../hooks/useWebSocket"
import { newWebToServerMessage } from "@oni/interface"
import { fadeInUp } from "../lib/animations"

const priorityMap: Record<number, string> = { 0: "info", 1: "warning", 2: "dangerous" }

export default function EventPage() {
  const events = useDataStore((s) => s.event)
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [priorityFilter, setPriorityFilter] = useState<number[]>([0, 1, 2])
  const [searchWord, setSearchWord] = useState("")

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
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mb-2 p-1 flex gap-2 items-center"
      >
        <mdui-text-field
          variant="outlined"
          icon="search"
          label="检索事件..."
          value={searchWord}
          onChange={(e: any) => setSearchWord(e.target.value)}
        ></mdui-text-field>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.03 }}
        className="flex mt-2 ml-1"
      >
        {/* Status filter */}
        <div>
          <div className="mb-1">
            <mdui-icon
              name="filter_list"
              className="opacity-50 text-sm"
            ></mdui-icon>
            <span className="text-sm opacity-50">
              状态过滤器
            </span>
          </div>
          <div className="flex gap-1">
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
        </div>

        <div className="border-l border-[rgba(128,128,128,0.5)] mx-6"></div>

        {/* Priority filter */}
        <div>
          <div className="mb-1">
            <mdui-icon
              name="filter_list"
              className="opacity-50 text-sm"
            ></mdui-icon>
            <span className="text-sm opacity-50">
              级别过滤器
            </span>
          </div>
          <div className="flex gap-1">
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
      </motion.div>

      {/* Event list */}
      <div
        id="event__list"
        className="mt-4 flex flex-col gap-2"
      >
        {filteredEvents.map((event, index) => {
          const priorityStr = priorityMap[event.priority]
          const isActive = event.status === 0

          let bgClass = ""
          if (isActive) {
            if (priorityStr === "warning") bgClass = "bg-[rgba(var(--mdui-color-secondary-container),0.75)]"
            else if (priorityStr === "dangerous") bgClass = "bg-[rgba(var(--mdui-color-tertiary-container),0.75)]"
          }

          return (
            <motion.div
              key={event.uuid}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: (index + 1) * 0.03 }}
            >
              <mdui-card
                variant="filled"
                className={`p-4 pl-6 pr-6 ${bgClass} ${isActive ? "" : "opacity-50"}`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <mdui-icon name={priorityStr}></mdui-icon>
                  </div>
                  <div>
                    <div>{event.name}</div>
                    <div className="text-sm opacity-50">
                      {event.description}
                    </div>
                    <div className="opacity-25 text-sm">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <mdui-checkbox
                    className="ml-auto"
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
            </motion.div>
          )
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="opacity-50 text-center mt-8">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            暂无事件
          </motion.div>
        </div>
      )}
    </div>
  )
}
