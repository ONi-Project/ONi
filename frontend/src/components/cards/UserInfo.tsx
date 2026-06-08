import { useAuthStore } from "../../stores/useAuthStore"

interface UserInfoProps {
  config?: {
    title?: string
    [key: string]: any
  }
}

export default function UserInfoCard({ config }: UserInfoProps) {
  const user = useAuthStore((s) => s.user)
  const title = config?.title || "用户信息"

  return (
    <mdui-card variant="filled" className="card">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: "x-large" }}>
          <b>{title}</b>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ opacity: 0.5 }}>ONi Authorized Staff</div>
      </div>

      <div
        style={{
          opacity: 0.25,
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-end",
          marginTop: "auto",
        }}
      >
        <mdui-icon name="account_circle"></mdui-icon>
        &nbsp;
        <div style={{ fontSize: "larger" }}>
          <b>{user?.name || "未知用户"}</b>
        </div>
      </div>
    </mdui-card>
  )
}
