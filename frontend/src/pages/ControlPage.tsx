import { useDataStore } from "../stores/useDataStore"
import { DynamicLayout } from "../lib/renderLayout"

export default function ControlPage() {
  const redstone = useDataStore((s) => s.redstone)

  if (redstone.length === 0) {
    return (
      <div id="control__content" className="panel-content">
        <p>控制页面（加载中...）</p>
      </div>
    )
  }

  const layout = [
    {
      type: "grid-m" as const,
      content: redstone.map((rs: any) => ({
        type: "card" as const,
        id:
          rs.type === "digital"
            ? "control-redstone-digital"
            : "control-redstone-analog",
        config: {
          uuid: rs.uuid,
          botUuid: rs.botUuid,
          name: rs.name,
          description: rs.description,
          value: rs.value,
          side: rs.side,
        },
      })),
    },
  ]

  return (
    <div id="control__content" className="panel-content">
      <div
        className="animate__animated animate__fadeInUp animate__faster"
        style={{
          marginBottom: "0.5rem",
          padding: "0.25rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <mdui-text-field
          variant="outlined"
          icon="search"
          label="检索红石控制器..."
        ></mdui-text-field>
      </div>
      <div id="control__list">
        <DynamicLayout layout={layout} />
      </div>
    </div>
  )
}
