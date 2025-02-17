import { Checkbox, CollapseItem, Dialog } from "mdui"
import { botTask } from "../global"
import { randomUUID } from "../utils"

export const html = /*html*/`
<mdui-dialog id="bot__task-dialog-step1" style="padding: 0 !important;">
  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="tips_and_updates" style="margin-right: 0.5rem;"></mdui-icon>
    <div>Suika - 任务添加向导</div>
    <div style="opacity: 0.5;margin-left: 0.5rem;">(1/3)</div>
  </div>

  <div style="opacity: 0.5;">
    请选择任务类型：
  </div>

  <mdui-card style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;padding: 1rem;max-width: 100%;">

    <mdui-list style="width: 100%;margin-top: -0.5rem;margin-bottom: -0.5rem;">
      <mdui-collapse id="bot__task-dialog-step1-list" accordion="">
      </mdui-collapse>
    </mdui-list>

  </mdui-card>

  <div style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;">
    <mdui-switch id="bot__task-dialog-step1-show-hidden-switch"></mdui-switch>
    <div style="opacity: 0.5;">显示隐藏的任务</div>
  </div>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width variant="outlined" style="flex: 1" onclick="this.parentElement.parentElement.open=false">取消</mdui-button>
    <mdui-button full-width id="bot__task-dialog-step1-next-button" style="flex: 4">下一步</mdui-button>
  </div>

</mdui-dialog>

<mdui-dialog id="bot__task-dialog-step2" style="padding: 0 !important;">
  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="tips_and_updates" style="margin-right: 0.5rem;"></mdui-icon>
    <div>Suika - 任务添加向导</div>
    <div style="opacity: 0.5;margin-left: 0.5rem;">(2/3)</div>
  </div>

  <div style="opacity: 0.5;">
    请填写任务参数：
  </div>

  <mdui-card style="margin-top: 1rem;padding: 1rem;max-width: 100%;width: 40rem;">

    <div style="display: flex;align-items: center;gap: 0.5rem;margin-bottom: 0.5rem;">
      <mdui-icon id="bot__task-dialog-step2-icon" name="grid_on"></mdui-icon>
      <div style="margin-left: 0.25rem;">
        <div id="bot__task-dialog-step2-id" style="font-weight: bold;">ae.getCpus</div>
        <div id="bot__task-dialog-step2-description" style="opacity: 0.5;font-size: small;">Description of the task</div>
      </div>
    </div>


    <mdui-list id="bot__task-dialog-step2-config-list" style="margin-top: -1rem;margin-bottom: -0.5rem;padding: 0.5rem;">
    </mdui-list>

  </mdui-card>

  <mdui-card style="margin-top: 1rem;padding: 1rem;max-width: 100%;width: 40rem;">

    <div style="display: flex;align-items: center;gap: 0.5rem;margin-bottom: 0.5rem;">
      <mdui-icon id="bot__task-dialog-step2-icon" name="public"></mdui-icon>
      <div style="margin-left: 0.25rem;">
        <div id="bot__task-dialog-step2-id" style="font-weight: bold;">global</div>
        <div id="bot__task-dialog-step2-description" style="opacity: 0.5;font-size: small;">全局配置</div>
      </div>
    </div>

    <mdui-list id="bot__task-dialog-step2-global-config-list" style="margin-top: -1rem;margin-bottom: -0.5rem;padding: 0.5rem;">
      <div style="display: flex;margin-top: 1rem;align-items: center;" global-config-id="interval" global-config-type="number" global-config-required="true">
        <div>
          <div>interval<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">number</span></div>
          <div style="opacity: 0.5;font-size: small;">任务执行的间隔时间，单位为秒。</div>
        </div>
        <mdui-text-field style="margin-left: auto;width: 10rem;" type="number" variant="outlined" clearable></mdui-text-field>
      </div>
    </mdui-list>

  </mdui-card>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width id="bot__task-dialog-step2-back-button" variant="outlined" style="flex: 1">上一步</mdui-button>
    <mdui-button full-width id="bot__task-dialog-step2-next-button" style="flex: 4">下一步</mdui-button>
  </div>

</mdui-dialog>


<mdui-dialog id="bot__task-dialog-step3" style="padding: 0 !important;">
  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="tips_and_updates" style="margin-right: 0.5rem;"></mdui-icon>
    <div>Suika - 任务添加向导</div>
    <div style="opacity: 0.5;margin-left: 0.5rem;">(3/3)</div>
  </div>

  <div style="opacity: 0.5;">
    请确认添加的任务正确无误：
  </div>


  <mdui-card style="margin-top: 1rem;padding: 1rem;max-width: 100%;width: 40rem;">
    <pre id="bot__task-dialog-step3-preview" style="font-family: Noto Sans Mono;">
    </pre>
  </mdui-card>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width id="bot__task-dialog-step3-back-button" variant="outlined" style="flex: 1">上一步</mdui-button>
    <mdui-button full-width id="bot__task-dialog-step3-next-button" style="flex: 4">添加任务到 Suika</mdui-button>
  </div>

</mdui-dialog>
`

