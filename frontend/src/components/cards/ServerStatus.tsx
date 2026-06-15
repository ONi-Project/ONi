import { useDataStore } from "../../stores/useDataStore"

interface ServerStatusProps {
  config?: any
}

export default function ServerStatusCard(_props: ServerStatusProps) {
  const mcServerStatus = useDataStore((s) => s.mcServerStatus)

  if (!mcServerStatus) {
    return (
      <mdui-card variant="filled" className="card">
        <div className="p-4 opacity-50">加载中...</div>
      </mdui-card>
    )
  }

  const { ip, online, motd, players } = mcServerStatus

  return (
    <mdui-card variant="filled" className="card">
      <div className="flex items-center">
        <div className="text-lg">
          <b>服务器状态</b>
        </div>
        <div className="opacity-50">&nbsp;@&nbsp;</div>
        <div className="opacity-50">{ip}</div>
      </div>

      <div className="flex items-center">
        <mdui-icon name="bolt"></mdui-icon>
        &nbsp;
        <div className="font-bold">
          {online ? "运行正常" : "服务器离线"}
        </div>
        &nbsp;
        <div className="opacity-50">
          ({players?.online ?? 0}/{players?.max ?? 1})
        </div>
      </div>

      <div className="flex items-center">
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

      <div className="flex items-center">
        <div className="opacity-25 text-sm">{motd}</div>
      </div>
    </mdui-card>
  )
}

// Registry entry
export const serverStatusConfig = {
  component: ServerStatusCard,
}
