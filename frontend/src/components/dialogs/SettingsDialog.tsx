import { useRef } from "react"
import type { Dialog } from "mdui"
import { useAuthStore } from "../../stores/useAuthStore"

export default function SettingsDialog() {
  const dialogRef = useRef<Dialog>(null)
  const setToken = useAuthStore((s) => s.setToken)

  const handleLogout = () => {
    setToken("")
    location.reload()
  }

  return (
    <mdui-dialog ref={dialogRef} id="settings-dialog">
      <span slot="headline">ONi Settings</span>
      <mdui-button full-width id="button-settings-logout" onClick={handleLogout}>
        退出登录
      </mdui-button>
      <mdui-button
        variant="outlined"
        id="button-settings-discard"
        className="mt-4"
        onClick={() => { dialogRef.current!.open = false }}
      >
        取消
      </mdui-button>
      <mdui-button
        variant="filled"
        id="button-settings-apply"
        onClick={() => { dialogRef.current!.open = false; location.reload() }}
      >
        保存
      </mdui-button>
    </mdui-dialog>
  )
}

// Export a function to open the dialog from outside React
export function openSettingsDialog() {
  const dialog = document.getElementById("settings-dialog") as any
  if (dialog) dialog.open = true
}
