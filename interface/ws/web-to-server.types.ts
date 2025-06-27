import type { Message, OcMessage } from "./base.types"
import type { BotTask } from "data/bot.types"
import type { Event } from "data/event.types"

export interface AuthRequest extends Message<"AuthRequest", { token: string }> { }
export interface OcTaskRunSingle extends OcMessage<"OcTaskRunSingle", BotTask, string> { }
export interface OcTaskAdd extends OcMessage<"OcTaskAdd", BotTask, string> { }
export interface OcTaskRemove extends OcMessage<"OcTaskRemove", BotTask, string> { }
export interface dataEventSet extends Message<"dataEventSet", Event> { }