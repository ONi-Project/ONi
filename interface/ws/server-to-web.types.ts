import type { Message } from "./base.types"
import type { Bot } from "data/bot.types"
import type { Ae } from "data/ae.types"
import type { User } from "data/user.types"
import type { Common } from "data/common.types"
import type { McServerStatus } from "data/mcServerStatus.types"

export type AuthResponse = Message<"AuthResponse", User> 
export type DataCommonSet = Message<"DataCommonSet", Common> 
export type DataBotSet = Message<"DataBotSet", Bot> 
export type DataAeSet = Message<"DataAeSet", Ae> 
export type DataMcServerStatusSet = Message<"DataMcServerStatusSet", McServerStatus> 