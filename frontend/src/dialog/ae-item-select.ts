import { aeModel } from "@oni/interface"
import * as pinyinPro from "pinyin-pro"
import { Dialog, throttle } from "mdui"
import * as utils from "../utils"
import { picSource } from "../settings"
import * as global from "../global"


export const html = /*html*/`<mdui-dialog id="ae__item-select" style="padding: 0 !important;">

  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;width: 30rem;">
    <mdui-icon name="category" style="margin-right: 0.5rem;"></mdui-icon>
    <div>选择一个物品</div>
  </div>

  <div style="display: flex;margin-top: 1.5rem;gap: 0.5rem;">
    <mdui-chip class="ae__item-select-filter-button" selected filter="all" selected elevated icon="all_inclusive"
      selected-icon="all_inclusive">全部</mdui-chip>
    <mdui-chip class="ae__item-select-filter-button" filter="item" elevated icon="category"
      selected-icon="category">物品</mdui-chip>
    <mdui-chip class="ae__item-select-filter-button" filter="fluid" elevated icon="water_drop"
      selected-icon="water_drop">流体</mdui-chip>
    <mdui-chip class="ae__item-select-filter-button" filter="vis" elevated icon="auto_awesome"
      selected-icon="auto_awesome">源质</mdui-chip>
  </div>

  <mdui-text-field style="margin-top: 0.5rem;" class="ae__item-select-storage-filter-search-input"
    label="检索库存..."></mdui-text-field>

  <div style="display: flex;margin-top: 1rem;gap: 0.5rem;margin-bottom: 0.5rem;align-items: center;">
    <mdui-chip class="ae__item-select-storage-filter-craftable-button" elevated icon="settings_suggest"
      selected-icon="settings_suggest">库存/可合成</mdui-chip>
    <mdui-chip class="ae__item-select-storage-filter-sort-button" elevated icon="sort"
      selected-icon="settings_suggest">数量排序 ↓</mdui-chip>
  </div>


  <mdui-card class="ae__item-select-item-list"
    style="display: grid;padding: 0.75rem;grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));gap: 0.25rem;">
  </mdui-card>

  <mdui-card class="ae__item-select-item-list-nothing" style="display: none;padding: 0.75rem;">
    <div style="text-align: center;opacity: 0.5;margin-top: 0.75rem;margin-bottom: 0.75rem;">没有找到符合条件的物品</div>
  </mdui-card>

  <mdui-chip style="margin-top: 0.5rem;" class="ae__item-select-item-list-more-button" elevated
    icon="keyboard_arrow_down" style="padding: 0.5rem;height: auto;">显示更多...</mdui-chip>

  <mdui-button id="ae__item-select-close" style="margin-top: 1.5rem;" variant="outlined" full-width>取消</mdui-button>

</mdui-dialog>`

interface Search {
    craftable: string
    word: string
    sort: string
    type: "all" | "item" | "fluid" | "vis"
    page: number
}

interface returnItem {
    display: string
    name: string
    type: string
    damage: number
    id: number
}

let search: Search = {
    craftable: "all",
    word: "",
    sort: "amount",
    type: "all",
    page: 1
}

let currentAe: aeModel.Ae = {
    uuid: "",
    name: "",
    timeCreated: 0,
    timeUpdated: 0,
    cpus: [],
    items: [],
    levelMaintains: []
}

let resolve: (item: returnItem) => void
let reject: () => void

export function init() {
    const dialog = document.getElementById("ae__item-select") as Dialog


    document.getElementById("ae__item-select-close")!.addEventListener("click", () => {
        dialog.open = false
        reject()
    })

    document.querySelectorAll(".ae__item-select-filter-button").forEach(button => {
        button.addEventListener("click", event => {
            search.type = (event.target as HTMLElement).getAttribute("filter")! as "all" | "item" | "fluid" | "vis"
            document.querySelectorAll(".ae__item-select-filter-button").forEach(button => {
                button.removeAttribute("selected")
            });
            (event.target as HTMLElement).setAttribute("selected", "")
            search.page = 1
            renderItemList(currentAe)
        })
    })

    document.querySelector(".ae__item-select-storage-filter-craftable-button")!.addEventListener("click", event => {

        if (search.craftable == "all") {
            search.craftable = "yes"
        } else if (search.craftable == "yes") {
            search.craftable = "no"
        } else if (search.craftable == "no") {
            search.craftable = "all"
        }

        if (search.craftable == "all") {
            (event.target as HTMLElement).innerHTML = "库存 / 可合成"
        } else if (search.craftable == "yes") {
            (event.target as HTMLElement).innerHTML = "仅可合成"
        } else if (search.craftable == "no") {
            (event.target as HTMLElement).innerHTML = "仅库存"
        }

        search.page = 1
        renderItemList(currentAe)
    })

    document.querySelector(".ae__item-select-storage-filter-sort-button")!.addEventListener("click", event => {

        if (search.sort == "amount") {
            search.sort = "amountr"
        } else if (search.sort == "amountr") {
            search.sort = "id"
        } else if (search.sort == "id") {
            search.sort = "idr"
        } else if (search.sort == "idr") {
            search.sort = "amount"
        }

        if (search.sort == "amount") {
            (event.target as HTMLElement).innerHTML = "数量排序 ↓"
        } else if (search.sort == "amountr") {
            (event.target as HTMLElement).innerHTML = "数量排序 ↑"
        } else if (search.sort == "id") {
            (event.target as HTMLElement).innerHTML = "ID 排序 ↓"
        } else if (search.sort == "idr") {
            (event.target as HTMLElement).innerHTML = "ID 排序 ↑"
        }

        search.page = 1
        renderItemList(currentAe)
    })

    document.querySelector(".ae__item-select-storage-filter-search-input")!.addEventListener("input", throttle(event => {
        search.word = event.target.value
        search.page = 1
        renderItemList(currentAe)
    }, 100))

    document.querySelector(".ae__item-select-item-list-more-button")!.addEventListener("click", _event => {
        search.page += 1
        renderItemList(currentAe)
    })
}

