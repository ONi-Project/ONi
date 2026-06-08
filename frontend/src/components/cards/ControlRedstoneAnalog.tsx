import { useState, useRef } from "react"
import type { Slider } from "mdui"
import { randomUUID } from "../../lib/utils"
import { newWebToServerMessage } from "@oni/interface"
import { sendMessage } from "../../hooks/useWebSocket"

interface ControlRedstoneAnalogProps {
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

export default function ControlRedstoneAnalogCard({
  config,
}: ControlRedstoneAnalogProps) {
  const [sliderValue, setSliderValue] = useState(config?.value ?? 0)
  const sliderRef = useRef<Slider>(null)

  if (!config) return null

  const handleChange = () => {
    const value = sliderRef.current?.value ?? 0
    setSliderValue(value)

    sendMessage(
      newWebToServerMessage("RedstoneTask", {
        value,
        uuid: config.uuid!,
        taskUuid: randomUUID(),
      })
    )
  }

  return (
    <mdui-card
      variant="filled"
      className="card control-redstone-analog__card"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "x-large", fontWeight: "bold" }}>
          {config.name}
        </div>
      </div>

      <div style={{ opacity: 0.5 }}>{config.description}</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "0.5rem",
        }}
      >
        <mdui-slider
          ref={sliderRef}
          tickmarks
          max="15"
          value={sliderValue}
          onChange={handleChange}
        ></mdui-slider>
        <div style={{ opacity: 0.25, marginLeft: "0.5rem" }}>
          {sliderValue}
        </div>
      </div>
    </mdui-card>
  )
}
