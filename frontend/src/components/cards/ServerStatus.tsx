import { useDataStore } from "../../stores/useDataStore"

interface ServerStatusProps {
  config?: any
}

export default function ServerStatusCard(_props: ServerStatusProps) {
  const mcServerStatus = useDataStore((s) => s.mcServerStatus)

  if (!mcServerStatus) {
    return (
      <mdui-card variant="filled" className="card card-server-status__card">
        <div style={{ padding: "1rem", opacity: 0.5 }}>加载中...</div>
      </mdui-card>
    )
  }

  const { ip, online, motd, players } = mcServerStatus

  return (
    <mdui-card variant="filled" className="card card-server-status__card">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "larger" }}>
          <b>服务器状态</b>
        </div>
        <div style={{ opacity: 0.5 }}>&nbsp;@&nbsp;</div>
        <div style={{ opacity: 0.5 }}>{ip}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <mdui-icon name="bolt"></mdui-icon>
        &nbsp;
        <div style={{ fontWeight: "bold" }}>
          {online ? "运行正常" : "服务器离线"}
        </div>
        &nbsp;
        <div style={{ opacity: 0.5 }}>
          ({players?.online ?? 0}/{players?.max ?? 1})
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <mdui-icon name="engineering"></mdui-icon>
        &nbsp;
        <div>
          <b>在线员工：</b>
          <span>
            {players?.list
              ? players.list.map((p: any) => p.name).join(", ")
              : "无"}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ opacity: 0.25, fontSize: "smaller" }}>{motd}</div>
      </div>
    </mdui-card>
  )
}

// Registry entry
export const serverStatusConfig = {
  component: ServerStatusCard,
}
