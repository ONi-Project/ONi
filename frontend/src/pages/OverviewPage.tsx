import { useAuthStore } from "../stores/useAuthStore"
import { useDataStore } from "../stores/useDataStore"
import { DynamicLayout } from "../lib/renderLayout"
import LoginDialog from "../components/dialogs/LoginDialog"

export default function OverviewPage() {
  const endpoint = useAuthStore((s) => s.endpoint)
  const token = useAuthStore((s) => s.token)
  const layoutOverview = useDataStore((s) => s.layoutOverview)

  // If no credentials or auth failed, show login dialog
  if (!endpoint || !token) {
    return <LoginDialog />
  }

  // No layout data yet - show loading
  if (!layoutOverview) {
    return (
      <div id="overview__content" className="panel-content">
        <div
          id="overview__loading"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "10rem",
          }}
        >
          <div
            className="animate__animated animate__fadeInUp animate__faster"
            style={{
              margin: "2rem",
              width: "25rem",
              maxWidth: "90%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "larger",
                textAlign: "center",
                marginBottom: "1rem",
                opacity: 0.75,
              }}
            >
              少女祈祷中...
            </div>
            <mdui-circular-progress></mdui-circular-progress>
          </div>
        </div>
      </div>
    )
  }

  // Render dynamic layout from server
  return (
    <div id="overview__content" className="panel-content">
      <DynamicLayout layout={layoutOverview} />
    </div>
  )
}
