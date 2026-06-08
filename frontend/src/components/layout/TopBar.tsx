import { useLocation } from "react-router-dom"
import { useAuthStore } from "../../stores/useAuthStore"
import { isMobileDevice } from "../../lib/utils"

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
  const isMobile = isMobileDevice()

  const handleToggle = () => {
    const fn = (window as any).__navRailToggle
    if (fn) fn()
  }

  return (
    <mdui-top-app-bar
      scroll-behavior="shrink elevate"
      scroll-target="#main-content-area"
      style={{ position: "relative" }}
    >
      <mdui-button-icon
        icon="menu"
        id="navi-toggler"
        style={{ marginLeft: "0.5rem" }}
        onClick={handleToggle}
      ></mdui-button-icon>

      <img
        src="resources/icon.png"
        style={{
          height: "100%",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          opacity: 0.7,
        }}
        alt="ONi"
      />

      <mdui-top-app-bar-title>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ fontWeight: "bolder" }}>ONi</div>
          &nbsp;
          <mdui-badge>dev</mdui-badge>
        </div>
        <div
          slot="label-large"
          style={{
            fontWeight: "bold",
            height: "100%",
            fontSize: "2rem",
            marginLeft: "3rem",
            opacity: 0.9,
          }}
        >
          {pageLabel}
        </div>
      </mdui-top-app-bar-title>

      <div style={{ flexGrow: 1 }}></div>

      {user && !isMobile && (
        <div
          id="slogan"
          style={{ alignSelf: "center", opacity: 0.2, marginRight: "1rem" }}
        >
          {user.name}
        </div>
      )}
    </mdui-top-app-bar>
  )
}
