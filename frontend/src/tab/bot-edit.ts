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
          任务列表
        </div>
        <mdui-list style="margin-left: -0.5rem;margin-right: -0.5rem;">
          <mdui-list-item>
            <div>流体信息上传</div>
            <div style="opacity: 0.25;font-size: smaller;">53353630-1da8-4b95-9359-ecdfdcd93acc</div>
          </mdui-list-item>
          <mdui-list-item>
            <div>AE 信息上传</div>
            <div style="opacity: 0.25;font-size: smaller;">52732958-29eb-462c-9456-56e223235cb6</div>
          </mdui-list-item>
        </mdui-list>
        <mdui-chip elevated style="margin-right: auto;">
          编辑
          <mdui-icon slot="icon" name="edit"></mdui-icon>
        </mdui-chip>
      </mdui-card>
  
      <mdui-card class="card" variant="filled">
  
        <div class="card-title">
          已连接的组件
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
          操作
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
    document.querySelectorAll(".bot__edit-back").forEach(element => {
        element.addEventListener("click", _event => {
            document.getElementById("bot__edit")!.hidden = true
            document.getElementById("bot__list")!.hidden = false
        })
        global.bot.forEach((bot: any) => {
            let target = Array.from(document.querySelectorAll(".bot__edit")).find(element => element.querySelector("data")!.getAttribute("uuid") === bot.uuid)
            if (target) {
                botEdit__renderComponentList(target, bot)
            }
        })
    })

    eventEmitter.addEventListener("message", async (event: any) => {
        const { type, data } = event.data
        if (type == "update/bot") {
            data.forEach((bot: any) => {
                let target = Array.from(document.querySelectorAll(".bot__edit")).find(element => element.querySelector("data")!.getAttribute("uuid") === bot.uuid)
                if (target) {
                    botEdit__renderComponentList(target, bot)
                }
            })
        }
    })

    document.querySelectorAll(".bot__edit-button-components-refresh").forEach(element => {
        element.addEventListener("click", async (event) => {
            const target = event.target as HTMLElement
            const uuid = target.parentElement!.parentElement!.parentElement!.querySelector("data")!.getAttribute("uuid")
            target.parentElement!.querySelector("mdui-list")!.style.opacity = "0.5"
            target.setAttribute("loading", "true")
            setTimeout(() => {
                target.parentElement!.querySelector("mdui-list")!.style.opacity = "1"
                target.removeAttribute("loading")
                console.log("刷新超时")
            }, 10000)
            send({
                "type": "oc/task/runSingle",
                "target": uuid,
                "data": [
                    {
                        "task": "component",
                        "interval": -1,
                        "taskUuid": randomUUID(),
                        "config": {}
                    }
                ]
            })
        })
    })

    function botEdit__renderComponentList(element: any, bot: any) {
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
}