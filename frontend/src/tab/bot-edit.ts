import { botTaskNew } from "../dialog/bot-task"
import * as global from "../global"
import { randomUUID } from "../utils"
import { eventEmitter, send } from "../websocket"


export function html(config: any) {
  return /*html*/`
<div class="bot__edit">
    <div style="display: flex;align-items: center;margin-bottom: 0.5rem;gap:0.5rem;">
      <mdui-button-icon icon="arrow_back" class="bot__edit-back"></mdui-button-icon>
      <div style="font-weight: bold;font-size:large">编辑 - ${config.name}</div>
    </div>
  
    <div class="grid-full">
      <mdui-card class="card" variant="filled">
        <div style="display: flex;align-items: center;gap: 0.5rem;">
          <mdui-icon name="smart_toy--outlined" style="font-size: 2rem;"></mdui-icon>
  
          <div>
            <div style="font-size: larger;"><b>${config.name}</b></div>
          </div>
  
          <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>
  
          <div>
            <div style="opacity: 1;">在线 - WebSocket</div>
            <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
          </div>
  
        </div>
  
        <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="schedule"></mdui-icon>
            <div>创建于 2021-08-15 12:00:00</div>
          </div>
  
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="commit"></mdui-icon>
            <div>Oni Lib v1</div>
          </div>
        </div>
  
      </mdui-card>
    </div>
  
    <div class="grid-l">
      <mdui-card class="card" variant="filled">

        <div class="card-title">
          <mdui-icon name="task_alt" style="font-size: 28px;margin-right: 0.5rem;align-self: center;"></mdui-icon>
          <div style="text-align: center;">任务列表</div>
        </div>

        <mdui-list style="margin-left: -0.5rem;margin-right: -0.5rem;" class="bot__edit-tasks">
          
        <mdui-list-item>
            <div>流体信息上传</div>
            <div style="opacity: 0.25;font-size: smaller;">53353630-1da8-4b95-9359-ecdfdcd93acc</div>
          </mdui-list-item>
          <mdui-list-item>
            <div>AE 信息上传</div>
            <div style="opacity: 0.25;font-size: smaller;">52732958-29eb-462c-9456-56e223235cb6</div>
          </mdui-list-item>

        </mdui-list>

        <div class="bot__edit-before-edit" style="display: flex;gap: 0.5rem;flex-wrap: wrap;margin-top: 0.5rem;">

          <mdui-chip elevated style="margin-right: auto;">
            编辑
            <mdui-icon slot="icon" name="edit"></mdui-icon>
          </mdui-chip>
  
        </div>

        <div class="bot__edit-after-edit" style="display: none;gap: 0.5rem;flex-wrap: wrap;margin-top: 0.5rem;">

          <mdui-chip elevated>
            应用
            <mdui-icon slot="icon" name="done"></mdui-icon>
          </mdui-chip>

          <mdui-chip elevated>
            取消
            <mdui-icon slot="icon" name="close"></mdui-icon>
          </mdui-chip>

          <mdui-chip elevated style="margin-right: auto;">
            添加
            <mdui-icon slot="icon" name="add"></mdui-icon>
          </mdui-chip>

        </div>
        
      </mdui-card>
  
      <mdui-card class="card" variant="filled">
  
        <div class="card-title">
          <mdui-icon name="electrical_services" style="font-size: 32px;margin-right: 0.35rem;align-self: center;"></mdui-icon>
          <div style="text-align: center;">已连接的组件</div>
        </div>
  
        <mdui-list style="margin-left: -0.5rem;margin-right: -0.5rem;" class="bot__edit-components">
  
        </mdui-list>
  
        <mdui-chip class="bot__edit-button-components-refresh" elevated style="margin-right: auto;">
          刷新
          <mdui-icon slot="icon" name="refresh"></mdui-icon>
        </mdui-chip>
        
      </mdui-card>
  
      <mdui-card class="card" variant="filled">

        <div class="card-title">
          <mdui-icon name="build" style="font-size: 24px;margin-right: 0.5rem;align-self: center;"></mdui-icon>
          <div style="text-align: center;">操作</div>
        </div>

        <div style="display: flex;gap: 0.5rem;flex-wrap: wrap;margin-top: 0.5rem;">
  
          <mdui-chip elevated>
            重启 ${config.name}
            <mdui-icon slot="icon" name="restart_alt"></mdui-icon>
          </mdui-chip>
  
          <mdui-chip elevated>
            更新 Oni Lib
            <mdui-icon slot="icon" name="update"></mdui-icon>
          </mdui-chip>
        </div>
  
  
        <mdui-divider style="margin-top: 0.5rem;margin-bottom: 0.5rem;"></mdui-divider>
  
        <mdui-chip elevated style="background-color: rgb(var(--mdui-color-error-container));margin-right: auto;">
          删除 ${config.name}
          <mdui-icon slot="icon" name="delete"></mdui-icon>
        </mdui-chip>
  
      </mdui-card>
  
    </div>
  
    <data hidden uuid="${config.uuid}"></data>
</div>
`}

