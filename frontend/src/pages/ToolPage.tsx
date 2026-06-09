import { useState, useRef } from "react"
import { motion } from "motion/react"
import type { Dialog } from "mdui"
import { fadeInUp } from "../lib/animations"

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
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <mdui-card
            variant="filled"
            className="card"
            id="tool__power-convert"
          >
            <div className="card-title flex items-center">
              <mdui-icon
                name="power"
                className="text-[32px] mr-[0.35rem]"
              ></mdui-icon>
              <div>功率转换</div>
            </div>

            <div className="opacity-50 text-lg">输入功率</div>
            <div className="flex items-center gap-4">
              <mdui-text-field
                type="number"
                label="电流 (A)"
                value={amp}
                onChange={(e: any) => setAmp(e.target.value)}
              ></mdui-text-field>
              <mdui-text-field
                className="cursor-pointer w-48"
                label="电压等级"
                readonly
                value={voltageLabels[level - 1]}
                onClick={() => {
                  if (selectDialogRef.current)
                    selectDialogRef.current.open = true
                }}
              ></mdui-text-field>
            </div>

            <div className="opacity-50 text-lg mt-4">
              输出功率
            </div>
            {voltageLabels.map((label, i) => {
              const result = power / voltageMap[i]
              return (
                <div key={i}>
                  {label.split(" ")[0]}: <b>{isNaN(result) ? "0.00" : result.toFixed(2)}</b> A
                </div>
              )
            })}
          </mdui-card>
        </motion.div>

        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.03 }}
          >
            <mdui-card
              variant="filled"
              className="card"
            >
              test
            </mdui-card>
          </motion.div>
        ))}
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
