import { motion } from "motion/react"
import { useAuthStore } from "../stores/useAuthStore"
import { useDataStore } from "../stores/useDataStore"
import { DynamicLayout } from "../lib/renderLayout"
import { fadeInUp } from "../lib/animations"
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
          className="flex flex-col items-center mt-40"
        >
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="m-8 w-[25rem] max-w-[90%] text-center"
          >
            <div className="text-lg text-center mb-4 opacity-75">
              少女祈祷中...
            </div>
            <mdui-circular-progress></mdui-circular-progress>
          </motion.div>
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
