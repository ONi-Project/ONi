import { create } from "zustand"
import type {
  aeModel,
  botModel,
  commonModel,
  eventModel,
  layoutModel,
  mcServerStatusModel,
  redstoneModel,
  staticModel,
} from "@oni/interface"

interface DataState {
  common: commonModel.CommonArray
  bot: botModel.BotArray
  ae: aeModel.AeArray
  event: eventModel.EventArray
  redstone: redstoneModel.RedstoneArray
  botTask: staticModel.BotTask[]
  mcServerStatus: mcServerStatusModel.McServerStatus
  layoutOverview: layoutModel.Layout | null

  // Init
  setCommon: (data: commonModel.CommonArray) => void
  setBot: (data: botModel.BotArray) => void
  setAe: (data: aeModel.AeArray) => void
  setLayoutOverview: (layout: layoutModel.Layout | null) => void
  setEvent: (data: eventModel.EventArray) => void
  setRedstone: (data: redstoneModel.RedstoneArray) => void
  setBotTask: (data: staticModel.BotTask[]) => void
  setMcServerStatus: (data: mcServerStatusModel.McServerStatus) => void

  // CRUD-like operations
  addAe: (item: aeModel.Ae) => void
  removeAe: (uuid: string) => void
  setAeItems: (uuid: string, items: any) => void
  setAeCpus: (uuid: string, cpus: any) => void
  setAeLevelMaintains: (uuid: string, maintains: any) => void

  addBot: (item: botModel.Bot) => void
  removeBot: (uuid: string) => void
  setBotComponents: (uuid: string, components: any) => void
  setBotTasks: (uuid: string, tasks: any) => void

  addCommon: (item: any) => void
  removeCommon: (uuid: string) => void
  setCommonItem: (uuid: string, data: any) => void

  addEvent: (item: eventModel.Event) => void
  removeEvent: (uuid: string) => void
  setEventItem: (uuid: string, data: eventModel.Event) => void

  addRedstone: (item: any) => void
  removeRedstone: (uuid: string) => void
  setRedstoneItem: (uuid: string, data: any) => void
}

export const useDataStore = create<DataState>((set) => ({
  common: [],
  bot: [],
  ae: [],
  event: [],
  redstone: [],
  botTask: [],
  mcServerStatus: {} as mcServerStatusModel.McServerStatus,
  layoutOverview: null,

  setCommon: (data) => set({ common: data }),
  setBot: (data) => set({ bot: data }),
  setAe: (data) => set({ ae: data }),
  setEvent: (data) => set({ event: data }),
  setRedstone: (data) => set({ redstone: data }),
  setBotTask: (data) => set({ botTask: data }),
  setMcServerStatus: (data) => set({ mcServerStatus: data }),
  setLayoutOverview: (layout) => set({ layoutOverview: layout }),

  addAe: (item) => set((state) => ({ ae: [...state.ae, item] })),
  removeAe: (uuid) =>
    set((state) => ({ ae: state.ae.filter((a) => a.uuid !== uuid) })),
  setAeItems: (uuid, items) =>
    set((state) => ({
      ae: state.ae.map((a) => (a.uuid === uuid ? { ...a, items } : a)),
    })),
  setAeCpus: (uuid, cpus) =>
    set((state) => ({
      ae: state.ae.map((a) => (a.uuid === uuid ? { ...a, cpus } : a)),
    })),
  setAeLevelMaintains: (uuid, levelMaintains) =>
    set((state) => ({
      ae: state.ae.map((a) =>
        a.uuid === uuid ? { ...a, levelMaintains } : a
      ),
    })),

  addBot: (item) => set((state) => ({ bot: [...state.bot, item] })),
  removeBot: (uuid) =>
    set((state) => ({ bot: state.bot.filter((b) => b.uuid !== uuid) })),
  setBotComponents: (uuid, components) =>
    set((state) => ({
      bot: state.bot.map((b) =>
        b.uuid === uuid ? { ...b, components } : b
      ),
    })),
  setBotTasks: (uuid, tasks) =>
    set((state) => ({
      bot: state.bot.map((b) => (b.uuid === uuid ? { ...b, tasks } : b)),
    })),

  addCommon: (item) =>
    set((state) => ({ common: [...state.common, item] })),
  removeCommon: (uuid) =>
    set((state) => ({
      common: state.common.filter((c) => c.uuid !== uuid),
    })),
  setCommonItem: (uuid, data) =>
    set((state) => ({
      common: state.common.map((c) => (c.uuid === uuid ? data : c)),
    })),

  addEvent: (item) =>
    set((state) => ({ event: [...state.event, item] })),
  removeEvent: (uuid) =>
    set((state) => ({
      event: state.event.filter((e) => e.uuid !== uuid),
    })),
  setEventItem: (uuid, data) =>
    set((state) => ({
      event: state.event.map((e) => (e.uuid === uuid ? data : e)),
    })),

  addRedstone: (item) =>
    set((state) => ({ redstone: [...state.redstone, item] })),
  removeRedstone: (uuid) =>
    set((state) => ({
      redstone: state.redstone.filter((r) => r.uuid !== uuid),
    })),
  setRedstoneItem: (uuid, data) =>
    set((state) => ({
      redstone: state.redstone.map((r) => (r.uuid === uuid ? data : r)),
    })),
}))
