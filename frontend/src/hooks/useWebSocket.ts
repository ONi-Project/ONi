import { useEffect, useRef, useCallback } from "react"
import {
  allMessageType,
  newWebToServerMessage as toServer,
  wsServerToWebGuard,
  wsGeneralGuard,
  wsBaseGuard,
} from "@oni/interface"
import { snackbar } from "mdui"
import { useAuthStore } from "../stores/useAuthStore"
import { useDataStore } from "../stores/useDataStore"
import { useWebSocketStore } from "../stores/useWebSocketStore"

export function useWebSocket() {
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const mountedRef = useRef(false)
  const reconnectNotifiedRef = useRef(false)
  const reconnectSnackbarRef = useRef<ReturnType<typeof snackbar> | null>(null)

  const connect = useCallback(() => {
    const { endpoint, token } = useAuthStore.getState()

    if (!endpoint && !token) {
      
      return
    }

    const session = new WebSocket("ws://" + endpoint + "/ws/web")
    useWebSocketStore.getState().setSession(session)

    let errorHandled = false // Prevent duplicate handling

    session.onopen = () => {
      const { setConnected, setConnectedOnce } = useWebSocketStore.getState()
      setConnected(true)
      setConnectedOnce(true)
      // Close the reconnection notification if still visible
      if (reconnectSnackbarRef.current) {
        reconnectSnackbarRef.current.open = false
        reconnectSnackbarRef.current = null
      }
      // Reset reconnection flag so next disconnection shows notification again
      reconnectNotifiedRef.current = false
      console.log("ws 连接成功")
      session.send(JSON.stringify(toServer("AuthRequest", { token })))
    }

    session.onclose = () => {
      const { connectedOnce, setConnected } = useWebSocketStore.getState()
      setConnected(false)

      if (connectedOnce) {
        // Only show notification once per disconnection cycle
        if (!reconnectNotifiedRef.current) {
          reconnectNotifiedRef.current = true
          reconnectSnackbarRef.current = snackbar({
            message: "WebSocket 连接已断开，正在尝试重新连接...",
            autoCloseDelay: 60000,
            closeable: false,
          })
        }
        reconnectTimerRef.current = setTimeout(() => {
          connect()
        }, 1000)
      }
      console.log("ws 连接断开")
    }

    session.onerror = () => {
      if (errorHandled) return
      errorHandled = true

      // Only show error if component is still mounted and it's first attempt
      const { connectedOnce } = useWebSocketStore.getState()
      if (!connectedOnce) {
        snackbar({
          message: "无法连接到后端，请检查地址是否正确。",
          autoCloseDelay: 5000,
          closeable: true,
        })
        // Clear credentials so OverviewPage shows login dialog
        useAuthStore.getState().setEndpoint("")
        useAuthStore.getState().setToken("")
      }
      session.close()
    }

    session.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data)

        if (!wsBaseGuard.isMessage(json)) {
          console.warn("非法 ws 消息：", json)
          return
        }

        // Handle auth response first
        if (wsServerToWebGuard.isAuthResponse(json)) {
          if (json.data !== null) {
            useAuthStore.getState().setUser(json.data)
            console.log("用户认证成功：", json.data)
            setTimeout(() => {
              snackbar({
                message: `欢迎回来，${json.data!.name}！`,
                autoCloseDelay: 1500,
                closeable: false,
              })
            }, 300)
          } else {
            // Auth failed - clear token to show login dialog
            console.log("令牌验证失败")
            useAuthStore.getState().setToken("")
            snackbar({
              message: "令牌验证失败，请重新输入。",
              autoCloseDelay: 5000,
              closeable: true,
            })
          }
          return
        }

        // Dispatch data messages to store
        dispatchMessage(json as allMessageType.ServerToWeb | allMessageType.General)
      } catch (err) {
        console.warn("消息解析失败：", err)
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    useAuthStore.getState().loadFromStorage()
    connect()

    return () => {
      mountedRef.current = false
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current)
      }
      const { session } = useWebSocketStore.getState()
      if (session) {
        // Remove onclose handler to prevent reconnection logic during unmount
        session.onclose = null
        session.onerror = null
        session.close()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

function dispatchMessage(msg: allMessageType.ServerToWeb | allMessageType.General) {
  const store = useDataStore.getState()

  if (wsServerToWebGuard.isLayoutOverview(msg)) {
    store.setLayoutOverview(msg.data)
  } else if (wsServerToWebGuard.isDataCommonInit(msg)) {
    store.setCommon(msg.data)
  } else if (wsServerToWebGuard.isDataMcServerStatusSet(msg)) {
    store.setMcServerStatus(msg.data)
  } else if (wsServerToWebGuard.isDataBotInit(msg)) {
    store.setBot(msg.data)
  } else if (wsServerToWebGuard.isStaticBotTask(msg)) {
    store.setBotTask(msg.data)
  } else if (wsServerToWebGuard.isDataAeInit(msg)) {
    store.setAe(msg.data)
  } else if (wsServerToWebGuard.isDataEventInit(msg)) {
    store.setEvent(msg.data)
  } else if (wsServerToWebGuard.isDataRedstoneInit(msg)) {
    store.setRedstone(msg.data)
  } else if (wsServerToWebGuard.isDataAeAdd(msg)) {
    store.addAe(msg.data)
  } else if (wsServerToWebGuard.isDataAeRemove(msg)) {
    store.removeAe(msg.data)
  } else if (wsServerToWebGuard.isDataAeItemsSet(msg)) {
    store.setAeItems(msg.data.uuid, msg.data.items)
  } else if (wsServerToWebGuard.isDataAeCpusSet(msg)) {
    store.setAeCpus(msg.data.uuid, msg.data.cpus)
  } else if (wsServerToWebGuard.isDataAeLevelMaintainsSet(msg)) {
    store.setAeLevelMaintains(msg.data.uuid, msg.data.levelMaintains)
  } else if (wsServerToWebGuard.isDataBotAdd(msg)) {
    store.addBot(msg.data)
  } else if (wsServerToWebGuard.isDataBotRemove(msg)) {
    store.removeBot(msg.data)
  } else if (wsServerToWebGuard.isDataBotComponentsSet(msg)) {
    store.setBotComponents(msg.data.uuid, msg.data.components)
  } else if (wsServerToWebGuard.isDataBotTasksSet(msg)) {
    store.setBotTasks(msg.data.uuid, msg.data.tasks)
  } else if (wsServerToWebGuard.isDataCommonAdd(msg)) {
    store.addCommon(msg.data)
  } else if (wsServerToWebGuard.isDataCommonRemove(msg)) {
    store.removeCommon(msg.data)
  } else if (wsServerToWebGuard.isDataCommonSet(msg)) {
    store.setCommonItem(msg.data.uuid, msg.data)
  } else if (wsServerToWebGuard.isDataEventAdd(msg)) {
    store.addEvent(msg.data)
  } else if (wsServerToWebGuard.isDataEventRemove(msg)) {
    store.removeEvent(msg.data)
  } else if (wsServerToWebGuard.isDataEventSet(msg)) {
    store.setEventItem(msg.data.uuid, msg.data)
  } else if (wsServerToWebGuard.isDataRedstoneAdd(msg)) {
    store.addRedstone(msg.data)
  } else if (wsServerToWebGuard.isDataRedstoneRemove(msg)) {
    store.removeRedstone(msg.data)
  } else if (wsServerToWebGuard.isDataRedstoneSet(msg)) {
    store.setRedstoneItem(msg.data.uuid, msg.data)
  } else if (wsGeneralGuard.isInfo(msg)) {
    snackbar({
      message: `服务端消息: ${msg.data.message}`,
      autoCloseDelay: 5000,
      closeable: true,
    })
  } else if (wsGeneralGuard.isWarning(msg)) {
    snackbar({
      message: `服务端警告: ${msg.data.message}`,
      autoCloseDelay: 5000,
      closeable: true,
    })
  } else if (wsGeneralGuard.isError(msg)) {
    snackbar({
      message: `服务端错误: ${msg.data.message}`,
      autoCloseDelay: 5000,
      closeable: true,
    })
  }
}

export function sendMessage(message: allMessageType.WebToServer) {
  const { session } = useWebSocketStore.getState()
  if (session) {
    session.send(JSON.stringify(message))
  }
}
