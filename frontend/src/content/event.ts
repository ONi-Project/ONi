import { eventEmitter, send } from "../websocket"
import { eventModel, layoutModel, newWebToServerMessage, wsServerToWebGuard } from "@oni/interface"
import * as global from "../global"
import { Chip } from "mdui"

export const html = /*html*/`<div id="event__content" class="panel-content">

    <div style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
        <mdui-text-field variant="outlined" icon="search" label="搜索事件..."></mdui-text-field>
    </div>

    <div style="margin-left: 0.25rem;">

        <div style="margin-bottom: 0.25rem;">
            <mdui-icon name="filter_list" style="opacity: 0.5;font-size: small"></mdui-icon>
            <span style="font-size: small;opacity: 0.5;">状态过滤器</span>
        </div>

        <mdui-chip id="event__filter-status-all" selected selectable selected-icon="all_inclusive"
            icon="all_inclusive">全部</mdui-chip>
        <mdui-chip id="event__filter-status-active" selectable selected-icon="clear" icon="clear">未处理</mdui-chip>
        <mdui-chip id="event__filter-statis-inactive" selectable selected-icon="done" icon="done">已处理</mdui-chip>


    </div>

    <div style="margin-left: 0.25rem;margin-top: 0.5rem;">
        <div style="margin-bottom: 0.25rem;">
            <mdui-icon name="filter_list" style="opacity: 0.5;font-size: small"></mdui-icon>
            <span style="font-size: small;opacity: 0.5;">级别过滤器</span>
        </div>

        <mdui-chip id="event__filter-priority-info" selected selectable selected-icon="info" icon="info">通知</mdui-chip>
        <mdui-chip id="event__filter-priority-warning" selected selectable selected-icon="warning"
            icon="warning">警告</mdui-chip>
        <mdui-chip id="event__filter-priority-dangerous" selected selectable selected-icon="dangerous"
            icon="dangerous">紧急</mdui-chip>
    </div>


    <div id="event__list" style="margin-top: 1rem;display: flex;flex-direction: column;gap: 0.5rem;">

    </div>

    <style>
        .event__card {
            padding: 1rem;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        .event__card-info {
            /* background-color: #88888840 !important; */
        }

        .event__card-warning {
            background-color: rgba(var(--mdui-color-secondary-container), 0.75) !important;
        }

        .event__card-dangerous {
            background-color: rgba(var(--mdui-color-tertiary-container), 0.75) !important;
        }

        .event__card-inactive {
            opacity: 0.5;
        }
    </style>
</div>`

interface Filter {
    priority: (0 | 1 | 2)[],
    status: "all" | "active" | "inactive"
}

let filter = {
    priority: [0, 1, 2],
    status: "all"
}

export function init() {
    const elementStatusAll = document.getElementById("event__filter-status-all") as Chip
    const elementStatusActive = document.getElementById("event__filter-status-active") as Chip
    const elementStatusInactive = document.getElementById("event__filter-statis-inactive") as Chip

    const elementPriorityInfo = document.getElementById("event__filter-priority-info") as Chip
    const elementPriorityWarning = document.getElementById("event__filter-priority-warning") as Chip
    const elementPriorityDangerous = document.getElementById("event__filter-priority-dangerous") as Chip

    elementStatusAll.addEventListener("click", () => {
        elementStatusActive.selected = false
        elementStatusInactive.selected = false
        filter.status = "all"
        update()
    })
    elementStatusActive.addEventListener("click", () => {
        elementStatusAll.selected = false
        elementStatusInactive.selected = false
        filter.status = "active"
        update()
    })
    elementStatusInactive.addEventListener("click", () => {
        elementStatusAll.selected = false
        elementStatusActive.selected = false
        filter.status = "inactive"
        update()
    })

    elementPriorityInfo.addEventListener("click", (e) => {
        if ((e.target as Chip).selected == false) {
            filter.priority.push(0)
        } else {
            filter.priority.splice(filter.priority.indexOf(0), 1)
        }
        update()
    })
    elementPriorityWarning.addEventListener("click", (e) => {
        if ((e.target as Chip).selected == false) {
            filter.priority.push(1)
        } else {
            filter.priority.splice(filter.priority.indexOf(1), 1)
        }
        update()
    })
    elementPriorityDangerous.addEventListener("click", (e) => {
        if ((e.target as Chip).selected == false) {
            filter.priority.push(2)
        } else {
            filter.priority.splice(filter.priority.indexOf(2), 1)
        }
        update()
    })

}

export function update() {

    let events = global.event

    const priorityMap = { 0: "info", 1: "warning", 2: "dangerous" }

    events = events.filter(event => {
        if (filter.priority.includes(event.priority)) {
            if (filter.status === "all" || (filter.status === "active" && event.status === 0) || (filter.status === "inactive" && event.status === 1)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }).sort((a, b) => {
        if (a.status > b.status) {
            return -1
        } else if (a.status < b.status) {
            return 1
        } else {
            return a.timestamp - b.timestamp
        }
    })


    const listElement = document.getElementById("event__list")!

    listElement.innerHTML = ""

    events.forEach(event => {
        let priorityString = priorityMap[event.priority]
        let className
        if (event.status === 0) {
            className = `event__card-${priorityString}`
        } else {
            className = `event__card-inactive`
        }
        const element = document.createElement("div")
        element.innerHTML = /*html*/`
            <mdui-card variant="filled" class="card event__card ${className}">
                <div style="display: flex;align-items: center;gap: 1rem;">
                    <div>
                        <mdui-icon name="${priorityString}"></mdui-icon>
                    </div>
                    <div>
                        <div>
                            ${event.name}
                        </div>
                        <div style="font-size: small;opacity: 0.5;">
                            ${event.description}
                        </div>
                        <div style="opacity: 0.25;font-size: small;">${new Date(event.timestamp).toLocaleString()}</div>
                    </div>
                    <mdui-checkbox ${event.status === 1 ? "checked" : ""} style="margin-left: auto;"></mdui-checkbox>
                </div>
            </mdui-card>
        `
        listElement.insertBefore(element, listElement.firstChild)
        element.querySelector("mdui-checkbox")!.addEventListener("change", (e) => {
            send(newWebToServerMessage("DataEventSet", { uuid: event.uuid, status: (e.target as HTMLInputElement).checked ? 1 : 0 }))
        })
    })
}