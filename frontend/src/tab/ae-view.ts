import { throttle } from "mdui"
import * as pinyinPro from "pinyin-pro"
import * as global from "../global"
import * as utils from "../utils"
import { eventEmitter } from "../websocket"
import { showItemInfo } from "../dialog/ae-item-info"
import { picSource } from "../settings"

export function html(config: any) {
    return /*html*/`
    <div class="ae__view">
    <div style="display: flex;align-items: center;margin-bottom: 0.5rem;gap:0.5rem;">
      <mdui-button-icon icon="arrow_back" class="ae__view-back"></mdui-button-icon>
      <div style="font-weight: bold;font-size:large">查看 - ${config.name}</div>
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
      <mdui-card class="card" variant="filled">
        <div class="card-title">
          <mdui-icon name="memory" style="font-size: 32px;margin-right: 0.35rem;align-self: center;"></mdui-icon>
          <div style="text-align: center;">CPU</div>
        </div>
  
        <div class="ae__view-cpu-list" style="margin-top: 0.5rem;display: grid;grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));gap: 0.5rem;">
        </div>
  
        <mdui-card class="ae__view-cpu-list-nothing" style="display: none;margin-top: 0.5rem;padding: 0.75rem;">
          <div style="text-align: center;opacity: 0.5;margin-top: 0.75rem;margin-bottom: 0.75rem;">没有找到 CPU 信息</div>
        </mdui-card>
  
        <mdui-chip class="ae__view-cpu-list-more-button" elevated icon="keyboard_arrow_down" style="padding: 0.5rem;height: auto;">展开 CPU 列表...</mdui-chip>
        <mdui-chip class="ae__view-cpu-list-less-button" elevated icon="keyboard_arrow_up" style="display: none;padding: 0.5rem;height: auto;">收起 CPU 列表</mdui-chip>
  
      </mdui-card>
  
  
      <mdui-card class="card" variant="filled">
        <div class="card-title">
          <mdui-icon name="storage" style="font-size: 28px;margin-right: 0.5rem;align-self: center;"></mdui-icon>
          <div>库存</div>
        </div>
  
        <div style="display: flex;margin-top: 0.5rem;gap: 0.5rem;">
          <mdui-chip class="ae__view-storage-filter-button" selected filter="all" selected elevated icon="all_inclusive" selected-icon="all_inclusive">全部</mdui-chip>
          <mdui-chip class="ae__view-storage-filter-button" filter="item" elevated icon="category" selected-icon="category">物品</mdui-chip>
          <mdui-chip class="ae__view-storage-filter-button" filter="fluid" elevated icon="water_drop" selected-icon="water_drop">流体</mdui-chip>
          <mdui-chip class="ae__view-storage-filter-button" filter="vis" elevated icon="auto_awesome" selected-icon="auto_awesome">源质</mdui-chip>
        </div>
  
        <mdui-text-field class="ae__view-storage-filter-search-input" label="检索库存..."></mdui-text-field>
  
        <div style="display: flex;margin-top: 0.5rem;gap: 0.5rem;margin-bottom: 0rem;align-items: center;">
          <mdui-chip class="ae__view-storage-filter-craftable-button" elevated icon="settings_suggest" selected-icon="settings_suggest">库存/可合成</mdui-chip>
          <mdui-chip class="ae__view-storage-filter-sort-button" elevated icon="sort" selected-icon="settings_suggest">数量排序 ↓</mdui-chip>
        </div>
  
        <mdui-card class="ae__view-item-list" style="display: grid;padding: 0.75rem;grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));gap: 0.25rem;">
        </mdui-card>
  
        <mdui-card class="ae__view-item-list-nothing" style="display: none;padding: 0.75rem;">
          <div style="text-align: center;opacity: 0.5;margin-top: 0.75rem;margin-bottom: 0.75rem;">没有找到符合条件的物品</div>
        </mdui-card>
  
        <mdui-chip class="ae__view-item-list-more-button" elevated icon="keyboard_arrow_down" style="padding: 0.5rem;height: auto;">显示更多...</mdui-chip>
  
      </mdui-card>
  
    </div>
  
    <data hidden uuid="${config.uuid}"></data>
  
  </div>
    
`}

