import { useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"

interface CircularProgressProps {
  /** 0-100 的百分比值 */
  percent: number
  /** 尺寸 (px)，默认 120 */
  size?: number
  /** 描边宽度，默认 4 */
  strokeWidth?: number
  /** 动画时长 (秒)，默认 1.4 */
  duration?: number
  /** 轨道颜色，默认 #333 */
  trailColor?: string
  /** 进度颜色 (起始)，默认 #f55 */
  fromColor?: string
  /** 进度颜色 (结束)，默认 #5f5 */
  toColor?: string
  /** 文字颜色，默认 #999 */
  textColor?: string
  /** 文字大小，默认 2rem */
  fontSize?: string
  /** 自定义文字格式化 */
  formatText?: (percent: number) => string
}

/**
 * 可复用的圆形进度条组件
 *
 * 使用 Motion SVG 动画替代 progressbar.js
 * 支持颜色渐变、自定义尺寸、动画过渡
 */
export default function CircularProgress({
  percent,
  size = 120,
  strokeWidth = 4,
  duration = 1.4,
  trailColor = "#333",
  fromColor = "#f55",
  toColor = "#5f5",
  textColor = "#999",
  fontSize = "2rem",
  formatText,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const progress = useMotionValue(0)
  const strokeDashoffset = useTransform(
    progress,
    [0, 100],
    [circumference, 0]
  )

  // 插值颜色
  const strokeColor = useTransform(
    progress,
    [0, 50, 100],
    [fromColor, "#aa5", toColor]
  )

  const displayText = useTransform(progress, (latest) => {
    if (formatText) return formatText(Math.round(latest))
    return `${Math.round(latest)}%`
  })

  useEffect(() => {
    const clamped = Math.max(0, Math.min(100, percent))
    const controls = animate(progress, clamped, {
      duration,
      ease: "easeInOut",
    })
    return controls.stop
  }, [percent, duration, progress])

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* 轨道 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trailColor}
          strokeWidth={strokeWidth}
        />
        {/* 进度 */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      <motion.span
        className="absolute text-center"
        style={{ color: textColor, fontSize }}
      >
        {displayText}
      </motion.span>
    </div>
  )
}
