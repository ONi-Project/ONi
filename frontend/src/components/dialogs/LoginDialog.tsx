import { useEffect, useRef } from "react"
import type { Dialog, TextField } from "mdui"
import { useAuthStore } from "../../stores/useAuthStore"

export default function LoginDialog() {
  const endpoint = useAuthStore((s) => s.endpoint)
  const setEndpoint = useAuthStore((s) => s.setEndpoint)
  const setToken = useAuthStore((s) => s.setToken)

  const dialogRef = useRef<Dialog>(null)
  const endpointRef = useRef<TextField>(null)
  const tokenRef = useRef<TextField>(null)

  const handleLogin = () => {
    const endpointEl = endpointRef.current
    const tokenEl = tokenRef.current

    if (!endpointEl || !tokenEl) return

    const ep = endpointEl.value
    const tk = tokenEl.value

    if (!ep || !tk) {
      endpointEl?.reportValidity()
      tokenEl?.reportValidity()
    } else {
      setEndpoint(ep)
      setToken(tk)
      location.reload()
    }
  }

  useEffect(() => {
    // Open dialog on mount
    if (dialogRef.current) {
      dialogRef.current.open = true
    }
  }, [])

  return (
    <mdui-dialog
      ref={dialogRef}
      icon="person"
      id="dialog-login"
      headline="ONi 身份认证"
    >
      <div
        id="dialog-login-text"
        style={{ opacity: 0.8, marginBottom: "1rem" }}
      >
        欢迎来到 ONi！请输入后端地址和令牌来登录。
      </div>
      <mdui-text-field
        ref={endpointRef}
        helper="示例：localhost:5600 或 oni.akyuu.cn"
        icon="dns"
        required
        clearable
        id="dialog-login-input-endpoint"
        label="后端地址"
        style={{ marginBottom: "0.5rem" }}
        value={endpoint}
      ></mdui-text-field>
      <mdui-text-field
        ref={tokenRef}
        icon="key"
        required
        clearable
        id="dialog-login-input-token"
        label="令牌"
      ></mdui-text-field>
      <mdui-button id="dialog-login-button" slot="action" onClick={handleLogin}>
        登录
      </mdui-button>
    </mdui-dialog>
  )
}
