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
    <mdui-card variant="filled" className="card">
      <div className="flex items-baseline">
        <div className="text-lg font-bold">
          {name}
        </div>
        <div className="opacity-50 ml-auto">
          {value}/{max} {unit}
        </div>
      </div>
      <mdui-linear-progress
        value={percent}
        max="100"
        className="h-4"
      ></mdui-linear-progress>
      <div className="opacity-50">
        {percent.toFixed(2)} %
      </div>
    </mdui-card>
  )
}
