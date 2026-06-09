import { useState, useEffect, lazy, Suspense } from "react"
import { useSearchParams } from "react-router-dom"
import { useDataStore } from "../stores/useDataStore"
import { DynamicLayout } from "../lib/renderLayout"

const AeView = lazy(() => import("../components/tabs/AeView"))
const AeEdit = lazy(() => import("../components/tabs/AeEdit"))

export default function AePage() {
  const ae = useDataStore((s) => s.ae)
  const [searchParams, setSearchParams] = useSearchParams()
  const viewUuid = searchParams.get("view")
  const editUuid = searchParams.get("edit")
  const [viewMode, setViewMode] = useState<string | null>(null)

  useEffect(() => {
    if (viewUuid) setViewMode("view")
    else if (editUuid) setViewMode("edit")
    else setViewMode(null)
  }, [viewUuid, editUuid])

  const handleBack = () => {
    setViewMode(null)
    setSearchParams({}, { replace: true })
  }

  const Fallback = () => <div>加载中...</div>

  // Render AE list with overview cards
  if (!viewMode && ae.length > 0) {
    const layout = [
      {
        type: "grid-m",
        content: ae.map((a) => ({
          type: "card" as const,
          id: "ae-overview",
          config: { uuid: a.uuid, name: a.name },
        })),
      },
    ]

    return (
      <div id="ae__content" className="panel-content">
        <div
          id="ae__topbar"
          className="flex gap-2 items-center mb-2"
        >
          <mdui-text-field
            variant="outlined"
            icon="search"
            label="检索 AE 网络..."
            className="flex-1"
          ></mdui-text-field>
          <mdui-button icon="add">添加</mdui-button>
        </div>
        <DynamicLayout layout={layout} />
      </div>
    )
  }

  // View mode
  if (viewMode === "view" && viewUuid) {
    return (
      <div id="ae__content" className="panel-content">
        <Suspense fallback={<Fallback />}>
          <AeView uuid={viewUuid} onBack={handleBack} />
        </Suspense>
      </div>
    )
  }

  // Edit mode
  if (viewMode === "edit" && editUuid) {
    return (
      <div id="ae__content" className="panel-content">
        <Suspense fallback={<Fallback />}>
          <AeEdit uuid={editUuid} onBack={handleBack} />
        </Suspense>
      </div>
    )
  }

  return (
    <div id="ae__content" className="panel-content">
      <p>AE 页面（加载中...）</p>
    </div>
  )
}
