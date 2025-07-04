import { picSource } from "../settings"
import { eventEmitter, send } from "../websocket"
import * as global from "../global"
import { aeModel, newWebToServerMessage, wsServerToWebGuard } from "@oni/interface"
import { randomUUID } from "../utils"
import { selectItem } from "../dialog/ae-item-select"

export function html(config: any) {
    return /*html*/`
<div class="ae__edit">
    <div style="display: flex;align-items: center;margin-bottom: 0.5rem;gap:0.5rem;">
        <mdui-button-icon icon="arrow_back" class="ae__edit-back"></mdui-button-icon>
        <div style="font-weight: bold;font-size:large">编辑 - ${config.name}</div>
    </div>

    <div class="grid-full">
      <mdui-card class="card" variant="filled">
      
        <div style="display: flex;align-items: center;gap: 0.5rem;">
        <mdui-icon name="grid_on--outlined" style="font-size: 2rem;"></mdui-icon>
    
        <div>
            <div style="font-size: larger;white-space: nowrap;"><b>${config.name}</b></div>
        </div>
    
        <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>
    
        <div>
            <div class="ae__overview-time-updated" style="opacity: 1;">...</div>
            <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
        </div>
    
        </div>
    
        <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
        <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="schedule"></mdui-icon>
            <div class="ae__overview-time-created">...</div>
        </div>
    
        <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="memory"></mdui-icon>
            <div class="ae__overview-cpu-status">...</div>
        </div>
    
        <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="category"></mdui-icon>
            <div class="ae__overview-maintain">...</div>
        </div>
        </div>
  
      </mdui-card>
    </div>

    <div class="grid-l">
        <mdui-card class="card" variant="filled" style="gap: 0.5rem;">
            <div class="card-title" style="margin-bottom: 0.5rem;">
                <mdui-icon name="grading" style="font-size: 28px;margin-right: 0.5rem;align-self: center;"></mdui-icon>
                <div>库存维持</div>
            </div>

            <div>

                <div class="ae__maintain-list" style="display: flex;flex-direction: column;gap: 1rem;margin-bottom: 1rem;">

                </div>


                <div class="ae__edit-maintain-before-edit" style="display: flex;gap: 0.5rem;flex-wrap: wrap;margin-top: 0.5rem;">

                    <mdui-chip elevated style="margin-right: auto;">
                    编辑
                    <mdui-icon slot="icon" name="edit"></mdui-icon>
                    </mdui-chip>
        
                </div>
      
                <div class="ae__edit-maintain-after-edit" style="display: none;gap: 0.5rem;flex-wrap: wrap;margin-top: 0.5rem;">
        
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

            </div>
        </mdui-card>


        <mdui-card class="card" variant="filled">
            <div class="card-title">
                操作
            </div>

            <mdui-chip elevated
                style="background-color: rgb(var(--mdui-color-error-container));margin-right: auto;margin-top: 0.5rem;">
                删除 ${config.name}
                <mdui-icon slot="icon" name="delete"></mdui-icon>
            </mdui-chip>

        </mdui-card>

    </div>

    <data hidden uuid="${config.uuid}"></data>
</div>
`}

