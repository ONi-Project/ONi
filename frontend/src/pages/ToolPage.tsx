import { useState, useRef, useCallback } from "react"
import type { Dialog } from "mdui"

const voltageMap = [
  32, 128, 512, 2048, 8192, 32768, 131072, 524288,
  2097152, 8388608, 33554432, 134217728, 536870912, 2147483648,
]

const voltageLabels = [
  "LV (32V)", "MV (128V)", "HV (512V)", "EV (2048V)",
  "IV (8192V)", "LuV (32768V)", "ZPM (131072V)", "UV (524288V)",
  "UHV (2097152V)", "UEV (8388608V)", "UIV (33554432V)",
  "UMV (134217728V)", "UXV (536870912V)", "MAX (2147483648V)",
]

export default function ToolPage() {
  const [amp, setAmp] = useState("")
  const [level, setLevel] = useState(1)
  const dialogRef = useRef<Dialog>(null)
  const selectDialogRef = useRef<Dialog>(null)

  const power = Number(amp) * voltageMap[level - 1]

  const handleSelectLevel = (lvl: number) => {
    setLevel(lvl)
    if (selectDialogRef.current) {
      selectDialogRef.current.open = false
    }
  }

  return (
    <div id="tool__content" className="panel-content">
      <div className="grid-l">
        {/* Power Converter */}
        <mdui-card
          className="card animate__animated animate__fadeInUp animate__faster"
          variant="filled"
          id="tool__power-convert"
        >
          <div
            className="card-title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <mdui-icon
              name="power"
              style={{ fontSize: "32px", marginRight: "0.35rem" }}
            ></mdui-icon>
            <div>功率转换</div>
          </div>

          <div style={{ opacity: 0.5, fontSize: "large" }}>输入功率</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <mdui-text-field
              type="number"
              label="电流 (A)"
              value={amp}
              onChange={(e: any) => setAmp(e.target.value)}
            ></mdui-text-field>
            <mdui-text-field
              style={{ cursor: "pointer", width: "12rem" }}
              label="电压等级"
              readonly
              value={voltageLabels[level - 1]}
              onClick={() => {
                if (selectDialogRef.current)
                  selectDialogRef.current.open = true
              }}
            ></mdui-text-field>
          </div>

          <div style={{ opacity: 0.5, fontSize: "large", marginTop: "1rem" }}>
            输出功率
          </div>
          {voltageLabels.map((label, i) => {
            const result = power / voltageMap[i]
            return (
              <div key={i} className={`power-box-${i + 1}`}>
                {label.split(" ")[0]}: <b>{isNaN(result) ? "0.00" : result.toFixed(2)}</b> A
              </div>
            )
          })}
        </mdui-card>

        <mdui-card
          className="card animate__animated animate__fadeInUp animate__faster"
          variant="filled"
        >
          test
        </mdui-card>
        <mdui-card
          className="card animate__animated animate__fadeInUp animate__faster"
          variant="filled"
        >
          test
        </mdui-card>
        <mdui-card
          className="card animate__animated animate__fadeInUp animate__faster"
          variant="filled"
        >
          test
        </mdui-card>
        <mdui-card
          className="card animate__animated animate__fadeInUp animate__faster"
          variant="filled"
        >
          test
        </mdui-card>
      </div>

      {/* Voltage selector dialog */}
      <mdui-dialog
        ref={selectDialogRef}
        id="tool__power-convert-select-dialog"
        close-on-overlay-click
      >
        <mdui-list>
          {voltageLabels.map((label, i) => (
            <mdui-list-item
              key={i}
              active={level === i + 1}
              value={String(i + 1)}
              className="tool__power-convert-select-dialog-button"
              onClick={() => handleSelectLevel(i + 1)}
            >
              {label}
            </mdui-list-item>
          ))}
        </mdui-list>
      </mdui-dialog>
    </div>
  )
}
