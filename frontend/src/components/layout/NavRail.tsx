import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "mdui/components/navigation-drawer.js"
import "mdui/components/navigation-rail-item.js"
import "mdui/components/navigation-rail.js"
import "mdui/components/dropdown.js"
import "mdui/components/menu.js"
import "mdui/components/menu-item.js"
import { isMobileDevice } from "../../lib/utils"
import { setTheme, getTheme, setColorScheme, removeColorScheme } from "mdui"

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

interface ThemeColor {
  name: string
  hex: string
}

const themeColors: ThemeColor[] = [
  { name: "默认", hex: "" },
  { name: "红色", hex: "#f44336" },
  { name: "粉色", hex: "#e91e63" },
  { name: "紫色", hex: "#9c27b0" },
  { name: "靛蓝", hex: "#3f51b5" },
  { name: "蓝色", hex: "#2196f3" },
  { name: "青色", hex: "#00bcd4" },
  { name: "绿色", hex: "#4caf50" },
  { name: "橙色", hex: "#ff9800" },
  { name: "暖橙", hex: "#ff5722" },
]

const STORAGE_KEY_THEME = "oni-theme-mode"
const STORAGE_KEY_COLOR = "oni-theme-color"

type ThemeMode = "light" | "dark" | "auto"

/** Read saved theme mode from localStorage, fallback to current DOM state */
function getSavedTheme(): ThemeMode {
  const saved = localStorage.getItem(STORAGE_KEY_THEME)
  if (saved === "light" || saved === "dark" || saved === "auto") return saved
  const dom = getTheme()
  return dom === "dark" ? "dark" : "light"
}

/** Re-apply persisted theme+color on cold start */
function applyPersistedTheme() {
  const saved = getSavedTheme()
  setTheme(saved)

  const savedColor = localStorage.getItem(STORAGE_KEY_COLOR)
  if (savedColor) {
    setColorScheme(savedColor)
  }
}

applyPersistedTheme()

const themeCycle: Record<ThemeMode, ThemeMode> = {
  light: "dark",
  dark: "auto",
  auto: "light",
}

const themeIcon: Record<ThemeMode, string> = {
  light: "light_mode",
  dark: "dark_mode",
  auto: "brightness_4",
}

const themeLabel: Record<ThemeMode, string> = {
  light: "浅色",
  dark: "深色",
  auto: "跟随系统",
}

export default function NavRail() {
  const navigate = useNavigate()
  const location = useLocation()
  const [folded, setFolded] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const currentPage = location.pathname.slice(1) || "overview"

  // Reactive isMobile — recalculates on window resize
  const [isMobile, setIsMobile] = useState(isMobileDevice)
  const checkIsMobile = useCallback(() => setIsMobile(isMobileDevice()), [])
  useEffect(() => {
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [checkIsMobile])

  // Suppress CSS transitions during isMobile mode switch to prevent
  // visual glitch (position:fixed → flex-flow causes a wrong animation frame)
  useLayoutEffect(() => {
    const el = drawerRef.current
    if (!el) return
    const saved = el.style.transition
    el.style.transition = "none"
    const raf = requestAnimationFrame(() => {
      el.style.transition = saved
    })
    return () => cancelAnimationFrame(raf)
  }, [isMobile])

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

  // Show dim when drawer is open on mobile
  useEffect(() => {
    const dim = document.getElementById("navrail-dim")
    if (dim) {
      dim.style.opacity = drawerOpen && isMobile ? "1" : "0"
      dim.style.pointerEvents = drawerOpen && isMobile ? "auto" : "none"
    }
  }, [drawerOpen, isMobile])

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
        minWidth: folded ? "62px" : "140px",
        width: folded ? "62px" : "140px",
        transition: "width 0.2s, min-width 0.2s",
      }

  // ─── Theme state (light / dark / auto) ──────────────────────
  const [themeMode, setThemeMode] = useState<ThemeMode>(getSavedTheme)

  // Sync themeMode when class is changed externally
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dom = getTheme()
      if (dom === "dark" || dom === "light" || dom === "auto") {
        setThemeMode(dom)
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const handleThemeToggle = () => {
    const next = themeCycle[themeMode]
    setTheme(next)
    setThemeMode(next)
    localStorage.setItem(STORAGE_KEY_THEME, next)
  }

  const handleColorSelect = (hex: string) => {
    if (hex) {
      setColorScheme(hex)
      localStorage.setItem(STORAGE_KEY_COLOR, hex)
    } else {
      removeColorScheme()
      localStorage.removeItem(STORAGE_KEY_COLOR)
    }
  }

  return (
    <>
      <div
        ref={drawerRef}
        id="navi-drawer"
        className="flex flex-col whitespace-nowrap overflow-x-hidden p-1.5 pr-0 gap-1"
        style={drawerStyle}
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
                ? { marginTop: "auto", marginBottom: "0px" }
                : {}
            }
          >
          </mdui-list-item>
        ))}

        {/* ── Theme mode toggle (light → dark → auto) ────────── */}
        <mdui-list-item
          id="rail-theme-toggle"
          rounded
          icon={themeIcon[themeMode]}
          headline={folded && !isMobile ? "" : themeLabel[themeMode]}
          onClick={handleThemeToggle}
        >
        </mdui-list-item>

        {/* ── Theme color picker ──────────────────────────────── */}
        <mdui-dropdown placement="right-start">
          <mdui-list-item
            slot="trigger"
            id="rail-color-picker"
            rounded
            icon="palette--outlined"
            headline={folded && !isMobile ? "" : "主题色"}
          >
          </mdui-list-item>

          <mdui-menu className="rounded-xl">
            {themeColors.map((c) => (
              <mdui-menu-item
                key={c.hex || "default"}
                rounded
                onClick={() => handleColorSelect(c.hex)}
              >
                <div
                  slot="icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: c.hex || "transparent",
                    border: c.hex ? "2px solid rgba(var(--mdui-color-outline))" : "2px dashed rgba(var(--mdui-color-outline))",
                    display: "inline-block",
                  }}
                />
                {c.name}
              </mdui-menu-item>
            ))}
          </mdui-menu>
        </mdui-dropdown>
      </div>
    </>
  )
}