export function init() {
    let filters: any = []
    let itemsPerPage = 40
    let cpusPerPage = 8

    global.ae.forEach((ae: any) => {
        filters.push({
            uuid: ae.uuid,
            filter: {
                type: "all", // all | item | fluid | vis
                craftable: "all", // all | yes 只显示可合成 | no 只显示库存
                sort: "amount", // amount | amountr | id | idr
                word: "", // 搜索词
                page: 1 // 页码
            },
            cpusShowMore: false
        })
    })

    let tooltip = document.getElementById("tooltip-ae")!;

    // 初始化 tooltip
    (()=>{
        let lastMousePosition = { x: 0, y: 0 }
        
        document.querySelectorAll(".ae__view-item-list").forEach((element: Element) => {
            const HTMLElement = element as HTMLElement
            HTMLElement.addEventListener("mousemove", (e: MouseEvent) => {
                lastMousePosition.x = e.pageX + 10
                lastMousePosition.y = e.pageY + 10
                requestAnimationFrame(updateTooltipPosition)
            })
        })
    
        function updateTooltipPosition() {
            tooltip.style.left = lastMousePosition.x + "px"
            tooltip.style.top = lastMousePosition.y + "px"
        }
    
        document.querySelectorAll(".ae__view-back").forEach(element => {
            element.addEventListener("click", _event => {
                document.getElementById("ae__view")!.hidden = true
                document.getElementById("ae__list")!.hidden = false
                document.getElementById("ae__topbar")!.hidden = false
            })
        })
    
    })()


    document.querySelectorAll(".ae__view").forEach(aeview => {

        const uuid = aeview.querySelector("data")!.getAttribute("uuid")!
        let filter: any = filters.find((ae: any) => ae.uuid == uuid).filter
        // let ae = global.ae.find((ae: any) => ae.uuid === uuid)

        aeview.querySelectorAll(".ae__view-storage-filter-button").forEach(button => {
            button.addEventListener("click", event => {
                filter.type = (event.target as HTMLElement).getAttribute("filter")
                aeview.querySelectorAll(".ae__view-storage-filter-button").forEach(button => {
                    button.removeAttribute("selected")
                });
                (event.target as HTMLElement).setAttribute("selected", "")
                filter.page = 1
                renderItemList(uuid, undefined, aeview)
            })
        })

        aeview.querySelector(".ae__view-storage-filter-craftable-button")!.addEventListener("click", event => {

            if (filter.craftable == "all") {
                filter.craftable = "yes"
            } else if (filter.craftable == "yes") {
                filter.craftable = "no"
            } else if (filter.craftable == "no") {
                filter.craftable = "all"
            }

            if (filter.craftable == "all") {
                (event.target as HTMLElement).innerHTML = "库存 / 可合成"
            } else if (filter.craftable == "yes") {
                (event.target as HTMLElement).innerHTML = "仅可合成"
            } else if (filter.craftable == "no") {
                (event.target as HTMLElement).innerHTML = "仅库存"
            }

            filter.page = 1
            renderItemList(uuid, undefined, aeview)
        })

        aeview.querySelector(".ae__view-storage-filter-sort-button")!.addEventListener("click", event => {

            if (filter.sort == "amount") {
                filter.sort = "amountr"
            } else if (filter.sort == "amountr") {
                filter.sort = "id"
            } else if (filter.sort == "id") {
                filter.sort = "idr"
            } else if (filter.sort == "idr") {
                filter.sort = "amount"
            }

            if (filter.sort == "amount") {
                (event.target as HTMLElement).innerHTML = "数量排序 ↓"
            } else if (filter.sort == "amountr") {
                (event.target as HTMLElement).innerHTML = "数量排序 ↑"
            } else if (filter.sort == "id") {
                (event.target as HTMLElement).innerHTML = "ID 排序 ↓"
            } else if (filter.sort == "idr") {
                (event.target as HTMLElement).innerHTML = "ID 排序 ↑"
            }

            filter.page = 1
            renderItemList(uuid, undefined, aeview)
        })

        aeview.querySelector(".ae__view-storage-filter-search-input")!.addEventListener("input", throttle(event => {
            filter.word = event.target.value
            filter.page = 1
            renderItemList(uuid, undefined, aeview)
        }, 100))

        aeview.querySelector(".ae__view-item-list-more-button")!.addEventListener("click", _event => {
            filter.page += 1
            renderItemList(uuid, undefined, aeview)
        })

        aeview.querySelector(".ae__view-cpu-list-more-button")!.addEventListener("click", _event => {
            filters.find((ae: any) => ae.uuid == uuid).cpusShowMore = true;
            (aeview.querySelector(".ae__view-cpu-list-more-button")! as HTMLElement).style["display"] = "none";
            (aeview.querySelector(".ae__view-cpu-list-less-button")! as HTMLElement).style["display"] = "block"
            renderCpusList(uuid, undefined, aeview)
        })

        aeview.querySelector(".ae__view-cpu-list-less-button")!.addEventListener("click", _event => {
            filters.find((ae: any) => ae.uuid == uuid).cpusShowMore = false;
            (aeview.querySelector(".ae__view-cpu-list-more-button")! as HTMLElement).style["display"] = "block";
            (aeview.querySelector(".ae__view-cpu-list-less-button")! as HTMLElement).style["display"] = "none"
            renderCpusList(uuid, undefined, aeview)
        })

        eventEmitter.on("message", async (event: any) => {
            const { type, data } = event.data
            if (type == "data/ae/set" && data.uuid === uuid) {
                renderStatusText(uuid, data, aeview)
                renderCpusList(uuid, data, aeview)
                renderItemList(uuid, data, aeview)
            }
        })

        const ae = global.ae.find((ae: any) => ae.uuid === uuid)

        renderStatusText(uuid, ae, aeview)
        renderCpusList(uuid, ae, aeview)
        renderItemList(uuid, ae, aeview)

        setInterval(() => {
            renderStatusText(uuid, ae, aeview)
        }, 10000)

    })


    document.querySelectorAll(".ae__list-item").forEach(aeListItem => {

        const uuid = aeListItem.querySelector("data")!.getAttribute("uuid")!

        eventEmitter.on("message", async (event: any) => {
            const { type, data } = event.data
            if (type == "data/ae/set" && data.uuid === uuid) {
                renderStatusText(uuid, data, aeListItem)
            }
        })

        const ae = global.ae.find((ae: any) => ae.uuid === uuid)

        renderStatusText(uuid, ae, aeListItem)
    })

    document.querySelectorAll(".ae__edit").forEach(aeEdit => {

        const uuid = aeEdit.querySelector("data")!.getAttribute("uuid")!

        eventEmitter.on("message", async (event: any) => {
            const { type, data } = event.data
            if (type == "data/ae/set" && data.uuid === uuid) {
                renderStatusText(uuid, data, aeEdit)
            }
        })

        const ae = global.ae.find((ae: any) => ae.uuid === uuid)

        renderStatusText(uuid, ae, aeEdit)
    })


    function renderStatusText(target: string, ae: any, card: any) {

        if (!ae) {
            ae = global.ae.find((ae: any) => ae.uuid === target)
        }

        card.querySelector(".ae__overview-time-updated")!.innerHTML = `数据更新 - ${utils.timePassedDisplayConvert(ae.timeUpdated)}`
        card.querySelector(".ae__overview-time-created")!.innerHTML = `创建于 ${utils.timeDisplayConvert(ae.timeCreated)}`
        card.querySelector(".ae__overview-cpu-status")!.innerHTML = `${ae.cpus.length - ae.cpus.filter((cpu: any) => cpu.busy).length} / ${ae.cpus.length} 核心空闲`
        card.querySelector(".ae__overview-maintain")!.innerHTML = `test`
    }

    function renderCpusList(target: any, ae: any, card: any) {
        let _ = ""

        let targetElement = card.querySelector(".ae__view-cpu-list") as HTMLElement

        let targetElementNothing = card.querySelector(".ae__view-cpu-list-nothing") as HTMLElement

        let targetElementShowMore = card.querySelector(".ae__view-cpu-list-more-button") as HTMLElement

        let targetElementShowLess = card.querySelector(".ae__view-cpu-list-less-button") as HTMLElement

        if (!ae) {
            ae = global.ae.find((ae: any) => ae.uuid === target)
        }

        var aeCpus = ae.cpus.sort((a: any, b: any) => {
            if (a.busy && b.busy) {
                return 0
            } else if (a.busy) {
                return -1
            }
        })

        if (aeCpus.length <= cpusPerPage) {
            targetElementShowMore.style["display"] = "none"
            targetElementShowLess.style["display"] = "none"
        } else {
            if (filters.find((ae: any) => ae.uuid === target).cpusShowMore) {
                targetElementShowMore.style["display"] = "none"
                targetElementShowLess.style["display"] = "block"
            } else {
                targetElementShowMore.style["display"] = "block"
                targetElementShowLess.style["display"] = "none"
            }
        }

        if (!filters.find((ae: any) => ae.uuid === target).cpusShowMore) {
            aeCpus = aeCpus.slice(0, cpusPerPage)
        }

        if (aeCpus.length === 0) {
            (targetElementNothing as HTMLElement).style["display"] = "block";
            (targetElement as HTMLElement).style["display"] = "none"
        } else {
            (targetElementNothing as HTMLElement).style["display"] = "none";
            (targetElement as HTMLElement).style["display"] = "grid"

            aeCpus.forEach((cpu: any, i: number) => {
                const finalOutputTotal = cpu.busy ? cpu.finalOutput.total : -1
                const finalOutputAmount = cpu.busy ? cpu.finalOutput.amount : 0
                const icon = cpu.busy ? "settings_suggest" : "download_done"
                const iconBig = cpu.busy ? "hourglass_bottom" : "schedule"
                const nameStr = cpu.name ? `- "${cpu.name}"` : ""
                const statusStr = cpu.busy ? `合成中 · ${utils.timeLengthDisplayConvert(cpu.timeStarted)}` : `空闲 · ${cpu.storage / 1024}K`
                const finalOutput = cpu.busy ? `<div style="margin-top: .5rem;margin-bottom: .5rem;"><b>${cpu.finalOutput.display}</b> - ${finalOutputTotal - finalOutputAmount} / ${finalOutputTotal}</div>` : ""
                const percentage = ((finalOutputTotal - finalOutputAmount) / finalOutputTotal * 100).toFixed(0)
                const progressBar = cpu.busy ? /*html*/`
                <div style="display: flex;align-items: center;margin-bottom: 0.25rem;">
                    <div style="opacity: 0.5;">${percentage}%&nbsp;&nbsp;</div>
                    <mdui-linear-progress value="${percentage}"min="0" max="100"></mdui-linear-progress>
                </div>` : ""

                _ += /*html*/`
                <mdui-card style="padding: 1rem;padding-left: 1.25rem;padding-right: 1.25rem">
                  <div style="display: flex;align-items: center;">
                    <mdui-icon name="${iconBig}" style="position: absolute;top: 1rem;right: 1rem;opacity: 0.1;font-size: 3rem;"></mdui-icon>
                    <mdui-icon name="${icon}"></mdui-icon>
                    &nbsp;&nbsp;
                    <div>
                      <div>CPU ${i} <span style="opacity: 0.7">${nameStr}</span></div>
                      <div style="font-weight: normal;font-size: .8rem;opacity: 0.5">${statusStr}</div>
                    </div>
                  </div>
                  ${finalOutput}
                  ${progressBar}
                </mdui-card>
                `
            })

        }


        targetElement!.innerHTML = _

    }

    // target: 目标 ae uuid
    // ae: 目标 ae 数据，留空则从全局 ae 列表中获取
    function renderItemList(target: any, ae: any, card: any) {
        let _ = ""

        const targetElement = card.querySelector(".ae__view-item-list")
        const targetElementNothing = card.querySelector(".ae__view-item-list-nothing")
        const targetElementShowMore = card.querySelector(".ae__view-item-list-more-button")

        if (!ae) {
            ae = global.ae.find((ae: any) => ae.uuid === target)
        }

        const filter = filters.find((ae: any) => ae.uuid === target).filter

        const itemListFiltered = ae.itemList.filter((item: any) => {
            if (filter.type === "all") {
                return true
            } else if (filter.type === "item") {
                if (item.type == "item") {
                    return true
                } else {
                    return false
                }
            } else if (filter.type === "fluid") {
                if (item.type == "fluid") {
                    return true
                } else {
                    return false
                }
            } else if (filter.type === "vis") {
                // TODO: VIS 过滤实现
                return false
            }
        }).filter((item: any) => {
            if (filter.craftable === "all") {
                return true
            } else if (filter.craftable === "yes") {
                if (item.craftable) {
                    return true
                } else {
                    return false
                }
            } else if (filter.craftable === "no") {
                if (item.craftable) {
                    return false
                } else {
                    return true
                }
            }
        }).filter((item: any) => {
            if (filter.word === "") {
                return true
            } else if (filter.word[0] == "@") {
                const modName = filter.word.slice(1)
                if (item.name.split(":")[0].toLocaleLowerCase().includes(modName.toLocaleLowerCase())) {
                    return true
                } else {
                    return false
                }

            }
            if (item.display == undefined) { item.display = "" }
            else if (pinyinPro.match(item.display, filter.word)
                || item.name.toLocaleLowerCase().includes(filter.word.toLocaleLowerCase())
                || item.id == filter.word
            ) {
                return true
            } else {
                return false
            }
        }).sort((a: any, b: any) => {
            if (filter.sort === "amount") {
                return b.amount - a.amount
            } else if (filter.sort === "amountr") {
                return a.amount - b.amount
            } else if (filter.sort === "id") {
                return b.id - a.id
            } else if (filter.sort === "idr") {
                return a.id - b.id
            }
        })

        const itemListFilteredSliced = itemListFiltered.slice(0, filter.page * itemsPerPage)

        let unrenderedItemsAmount

        if (itemListFiltered.length > filter.page * itemsPerPage) {
            (targetElementShowMore as HTMLElement).style["display"] = "block"
            unrenderedItemsAmount = itemListFiltered.length - (filter.page * itemsPerPage)
        } else {
            (targetElementShowMore as HTMLElement).style["display"] = "none"
            unrenderedItemsAmount = 0
        }

        if (itemListFilteredSliced.length === 0) {
            (targetElementNothing as HTMLElement).style["display"] = "block";
            (targetElement as HTMLElement).style["display"] = "none"
        } else {
            (targetElementNothing as HTMLElement).style["display"] = "none";
            (targetElement as HTMLElement).style["display"] = "grid"

            itemListFilteredSliced.forEach((item: any) => {

                let link = ""
                let type = ""
                let amount = utils.numberDisplayConvert(item.amount)
                let craftable = ""

                if (item.type == "item") {
                    link = `item/${item.id}_${item.damage}.png`
                    type = "item"
                } else if (item.type == "fluid") {
                    link = `fluid/${item.id}.png`
                    type = "fluid"
                } else if (item.type == "vis") {
                    // TODO: VIS 显示实现
                    return
                }

                if (item.craftable) {
                    craftable = /*html*/`<mdui-icon name="settings_suggest" style="position: absolute;top: 1px;right: 1px;font-size: 18px;color: rgb(var(--mdui-color-primary));text-shadow: 0px 0px 4px rgba(0,0,0,1);"></mdui-icon>`
                }

                // const picSource = "./resources/itempanel"

                _ += `
                <div class="hover-highlight ae__view-item-list-item" style="position: relative;cursor: pointer;" id="${item.id}" damage="${item.damage ? item.damage : 0}" type="${type}" display="${item.display}" name="${item.name}" craftable="${item.craftable ? 1 : 0}" amount="${item.amount}">
                  <img src="${picSource}/${link}" style="height: 3rem;"></img>
                  <div style="position: absolute;bottom: 1px;right: 1px;text-align: right;text-shadow: 0px 0px 4px rgba(0,0,0,1);">${amount}</div>
                  ${craftable}
                </div>
                `
            })
        }

        if (unrenderedItemsAmount > 0) {
            _ += /*html*/`
            <div style="position: relative;display: flex;align-items: center;justify-content: center;">   
              <div style="font-size: large;opacity: 0.75;">...</div>
            </div>
            `
        }

        targetElementShowMore.innerHTML = `显示更多... （还有 ${unrenderedItemsAmount} 项）`

        targetElement!.innerHTML = _

        card.querySelectorAll(".ae__view-item-list-item").forEach((item: any) => {
            item.addEventListener("click", (_event: any) => {
                const id = item.getAttribute("id")
                const damage = item.getAttribute("damage")
                const type = item.getAttribute("type")
                showItemInfo(target, id, damage, type)
            })
            if (!utils.isMobileDevice()) {
                item.addEventListener("mouseover", (_event: any) => {
                    const name = item.getAttribute("name")
                    const display = item.getAttribute("display")
                    const type = item.getAttribute("type")
                    const craftable = item.getAttribute("craftable")
                    const amount = item.getAttribute("amount")
                    let modBar = ""
                    let craftableBar = ""
                    if (type == "item") {
                        modBar = `<div style="font-size: smaller; color: #88f;">${name.split(":")[0]}</div>`
                    } else if (type == "fluid") {
                        modBar = `<div style="font-size: smaller; color: #bbb;">${name}</div>`
                    }
                    if (craftable == "1") {
                        craftableBar = /*html*/`
                        <div style="font-size: smaller; color: #888;">可合成</div>
                        `
                    }
                    tooltip.style.display = "block"
                    tooltip.innerHTML = /*html*/`
                    <div>${display}</div>
                    ${modBar}
                    ${craftableBar}
                    <div style="font-size: smaller; color: #888;">数量：${utils.commaNumberDisplayConvert(amount)}</div>
                    `
                })
                item.addEventListener("mouseout", (_event: any) => {
                    tooltip.style.display = "none"
                })

            }
        })
    }
}