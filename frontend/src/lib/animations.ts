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
 *
 * Tween easing 曲线类型（用于 `transition.ease`）：
 *
 * ─── 预设字符串（CSS 标准） ───
 *   "linear"      匀速
 *   "easeIn"      先慢后快（加速）
 *   "easeOut"     先快后慢（减速）
 *   "easeInOut"   两头慢中间快
 *
 * ─── 预设字符串（扩展） ───
 *   "circIn"      圆形缓入（突然加速感更强）
 *   "circOut"     圆形缓出（突然减速感更强）
 *   "circInOut"   圆形缓入缓出
 *   "backIn"      先向后拉再前进（有过冲）
 *   "backOut"     先前进再向后回拉（有过冲）
 *   "backInOut"   双向过冲
 *   "anticipate"  类似 backIn，起步前有轻微反方向预备动作
 *
 * ─── 三次贝塞尔 ───
 *   [cx1, cy1, cx2, cy2]   自定义曲线，值与 CSS cubic-bezier() 一致
 *   例: [0.17, 0.67, 0.83, 0.67]
 *
 * ─── 自定义函数 ───
 *   (t: number) => number   t ∈ [0,1]，返回映射后的进度
 *
 *
 * ─── transition.type 对比 ───
 *
 *   tween      基于时间的补间动画，用 ease 控制速度曲线
 *              → 可预测、无弹性、性能好
 *              → 参数: duration, ease, delay
 *
 *   spring     基于物理的弹簧动画（默认类型）
 *              → 有弹性感，可能过冲回弹
 *              → 参数: stiffness(刚度↑越硬), damping(阻尼↑越不弹),
 *                       mass(质量↑越慢), velocity(初速度)
 *              → 设 duration 会换算为 stiffness/damping
 *
 *   inertia    基于动量的惯性滑动（拖拽松开后的减速）
 *              → 参数: velocity, power, timeConstant,
 *                       bounceDamping, bounceStiffness
 *              → 主要用于 drag 场景
 *
 *   keyframes  关键帧动画，通过数组定义多个中间状态
 *              → 例: animate={{ x: [0, 100, 50] }}
 *
 *   just       瞬间跳转，无过渡动画
 *
 * ─── 默认 type 选择逻辑 ───
 *   - 变换属性 (x, y, scale, rotate...) → 默认 spring
 *   - 非变换属性 (opacity, color...)    → 默认 tween
 *   - 通过 variants 驱动时 → 默认 spring
 */

/**
 * ─── 动画策略：解耦 opacity 与运动 ───
 *
 * opacity 使用更短的时长，让内容快速"显现"减少等待感；
 * 位移/缩放使用稍长的时长 + 带微量过冲的贝塞尔曲线，增加灵动感。
 *
 * exit 动画则相反：opacity 先消失、位移后完成，形成"淡出快于移出"的层次。
 */

/** opacity 显露/消失时长 */
const DURATION_FADE_IN = 0.15
const DURATION_FADE_OUT = 0.12

/** 位移/缩放 入场/退场时长 */
const DURATION_MOVE_IN = 0.35
const DURATION_MOVE_OUT = 0.2

/**
 * 带微量过冲的三次贝塞尔
 * 图形近似 easeOutBack，但过冲幅度更克制（约 8% 而非 18%），
 * 在保留"灵动感"的同时不会显得突兀。
 */
const EASE_BOUNCE_IN = [0.34, 1.56, 0.64, 1] as const

/** 从下方淡入 + 上移 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_IN },
      y: { type: "tween", ease: EASE_BOUNCE_IN, duration: DURATION_MOVE_IN },
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_OUT },
      y: { type: "tween", ease: "easeOut", duration: DURATION_MOVE_OUT },
    },
  },
}

/** 纯淡入（无位移） */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { type: "tween", ease: "easeOut", duration: DURATION_FADE_IN } },
  exit: { opacity: 0, transition: { type: "tween", ease: "easeOut", duration: DURATION_FADE_OUT } },
}

/** Stagger 容器 — 子元素按顺序依次出现 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

/** 从左侧滑入 */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_IN },
      x: { type: "tween", ease: EASE_BOUNCE_IN, duration: DURATION_MOVE_IN },
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_OUT },
      x: { type: "tween", ease: "easeOut", duration: DURATION_MOVE_OUT },
    },
  },
}

/** 从右侧滑入 */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_IN },
      x: { type: "tween", ease: EASE_BOUNCE_IN, duration: DURATION_MOVE_IN },
    },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_OUT },
      x: { type: "tween", ease: "easeOut", duration: DURATION_MOVE_OUT },
    },
  },
}

/** 缩放进入 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.92 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_IN },
      scale: { type: "tween", ease: EASE_BOUNCE_IN, duration: DURATION_MOVE_IN },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      opacity: { type: "tween", ease: "easeOut", duration: DURATION_FADE_OUT },
      scale: { type: "tween", ease: "easeOut", duration: DURATION_MOVE_OUT },
    },
  },
}

/**
 * 快捷过渡配置
 * 用于 <motion.div transition={transitions.fast}>
 */
export const transitions = {
  fast: { duration: DURATION_FADE_IN },
  normal: { duration: 0.6 },
  slow: { duration: 0.8 },
} as const
