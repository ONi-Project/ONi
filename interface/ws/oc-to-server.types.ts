import type { Message } from "./base.types"
import type { BotComponent } from "data/bot.types"
import type { Common } from "data/common.types"
import type { AeItem, AeCpu } from "data/ae.types"
import type { Event } from "data/event.types"

export type AuthRequest = Message<"AuthRequest", { token: string }>
export type DataCommonSet = Message<"DataCommonSet", Common>
export type DataAeItemList = Message<"DataAeItemList", [AeItem]>
export type DataAeCpuList = Message<"DataAeCpuList", [AeCpu]>
export type DataEventAdd = Message<"DataEventAdd", Event>
export type DataEventSet = Message<"dataEventSet", Event>
export type DataBotComponent = Message<"DataBotComponent", [BotComponent]> //