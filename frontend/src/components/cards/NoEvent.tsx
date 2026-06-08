export default function NoEventCard() {
  return (
    <mdui-card variant="filled" className="card">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "2rem",
          opacity: 0.5,
        }}
      >
        <mdui-icon name="check_circle" style={{ fontSize: "3rem" }}></mdui-icon>
        <p>暂无事件</p>
      </div>
    </mdui-card>
  )
}

// Registry entry
export const noEventConfig = {
  component: NoEventCard,
}
