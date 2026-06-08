import { useNavigate } from "react-router-dom"

interface AeOverviewProps {
  config?: {
    name?: string
    uuid?: string
    [key: string]: any
  }
}

export default function AeOverviewCard({ config }: AeOverviewProps) {
  const navigate = useNavigate()

  if (!config) return null

  const handleView = () => {
    navigate(`/ae?view=${config.uuid}`)
  }

  const handleEdit = () => {
    navigate(`/ae?edit=${config.uuid}`)
  }

  return (
    <mdui-card className="card ae__list-item" variant="filled">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <mdui-icon
          name="grid_on--outlined"
          style={{ fontSize: "2rem" }}
        ></mdui-icon>

        <div>
          <div style={{ fontSize: "larger", whiteSpace: "nowrap" }}>
            <b>{config.name}</b>
          </div>
        </div>

        <mdui-divider
          vertical
          style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
        ></mdui-divider>

        <div>
          <div className="ae__overview-time-updated" style={{ opacity: 1 }}>
            ...
          </div>
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
          <div className="ae__overview-time-created">...</div>
        </div>

        <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
          <mdui-icon name="memory"></mdui-icon>
          <div className="ae__overview-cpu-status">...</div>
        </div>

        <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
          <mdui-icon name="category"></mdui-icon>
          <div className="ae__overview-maintain">...</div>
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
        <mdui-chip elevated className="ae__button-view" onClick={handleView}>
          查看
          <mdui-icon slot="icon" name="pageview"></mdui-icon>
        </mdui-chip>

        <mdui-chip
          elevated
          style={{ marginRight: "auto" }}
          className="ae__button-edit"
          onClick={handleEdit}
        >
          编辑
          <mdui-icon slot="icon" name="edit"></mdui-icon>
        </mdui-chip>
      </div>
    </mdui-card>
  )
}
