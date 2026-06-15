import { useDataStore } from "../../stores/useDataStore"
import CircularProgress from "../CircularProgress"

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
  const common = useDataStore((s) => s.common)

  if (!config?.uuid) return null

  const target = common.find((item: any) => item.uuid === config.uuid)
  const bottom = config.bottom || ""

  if (!target) return null

  const { name, max, value, unit, avgIO } = target
  const percent = max ? ((value ?? 0) / max) * 100 : 0

  return (
    <mdui-card variant="filled" className="card text-center">
      <div className="text-lg font-bold mb-[-0.5rem]">
        {name}
      </div>
      <div className="opacity-50">
        {value}/{max} {unit}
      </div>
      <div className="flex justify-center h-24 relative">
        <CircularProgress
          percent={percent}
          size={96}
          strokeWidth={4}
          fontSize="1.5rem"
        />
      </div>
      <div className="opacity-50">
        {bottom === "avgIO" && avgIO ? `avg: ${avgIO} ${unit}/t` : ""}
      </div>
    </mdui-card>
  )
}
