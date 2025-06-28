import type { Message } from "./base.types"

export type Error = Message<"Error", { message: string }>