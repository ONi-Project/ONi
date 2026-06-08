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

interface NavRailProps {
  onToggleFold?: (folded: boolean) => void
}

export default function NavRail({ onToggleFold }: NavRailProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const currentPage = location.pathname.slice(1) || "overview"
  const isMobile = isMobileDevice()

  useEffect(() => {
    if (isMobile) {
      // Mobile mode: drawer overlay
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

  // Drawer style for mobile
  const drawerStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        left: drawerOpen ? "0" : "-152px",
        zIndex: 100,
        transition: "left 0.3s",
      }
    : {}

  return (
    <>
      <div
        ref={drawerRef}
        id="navi-drawer"
        style={{
          display: "flex",
          flexDirection: "column",
          minWidth: "56px",
          width: "56px",
          ...drawerStyle,
        }}
      >
        {railItems.map((item) => (
          <mdui-list-item
            key={item.id}
            id={`rail-${item.id}`}
            rounded
            icon={item.icon}
            active={currentPage === item.id}
            onClick={() => handleItemClick(item.id)}
            style={item.id === "setting" ? { marginTop: "auto", marginBottom: "12px" } : {}}
          >
            {item.label}
          </mdui-list-item>
        ))}
      </div>
    </>
  )
}

export function toggleDrawer(open?: boolean) {
  const dim = document.getElementById("navrail-dim")!
  const drawer = document.getElementById("navi-drawer")!
  const isOpen = open ?? drawer.style.left === "-152px"

  if (isOpen) {
    drawer.style.left = "0"
    dim.style.opacity = "1"
    dim.style.pointerEvents = "auto"
  } else {
    drawer.style.left = "-152px"
    dim.style.opacity = "0"
    dim.style.pointerEvents = "none"
  }
}
