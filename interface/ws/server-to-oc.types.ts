import type { Message } from "./base.types"
import type { Bot, BotTask } from "data/bot.types"

export interface AuthResponse extends Message<"AuthResponse", Bot> { }
export interface Task extends Message<"Task", [BotTask]> { }
