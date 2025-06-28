import type { Message } from "./base.types"
import { aeModel, botModel, commonModel, eventModel } from "index"

export type AuthRequest = Message<"AuthRequest", { token: string }>
export type DataCommonSet = Message<"DataCommonSet", commonModel.Common>
export type DataAeItemList = Message<"DataAeItemList", aeModel.Ae>
export type DataAeCpuList = Message<"DataAeCpuList", aeModel.Ae>
export type DataEventAdd = Message<"DataEventAdd", eventModel.Event>
export type DataEventSet = Message<"dataEventSet", eventModel.Event>
export type DataBotComponent = Message<"DataBotComponent", botModel.BotComponent>
export type AeOrderResult = Message<"AeOrderResult", aeModel.AeOrderResult>
export type Log = Message<"Log", { level: string, message: string, file: string, location: string, taskUuid: string }>