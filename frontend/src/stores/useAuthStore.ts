import { create } from "zustand"
import type { userModel } from "@oni/interface"

interface AuthState {
  endpoint: string
  token: string
  user: userModel.User | null
  setEndpoint: (value: string) => void
  setToken: (value: string) => void
  setUser: (user: userModel.User | null) => void
  loadFromStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  endpoint: "",
  token: "",
  user: null,

  setEndpoint: (value: string) => {
    localStorage.setItem("endpoint", value)
    set({ endpoint: value })
  },

  setToken: (value: string) => {
    localStorage.setItem("token", value)
    set({ token: value })
  },

  setUser: (user) => set({ user }),

  loadFromStorage: () => {
    const endpoint = localStorage.getItem("endpoint") || ""
    const token = localStorage.getItem("token") || ""
    set({ endpoint, token })
  },
}))
