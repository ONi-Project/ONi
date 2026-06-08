import type { ComponentType, ReactNode } from "react"
import type { layoutModel } from "@oni/interface"
import { cardRegistry } from "../components/cards"
import { blockRegistry } from "../components/blocks"

/**
 * DynamicLayout - Server-driven layout renderer (React version)
 *
 * Takes a layout JSON from the server and renders the appropriate
 * card/block components using component registries.
 */
interface DynamicLayoutProps {
  layout: layoutModel.Layout
  animation?: boolean
}

export function DynamicLayout({ layout, animation = true }: DynamicLayoutProps) {
  const blocks = layout.map((block, blockIndex) => {
    const BlockComponent = getBlockComponent(block.type)
    if (!BlockComponent) {
      console.warn(`Unknown block type: ${block.type}`)
      return null
    }

    const children = block.content.map((item, itemIndex) => {
      if (item.type === "card") {
        const CardComponent = getCardComponent(item.id)
        if (!CardComponent) {
          console.warn(`Unknown card id: ${item.id}`)
          return null
        }

        const cardKey = `${blockIndex}-${itemIndex}`
        const isGridFull = block.type === "grid-full"
        // grid-full: 块级 fadeIn, 内部卡片无独立动画
        // 其他: 块无动画, 每张卡片 stagger fadeInUp
        const cardAnim = animation && !isGridFull
        const delay = cardAnim ? `${itemIndex * 0.03}s` : "0s"

        return (
          <div
            key={cardKey}
            className={cardAnim ? "animate__animated animate__fadeInUp animate__faster" : ""}
            style={cardAnim ? { animationDelay: delay } : undefined}
          >
            <CardComponent config={item.config} />
          </div>
        )
      }

      if (item.type === "tab") {
        // Tab components will be added later
        return null
      }

      return null
    })

    const blockKey = `block-${blockIndex}`

    return (
      <div
        key={blockKey}
        className={
          block.type === "grid-full" && animation
            ? "animate__animated animate__fadeIn animate__faster"
            : ""
        }
      >
        <BlockComponent>{children}</BlockComponent>
      </div>
    )
  })

  return <>{blocks}</>
}

// Helper to get a card component by ID
export function getCardComponent(id: string): ComponentType<{ config?: any }> | null {
  // Convert kebab-case to camelCase for registry lookup
  const camelId = id.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())
  return cardRegistry[camelId] || cardRegistry[id] || null
}

// Helper to get a block component by type
export function getBlockComponent(type: string): ComponentType<{ children?: ReactNode }> | null {
  return blockRegistry[type] || null
}
