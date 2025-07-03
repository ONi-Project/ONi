import type { Message } from "./base.types"
import type { aeModel, botModel, commonModel, eventModel, layoutModel, mcServerStatusModel, redstoneModel, userModel, staticModel } from "../index"

export type AuthResponse = Message<"AuthResponse", userModel.User | null>
export type DataMcServerStatusSet = Message<"DataMcServerStatusSet", mcServerStatusModel.McServerStatus>
export type AeOrderResult = Message<"AeOrderResult", aeModel.AeOrderResult>

export type LayoutOverview = Message<"LayoutOverview", layoutModel.Layout>
// export type LayoutControl = Message<"LayoutControl", layoutModel.Layout>
// export type LayoutEvent = Message<"LayoutEvent", layoutModel.Layout>
// export type LayoutBotList = Message<"LayoutBotList", layoutModel.Layout>
// export type LayoutBotEdit = Message<"LayoutBotEdit", layoutModel.Layout>
// export type LayoutAeList = Message<"LayoutAeList", layoutModel.Layout>
// export type LayoutAeView = Message<"LayoutAeView", layoutModel.Layout>
// export type LayoutAeEdit = Message<"LayoutAeEdit", layoutModel.Layout>

export type DataCommonInit = Message<"DataCommonInit", commonModel.Common[]>
export type DataCommonSet = Message<"DataCommonSet", commonModel.Common>
export type DataCommonAdd = Message<"DataCommonAdd", commonModel.Common>
export type DataCommonRemove = Message<"DataCommonRemove", string>

export type DataBotInit = Message<"DataBotInit", botModel.Bot[]>
export type DataBotComponentsSet = Message<"DataBotComponentsSet", botModel.Bot>
export type DataBotTasksSet = Message<"DataBotTasksSet", botModel.Bot>
export type DataBotAdd = Message<"DataBotAdd", botModel.Bot>
export type DataBotRemove = Message<"DataBotRemove", string>

export type DataAeInit = Message<"DataAeInit", aeModel.Ae[]>
export type DataAeItemsSet = Message<"DataAeItemsSet", aeModel.Ae>
export type DataAeCpusSet = Message<"DataAeCpusSet", aeModel.Ae>
export type DataAeLevelMaintainsSet = Message<"DataAeLevelMaintainsSet", aeModel.Ae>
export type DataAeAdd = Message<"DataAeAdd", aeModel.Ae>
export type DataAeRemove = Message<"DataAeRemove", string>

export type DataEventInit = Message<"DataEventInit", eventModel.Event[]>
export type DataEventSet = Message<"DataEventSet", eventModel.Event>
export type DataEventAdd = Message<"DataEventAdd", eventModel.Event>
export type DataEventRemove = Message<"DataEventRemove", string>

export type DataRedstoneInit = Message<"DataRedstoneInit", redstoneModel.Redstone[]>
export type DataRedstoneSet = Message<"DataRedstoneSet", redstoneModel.Redstone>
export type DataRedstoneAdd = Message<"DataRedstoneAdd", redstoneModel.Redstone>
export type DataRedstoneRemove = Message<"DataRedstoneRemove", string>

// Static Resource Types
export type StaticBotTask = Message<"StaticBotTask", staticModel.BotTask[]>