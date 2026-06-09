import { useState, useRef, useCallback } from "react"
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
        className="p-0!"
      >
        <div className="card-title flex items-center mb-2">
          <mdui-icon
            name="tips_and_updates"
            className="mr-2"
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div className="opacity-50 ml-2">(1/3)</div>
        </div>

        <div className="opacity-50">请选择任务类型：</div>

        <mdui-card className="flex items-center gap-2 mt-4 p-4 max-w-full">
          <mdui-list className="w-full -mt-2 -mb-2">
            <mdui-collapse id="bot__task-dialog-step1-list" accordion>
              {botTask.map((task: any) => (
                <mdui-collapse-item key={task.id} value={task.id}>
                  <mdui-list-item slot="header" icon={task.icon}>
                    <div>{task.id}</div>
                    <div className="opacity-50">{task.description}</div>
                    <mdui-icon
                      slot="end-icon"
                      name="keyboard_arrow_down"
                    ></mdui-icon>
                  </mdui-list-item>
                  <div className="ml-12">
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
                          <div className="opacity-50">
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

        <div className="flex items-center gap-2 mt-4">
          <mdui-switch
            id="bot__task-dialog-step1-show-hidden-switch"
            checked={showHidden}
            onChange={() => setShowHidden(!showHidden)}
          ></mdui-switch>
          <div className="opacity-50">显示隐藏的任务</div>
        </div>

        <div className="flex gap-2 mt-4">
          <mdui-button
            full-width
            variant="outlined"
            className="flex-1"
            onClick={() => {
              if (dialog1Ref.current) dialog1Ref.current.open = false
            }}
          >
            取消
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step1-next-button"
            className="flex-[4]"
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
        className="p-0!"
      >
        <div className="card-title flex items-center mb-2">
          <mdui-icon
            name="tips_and_updates"
            className="mr-2"
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div className="opacity-50 ml-2">(2/3)</div>
        </div>

        <div className="opacity-50">请填写任务参数：</div>

        {modeInfo && (
          <>
            <mdui-card className="mt-4 p-4 max-w-full w-[40rem]">
              <div className="flex items-center gap-2 mb-2">
                <mdui-icon
                  id="bot__task-dialog-step2-icon"
                  name={modeInfo.task.icon || "grid_on"}
                ></mdui-icon>
                <div className="ml-1">
                  <div
                    id="bot__task-dialog-step2-id"
                    className="font-bold"
                  >
                    {selectedTask}
                  </div>
                  <div
                    id="bot__task-dialog-step2-description"
                    className="opacity-50 text-sm"
                  >
                    {modeInfo.mode.description}
                  </div>
                </div>
              </div>

              <mdui-list
                id="bot__task-dialog-step2-config-list"
                className="-mt-4 -mb-2 p-2"
              >
                {modeInfo.mode.config?.length > 0 ? (
                  modeInfo.mode.config.map((cfg: any) => (
                    <div
                      key={cfg.id}
                      className="flex mt-4 items-center"
                    >
                      <div>
                        <div>
                          {cfg.id}
                          <span className="ml-2 opacity-50 text-sm">
                            {cfg.type}
                            {!cfg.required ? "?" : ""}
                          </span>
                        </div>
                        <div className="opacity-50 text-sm">
                          {cfg.description}
                        </div>
                      </div>
                      {cfg.type === "boolean" ? (
                        <mdui-switch
                          className="ml-auto"
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
                          className="ml-auto w-40"
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
                          className="ml-auto w-40"
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
                  <div className="mt-4 opacity-50 text-center">
                    此模式无配置项
                  </div>
                )}
              </mdui-list>
            </mdui-card>

            <mdui-card className="mt-4 p-4 max-w-full w-[40rem]">
              <div className="flex items-center gap-2 mb-2">
                <mdui-icon name="public"></mdui-icon>
                <div className="ml-1">
                  <div className="font-bold">global</div>
                  <div className="opacity-50 text-sm">
                    全局配置
                  </div>
                </div>
              </div>

              <mdui-list
                id="bot__task-dialog-step2-global-config-list"
                className="-mt-4 -mb-2 p-2"
              >
                <div className="flex mt-4 items-center">
                  <div>
                    <div>
                      interval
                      <span className="ml-2 opacity-50 text-sm">
                        number
                      </span>
                    </div>
                    <div className="opacity-50 text-sm">
                      任务执行的间隔时间，单位为秒。
                    </div>
                  </div>
                  <mdui-text-field
                    className="ml-auto w-40"
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

        <div className="flex gap-2 mt-4">
          <mdui-button
            full-width
            id="bot__task-dialog-step2-back-button"
            variant="outlined"
            className="flex-1"
            onClick={goBackToStep1}
          >
            上一步
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step2-next-button"
            className="flex-[4]"
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
        className="p-0!"
      >
        <div className="card-title flex items-center mb-2">
          <mdui-icon
            name="tips_and_updates"
            className="mr-2"
          ></mdui-icon>
          <div>Suika - 任务添加向导</div>
          <div className="opacity-50 ml-2">(3/3)</div>
        </div>

        <div className="opacity-50">
          请确认添加的任务正确无误：
        </div>

        <mdui-card className="mt-4 p-4 max-w-full w-[40rem]">
          <pre
            id="bot__task-dialog-step3-preview"
            className="font-[Noto_Sans_Mono]"
          >
            {output ? JSON.stringify(output, null, 4) : ""}
          </pre>
        </mdui-card>

        <div className="flex gap-2 mt-4">
          <mdui-button
            full-width
            id="bot__task-dialog-step3-back-button"
            variant="outlined"
            className="flex-1"
            onClick={goBackToStep2}
          >
            上一步
          </mdui-button>
          <mdui-button
            full-width
            id="bot__task-dialog-step3-next-button"
            className="flex-[4]"
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
