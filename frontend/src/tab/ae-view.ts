import { throttle } from "mdui"
import * as pinyinPro from "pinyin-pro"
import * as global from "../global"
import { numberDisplayConvert, timeDisplayConvert, timePassedDisplayConvert } from "../utils"
import { eventEmitter } from "../websocket"

export function html(config: any) {
    return /*html*/`
    <div class="ae__view">
    <div style="display: flex;align-items: center;margin-bottom: 0.5rem;gap:0.5rem;">
      <mdui-button-icon icon="arrow_back" class="ae__view-back"></mdui-button-icon>
      <div style="font-weight: bold;font-size:large">查看 - ${config.name}</div>
    </div>
  
    <div class="grid-full">
      <mdui-card class="card ae__view-cpus" variant="filled">
        <div style="display: flex;align-items: center;gap: 0.5rem;">
  
          <mdui-icon name="grid_on--outlined" style="font-size: 2rem;"></mdui-icon>
  
          <div>
            <div style="font-size: larger;white-space: nowrap;"><b>${config.name}</b></div>
          </div>
  
          <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>
  
          <div>
            <div class="ae__view-time-updated" style="opacity: 1;">...</div>
            <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
          </div>
  
        </div>
  
        <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="schedule"></mdui-icon>
            <div class="ae__view-time-created">...</div>
          </div>
  
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
            <mdui-icon name="memory"></mdui-icon>
            <div class="ae__view-cpu-status"></div>
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
    var aeView__filter: any = []
    var aeView__itemsPerPage = 40
    var aeView__cpusPerPage = 8

    document.querySelectorAll(".ae__view-back").forEach(element => {
        element.addEventListener("click", _event => {
            document.getElementById("ae__view")!.hidden = true
            document.getElementById("ae__list")!.hidden = false
            document.getElementById("ae__topbar")!.hidden = false
        })
    })

    global.ae.forEach((ae: any) => {
        aeView__filter.push({
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

        aeView__renderStatusText(ae.uuid, ae)
        aeView__renderCpusList(ae.uuid, ae)
        aeView__renderItemList(ae.uuid, ae)
    })


    document.querySelectorAll(".ae__view").forEach(aeview => {

        const uuid = aeview.querySelector("data")!.getAttribute("uuid")
        let filter = aeView__filter.find((ae: any) => ae.uuid == uuid).filter
        // let ae = global.ae.find((ae: any) => ae.uuid === uuid)

        aeview.querySelectorAll(".ae__view-storage-filter-button").forEach(button => {
            button.addEventListener("click", event => {
                filter.type = (event.target as HTMLElement).getAttribute("filter")
                aeview.querySelectorAll(".ae__view-storage-filter-button").forEach(button => {
                    button.removeAttribute("selected")
                });
                (event.target as HTMLElement).setAttribute("selected", "")
                aeView__renderItemList(uuid, undefined)
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
            aeView__renderItemList(uuid, undefined)
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
            aeView__renderItemList(uuid, undefined)
        })

        aeview.querySelector(".ae__view-storage-filter-search-input")!.addEventListener("input", throttle(event => {
            filter.word = event.target.value
            filter.page = 1
            aeView__renderItemList(uuid, undefined)
        }, 100))

        aeview.querySelector(".ae__view-item-list-more-button")!.addEventListener("click", _event => {
            filter.page += 1
            aeView__renderItemList(uuid, undefined)
        })

        aeview.querySelector(".ae__view-cpu-list-more-button")!.addEventListener("click", _event => {
            aeView__filter.find((ae: any) => ae.uuid == uuid).cpusShowMore = true;
            (aeview.querySelector(".ae__view-cpu-list-more-button")! as HTMLElement).style["display"] = "none";
            (aeview.querySelector(".ae__view-cpu-list-less-button")! as HTMLElement).style["display"] = "block"
            aeView__renderCpusList(uuid, undefined)
        })

        aeview.querySelector(".ae__view-cpu-list-less-button")!.addEventListener("click", _event => {
            aeView__filter.find((ae: any) => ae.uuid == uuid).cpusShowMore = false;
            (aeview.querySelector(".ae__view-cpu-list-more-button")! as HTMLElement).style["display"] = "block";
            (aeview.querySelector(".ae__view-cpu-list-less-button")! as HTMLElement).style["display"] = "none"
            aeView__renderCpusList(uuid, undefined)
        })


    })

    eventEmitter.addEventListener("message", async (event: any) => {
        const { type, data } = event.data
        if (type == "update/ae") {
            data.forEach((ae: any) => {
                aeView__renderStatusText(ae.uuid, ae)
                aeView__renderCpusList(ae.uuid, ae)
                aeView__renderItemList(ae.uuid, ae)
            })
        }
    })

    setInterval(() => {
        global.ae.forEach((ae: any) => {
            tick(ae.uuid, ae)
        })
    }, 1000)

    function aeView__renderStatusText(target: string, ae?: any) {

        if (!ae) {
            ae = global.ae.find((ae: any) => ae.uuid === target)
        }

        const aeview = Array.from(document.querySelectorAll(".ae__view")).find(element => element.querySelector("data")!.getAttribute("uuid") === target)!

        aeview.querySelector(".ae__view-time-updated")!.innerHTML = `数据更新 - ${timePassedDisplayConvert(ae.timeUpdated)}`
        aeview.querySelector(".ae__view-time-created")!.innerHTML = `创建于 ${timeDisplayConvert(ae.timeCreated)}`
        aeview.querySelector(".ae__view-cpu-status")!.innerHTML = `${ae.cpus.filter((cpu: any) => cpu.busy).length} / ${ae.cpus.length} 核心空闲`

    }

    function tick(target: any, ae: any) {
        const aeview = Array.from(document.querySelectorAll(".ae__view")).find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
        aeview.querySelector(".ae__view-time-updated")!.innerHTML = `数据更新 - ${timePassedDisplayConvert(ae.timeUpdated)}`
    }

    function aeView__renderCpusList(target: any, ae: any) {
        let _ = ""

        let targetElement = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-cpu-list")

        let targetElementNothing = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-cpu-list-nothing")

        let targetElementShowMore = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-cpu-list-more-button")

        let targetElementShowLess = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-cpu-list-less-button")

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

        if (aeCpus.length <= aeView__cpusPerPage) {
            (targetElementShowMore as HTMLElement).style["display"] = "none";
            (targetElementShowLess as HTMLElement).style["display"] = "none"
        } else {
            if (aeView__filter.find((ae: any) => ae.uuid === target).cpusShowMore) {
                (targetElementShowMore as HTMLElement).style["display"] = "none";
                (targetElementShowLess as HTMLElement).style["display"] = "block"
            } else {
                (targetElementShowMore as HTMLElement).style["display"] = "block";
                (targetElementShowLess as HTMLElement).style["display"] = "none"
            }
        }

        if (!aeView__filter.find((ae: any) => ae.uuid === target).cpusShowMore) {
            aeCpus = aeCpus.slice(0, aeView__cpusPerPage)
        }

        if (aeCpus.length === 0) {
            (targetElementNothing as HTMLElement).style["display"] = "block";
            (targetElement as HTMLElement).style["display"] = "none"
        } else {
            (targetElementNothing as HTMLElement).style["display"] = "none";
            (targetElement as HTMLElement).style["display"] = "grid"

            aeCpus.forEach((cpu: any, i: number) => {
                const icon = cpu.busy ? "settings_suggest" : "download_done"
                const iconBig = cpu.busy ? "hourglass_bottom" : "schedule"
                const nameStr = cpu.name ? `- "${cpu.name}"` : ""
                const statusStr = cpu.busy ? "合成中 · 1 分钟" : `空闲 · ${cpu.storage / 1024}K`
                const finalOutput = cpu.busy ? `<div style="margin-top: .5rem;margin-bottom: .5rem;"><b>${cpu.finalOutput.display}</b> - 0 / ${cpu.finalOutput.amount}</div>` : ""
                const progressBar = cpu.busy ? `
                <div style="display: flex;align-items: center;margin-bottom: 0.25rem;">
                    <div style="opacity: 0.5;">69%&nbsp;&nbsp;</div>
                    <mdui-linear-progress value="0" max="1"></mdui-linear-progress>
                </div>` : ""

                _ += `
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
    function aeView__renderItemList(target: any, ae: any) {
        let _ = ""

        let targetElement = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-item-list")

        let targetElementNothing = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-item-list-nothing")

        let targetElementShowMore = Array.from(
            document.querySelectorAll(".ae__view"))!
            .find(element => element.querySelector("data")!.getAttribute("uuid") === target)!
            .querySelector(".ae__view-item-list-more-button")


        if (!ae) {
            ae = global.ae.find((ae: any) => ae.uuid === target)
        }

        const filter = aeView__filter.find((ae: any) => ae.uuid === target).filter

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

        const itemListFilteredSliced = itemListFiltered.slice(0, filter.page * aeView__itemsPerPage)

        if (itemListFiltered.length > filter.page * aeView__itemsPerPage) {
            (targetElementShowMore as HTMLElement).style["display"] = "block"
        } else {
            (targetElementShowMore as HTMLElement).style["display"] = "none"
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
                let amount = numberDisplayConvert(item.amount)

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
                    amount += "(C)"
                }

                _ += `
                <div class="hover-highlight" style="position: relative;cursor: pointer;" onclick="dialog__aeShowItemInfo('${target}','${item.id}','${type}')">
                  <img src="./resources/itempanel/${link}" style="height: 3rem;"></img>
                  <div style="position: absolute;bottom: 1px;right: 1px;text-align: right;text-shadow: 0px 0px 4px rgba(0,0,0,1);">${amount}</div>
                </div>
                `
            })
        }

        targetElement!.innerHTML = _
    }
}