import { Routes, Route, Navigate } from "react-router-dom"
import { useWebSocket } from "../../hooks/useWebSocket"
import NavRail from "./NavRail"
import TopBar from "./TopBar"
import BgTexture from "./BgTexture"
// Global dialogs rendered at this level for lifetime management
import AeOrderDialog from "../dialogs/AeOrderDialog"
import AeItemInfoDialog from "../dialogs/AeItemInfoDialog"
import AeItemSelectDialog from "../dialogs/AeItemSelectDialog"
import BotTaskDialog from "../dialogs/BotTaskDialog"

// Pages
import OverviewPage from "../../pages/OverviewPage"
import EventPage from "../../pages/EventPage"
import ControlPage from "../../pages/ControlPage"
import AePage from "../../pages/AePage"
import BotPage from "../../pages/BotPage"
import StatPage from "../../pages/StatPage"
import ToolPage from "../../pages/ToolPage"
import DebugPage from "../../pages/DebugPage"
import SettingsPage from "../../pages/SettingsPage"

export default function AppLayout() {
  // Initialize WebSocket connection
  useWebSocket()

  return (
    <>
      <TopBar />

      <div
        style={{
          display: "flex",
          width: "100dvw",
          height: "calc(100dvh - 4rem)",
        }}
      >
        <NavRail />

        <div id="navrail-dim" />

        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            id="main-content-area"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/event" element={<EventPage />} />
              <Route path="/control" element={<ControlPage />} />
              <Route path="/ae" element={<AePage />} />
              <Route path="/bot" element={<BotPage />} />
              <Route path="/stat" element={<StatPage />} />
              <Route path="/tool" element={<ToolPage />} />
              <Route path="/debug" element={<DebugPage />} />
              <Route path="/setting" element={<SettingsPage />} />
            </Routes>
          </div>

          <BgTexture />
        </div>
      </div>

      {/* Global Dialogs - rendered once here for lifecycle */}
      <AeOrderDialog />
      <AeItemInfoDialog />
      <AeItemSelectDialog />
      <BotTaskDialog />
    </>
  )
}
