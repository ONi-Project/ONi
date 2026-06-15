import { useState, useEffect, lazy, Suspense } from "react"
import { useSearchParams } from "react-router-dom"
import { useDataStore } from "../stores/useDataStore"
import { DynamicLayout } from "../lib/renderLayout"

const BotEdit = lazy(() => import("../components/tabs/BotEdit"))

export default function BotPage() {
  const bot = useDataStore((s) => s.bot)
  const [searchParams] = useSearchParams()
  const editUuid = searchParams.get("edit")
  const [editMode, setEditMode] = useState<string | null>(null)

  useEffect(() => {
    if (editUuid) setEditMode(editUuid)
    else setEditMode(null)
  }, [editUuid])

  const handleBack = () => {
    setEditMode(null)
    window.history.replaceState({}, "", "/bot")
  }

  const Fallback = () => <div>加载中...</div>

  // Edit mode
  if (editMode) {
    return (
      <div id="bot__content" className="panel-content">
        <Suspense fallback={<Fallback />}>
          <BotEdit uuid={editMode} onBack={handleBack} />
        </Suspense>
      </div>
    )
  }

  // Render Bot list with overview cards
  if (bot.length > 0) {
    const layout = [
      {
        type: "grid-m",
        content: bot.map((b) => ({
          type: "card" as const,
          id: "bot-overview",
          config: { uuid: b.uuid, name: b.name },
        })),
      },
    ]

    return (
      <div id="bot__content" className="panel-content">
        <DynamicLayout layout={layout} />
      </div>
    )
  }

  return (
    <div id="bot__content" className="panel-content">
      <p>BOT 页面（加载中...）</p>
    </div>
  )
}
