import { useState } from "react"
import { motion } from "motion/react"
import { fadeInUp } from "../lib/animations"

export default function StatPage() {
  const [slValue, setSlValue] = useState(10)

  return (
    <div id="stat__content" className="panel-content">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mb-2 p-1 flex gap-2 items-center"
      >
        <mdui-text-field
          variant="outlined"
          icon="search"
          label="检索统计项目..."
        ></mdui-text-field>
      </motion.div>

      <div className="flex items-center gap-4">
        <div>简化等级</div>
        <mdui-slider
          id="slider-SL"
          tickmarks
          step="1"
          min="1"
          max="15"
          value={slValue}
          className="w-60"
          onChange={(e: any) => setSlValue(e.target.value)}
        ></mdui-slider>
        <span className="opacity-50">{slValue}</span>
      </div>

      <div className="grid-l mt-4">
        <mdui-card className="stats-chart-card" variant="filled">
          <div className="chart">
            <canvas id="chart-battery"></canvas>
          </div>
        </mdui-card>
        <mdui-card className="stats-chart-card" variant="filled">
          <div className="chart">
            <canvas id="chart-benzene"></canvas>
          </div>
        </mdui-card>
        <mdui-card className="stats-chart-card" variant="filled">
          <div className="chart">
            <canvas id="chart-nitrobenzene"></canvas>
          </div>
        </mdui-card>
      </div>
    </div>
  )
}
