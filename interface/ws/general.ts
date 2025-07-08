import type { Message } from "./base"

export type Info = Message<"Info", { message: string }>
export type Warning = Message<"Warning", { message: string }>
export type Error = Message<"Error", { message: string }>