let botTaskShowHidden = false
let botTaskSelectedTask: any = null
let botTaskOutput: any
let callback: (task: any) => void

export function init() {
  // BOT TASK START

  document.getElementById("bot__task-dialog-step1-show-hidden-switch")!.addEventListener("change", event => {
    botTaskShowHidden = (event.target as Checkbox).checked
    botTaskUpdate(null)
  })

  document.getElementById("bot__task-dialog-step1-next-button")!.addEventListener("click", _event => {

    const step1Element = document.getElementById("bot__task-dialog-step1") as Dialog
    const step2Element = document.getElementById("bot__task-dialog-step2") as Dialog

    let mode = botTask.find((task: any) => task.id == botTaskSelectedTask.split(".")[0])
      .mode.find((mode: any) => mode.id == botTaskSelectedTask.split(".")[1])

    const icon = botTask.find((task: any) => task.id == botTaskSelectedTask.split(".")[0]).icon

    document.getElementById("bot__task-dialog-step2-icon")!.setAttribute("name", icon)
    document.getElementById("bot__task-dialog-step2-id")!.innerHTML = botTaskSelectedTask
    document.getElementById("bot__task-dialog-step2-description")!.innerHTML = mode.description

    let configString = ""

    if (mode.config.length == 0) {
      configString = `
        <div style="margin-top: 1rem;opacity: 0.5;text-align: center;">
            此模式无配置项
        </div>`
    } else {
      mode.config.forEach((config: any) => {
        const title = config.id
        const type = `${config.type}${!config.required ? "?" : ""}`
        const description = config.description
        if (config.type == "string") {
          configString += `
                <div style="display: flex;margin-top: 1rem;align-items: center;" config-id="${config.id}" config-type="${config.type}" config-required="${config.required}">
                    <div>
                        <div>${title}<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">${type}</span></div>
                        <div style="opacity: 0.5;font-size: small;">${description}</div>
                    </div>
                    <mdui-text-field style="margin-left: auto;width: 10rem;" variant="outlined" clearable></mdui-text-field>
                </div>
                `
        } else if (config.type == "number") {
          configString += `
                <div style="display: flex;margin-top: 1rem;align-items: center;" config-id="${config.id}" config-type="${config.type}" config-required="${config.required}">
                    <div>
                        <div>${title}<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">${type}</span></div>
                        <div style="opacity: 0.5;font-size: small;">${description}</div>
                    </div>
                    <mdui-text-field style="margin-left: auto;width: 10rem;" type="number" variant="outlined" clearable></mdui-text-field>
                </div>
                `
        } else if (config.type == "boolean") {
          configString += `
                <div style="display: flex;margin-top: 1rem;align-items: center;" config-id="${config.id}" config-type="${config.type}" config-required="${config.required}">
                    <div>
                        <div>${title}<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">${type}</span></div>
                        <div style="opacity: 0.5;font-size: small;">${description}</div>
                    </div>
                    <mdui-switch checked style="margin-left: auto;"></mdui-switch>
                </div>
                `
        } else if (config.type == "redstoneUuid") {
          configString += `
                <div style="display: flex;margin-top: 1rem;align-items: center;" config-id="${config.id}" config-type="${config.type}" config-required="${config.required}">
                    <div>
                        <div>${title}<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">${type}</span></div>
                        <div style="opacity: 0.5;font-size: small;">${description}</div>
                    </div>
                    <mdui-select end-icon="keyboard_arrow_down" style="margin-left: auto;width: 10rem;" variant="outlined" value="item-1">
                        <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
                        <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
                    </mdui-select>
                </div>
                `
        } else if (config.type == "aeUuid") {
          configString += `
                <div style="display: flex;margin-top: 1rem;align-items: center;" config-id="${config.id}" config-type="${config.type}" config-required="${config.required}">
                    <div>
                        <div>${title}<span style="margin-left: 0.5rem;opacity: 0.5;font-size: small;">${type}</span></div>
                        <div style="opacity: 0.5;font-size: small;">${description}</div>
                    </div>
                    <mdui-select end-icon="keyboard_arrow_down" style="margin-left: auto;width: 10rem;" variant="outlined" value="item-1">
                        <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
                        <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
                    </mdui-select>
                </div>
                `
        }
      })
    }

    document.getElementById("bot__task-dialog-step2-config-list")!.innerHTML = configString

    step1Element.open = false
    setTimeout(() => {
      step2Element.open = true
    }, 100)
  })

  document.getElementById("bot__task-dialog-step2-back-button")!.addEventListener("click", _event => {
    (document.getElementById("bot__task-dialog-step2")! as Dialog).open = false
    setTimeout(() => {
      (document.getElementById("bot__task-dialog-step1")! as Dialog).open = true
    }, 100)
  })

  document.getElementById("bot__task-dialog-step2-next-button")!.addEventListener("click", _event => {
    let ok = true

    let config: any = {}
    Array.from(document.getElementById("bot__task-dialog-step2-config-list")!.children).forEach(element => {
      const id = element.getAttribute("config-id") || ""
      const type = element.getAttribute("config-type")
      const required = element.getAttribute("config-required")

      let value = null

      if (type == "string") {
        value = element.querySelector("mdui-text-field")!.value
      } else if (type == "number") {
        value = Number(element.querySelector("mdui-text-field")!.value)
      } else if (type == "boolean") {
        value = Boolean(element.querySelector("mdui-switch")!.checked)
      } else if (type == "redstoneUuid") {
        value = element.querySelector("mdui-select")!.value
      } else if (type == "aeUuid") {
        value = element.querySelector("mdui-select")!.value
      }

      if (!value && required == "true") {
        if (element.classList.contains("animate__animated") == false) {
          element.classList.add("animate__animated", "animate__headShake")
          setTimeout(() => {
            element.classList.remove("animate__animated", "animate__headShake")
          }, 1000)
        }
        ok = false
        return
      } else if (value) {
        config[id] = value
      }
    })

    let globalConfig: any = {}
    Array.from(document.getElementById("bot__task-dialog-step2-global-config-list")!.children).forEach(element => {
      const id = element.getAttribute("global-config-id") || ""
      const type = element.getAttribute("global-config-type")
      const required = element.getAttribute("global-config-required")

      let value = null

      if (type == "string") {
        value = element.querySelector("mdui-text-field")!.value
      } else if (type == "number") {
        value = Number(element.querySelector("mdui-text-field")!.value)
      } else if (type == "boolean") {
        value = Boolean(element.querySelector("mdui-switch")!.checked)
      }

      if (!value && required == "true") {
        if (element.classList.contains("animate__animated") == false) {
          element.classList.add("animate__animated", "animate__headShake")
          setTimeout(() => {
            element.classList.remove("animate__animated", "animate__headShake")
          }, 1000)
        }
        ok = false
        return
      } else if (value) {
        globalConfig[id] = value
      }

    })



    console.log(config, globalConfig)

    if (ok) {
      botTaskOutput = {
        task: botTaskSelectedTask.split(".")[0],
        ...globalConfig,
        taskUuid: "(随机)",
        config: { mode: botTaskSelectedTask.split(".")[1], ...config }
      }
      document.getElementById("bot__task-dialog-step3-preview")!.innerHTML = JSON.stringify(botTaskOutput, null, 4)
      botTaskOutput.taskUuid = randomUUID();
      (document.getElementById("bot__task-dialog-step2") as Dialog).open = false
      setTimeout(() => {
        (document.getElementById("bot__task-dialog-step3") as Dialog).open = true
      }, 100)
    }
  })

  document.getElementById("bot__task-dialog-step3-back-button")!.addEventListener("click", _event => {
    (document.getElementById("bot__task-dialog-step3") as Dialog).open = false
    setTimeout(() => {
      (document.getElementById("bot__task-dialog-step2") as Dialog).open = true
    }, 100)
  })

  document.getElementById("bot__task-dialog-step3-next-button")!.addEventListener("click", _event => {
    (document.getElementById("bot__task-dialog-step3") as Dialog).open = false
    callback(botTaskOutput)
  })

  // BOT TASK END
}

