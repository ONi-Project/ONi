import { useState, useRef, useEffect, useCallback } from "react"
import type { Dialog } from "mdui"
import { useDataStore } from "../../stores/useDataStore"
import { randomUUID } from "../../lib/utils"

type Step = 1 | 2 | 3

let globalBotTaskNew: ((callback: (task: any) => void) => void) | null = null

export default function BotTaskDialog() {
  const botTask = useDataStore((s) => s.botTask)
  const [step, setStep] = useState<Step>(1)
  const [showHidden, setShowHidden] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const dialog1Ref = useRef<Dialog>(null)
  const dialog2Ref = useRef<Dialog>(null)
  const dialog3Ref = useRef<Dialog>(null)
  const callbackRef = useRef<((task: any) => void) | null>(null)

  const [configValues, setConfigValues] = useState<Record<string, any>>({})
  const [globalConfigValues, setGlobalConfigValues] = useState<
    Record<string, any>
  >({})
  const [output, setOutput] = useState<any>(null)

  const botTaskNew = useCallback((cb: (task: any) => void) => {
    callbackRef.current = cb
    setStep(1)
    setShowHidden(false)
    setSelectedTask(null)
    setConfigValues({})
    setGlobalConfigValues({})
    setOutput(null)

    setTimeout(() => {
      if (dialog1Ref.current) dialog1Ref.current.open = true
    }, 50)
  }, [])

  // Expose globally
  globalBotTaskNew = botTaskNew

  const goToStep2 = useCallback(() => {
    if (!selectedTask) return

    const taskId = selectedTask.split(".")[0]
    const modeId = selectedTask.split(".")[1]
    const task = botTask.find((t: any) => t.id === taskId)
    if (!task) return

    const mode = task.mode.find((m: any) => m.id === modeId)
    if (!mode) return

    // Reset config values
    const defaults: Record<string, any> = {}
    mode.config?.forEach((cfg: any) => {
      if (cfg.type === "boolean") defaults[cfg.id] = true
      else defaults[cfg.id] = ""
    })
    setConfigValues(defaults)

    const globalDefaults: Record<string, any> = {
      interval: "",
    }
    setGlobalConfigValues(globalDefaults)

    if (dialog1Ref.current) dialog1Ref.current.open = false
    setTimeout(() => {
      setStep(2)
      if (dialog2Ref.current) dialog2Ref.current.open = true
    }, 100)
  }, [selectedTask, botTask])

  const goBackToStep1 = useCallback(() => {
    if (dialog2Ref.current) dialog2Ref.current.open = false
    setTimeout(() => {
      setStep(1)
      if (dialog1Ref.current) dialog1Ref.current.open = true
    }, 100)
  }, [])

  const goToStep3 = useCallback(() => {
    if (!selectedTask) return

    const taskId = selectedTask.split(".")[0]
    const modeId = selectedTask.split(".")[1]

    // Validate required configs
    const task = botTask.find((t: any) => t.id === taskId)
    if (!task) return
    const mode = task.mode.find((m: any) => m.id === modeId)
    if (!mode) return

    let ok = true

    // Check config
    mode.config?.forEach((cfg: any) => {
      const val = configValues[cfg.id]
      if (cfg.required && (val === "" || val === undefined || val === null)) {
        ok = false
      }
    })

    // Check global config
    if (!globalConfigValues.interval) {
      ok = false
    }

    if (!ok) return

    const taskOutput = {
      task: taskId,
      interval: globalConfigValues.interval,
      taskUuid: randomUUID(),
      config: {
        mode: modeId,
        ...configValues,
      },
    }

    setOutput(taskOutput)

    if (dialog2Ref.current) dialog2Ref.current.open = false
    setTimeout(() => {
      setStep(3)
      if (dialog3Ref.current) dialog3Ref.current.open = true
    }, 100)
  }, [selectedTask, configValues, globalConfigValues, botTask])

  const confirmAddTask = useCallback(() => {
    if (dialog3Ref.current) dialog3Ref.current.open = false
    if (callbackRef.current && output) {
      callbackRef.current(output)
    }
  }, [output])

  const goBackToStep2 = useCallback(() => {
    if (dialog3Ref.current) dialog3Ref.current.open = false
    setTimeout(() => {
      setStep(2)
      if (dialog2Ref.current) dialog2Ref.current.open = true
    }, 100)
  }, [])

  const selectedModeInfo = useCallback(() => {
    if (!selectedTask) return null
    const taskId = selectedTask.split(".")[0]
    const modeId = selectedTask.split(".")[1]
    const task = botTask.find((t: any) => t.id === taskId)
    if (!task) return null
    const mode = task.mode.find((m: any) => m.id === modeId)
    if (!mode) return null
    return { task, mode }
  }, [selectedTask, botTask])

  const modeInfo = selectedModeInfo()

  return (
    <>
      {/* Step 1: Select task type */}
      <mdui-dialog
        ref={dialog1Ref}
        id="bot__task-dialog-step1"
        style={{ padding: "0 !important" }}
      >
        <div
          className="card-title"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <mdui-icon
            name="tips_and_updates"
            style={{ marginRight: "0.5rem" }}
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div style={{ opacity: 0.5, marginLeft: "0.5rem" }}>(1/3)</div>
        </div>

        <div style={{ opacity: 0.5 }}>请选择任务类型：</div>

        <mdui-card
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
            padding: "1rem",
            maxWidth: "100%",
          }}
        >
          <mdui-list style={{ width: "100%", marginTop: "-0.5rem", marginBottom: "-0.5rem" }}>
            <mdui-collapse id="bot__task-dialog-step1-list" accordion>
              {botTask.map((task: any) => (
                <mdui-collapse-item key={task.id} value={task.id}>
                  <mdui-list-item slot="header" icon={task.icon}>
                    <div>{task.id}</div>
                    <div style={{ opacity: 0.5 }}>{task.description}</div>
                    <mdui-icon
                      slot="end-icon"
                      name="keyboard_arrow_down"
                    ></mdui-icon>
                  </mdui-list-item>
                  <div style={{ marginLeft: "3rem" }}>
                    {task.mode
                      .filter((mode: any) =>
                        mode.hidden && !showHidden ? false : true
                      )
                      .map((mode: any) => (
                        <mdui-list-item
                          key={mode.id}
                          value={mode.id}
                          className="bot__task-task-mode-item"
                          style={{ opacity: mode.hidden ? 0.4 : 1 }}
                          onClick={() => {
                            setSelectedTask(`${task.id}.${mode.id}`)
                          }}
                        >
                          <div>{mode.id}</div>
                          <div style={{ opacity: 0.5 }}>
                            {mode.description}
                          </div>
                          <mdui-icon
                            slot="end-icon"
                            name={
                              selectedTask === `${task.id}.${mode.id}`
                                ? "radio_button_checked"
                                : "radio_button_unchecked"
                            }
                          ></mdui-icon>
                        </mdui-list-item>
                      ))}
                  </div>
                </mdui-collapse-item>
              ))}
            </mdui-collapse>
          </mdui-list>
        </mdui-card>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          <mdui-switch
            id="bot__task-dialog-step1-show-hidden-switch"
            checked={showHidden}
            onChange={() => setShowHidden(!showHidden)}
          ></mdui-switch>
          <div style={{ opacity: 0.5 }}>显示隐藏的任务</div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <mdui-button
            full-width
            variant="outlined"
            style={{ flex: 1 }}
            onClick={() => {
              if (dialog1Ref.current) dialog1Ref.current.open = false
            }}
          >
            取消
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step1-next-button"
            style={{ flex: 4 }}
            disabled={!selectedTask}
            onClick={goToStep2}
          >
            {selectedTask
              ? `下一步 (${selectedTask})`
              : "下一步"}
          </mdui-button>
        </div>
      </mdui-dialog>

      {/* Step 2: Configure task */}
      <mdui-dialog
        ref={dialog2Ref}
        id="bot__task-dialog-step2"
        style={{ padding: "0 !important" }}
      >
        <div
          className="card-title"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <mdui-icon
            name="tips_and_updates"
            style={{ marginRight: "0.5rem" }}
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div style={{ opacity: 0.5, marginLeft: "0.5rem" }}>(2/3)</div>
        </div>

        <div style={{ opacity: 0.5 }}>请填写任务参数：</div>

        {modeInfo && (
          <>
            <mdui-card
              style={{
                marginTop: "1rem",
                padding: "1rem",
                maxWidth: "100%",
                width: "40rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <mdui-icon
                  id="bot__task-dialog-step2-icon"
                  name={modeInfo.task.icon || "grid_on"}
                ></mdui-icon>
                <div style={{ marginLeft: "0.25rem" }}>
                  <div
                    id="bot__task-dialog-step2-id"
                    style={{ fontWeight: "bold" }}
                  >
                    {selectedTask}
                  </div>
                  <div
                    id="bot__task-dialog-step2-description"
                    style={{ opacity: 0.5, fontSize: "small" }}
                  >
                    {modeInfo.mode.description}
                  </div>
                </div>
              </div>

              <mdui-list
                id="bot__task-dialog-step2-config-list"
                style={{
                  marginTop: "-1rem",
                  marginBottom: "-0.5rem",
                  padding: "0.5rem",
                }}
              >
                {modeInfo.mode.config?.length > 0 ? (
                  modeInfo.mode.config.map((cfg: any) => (
                    <div
                      key={cfg.id}
                      style={{
                        display: "flex",
                        marginTop: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div>
                          {cfg.id}
                          <span
                            style={{
                              marginLeft: "0.5rem",
                              opacity: 0.5,
                              fontSize: "small",
                            }}
                          >
                            {cfg.type}
                            {!cfg.required ? "?" : ""}
                          </span>
                        </div>
                        <div style={{ opacity: 0.5, fontSize: "small" }}>
                          {cfg.description}
                        </div>
                      </div>
                      {cfg.type === "boolean" ? (
                        <mdui-switch
                          style={{ marginLeft: "auto" }}
                          checked={configValues[cfg.id] ?? true}
                          onChange={(e: any) =>
                            setConfigValues((prev) => ({
                              ...prev,
                              [cfg.id]: e.target.checked,
                            }))
                          }
                        ></mdui-switch>
                      ) : cfg.type === "redstoneUuid" ||
                        cfg.type === "aeUuid" ? (
                        <mdui-select
                          end-icon="keyboard_arrow_down"
                          style={{ marginLeft: "auto", width: "10rem" }}
                          variant="outlined"
                          value={configValues[cfg.id] || ""}
                          onChange={(e: any) =>
                            setConfigValues((prev) => ({
                              ...prev,
                              [cfg.id]: e.target.value,
                            }))
                          }
                        >
                          <mdui-menu-item value="item-1">
                            Item 1
                          </mdui-menu-item>
                          <mdui-menu-item value="item-2">
                            Item 2
                          </mdui-menu-item>
                        </mdui-select>
                      ) : (
                        <mdui-text-field
                          style={{ marginLeft: "auto", width: "10rem" }}
                          type={cfg.type === "number" ? "number" : "text"}
                          variant="outlined"
                          clearable
                          value={configValues[cfg.id] || ""}
                          onChange={(e: any) =>
                            setConfigValues((prev) => ({
                              ...prev,
                              [cfg.id]:
                                cfg.type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value,
                            }))
                          }
                        ></mdui-text-field>
                      )}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      marginTop: "1rem",
                      opacity: 0.5,
                      textAlign: "center",
                    }}
                  >
                    此模式无配置项
                  </div>
                )}
              </mdui-list>
            </mdui-card>

            <mdui-card
              style={{
                marginTop: "1rem",
                padding: "1rem",
                maxWidth: "100%",
                width: "40rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <mdui-icon name="public"></mdui-icon>
                <div style={{ marginLeft: "0.25rem" }}>
                  <div style={{ fontWeight: "bold" }}>global</div>
                  <div style={{ opacity: 0.5, fontSize: "small" }}>
                    全局配置
                  </div>
                </div>
              </div>

              <mdui-list
                id="bot__task-dialog-step2-global-config-list"
                style={{
                  marginTop: "-1rem",
                  marginBottom: "-0.5rem",
                  padding: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div>
                      interval
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          opacity: 0.5,
                          fontSize: "small",
                        }}
                      >
                        number
                      </span>
                    </div>
                    <div style={{ opacity: 0.5, fontSize: "small" }}>
                      任务执行的间隔时间，单位为秒。
                    </div>
                  </div>
                  <mdui-text-field
                    style={{ marginLeft: "auto", width: "10rem" }}
                    type="number"
                    variant="outlined"
                    clearable
                    value={globalConfigValues.interval || ""}
                    onChange={(e: any) =>
                      setGlobalConfigValues((prev) => ({
                        ...prev,
                        interval: Number(e.target.value),
                      }))
                    }
                  ></mdui-text-field>
                </div>
              </mdui-list>
            </mdui-card>
          </>
        )}

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <mdui-button
            full-width
            id="bot__task-dialog-step2-back-button"
            variant="outlined"
            style={{ flex: 1 }}
            onClick={goBackToStep1}
          >
            上一步
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step2-next-button"
            style={{ flex: 4 }}
            onClick={goToStep3}
          >
            下一步
          </mdui-button>
        </div>
      </mdui-dialog>

      {/* Step 3: Confirm */}
      <mdui-dialog
        ref={dialog3Ref}
        id="bot__task-dialog-step3"
        style={{ padding: "0 !important" }}
      >
        <div
          className="card-title"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <mdui-icon
            name="tips_and_updates"
            style={{ marginRight: "0.5rem" }}
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div style={{ opacity: 0.5, marginLeft: "0.5rem" }}>(3/3)</div>
        </div>

        <div style={{ opacity: 0.5 }}>
          请确认添加的任务正确无误：
        </div>

        <mdui-card
          style={{
            marginTop: "1rem",
            padding: "1rem",
            maxWidth: "100%",
            width: "40rem",
          }}
        >
          <pre
            id="bot__task-dialog-step3-preview"
            style={{ fontFamily: "Noto Sans Mono" }}
          >
            {output ? JSON.stringify(output, null, 4) : ""}
          </pre>
        </mdui-card>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
          <mdui-button
            full-width
            id="bot__task-dialog-step3-back-button"
            variant="outlined"
            style={{ flex: 1 }}
            onClick={goBackToStep2}
          >
            上一步
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step3-next-button"
            style={{ flex: 4 }}
            onClick={confirmAddTask}
          >
            添加任务到 Suika
          </mdui-button>
        </div>
      </mdui-dialog>
    </>
  )
}

// Exported for external use
export function botTaskNew(callback: (task: any) => void) {
  if (globalBotTaskNew) {
    globalBotTaskNew(callback)
  }
}
