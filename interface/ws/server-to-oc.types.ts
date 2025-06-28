import type { Message } from "./base.types"
import type { Bot, BotTask } from "data/bot.types"

export type AuthResponse = Message<"AuthResponse", Bot>
export type Task = Message<"Task", [BotTask]>
