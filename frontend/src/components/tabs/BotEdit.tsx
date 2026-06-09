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
      <div className="flex items-center mb-2 gap-2">
        <mdui-button-icon
          icon="arrow_back"
          onClick={onBack}
        ></mdui-button-icon>
        <div className="font-bold text-lg">
          编辑 - {botData.name}
        </div>
      </div>

      <div className="grid-full">
        <mdui-card className="card" variant="filled">
          <div className="flex items-center gap-2">
            <mdui-icon
              name="smart_toy--outlined"
              className="text-[2rem]"
            ></mdui-icon>
            <div>
              <div className="text-lg">
                <b>{botData.name}</b>
              </div>
            </div>
            <mdui-divider
              vertical
              className="ml-2 mr-2"
            ></mdui-divider>
            <div>
              <div className="opacity-100">在线 - WebSocket</div>
              <div className="opacity-25 text-sm">
                {botData.uuid}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="schedule"></mdui-icon>
              <div>创建于 2021-08-15 12:00:00</div>
            </div>
            <div className="flex opacity-75 gap-2">
              <mdui-icon name="commit"></mdui-icon>
              <div>ONi Lib v1</div>
            </div>
          </div>
        </mdui-card>
      </div>

      <div className="grid-l">
        {/* Task List */}
        <mdui-card className="card" variant="filled">
          <div className="card-title flex items-center gap-2">
            <mdui-icon
              name="task_alt"
              className="text-[28px] self-center"
            ></mdui-icon>
            <div>任务列表</div>
          </div>

          <mdui-list
            className="-ml-2 -mr-2"
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
                      <div className="flex items-center">
                        <mdui-icon
                          name={taskGroup.icon}
                          className="mr-4"
                        ></mdui-icon>
                        <div>
                          <div>
                            {taskGroup.id}.{mode?.id}
                            <span className="opacity-50 text-sm ml-2">
                              {mode?.description}
                            </span>
                          </div>
                          <div className="opacity-25 text-sm">
                            {task.taskUuid}
                          </div>
                        </div>
                        <mdui-button-icon
                          icon="delete"
                          className="ml-auto"
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
                      <div className="flex items-center">
                        <mdui-icon
                          name={taskGroup.icon}
                          className="mr-4"
                        ></mdui-icon>
                        <div>
                          <div>
                            {taskGroup.id}.{mode?.id}
                            <span className="opacity-50 text-sm ml-2">
                              {mode?.description}
                            </span>
                          </div>
                          <div className="opacity-25 text-sm">
                            {task.taskUuid}
                          </div>
                        </div>
                      </div>
                    </mdui-list-item>
                  )
                })
              : (
                <mdui-list-item className="opacity-50">
                  <div className="flex items-center">
                    <mdui-icon
                      name="info"
                      className="mr-4"
                    ></mdui-icon>
                    <div>
                      <div>任务列表为空</div>
                      <div className="opacity-25 text-sm">
                        点击下方按钮进行编辑
                      </div>
                    </div>
                  </div>
                </mdui-list-item>
              )}
          </mdui-list>

          {!taskEditMode ? (
            <div className="flex gap-2 flex-wrap mt-2">
              <mdui-chip
                elevated
                className="mr-auto"
                onClick={handleEditTasks}
              >
                编辑
                <mdui-icon slot="icon" name="edit"></mdui-icon>
              </mdui-chip>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap mt-2">
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
                className="mr-auto"
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
          <div className="card-title flex items-center gap-2">
            <mdui-icon
              name="electrical_services"
              className="text-[32px] self-center"
            ></mdui-icon>
            <div>已连接的组件</div>
          </div>

          <mdui-list
            className="-ml-2 -mr-2"
            style={{ opacity: componentsLoading ? 0.5 : 1 }}
          >
            {(botData.components || []).length > 0 ? (
              botData.components.map((component: any, idx: number) => (
                <mdui-list-item key={component.uuid || idx}>
                  <div className="flex items-center">
                    <mdui-icon
                      name={renderComponentIcon(component.class)}
                      className="mr-4"
                    ></mdui-icon>
                    <div>
                      <div>
                        {component.description} ({component.class})
                      </div>
                      <div className="opacity-25 text-sm">
                        {component.uuid}
                      </div>
                    </div>
                  </div>
                </mdui-list-item>
              ))
            ) : (
              <mdui-list-item className="opacity-50">
                <div className="flex items-center">
                  <mdui-icon
                    name="info"
                    className="mr-4"
                  ></mdui-icon>
                  <div>
                    <div>组件列表为空</div>
                    <div className="opacity-25 text-sm">
                      请检查 OC 状态
                    </div>
                  </div>
                </div>
              </mdui-list-item>
            )}
          </mdui-list>

          <mdui-chip
            elevated
            className="mr-auto"
            loading={componentsLoading}
            onClick={handleRefreshComponents}
          >
            刷新
            <mdui-icon slot="icon" name="refresh"></mdui-icon>
          </mdui-chip>
        </mdui-card>

        {/* Operations */}
        <mdui-card className="card" variant="filled">
          <div className="card-title flex items-center gap-2">
            <mdui-icon
              name="build"
              className="text-[24px] self-center"
            ></mdui-icon>
            <div>操作</div>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            <mdui-chip elevated>
              重启 {botData.name}
              <mdui-icon slot="icon" name="restart_alt"></mdui-icon>
            </mdui-chip>
            <mdui-chip elevated>
              更新 ONi Lib
              <mdui-icon slot="icon" name="update"></mdui-icon>
            </mdui-chip>
          </div>

          <mdui-divider className="my-2"></mdui-divider>

          <mdui-chip
            elevated
            className="mr-auto"
            style={{
              backgroundColor: "rgb(var(--mdui-color-error-container))",
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
