import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "mdui/components/navigation-drawer.js"
import "mdui/components/navigation-rail-item.js"
import "mdui/components/navigation-rail.js"
import { isMobileDevice } from "../../lib/utils"

interface RailItem {
  id: string
  label: string
  icon: string
}

const railItems: RailItem[] = [
  { id: "overview", label: "看板", icon: "home--outlined" },
  { id: "event", label: "事件", icon: "crisis_alert" },
  { id: "control", label: "控制", icon: "tune--outlined" },
  { id: "ae", label: "AE", icon: "grid_on--outlined" },
  { id: "bot", label: "BOT", icon: "adb--outlined" },
  { id: "stat", label: "统计", icon: "insert_chart--outlined" },
  { id: "tool", label: "工具", icon: "build--outlined" },
  { id: "setting", label: "设置", icon: "settings--outlined" },
]

export default function NavRail() {
  const navigate = useNavigate()
  const location = useLocation()
  const [folded, setFolded] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const currentPage = location.pathname.slice(1) || "overview"
  const isMobile = isMobileDevice()

  useEffect(() => {
    if (isMobile) {
      const dim = document.getElementById("navrail-dim")
      if (dim) {
        const handleDimClick = () => setDrawerOpen(false)
        dim.addEventListener("click", handleDimClick)
        return () => dim.removeEventListener("click", handleDimClick)
      }
    }
  }, [isMobile])

  const handleItemClick = (id: string) => {
    navigate(`/${id}`)
    if (isMobile) {
      setDrawerOpen(false)
    }
  }

  // Expose toggle functions globally for TopBar
  useEffect(() => {
    (window as any).__navRailToggle = () => {
      if (isMobile) {
        setDrawerOpen((prev) => !prev)
      } else {
        setFolded((prev) => !prev)
      }
    }
  }, [isMobile])

  // Drawer style for mobile
  const drawerStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        left: drawerOpen ? "0" : "-152px",
        zIndex: 100,
        transition: "left 0.3s",
        minWidth: "152px",
        width: "152px",
      }
    : {
        minWidth: folded ? "56px" : "140px",
        width: folded ? "56px" : "140px",
        transition: "width 0.2s, min-width 0.2s",
      }

  return (
    <>
      <div
        ref={drawerRef}
        id="navi-drawer"
        style={{
          display: "flex",
          flexDirection: "column",
          whiteSpace: "nowrap",
          overflowX: "hidden",
          ...drawerStyle,
        }}
      >
        {railItems.map((item) => (
          <mdui-list-item
            key={item.id}
            id={`rail-${item.id}`}
            rounded
            icon={item.icon}
            headline={folded && !isMobile ? "" : item.label}
            active={currentPage === item.id}
            onClick={() => handleItemClick(item.id)}
            style={
              item.id === "setting"
                ? { marginTop: "auto", marginBottom: "12px" }
                : {}
            }
          >
          </mdui-list-item>
        ))}
      </div>
    </>
  )
}
