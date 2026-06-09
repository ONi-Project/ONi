import type { Variants } from "motion/react"

/**
 * 集中式动画变体配置
 *
 * 所有页面/组件共享的动画定义放在这里。
 * 新增动画变体时只需在此文件添加，然后各处直接 import 使用。
 *
 * 使用方式：
 *   <motion.div variants={fadeInUp} initial="initial" animate="animate">
 *     content
 *   </motion.div>
 *
 * Stagger 效果：
 *   <motion.div variants={staggerContainer} initial="initial" animate="animate">
 *     <motion.div variants={fadeInUp}>item 1</motion.div>
 *     <motion.div variants={fadeInUp}>item 2</motion.div>
 *   </motion.div>
 */

/** 从下方淡入 + 上移 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

/** 纯淡入（无位移） */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/** Stagger 容器 — 子元素按顺序依次出现 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

/** 从左侧滑入 */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

/** 从右侧滑入 */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

/** 缩放进入 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

/**
 * 快捷过渡配置
 * 用于 <motion.div transition={transitions.fast}>
 */
export const transitions = {
  fast: { duration: 0.4 },
  normal: { duration: 0.6 },
  slow: { duration: 0.8 },
} as const
