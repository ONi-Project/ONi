import type { Message } from "./base.types"
import { botModel } from "index"

export type AuthResponse = Message<"AuthResponse", botModel.Bot>
export type Task = Message<"Task", botModel.BotTask[]>
