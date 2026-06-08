import { useState } from "react"

export default function StatPage() {
  const [slValue, setSlValue] = useState(10)

  return (
    <div id="stat__content" className="panel-content">
      <div
        className="animate__animated animate__fadeInUp animate__faster"
        style={{
          marginBottom: "0.5rem",
          padding: "0.25rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <mdui-text-field
          variant="outlined"
          icon="search"
          label="检索统计项目..."
        ></mdui-text-field>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>简化等级</div>
        <mdui-slider
          id="slider-SL"
          tickmarks
          step="1"
          min="1"
          max="15"
          value={slValue}
          style={{ width: "15rem" }}
          onChange={(e: any) => setSlValue(e.target.value)}
        ></mdui-slider>
        <span style={{ opacity: 0.5 }}>{slValue}</span>
      </div>

      <div className="grid-l" style={{ marginTop: "1rem" }}>
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
