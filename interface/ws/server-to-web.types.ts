import type { Message } from "./base.types"
import type { aeModel, botModel, commonModel, mcServerStatusModel, userModel } from "index"

export type AuthResponse = Message<"AuthResponse", userModel.User>
export type DataCommonSet = Message<"DataCommonSet", commonModel.Common>
export type DataBotSet = Message<"DataBotSet", botModel.Bot>
export type DataAeSet = Message<"DataAeSet", aeModel.Ae>
export type DataMcServerStatusSet = Message<"DataMcServerStatusSet", mcServerStatusModel.McServerStatus>
export type AeOrderResult = Message<"AeOrderResult", aeModel.AeOrderResult>