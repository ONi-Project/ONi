import { create } from "zustand"

interface WebSocketState {
  session: WebSocket | null
  connected: boolean
  connectedOnce: boolean
  setSession: (session: WebSocket | null) => void
  setConnected: (connected: boolean) => void
  setConnectedOnce: (once: boolean) => void
}

export const useWebSocketStore = create<WebSocketState>((set) => ({
  session: null,
  connected: false,
  connectedOnce: false,

  setSession: (session) => set({ session }),
  setConnected: (connected) => set({ connected }),
  setConnectedOnce: (once) => set({ connectedOnce: once }),
}))