export function init() {
  let taskEditMode = false
  let taskEditPreview: any = []
  let taskEditOperation: any = []

  document.querySelectorAll(".bot__edit-back").forEach(element => {
    element.addEventListener("click", _event => {
      document.getElementById("bot__edit")!.hidden = true
      document.getElementById("bot__list")!.hidden = false
    })
    global.bot.forEach((bot: any) => {
      let target = Array.from(document.querySelectorAll(".bot__edit")).find(element => element.querySelector("data")!.getAttribute("uuid") === bot.uuid)
      if (target) {
        renderComponentList(target, bot)
        renderTaskList(target, bot)
      }
    })
  })

  eventEmitter.addEventListener("message", async (event: any) => {
    const { type, data: bot } = event.data
    if (type == "data/bot/set") {
      let target = Array.from(document.querySelectorAll(".bot__edit")).find(element => element.querySelector("data")!.getAttribute("uuid") === bot.uuid)
      if (target) {
        renderComponentList(target, bot)
        renderTaskList(target, bot)
      }
    }
  })



  document.querySelectorAll(".bot__edit").forEach(element => {
    const uuid = element.querySelector("data")!.getAttribute("uuid")
    const bot = global.bot.find((bot: any) => bot.uuid === uuid)

    const buttonComponentsRefresh = element.querySelector(".bot__edit-button-components-refresh")!
    buttonComponentsRefresh.addEventListener("click", async (event) => {
      const target = event.target as HTMLElement
      target.parentElement!.querySelector("mdui-list")!.style.opacity = "0.5"
      target.setAttribute("loading", "true")
      setTimeout(() => {
        target.parentElement!.querySelector("mdui-list")!.style.opacity = "1"
        target.removeAttribute("loading")
      }, 30000)
      send({
        "type": "oc/task/runSingle",
        "target": uuid,
        "data":
        {
          "task": "component",
          "interval": -1,
          "taskUuid": randomUUID(),
          "config": {}
        }
      })
    })

    const buttonTaskEdit = element.querySelector(".bot__edit-before-edit")?.querySelector("mdui-chip")!
    buttonTaskEdit.addEventListener("click", async (_event) => {
      taskEditMode = true
      taskEditPreview = JSON.parse(JSON.stringify(bot.tasks)) //深拷贝
      renderTaskList(element, bot);
      (element.querySelector(".bot__edit-before-edit") as HTMLElement)!.style.display = "none";
      (element.querySelector(".bot__edit-after-edit") as HTMLElement)!.style.display = "flex"
    })

    const buttonTaskEditApply = element.querySelector(".bot__edit-after-edit")?.querySelector("mdui-chip:nth-child(1)")!
    buttonTaskEditApply.addEventListener("click", async (_event) => {
      taskEditMode = false;
      (element.querySelector(".bot__edit-before-edit") as HTMLElement)!.style.display = "flex";
      (element.querySelector(".bot__edit-after-edit") as HTMLElement)!.style.display = "none"
      renderTaskList(element, bot)
      console.log(taskEditOperation)
      taskEditOperation.forEach((op: any) => {
        send(op)
      })
      taskEditPreview = []
      taskEditOperation = []
    })

    const buttonTaskEditCancel = element.querySelector(".bot__edit-after-edit")?.querySelector("mdui-chip:nth-child(2)")!
    buttonTaskEditCancel.addEventListener("click", async (_event) => {
      taskEditMode = false;
      (element.querySelector(".bot__edit-before-edit") as HTMLElement)!.style.display = "flex";
      (element.querySelector(".bot__edit-after-edit") as HTMLElement)!.style.display = "none"
      renderTaskList(element, bot)
      taskEditPreview = []
      taskEditOperation = []
    })

    const buttonTaskEditAdd = element.querySelector(".bot__edit-after-edit")?.querySelector("mdui-chip:nth-child(3)")!
    buttonTaskEditAdd.addEventListener("click", async (_event) => {
      botTaskNew((task) => {
        taskEditPreviewAdd(task, bot.uuid, element)
      })
    })

  })

  function taskEditPreviewAdd(task: any, botUUid: string, element: any) {
    taskEditPreview.push(task)
    taskEditOperation.push({
      type: "oc/task/add",
      target: botUUid,
      data: task
    })
    renderTaskList(element, { uuid: botUUid, tasks: taskEditPreview })
  }

  function taskEditPreviewRemove(task: any, botUUid: string, element: any) {
    const index = taskEditPreview.findIndex((t: any) => t.taskUuid === task.taskUuid)
    if (index !== -1) {
      taskEditPreview.splice(index, 1)
      taskEditOperation.push({
        type: "oc/task/remove",
        target: botUUid,
        data: task
      })
      renderTaskList(element, { uuid: botUUid, tasks: taskEditPreview })
    }
  }

  function renderComponentList(element: any, bot: any) {
    let _ = ""
    if (bot.components.length == 0) {
      _ = `
                <mdui-list-item style="opacity: 0.5;">
                  <div style="display: flex;align-items: center;">
                    <mdui-icon name="info" style="margin-right: 1rem;"></mdui-icon>
                    <div>
                      <div>组件列表为空</div>
                      <div style="opacity: 0.25;font-size: smaller;">请检查 OC 状态</div>
                    </div>
                  </div>
                </mdui-list-item>
            `
    } else {
      bot.components.forEach((component: any) => {
        let icon = "question_mark"
        switch (component.class) {
          case "volume":
            icon = "save"
            break
          case "communication":
            icon = "wifi"
            break
          case "memory":
            icon = "sd_card"
            break
          case "processor":
            icon = "memory"
            break
          case "input":
            icon = "keyboard"
            break
          case "system":
            icon = "dns"
            break
          case "display":
            icon = "tv"
            break
          case "bus":
            icon = "cable"
            break
        }
        _ += `
                <mdui-list-item>
                  <div style="display: flex;align-items: center;">
                    <mdui-icon name="${icon}" style="margin-right: 1rem;"></mdui-icon>
                    <div>
                      <div>${component.description} (${component.class})</div>
                      <div style="opacity: 0.25;font-size: smaller;">${component.uuid}</div>
                    </div>
                  </div>
                </mdui-list-item>
                `
      })

    }
    element.querySelector(".bot__edit-components").innerHTML = _
    element.querySelector(".bot__edit-components").style.opacity = "1"
    element.querySelector(".bot__edit-button-components-refresh").removeAttribute("loading")
  }

  function renderTaskList(element: any, bot: any) {

    let _ = ""
    if (bot.tasks.length === 0) {
      _ = `
            <mdui-list-item style="opacity: 0.5;">
              <div style="display: flex;align-items: center;">
                <mdui-icon name="info" style="margin-right: 1rem;"></mdui-icon>
                <div>
                  <div>任务列表为空</div>
                  <div style="opacity: 0.25;font-size: smaller;">点击下方按钮进行编辑</div>
                </div>
              </div>
            </mdui-list-item>
          `
    } else {
      bot.tasks.forEach((task: any) => {
        const taskGroup = global.botTask.find((t: any) => t.id === task.task)
        const { id, description } = taskGroup.mode.find((m: any) => m.id === task.config.mode)
        _ += `
          <mdui-list-item>
            <div style="display: flex;align-items: center;">
              <mdui-icon name="${taskGroup.icon}" style="margin-right: 1rem;"></mdui-icon>
              <div>
                <div>${taskGroup.id}.${id}<span style="opacity: 0.5;font-size: smaller;margin-left: 0.5rem;">${description}</span></div>
                <div style="opacity: 0.25;font-size: smaller;">${task.taskUuid}</div>
              </div>
              ${taskEditMode ? `<mdui-button-icon taskUuid="${task.taskUuid}" class="bot__edit-task-delete" icon="delete" style="margin-left: auto;"></mdui-button-icon>` : ``}
            </div>
          </mdui-list-item>
        `
      })
    }
    element.querySelector(".bot__edit-tasks").innerHTML = _
    if (taskEditMode) {
      element.querySelector(".bot__edit-tasks").querySelectorAll(".bot__edit-task-delete").forEach((e: any) => {
        const botUuid = bot.uuid
        e.addEventListener("click", async (event: any) => {
          const taskUuid = event.target.getAttribute("taskUuid")
          const task = bot.tasks.find((t: any) => t.taskUuid === taskUuid)
          if (task) {
            taskEditPreviewRemove(task, botUuid, element)
          }
        })
      })
    }
  }
}