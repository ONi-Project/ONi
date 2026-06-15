import { useNavigate } from "react-router-dom"

interface BotOverviewProps {
  config?: {
    name?: string
    uuid?: string
    [key: string]: any
  }
}

export default function BotOverviewCard({ config }: BotOverviewProps) {
  const navigate = useNavigate()

  if (!config) return null

  const handleEdit = () => {
    navigate(`/bot?edit=${config.uuid}`)
  }

  return (
    <mdui-card className="card" variant="filled">
      <div className="flex items-center gap-2">
        <mdui-icon
          name="smart_toy--outlined"
          className="text-[2rem]"
        ></mdui-icon>

        <div>
          <div className="text-lg">
            <b>{config.name}</b>
          </div>
        </div>

        <mdui-divider
          vertical
          className="ml-2 mr-2"
        ></mdui-divider>

        <div>
          <div className="opacity-100">在线 - WebSocket</div>
          <div className="opacity-25 text-sm">{config.uuid}</div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex opacity-75 gap-2">
          <mdui-icon name="schedule"></mdui-icon>
          <div>创建于 2021-08-15 12:00:00</div>
        </div>

        <div className="flex opacity-75 gap-2">
          <mdui-icon name="commit"></mdui-icon>
          <div>ONi Lib v1</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
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
