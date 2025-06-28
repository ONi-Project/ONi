import type { Message, OcMessage } from "./base.types"
import type { BotTask } from "data/bot.types"
import type { Event } from "data/event.types"

export type AuthRequest = Message<"AuthRequest", { token: string }> 
export type OcTaskRunSingle = OcMessage<"OcTaskRunSingle", BotTask, string> 
export type OcTaskAdd = OcMessage<"OcTaskAdd", BotTask, string> 
export type OcTaskRemove = OcMessage<"OcTaskRemove", BotTask, string> 
export type DataEventSet = Message<"dataEventSet", Event> 