export function selectItem(ae: aeModel.Ae) {
    console.log("trigger")
    const dialog = document.getElementById('ae__item-select') as Dialog
    dialog.open = true
    search.word = "";
    (document.querySelector(".ae__item-select-storage-filter-search-input")! as HTMLInputElement).value = ""
    currentAe = ae
    renderItemList(ae)
    return new Promise((res: (item: returnItem) => void, rej: () => void) => {
        resolve = res
        reject = rej
    })
}

function renderItemList(ae: aeModel.Ae) {
    const dialog = document.getElementById('ae__item-select') as Dialog
    const itemsPerPage = 20

    let _ = ""

    const targetElement = dialog.querySelector(".ae__item-select-item-list") as HTMLElement
    const targetElementNothing = dialog.querySelector(".ae__item-select-item-list-nothing") as HTMLElement
    const targetElementShowMore = dialog.querySelector(".ae__item-select-item-list-more-button") as HTMLElement

    const itemListFiltered = ae.items.filter((item: aeModel.AeItem) => {
        if (search.type === "all") {
            return true
        } else if (search.type === "item") {
            if (item.type == "item") {
                return true
            } else {
                return false
            }
        } else if (search.type === "fluid") {
            if (item.type == "fluid") {
                return true
            } else {
                return false
            }
        } else if (search.type === "vis") {
            // TODO: VIS 过滤实现
            return false
        }
    }).filter((item: aeModel.AeItem) => {
        if (search.craftable === "all") {
            return true
        } else {
            if (item.craftable) {
                return true
            } else {
                return false
            }
        }
    }).filter((item: aeModel.AeItem) => {
        if (search.word === "") {
            return true
        } else if (search.word[0] == "@") {
            const modName = search.word.slice(1)
            if (item.name.split(":")[0].toLocaleLowerCase().includes(modName.toLocaleLowerCase())) {
                return true
            } else {
                return false
            }

        }
        if (item.display == undefined) { item.display = "" }
        else if (pinyinPro.match(item.display, search.word)
            || item.name.toLocaleLowerCase().includes(search.word.toLocaleLowerCase())
            || String(item.id) == search.word
        ) {
            return true
        } else {
            return false
        }
    }).sort((a: aeModel.AeItem, b: aeModel.AeItem) => {
        if (search.sort === "amount") {
            return b.amount - a.amount
        } else if (search.sort === "amountr") {
            return a.amount - b.amount
        } else if (search.sort === "id") {
            return b.id - a.id
        } else if (search.sort === "idr") {
            return a.id - b.id
        } else {
            return 0
        }
    })

    const itemListFilteredSliced = itemListFiltered.slice(0, search.page * itemsPerPage)

    let unrenderedItemsAmount: number

    if (itemListFiltered.length > search.page * itemsPerPage) {
        targetElementShowMore.style["display"] = "block"
        unrenderedItemsAmount = itemListFiltered.length - (search.page * itemsPerPage)
    } else {
        targetElementShowMore.style["display"] = "none"
        unrenderedItemsAmount = 0
    }

    if (itemListFilteredSliced.length === 0) {
        targetElementNothing.style["display"] = "block"
        targetElement.style["display"] = "none"
    } else {
        targetElementNothing.style["display"] = "none"
        targetElement.style["display"] = "grid"

        itemListFilteredSliced.forEach((item) => {

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
                <div class="hover-highlight ae__item-select-item-list-item" style="position: relative;cursor: pointer;" id="${item.id}" damage="${item.damage ? item.damage : 0}" type="${type}" display="${item.display}" name="${item.name}" craftable="${item.craftable ? 1 : 0}" amount="${item.amount}">
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

    dialog.querySelectorAll(".ae__item-select-item-list-item")!.forEach((item) => {
        item.addEventListener("click", (_event) => {
            const name = item.getAttribute("name")!
            const id = Number(item.getAttribute("id")!)
            const damage = Number(item.getAttribute("damage")!)
            const type = item.getAttribute("type")!
            const display = item.getAttribute("display")!
            dialog.open = false
            resolve({ name, type, damage, id, display })

        })
    })
}
