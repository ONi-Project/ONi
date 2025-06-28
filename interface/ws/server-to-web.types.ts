import type { Message } from "./base.types"
import type { Bot } from "data/bot.types"
import type { Ae } from "data/ae.types"
import type { User } from "data/user.types"
import type { Common } from "data/common.types"
import type { McServerStatus } from "data/mcServerStatus.types"

export interface AuthResponse extends Message<"AuthResponse", User> { }
export interface DataCommonSet extends Message<"DataCommonSet", Common> { }
export interface DataBotSet extends Message<"DataBotSet", Bot> { }
export interface DataAeSet extends Message<"DataAeSet", Ae> { }
export interface DataMcServerStatusSet extends Message<"DataMcServerStatusSet", McServerStatus> { }