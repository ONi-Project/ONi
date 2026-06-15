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
      className="relative p-3"
    >
      <mdui-button-icon
        icon="menu"
        id="navi-toggler"
        className=""
        onClick={handleToggle}
      ></mdui-button-icon>

      <img
        src="resources/icon.png"
        className="h-full ml-2 mr-2 opacity-70"
        alt="ONi"
      />

      <mdui-top-app-bar-title>
        <div className="flex flex-row">
          <div className="font-bold">ONi</div>
          &nbsp;
          <mdui-badge>dev</mdui-badge>
        </div>
        <div
          slot="label-large"
          className="font-bold h-full text-3xl ml-12 opacity-90"
        >
          {pageLabel}
        </div>
      </mdui-top-app-bar-title>

      <div className="flex-1"></div>

      {user && !isMobile && (
        <div
          id="slogan"
          className="self-center opacity-20 mr-4"
        >
          {user.name}
        </div>
      )}
    </mdui-top-app-bar>
  )
}
