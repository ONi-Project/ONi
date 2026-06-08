import type { ComponentType } from "react"
import GridFull from "./GridFull"
import GridL from "./GridL"
import GridM from "./GridM"
import GridS from "./GridS"
import Raw from "./Raw"

// Block registry for dynamic layout rendering
export const blockRegistry: Record<string, ComponentType<any>> = {
  "grid-full": GridFull,
  "grid-l": GridL,
  "grid-m": GridM,
  "grid-s": GridS,
  raw: Raw,
}

export function getBlockComponent(type: string): ComponentType<any> | null {
  return blockRegistry[type] || null
}
