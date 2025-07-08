import type { Message } from "./base"
import { botModel } from "../index"

export type AuthResponse = Message<"AuthResponse", botModel.Bot | null>
export type Task = Message<"Task", botModel.BotTask[]>
