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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <mdui-icon
          name="smart_toy--outlined"
          style={{ fontSize: "2rem" }}
        ></mdui-icon>

        <div>
          <div style={{ fontSize: "larger" }}>
            <b>{config.name}</b>
          </div>
        </div>

        <mdui-divider
          vertical
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        ></mdui-divider>

        <div>
          <div style={{ opacity: 1 }}>在线 - WebSocket</div>
          <div style={{ opacity: 0.25, fontSize: "smaller" }}>
            {config.uuid}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          marginTop: "0.25rem",
        }}
      >
        <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
          <mdui-icon name="schedule"></mdui-icon>
          <div>创建于 2021-08-15 12:00:00</div>
        </div>

        <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
          <mdui-icon name="commit"></mdui-icon>
          <div>ONi Lib v1</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <mdui-chip
          elevated
          style={{ marginRight: "auto" }}
          className="bot__button-edit"
          onClick={handleEdit}
        >
          编辑
          <mdui-icon slot="icon" name="edit"></mdui-icon>
        </mdui-chip>
      </div>
    </mdui-card>
  )
}
