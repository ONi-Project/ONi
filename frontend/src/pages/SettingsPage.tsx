import { useAuthStore } from "../stores/useAuthStore"

export default function SettingsPage() {
  const setToken = useAuthStore((s) => s.setToken)

  const handleLogout = () => {
    setToken("")
    location.reload()
  }

  return (
    <div id="setting__content" className="panel-content h-full">
      <div className="flex h-full gap-4">
        <div
          id="setting__navi"
          className="w-40 h-full"
        >
          <mdui-menu
            className="mt-0 rounded-xl"
          >
            <mdui-menu-item icon="brush" rounded>
              外观
            </mdui-menu-item>
            <mdui-menu-item icon="color_lens" rounded>
              主题
            </mdui-menu-item>
            <mdui-menu-item icon="account_circle" rounded>
              账户
            </mdui-menu-item>
          </mdui-menu>
        </div>

        <div className="flex-1">
          <mdui-card variant="filled" className="card p-4">
            <h3>账户操作</h3>
            <mdui-button variant="filled" onClick={handleLogout}>
              退出登录
            </mdui-button>
          </mdui-card>
        </div>
      </div>
    </div>
  )
}
