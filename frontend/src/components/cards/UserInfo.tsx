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
      <div className="flex items-center">
        <div className="text-xl">
          <b>{title}</b>
        </div>
      </div>

      <div className="flex items-center">
        <div className="opacity-50">ONi Authorized Staff</div>
      </div>

      <div className="opacity-25 flex items-center self-end mt-auto">
        <mdui-icon name="account_circle"></mdui-icon>
        &nbsp;
        <div className="text-lg">
          <b>{user?.name || "未知用户"}</b>
        </div>
      </div>
    </mdui-card>
  )
}
