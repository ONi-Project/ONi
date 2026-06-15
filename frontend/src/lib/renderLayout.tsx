import type { ComponentType, ReactNode } from "react"
import { motion } from "motion/react"
import type { layoutModel } from "@oni/interface"
import { cardRegistry } from "../components/cards"
import { blockRegistry } from "../components/blocks"
import { fadeIn, fadeInUp, staggerContainer } from "./animations"

/**
 * DynamicLayout - Server-driven layout renderer (React version)
 *
 * Takes a layout JSON from the server and renders the appropriate
 * card/block components using component registries.
 *
 * Animation strategy:
 * - grid-full: block-level fadeIn, no per-card animation
 * - Other grids: block has no animation, cards stagger fadeInUp
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

    const isGridFull = block.type === "grid-full"
    const children = block.content.map((item, itemIndex) => {
      if (item.type === "card") {
        const CardComponent = getCardComponent(item.id)
        if (!CardComponent) {
          console.warn(`Unknown card id: ${item.id}`)
          return null
        }

        const cardKey = `${blockIndex}-${itemIndex}`

        // grid-full: 块级 fadeIn, 内部卡片无独立动画
        // 其他: 卡片 stagger fadeInUp
        if (animation && !isGridFull) {
          return (
            <motion.div key={cardKey} variants={fadeInUp}>
              <CardComponent config={item.config} />
            </motion.div>
          )
        }

        return (
          <div key={cardKey}>
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

    // grid-full: 整个 block 做 fadeIn 动画
    if (animation && isGridFull) {
      return (
        <motion.div
          key={blockKey}
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4 }}
        >
          <BlockComponent>{children}</BlockComponent>
        </motion.div>
      )
    }

    // 其他 grid: block 包裹 stagger 容器, 内部卡片依次 fadeInUp
    if (animation) {
      return (
        <motion.div
          key={blockKey}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <BlockComponent>{children}</BlockComponent>
        </motion.div>
      )
    }

    return (
      <div key={blockKey}>
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
