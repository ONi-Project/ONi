import { useDataStore } from "../../stores/useDataStore"

interface IndicatorBarProps {
  config?: {
    uuid?: string
    [key: string]: any
  }
}

export default function IndicatorBarCard({ config }: IndicatorBarProps) {
  const common = useDataStore((s) => s.common)

  if (!config?.uuid) return null

  const target = common.find((item: any) => item.uuid === config.uuid)

  if (!target) return null

  const { name, max, value, unit } = target
  const percent = max ? ((value ?? 0) / max) * 100 : 0

  return (
    <mdui-card variant="filled" className="card card-indicator-bar__card">
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <div
          className="card-indicator-bar__title"
          style={{ fontSize: "larger", fontWeight: "bold" }}
        >
          {name}
        </div>
        <div
          className="card-indicator-bar__value"
          style={{ opacity: 0.5, marginLeft: "auto" }}
        >
          {value}/{max} {unit}
        </div>
      </div>
      <mdui-linear-progress
        className="card-indicator-bar__indicator"
        value={percent}
        max="100"
        style={{ height: "1rem" }}
      ></mdui-linear-progress>
      <div
        className="card-indicator-bar__percent"
        style={{ opacity: 0.5 }}
      >
        {percent.toFixed(2)} %
      </div>
    </mdui-card>
  )
}
