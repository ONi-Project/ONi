import { useNavigate } from "react-router-dom"
import { useDataStore } from "../../stores/useDataStore"
import {
  timePassedDisplayConvert,
  timeDisplayConvert,
} from "../../lib/utils"

interface AeOverviewProps {
  config?: {
    name?: string
    uuid?: string
    [key: string]: any
  }
}

export default function AeOverviewCard({ config }: AeOverviewProps) {
  const navigate = useNavigate()
  const aeList = useDataStore((s) => s.ae)

  if (!config?.uuid) return null

  const ae = aeList.find((item) => item.uuid === config.uuid)
  if (!ae) return null

  const handleView = () => {
    navigate(`/ae?view=${config.uuid}`)
  }

  const handleEdit = () => {
    navigate(`/ae?edit=${config.uuid}`)
  }

  const activeCpus = ae.cpus.filter((cpu) => cpu.active).length
  const busyCpus = ae.cpus.filter((cpu) => cpu.busy).length
  const totalCpus = ae.cpus.length

  const enabledMaintains = ae.levelMaintains.filter((m) => m.enabled).length
  const totalMaintains = ae.levelMaintains.length

  return (
    <mdui-card className="card" variant="filled">
      <div className="flex items-center gap-2">
        <mdui-icon
          name="grid_on--outlined"
          className="text-[2rem]"
        ></mdui-icon>

        <div>
          <div className="text-lg whitespace-nowrap">
            <b>{ae.name}</b>
          </div>
        </div>

        <mdui-divider
          vertical
          className="ml-2 mr-2"
        ></mdui-divider>

        <div>
          <div className="opacity-100">
            {timePassedDisplayConvert(ae.timeUpdated)}
          </div>
          <div className="opacity-25 text-sm">
            {ae.uuid}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex opacity-75 gap-2">
          <mdui-icon name="schedule"></mdui-icon>
          <div>
            创建于 {timeDisplayConvert(ae.timeCreated)}
          </div>
        </div>

        <div className="flex opacity-75 gap-2">
          <mdui-icon name="memory"></mdui-icon>
          <div>
            {totalCpus-busyCpus}/{totalCpus} 空闲 CPU
          </div>
        </div>

        <div className="flex opacity-75 gap-2">
          <mdui-icon name="category"></mdui-icon>
          <div>
            {enabledMaintains}/{totalMaintains} 库存维持启用
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <mdui-chip elevated onClick={handleView}>
          查看
          <mdui-icon slot="icon" name="pageview"></mdui-icon>
        </mdui-chip>

        <mdui-chip
          elevated
          className="mr-auto"
          onClick={handleEdit}
        >
          编辑
          <mdui-icon slot="icon" name="edit"></mdui-icon>
        </mdui-chip>
      </div>
    </mdui-card>
  )
}
