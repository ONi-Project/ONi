import { useAuthStore } from "../stores/useAuthStore"

export default function SettingsPage() {
  const setToken = useAuthStore((s) => s.setToken)

  const handleLogout = () => {
    setToken("")
    location.reload()
  }

  return (
    <div id="setting__content" className="panel-content" style={{ height: "100%" }}>
      <div style={{ display: "flex", height: "100%", gap: "1rem" }}>
        <div
          id="setting__navi"
          style={{ width: "10rem", height: "100%" }}
        >
          <mdui-menu
            style={{ marginTop: "0rem", borderRadius: "0.75rem" }}
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

        <div style={{ flexGrow: 1 }}>
          <mdui-card variant="filled" className="card" style={{ padding: "1rem" }}>
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