export function init() {
    document.querySelectorAll(".ae__edit-back").forEach(element => {
        element.addEventListener("click", _event => {
            document.getElementById("ae__edit")!.hidden = true
            document.getElementById("ae__list")!.hidden = false
            document.getElementById("ae__topbar")!.hidden = false
        })
    })

    document.querySelectorAll(".ae__edit").forEach(aeEdit => {
        const uuid = aeEdit.querySelector("data")!.getAttribute("uuid")!
        let maintainEditMode = false
        let maintainPreviews: aeModel.AeLevelMaintain[] = []

        eventEmitter.on("message", m => {
            if (wsServerToWebGuard.isDataAeLevelMaintainsSet(m) && m.data.uuid === uuid) {
                if (!maintainEditMode) {
                    renderMaintainList(m.data.uuid, m.data, aeEdit)
                }
            }
        })

        renderMaintainList(uuid, undefined, aeEdit)

        const beforeEditGroup = aeEdit.querySelector(".ae__edit-maintain-before-edit") as HTMLElement
        const afterEditGroup = aeEdit.querySelector(".ae__edit-maintain-after-edit") as HTMLElement

        const editButton = beforeEditGroup.querySelector("mdui-chip:nth-child(1)")!
        const applyButton = afterEditGroup.querySelector("mdui-chip:nth-child(1)")!
        const cancelButton = afterEditGroup.querySelector("mdui-chip:nth-child(2)")!
        const addButton = afterEditGroup.querySelector("mdui-chip:nth-child(3)")!


        editButton.addEventListener("click", _event => {
            maintainEditMode = true
            maintainPreviews = JSON.parse(JSON.stringify(global.ae.find((ae: aeModel.Ae) => ae.uuid === uuid)!.levelMaintains))
            beforeEditGroup.style.display = "none"
            afterEditGroup.style.display = "flex"
            renderMaintainList(uuid, undefined, aeEdit)
        })

        applyButton.addEventListener("click", _event => {
            send(newWebToServerMessage("DataAeLevelMaintainsSet", {
                uuid: uuid,
                levelMaintains: maintainPreviews
            }))

            beforeEditGroup.style.display = "flex"
            afterEditGroup.style.display = "none"
            maintainEditMode = false
            renderMaintainList(uuid, undefined, aeEdit)
        })

        cancelButton.addEventListener("click", _event => {
            beforeEditGroup.style.display = "flex"
            afterEditGroup.style.display = "none"
            maintainEditMode = false
            renderMaintainList(uuid, undefined, aeEdit)
        })

        addButton.addEventListener("click", _event => {
            maintainPreviews.push({
                uuid: randomUUID(),
                enabled: false,
                list: []
            })
            renderMaintainList(uuid, undefined, aeEdit)
        })

        function renderMaintainList(uuid: string, ae: aeModel.Ae | undefined, adEdit: Element) {

            if (!ae) {
                const targetAe: aeModel.Ae | undefined = global.ae.find((ae: aeModel.Ae) => ae.uuid === uuid)
                if (targetAe) { ae = targetAe } else { console.error("ae not found"); return }
            }

            let usedList = maintainEditMode ? maintainPreviews : ae.levelMaintains

            let _ = ""
            const elementMaintainList = adEdit.querySelector(".ae__maintain-list")!

            usedList.forEach((maintain: aeModel.AeLevelMaintain, i: number) => {
                _ += /*html*/`
                <mdui-card style="padding-bottom: 0.5rem;gap: 0.5rem;">
                    <div style="display: flex;align-items: center;gap: 0.5rem;padding: 1rem;margin-bottom: -1rem;">
                        <mdui-icon style="margin-left: 0.25rem;" name="receipt_long"></mdui-icon>
                        <div>
                            <div style="font-weight: bold;font-size: large;margin-left: 0.25rem;">队列 #${i + 1}</div>
                        </div>
                        ${maintainEditMode ? `<mdui-button-icon style="margin-left: auto;" icon="settings"></mdui-button-icon>` : ""}
                        <mdui-switch i="${i}" class="ae__edit-maintain-enabled" style="margin-right: 0.25rem;${maintainEditMode ? "" : "margin-left: auto;"}" ${maintain.enabled ? "checked" : ""}></mdui-switch>
                        
                    </div>
                <mdui-list style="margin-left: 1rem;margin-right: 1rem;">
                `
                maintain.list.forEach((item, ii) => {
                    const currentItem = ae.items.find((_) => _.id === item.id && _.damage === item.damage)
                    let current = 0
                    if (currentItem) {
                        current = currentItem.amount
                    }

                    let bar = ""
                    if (maintainEditMode) {
                        bar = /*html*/`
                        <mdui-text-field i="${i}" ii="${ii}" class="ae__edit-maintain-item-request" value="${item.request}" type="number" style="width: 8rem;margin-left: auto;" variant="outlined" label="单次请求量"></mdui-text-field>
                        <mdui-text-field i="${i}" ii="${ii}" class="ae__edit-maintain-item-total" value="${item.amount}" type="number" style="width: 8rem;" variant="outlined" label="维持总量"></mdui-text-field>
                        <mdui-button-icon i="${i}" ii="${ii}" class="ae__edit-maintain-item-remove" icon="clear"></mdui-button-icon>
                        `
                    } else {
                        bar = /*html*/`<div style="opacity: 0.5;text-align: right;margin-left: auto;">${current} / ${item.amount}</div>`
                    }

                    let info = ""
                    if (maintainEditMode) {
                        info = item.name
                    } else if (current > item.amount) {
                        info = "已达到库存维持数量"
                    } else {
                        info = "请求中..."
                    }

                    _ += /*html*/`
                <mdui-list-item>
                <div style="display: flex;align-items: center;gap: 0.75rem;">
                    <img src="${picSource}/${item.type}/${item.id}_${item.damage}.png" style="height: 3rem;">
                    <div>
                        <div>${item.display}</div>
                        <div style="font-size: smaller;opacity: 0.5;">${info}</div>
                    </div>
                    ${bar}
                </div>
                </mdui-list-item>
                `
                })
                if (maintainEditMode) {
                    _ += /*html*/`
                    <mdui-list-item i="${i}" class="ae__edit-maintain-item-add">
                    <div style="display: flex;align-items: center;gap: 0.75rem;">
                        <mdui-icon name="add"></mdui-icon>添加...
                    </div>
                    </mdui-list-item>
                    `
                }
                _ += /*html*/`
            </mdui-list>
            </mdui-card>
            `
            })

            elementMaintainList.innerHTML = _

            if (maintainEditMode) {
                aeEdit.querySelectorAll(".ae__edit-maintain-item-remove").forEach(element => {
                    element.addEventListener("click", _event => {
                        const i = parseInt((_event.target as HTMLElement).getAttribute("i")!)
                        const ii = parseInt((_event.target as HTMLElement).getAttribute("ii")!)
                        maintainPreviews[i].list.splice(ii, 1)
                        renderMaintainList(uuid, undefined, adEdit)
                    })
                })
                aeEdit.querySelectorAll(".ae__edit-maintain-item-add").forEach(element => {
                    const i = parseInt(element.getAttribute("i")!)
                    element.addEventListener("click", _event => {
                        console.log(i)
                        selectItem(ae).then(item => {
                            maintainPreviews[i].list.push({
                                id: item.id,
                                damage: item.damage,
                                name: item.name,
                                type: item.type,
                                display: item.display,
                                amount: 1,
                                request: 1
                            })
                            renderMaintainList(uuid, undefined, adEdit)
                        })
                    })
                })
                aeEdit.querySelectorAll(".ae__edit-maintain-item-request").forEach(element => {
                    const i = parseInt(element.getAttribute("i")!)
                    const ii = parseInt(element.getAttribute("ii")!)
                    element.addEventListener("change", _event => {
                        maintainPreviews[i].list[ii].request = parseInt((_event.target as HTMLInputElement).value)
                    })
                })
                aeEdit.querySelectorAll(".ae__edit-maintain-item-total").forEach(element => {
                    const i = parseInt(element.getAttribute("i")!)
                    const ii = parseInt(element.getAttribute("ii")!)
                    element.addEventListener("change", _event => {
                        maintainPreviews[i].list[ii].amount = parseInt((_event.target as HTMLInputElement).value)
                    })
                })

            }

            aeEdit.querySelectorAll(".ae__edit-maintain-enabled").forEach(element => {
                const i = parseInt(element.getAttribute("i")!)
                element.addEventListener("change", _event => {
                    if (maintainEditMode) {
                        maintainPreviews[i].enabled = (element as HTMLInputElement).checked
                    } else {
                        ae.levelMaintains[i].enabled = (element as HTMLInputElement).checked
                        console.log(ae.levelMaintains[i])
                        console.log(i)
                        send(newWebToServerMessage("DataAeLevelMaintainsSet", {
                            uuid: uuid,
                            levelMaintains: ae.levelMaintains
                        }))
                    }
                })
            })

        }
    })

}