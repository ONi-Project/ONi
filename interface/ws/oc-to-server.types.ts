import type { Message } from "./base.types"
import type { BotComponent } from "data/bot.types"
import type { Common } from "data/common.types"
import type { AeItem, AeCpu } from "data/ae.types"
import type { Event } from "data/event.types"

export interface AuthRequest extends Message<"AuthRequest", { token: string }> { }
export interface DataCommonSet extends Message<"DataCommonSet", Common> { }
export interface DataAeItemList extends Message<"DataAeItemList", [AeItem]> { }
export interface DataAeCpuList extends Message<"DataAeCpuList", [AeCpu]> { }
export interface DataEventAdd extends Message<"DataEventAdd", Event> { }
export interface dataEventSet extends Message<"dataEventSet", Event> { }
export interface DataBotComponent extends Message<"DataBotComponent", [BotComponent]> { }