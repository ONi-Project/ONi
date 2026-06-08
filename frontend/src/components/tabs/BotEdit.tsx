import { useState, useEffect } from "react"
import { useDataStore } from "../../stores/useDataStore"
import { sendMessage } from "../../hooks/useWebSocket"
import { newWebToServerMessage } from "@oni/interface"
import { randomUUID } from "../../lib/utils"
import { botTaskNew } from "../dialogs/BotTaskDialog"

interface BotEditProps {
  uuid: string
  onBack: () => void
}

export default function BotEdit({ uuid, onBack }: BotEditProps) {
  const bot = useDataStore((s) => s.bot)
  const botTaskTemplates = useDataStore((s) => s.botTask)
  const targetBot = bot.find((b) => b.uuid === uuid)

  const [taskEditMode, setTaskEditMode] = useState(false)
  const [taskEditPreview, setTaskEditPreview] = useState<any[]>([])
  const [taskEditOperations, setTaskEditOperations] = useState<any[]>([])
  const [componentsLoading, setComponentsLoading] = useState(false)

  useEffect(() => {
    if (targetBot) {
      setTaskEditPreview(JSON.parse(JSON.stringify(targetBot.tasks || [])))
    }
  }, [targetBot?.tasks])

  if (!targetBot) {
    return <div>Bot 未找到</div>
  }

  const botData = targetBot

  const handleRefreshComponents = () => {
    setComponentsLoading(true)
    sendMessage(
      newWebToServerMessage("BotComponentUpdate", {
        uuid,
        taskUuid: randomUUID(),
      })
    )
    setTimeout(() => setComponentsLoading(false), 30000)
  }

  const handleEditTasks = () => {
    setTaskEditMode(true)
    setTaskEditPreview(JSON.parse(JSON.stringify(botData.tasks || [])))
    setTaskEditOperations([])
  }

  const handleApplyTasks = () => {
    setTaskEditMode(false)
    taskEditOperations.forEach((op) => sendMessage(op))
    setTaskEditPreview([])
    setTaskEditOperations([])
  }

  const handleCancelTasks = () => {
    setTaskEditMode(false)
    setTaskEditPreview(JSON.parse(JSON.stringify(botData.tasks || [])))
    setTaskEditOperations([])
  }

  const handleAddTask = () => {
    botTaskNew((task: any) => {
      setTaskEditPreview((prev) => [...prev, task])
      setTaskEditOperations((prev) => [
        ...prev,
        { type: "OcTaskAdd", target: uuid, data: task },
      ])
    })
  }

  const handleRemoveTask = (task: any) => {
    setTaskEditPreview((prev) =>
      prev.filter((t) => t.taskUuid !== task.taskUuid)
    )
    setTaskEditOperations((prev) => [
      ...prev,
      { type: "OcTaskRemove", target: uuid, data: task },
    ])
  }

  const renderComponentIcon = (cls: string) => {
    const icons: Record<string, string> = {
      volume: "save",
      communication: "wifi",
      memory: "sd_card",
      processor: "memory",
      input: "keyboard",
      system: "dns",
      display: "tv",
      bus: "cable",
    }
    return icons[cls] || "question_mark"
  }

  return (
    <div className="bot__edit">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5rem",
          gap: "0.5rem",
        }}
      >
        <mdui-button-icon
          icon="arrow_back"
          className="bot__edit-back"
          onClick={onBack}
        ></mdui-button-icon>
        <div style={{ fontWeight: "bold", fontSize: "large" }}>
          编辑 - {botData.name}
        </div>
      </div>

      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <mdui-icon
              name="smart_toy--outlined"
              style={{ fontSize: "2rem" }}
            ></mdui-icon>
            <div>
              <div style={{ fontSize: "larger" }}>
                <b>{botData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
            ></mdui-divider>
            <div>
              <div style={{ opacity: 1 }}>在线 - WebSocket</div>
              <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                {botData.uuid}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              marginTop: "0.25rem",
            }}
          >
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="schedule"></mdui-icon>
              <div>创建于 2021-08-15 12:00:00</div>
            </div>
            <div style={{ display: "flex", opacity: 0.75, gap: "0.5rem" }}>
              <mdui-icon name="commit"></mdui-icon>
              <div>ONi Lib v1</div>
            </div>
          </div>
        </mdui-card>
      </div>

      <div className="grid-l">
        {/* Task List */}
        <mdui-card className="card" variant="filled">
          <div
            className="card-title"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <mdui-icon
              name="task_alt"
              style={{ fontSize: "28px", alignSelf: "center" }}
            ></mdui-icon>
            <div>任务列表</div>
          </div>

          <mdui-list
            style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
            className="bot__edit-tasks"
          >
            {taskEditMode
              ? taskEditPreview.map((task: any, idx: number) => {
                  const taskGroup = botTaskTemplates.find(
                    (t: any) => t.id === task.task
                  )
                  if (!taskGroup) return null
                  const mode = taskGroup.mode.find(
                    (m: any) => m.id === task.config?.mode
                  )
                  return (
                    <mdui-list-item key={task.taskUuid || idx}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <mdui-icon
                          name={taskGroup.icon}
                          style={{ marginRight: "1rem" }}
                        ></mdui-icon>
                        <div>
                          <div>
                            {taskGroup.id}.{mode?.id}
                            <span
                              style={{
                                opacity: 0.5,
                                fontSize: "smaller",
                                marginLeft: "0.5rem",
                              }}
                            >
                              {mode?.description}
                            </span>
                          </div>
                          <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                            {task.taskUuid}
                          </div>
                        </div>
                        <mdui-button-icon
                          icon="delete"
                          style={{ marginLeft: "auto" }}
                          onClick={() => handleRemoveTask(task)}
                        ></mdui-button-icon>
                      </div>
                    </mdui-list-item>
                  )
                })
              : (botData.tasks || []).length > 0
              ? botData.tasks.map((task: any, idx: number) => {
                  const taskGroup = botTaskTemplates.find(
                    (t: any) => t.id === task.task
                  )
                  if (!taskGroup) return null
                  const mode = taskGroup.mode.find(
                    (m: any) => m.id === task.config?.mode
                  )
                  return (
                    <mdui-list-item key={task.taskUuid || idx}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <mdui-icon
                          name={taskGroup.icon}
                          style={{ marginRight: "1rem" }}
                        ></mdui-icon>
                        <div>
                          <div>
                            {taskGroup.id}.{mode?.id}
                            <span
                              style={{
                                opacity: 0.5,
                                fontSize: "smaller",
                                marginLeft: "0.5rem",
                              }}
                            >
                              {mode?.description}
                            </span>
                          </div>
                          <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                            {task.taskUuid}
                          </div>
                        </div>
                      </div>
                    </mdui-list-item>
                  )
                })
              : (
                <mdui-list-item style={{ opacity: 0.5 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <mdui-icon
                      name="info"
                      style={{ marginRight: "1rem" }}
                    ></mdui-icon>
                    <div>
                      <div>任务列表为空</div>
                      <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                        点击下方按钮进行编辑
                      </div>
                    </div>
                  </div>
                </mdui-list-item>
              )}
          </mdui-list>

          {!taskEditMode ? (
            <div
              className="bot__edit-before-edit"
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <mdui-chip
                elevated
                style={{ marginRight: "auto" }}
                onClick={handleEditTasks}
              >
                编辑
                <mdui-icon slot="icon" name="edit"></mdui-icon>
              </mdui-chip>
            </div>
          ) : (
            <div
              className="bot__edit-after-edit"
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "0.5rem",
              }}
            >
              <mdui-chip elevated onClick={handleApplyTasks}>
                应用
                <mdui-icon slot="icon" name="done"></mdui-icon>
              </mdui-chip>
              <mdui-chip elevated onClick={handleCancelTasks}>
                取消
                <mdui-icon slot="icon" name="close"></mdui-icon>
              </mdui-chip>
              <mdui-chip
                elevated
                style={{ marginRight: "auto" }}
                onClick={handleAddTask}
              >
                添加
                <mdui-icon slot="icon" name="add"></mdui-icon>
              </mdui-chip>
            </div>
          )}
        </mdui-card>

        {/* Components */}
        <mdui-card className="card" variant="filled">
          <div
            className="card-title"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <mdui-icon
              name="electrical_services"
              style={{ fontSize: "32px", alignSelf: "center" }}
            ></mdui-icon>
            <div>已连接的组件</div>
          </div>

          <mdui-list
            style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem", opacity: componentsLoading ? 0.5 : 1 }}
            className="bot__edit-components"
          >
            {(botData.components || []).length > 0 ? (
              botData.components.map((component: any, idx: number) => (
                <mdui-list-item key={component.uuid || idx}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <mdui-icon
                      name={renderComponentIcon(component.class)}
                      style={{ marginRight: "1rem" }}
                    ></mdui-icon>
                    <div>
                      <div>
                        {component.description} ({component.class})
                      </div>
                      <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                        {component.uuid}
                      </div>
                    </div>
                  </div>
                </mdui-list-item>
              ))
            ) : (
              <mdui-list-item style={{ opacity: 0.5 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <mdui-icon
                    name="info"
                    style={{ marginRight: "1rem" }}
                  ></mdui-icon>
                  <div>
                    <div>组件列表为空</div>
                    <div style={{ opacity: 0.25, fontSize: "smaller" }}>
                      请检查 OC 状态
                    </div>
                  </div>
                </div>
              </mdui-list-item>
            )}
          </mdui-list>

          <mdui-chip
            className="bot__edit-button-components-refresh"
            elevated
            style={{ marginRight: "auto" }}
            loading={componentsLoading}
            onClick={handleRefreshComponents}
          >
            刷新
            <mdui-icon slot="icon" name="refresh"></mdui-icon>
          </mdui-chip>
        </mdui-card>

        {/* Operations */}
        <mdui-card className="card" variant="filled">
          <div
            className="card-title"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <mdui-icon
              name="build"
              style={{ fontSize: "24px", alignSelf: "center" }}
            ></mdui-icon>
            <div>操作</div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginTop: "0.5rem",
            }}
          >
            <mdui-chip elevated>
              重启 {botData.name}
              <mdui-icon slot="icon" name="restart_alt"></mdui-icon>
            </mdui-chip>
            <mdui-chip elevated>
              更新 ONi Lib
              <mdui-icon slot="icon" name="update"></mdui-icon>
            </mdui-chip>
          </div>

          <mdui-divider
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          ></mdui-divider>

          <mdui-chip
            elevated
            style={{
              backgroundColor: "rgb(var(--mdui-color-error-container))",
              marginRight: "auto",
            }}
          >
            删除 {botData.name}
            <mdui-icon slot="icon" name="delete"></mdui-icon>
          </mdui-chip>
        </mdui-card>
      </div>
    </div>
  )
}
