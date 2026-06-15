import { useState, useRef } from "react"
import type { Switch } from "mdui"
import { randomUUID } from "../../lib/utils"
import { newWebToServerMessage } from "@oni/interface"
import { sendMessage } from "../../hooks/useWebSocket"

interface ControlRedstoneDigitalProps {
  config?: {
    name?: string
    description?: string
    uuid?: string
    botUuid?: string
    side?: string
    value?: number
    [key: string]: any
  }
}

export default function ControlRedstoneDigitalCard({
  config,
}: ControlRedstoneDigitalProps) {
  const [isOn, setIsOn] = useState((config?.value ?? 0) > 0)
  const switchRef = useRef<Switch>(null)

  if (!config) return null

  const handleChange = () => {
    const newValue = !isOn
    setIsOn(newValue)

    sendMessage(
      newWebToServerMessage("RedstoneTask", {
        value: newValue ? 15 : 0,
        uuid: config.uuid!,
        taskUuid: randomUUID(),
      })
    )
  }

  return (
    <mdui-card variant="filled" className="card">
      <div className="flex items-center">
        <div className="text-xl font-bold">
          {config.name}
        </div>
      </div>

      <div className="opacity-50">{config.description}</div>

      <div className="flex items-center mt-2">
        <mdui-switch
          ref={switchRef}
          checked={isOn}
          onChange={handleChange}
        ></mdui-switch>
        <div className="opacity-25 ml-2">
          {isOn ? "开" : "关"}
        </div>
      </div>
    </mdui-card>
  )
}