export function botTaskNew(c: (task: any) => void) {
  (document.getElementById("bot__task-dialog-step1")! as Dialog).open = true
  callback = c
}

export function botTaskUpdate(data: any) {
  let btnNext = document.getElementById("bot__task-dialog-step1-next-button") as HTMLButtonElement
  btnNext.disabled = true
  btnNext.innerHTML = "下一步"

  var taskListElement = document.getElementById("bot__task-dialog-step1-list")!
  var taskString = ""
  if (!data) { data = botTask }
  data.forEach((task: any) => {
    var modeString = ""
    task.mode.filter((mode: any) => {
      if (mode.hidden == true && !botTaskShowHidden) { return false } else { return true }
    }).forEach((mode: any) => {
      modeString += `
          <mdui-list-item style="opacity: ${mode.hidden ? 0.4 : 1};" value="${mode.id}" class="bot__task-task-mode-item">
              <div>${mode.id}</div>
              <div style="opacity: 0.5;">${mode.description}</div>
              <mdui-icon slot="end-icon" name="radio_button_unchecked"></mdui-icon>
          </mdui-list-item>
          `
    })
    taskString += `
      <mdui-collapse-item value="${task.id}">
          <mdui-list-item slot="header" icon="${task.icon}">
              <div>${task.id}</div>
              <div style="opacity: 0.5;">${task.description}</div>
              <mdui-icon slot="end-icon" name="keyboard_arrow_down"></mdui-icon>
          </mdui-list-item>
          <div style="margin-left: 3rem">
              ${modeString}
          </div>
      </mdui-collapse-item>
      `
  })
  taskListElement.innerHTML = taskString

  document.getElementById("bot__task-dialog-step1-list")!.addEventListener("change", event => {
    Array.from(document.getElementById("bot__task-dialog-step1-list")!.children).forEach(element => {
      if ((element as CollapseItem).value == (event.target! as CollapseItem).value) {
        element.querySelector("mdui-icon")!.setAttribute("name", "keyboard_arrow_up")
      } else {
        element.querySelector("mdui-icon")!.setAttribute("name", "keyboard_arrow_down")
      }
    })
  })

  Array.from(document.querySelectorAll(".bot__task-task-mode-item")).forEach(element1 => {
    element1.addEventListener("click", event => {
      Array.from(document.querySelectorAll(".bot__task-task-mode-item")).forEach(element2 => {
        element2.querySelector("mdui-icon")!.setAttribute("name", "radio_button_unchecked")
      });
      (event.currentTarget as HTMLElement).querySelector("mdui-icon")!.setAttribute("name", "radio_button_checked")
      botTaskSelectedTask = `${((event.currentTarget as HTMLElement).parentNode!.parentNode! as CollapseItem).value}.${(event.currentTarget as HTMLElement).getAttribute("value")}`

      btnNext.disabled = false
      btnNext.innerHTML = `下一步 (${botTaskSelectedTask})`
    })
  })
}