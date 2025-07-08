import type { Message } from "./base.js"
import { botModel } from "../index.js"

export type AuthResponse = Message<"AuthResponse", botModel.Bot | null>
export type Task = Message<"Task", botModel.BotTask[]>
