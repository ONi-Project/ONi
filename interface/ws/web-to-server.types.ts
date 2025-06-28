import type { Message, OcMessage } from "./base.types"
import type { aeModel, botModel, eventModel } from "../index"

export type AuthRequest = Message<"AuthRequest", { token: string }>
export type OcTaskRunSingle = OcMessage<"OcTaskRunSingle", botModel.BotTask, string>
export type OcTaskAdd = OcMessage<"OcTaskAdd", botModel.BotTask, string>
export type OcTaskRemove = OcMessage<"OcTaskRemove", botModel.BotTask, string>
export type DataEventSet = Message<"dataEventSet", eventModel.Event>
export type OcForward = OcMessage<"OcForward", unknown, string>
export type AeOrder = OcMessage<"AeOrder", aeModel.AeOrder, string> 