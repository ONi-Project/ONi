import { useEffect, useRef } from "react"
import { Circle } from "progressbar.js"
import { useDataStore } from "../../stores/useDataStore"

interface IndicatorCircularProps {
  config?: {
    uuid?: string
    bottom?: string
    [key: string]: any
  }
}

export default function IndicatorCircularCard({
  config,
}: IndicatorCircularProps) {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<any>(null)
  const common = useDataStore((s) => s.common)

  if (!config?.uuid) return null

  const target = common.find((item: any) => item.uuid === config.uuid)
  const uuid = config.uuid
  const bottom = config.bottom || ""

  useEffect(() => {
    if (!indicatorRef.current || !target) return

    const circle = new Circle(indicatorRef.current, {
      color: "#aaa",
      strokeWidth: 4,
      trailWidth: 2,
      easing: "easeInOut",
      duration: 1400,
      text: {
        style: {
          color: "#999",
          fontSize: "2rem",
          textAlign: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
      from: { color: "#f55" },
      to: { color: "#5f5" },
      step: function (state: any, circle: any) {
        circle.path.setAttribute("stroke", state.color)
        var value = Math.round(circle.value() * 100)
        circle.setText(value + "%")
      },
    })

    circleRef.current = circle

    if (target.value) {
      circle.animate(target.value / (target.max ? target.max : NaN))
    } else {
      circle.setText("N/A")
    }

    return () => {
      circle.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.uuid])

  useEffect(() => {
    if (circleRef.current && target) {
      const { max, value } = target
      if (value) {
        circleRef.current.animate(value / (max ? max : NaN))
      }
    }
  }, [target?.value, target?.max])

  if (!target) return null

  const { name, max, value, unit, avgIO } = target

  return (
    <mdui-card variant="filled" className="card card-indicator-circular__card">
      <div
        className="card-indicator-circular__title"
        style={{ fontSize: "larger", fontWeight: "bold", marginBottom: "-0.5rem" }}
      >
        {name}
      </div>
      <div className="card-indicator-circular__value" style={{ opacity: 0.5 }}>
        {value}/{max} {unit}
      </div>
      <div
        className="card-indicator-circular__indicator"
        ref={indicatorRef}
        style={{ height: "6rem", position: "relative" }}
      ></div>
      <div className="card-indicator-circular__bottom" style={{ opacity: 0.5 }}>
        {bottom === "avgIO" && avgIO ? `avg: ${avgIO} ${unit}/t` : ""}
      </div>
      <style>{`
        .card-indicator-circular__card {
          text-align: center;
        }
      `}</style>
    </mdui-card>
  )
}
