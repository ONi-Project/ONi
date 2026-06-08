import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAuthStore } from "../../stores/useAuthStore"

const pageLabels: Record<string, string> = {
  overview: "看板",
  event: "事件",
  control: "控制",
  ae: "AE",
  bot: "BOT",
  stat: "统计",
  tool: "工具",
  debug: "调试",
  setting: "设置",
}

export default function TopBar() {
  const location = useLocation()
  const user = useAuthStore((s) => s.user)

  const currentPage = location.pathname.slice(1) || "overview"
  const pageLabel = pageLabels[currentPage] || "未知"

  return (
    <div
      id="topbar"
      style={{
        display: "flex",
        alignItems: "center",
        height: "4rem",
        padding: "0 1rem",
        borderBottom: "1px solid var(--mdui-color-outline-variant)",
        gap: "0.5rem",
      }}
    >
      <mdui-icon
        id="navi-label"
        name="home"
        style={{ marginRight: "0.5rem", opacity: 0.5 }}
      ></mdui-icon>
      <span id="navi-label" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
        {pageLabel}
      </span>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {user && (
          <span style={{ opacity: 0.6, fontSize: "0.875rem" }}>{user.name}</span>
        )}
      </div>
    </div>
  )
}
