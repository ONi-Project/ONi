import { motion } from "motion/react"
import { sendMessage } from "../../hooks/useWebSocket"
import { newWebToServerMessage } from "@oni/interface"
import { useDataStore } from "../../stores/useDataStore"
import { fadeInUp } from "../../lib/animations"
import type { eventModel } from "@oni/interface"

const priorityMap: Record<number, string> = { 0: "info", 1: "warning", 2: "dangerous" }

interface EventItemProps {
  config?: {
    uuid?: string
    [key: string]: any
  }
}

export default function EventItemCard({ config }: EventItemProps) {
  const events = useDataStore((s) => s.event)

  if (!config?.uuid) return null

  const event = events.find((item) => item.uuid === config.uuid)
  if (!event) return null

  const priorityStr = priorityMap[event.priority]
  const isActive = event.status === 0

  let bgClass = ""
  if (isActive) {
    if (priorityStr === "warning") bgClass = "bg-[rgba(var(--mdui-color-secondary-container),0.75)]"
    else if (priorityStr === "dangerous") bgClass = "bg-[rgba(var(--mdui-color-tertiary-container),0.75)]"
  }

  return (
    <mdui-card
      variant="filled"
      className={`w-full h-full p-2 pl-4 pr-4 ${bgClass} ${isActive ? "" : "opacity-50"}`}
    >
      <div className="w-full h-full flex items-center gap-4">
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
  )
}
