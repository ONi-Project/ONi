import { Ae, Config } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { wsWebBroadcast } from "../websocket.js"
import { deepEqual, performanceTimer } from "../utils.js"
import Global from "./index.js"

var ae = {
    // AE 列表
    list: [] as Ae[],

    getListLayout() {
        let content: any = []

        this.list.forEach(ae => {
            content.push({
                type: "card",
                id: "ae-overview",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            })
        })

        let _ = [{
            type: "grid-m",
            content: content
        }]

        return _
    },

    getEditLayout() {
        let content: any = []

        this.list.forEach(ae => {
            content.push({
                type: "tab",
                id: "ae-edit",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            })
        })

        let _ = [{
            type: "raw",
            content: content
        }]

        return _
    },

    getViewLayout() {
        let content: any = []

        this.list.forEach(ae => {
            content.push({
                type: "tab",
                id: "ae-view",
                config: {
                    uuid: ae.uuid,
                    name: ae.name,
                }
            })
        })

        let _ = [{
            type: "raw",
            content: content
        }]

        return _
    },

    cpus: {
        set(uuid: string, cpus: any) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                cpus.forEach((cpu: any) => {
                    if (cpu.busy && cpu.finalOutput) {
                        const itemPanelItem = Global.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == cpu.finalOutput.name) && (itemPanelItem.damage == cpu.finalOutput.damage))
                        const itemPanelFluid = Global.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == cpu.finalOutput.name)
                        if (itemPanelItem) {
                            cpu.finalOutput.id = itemPanelItem.id
                            cpu.finalOutput.display = itemPanelItem.display
                        } else if (itemPanelFluid) {
                            cpu.finalOutput.id = itemPanelFluid.id
                            cpu.finalOutput.display = itemPanelFluid.display
                        } else {
                            logger.warn(`Item/Fluid ${cpu.finalOutput.name} not found in staticResources.itemPanel`)
                        }
                    }
                })
                targetAe.cpus = cpus
                ae.cpus.update(uuid)
            }
        },
        update(uuid: string) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                targetAe.timeUpdated = new Date().getTime()
                wsWebBroadcast("data/ae/set", targetAe)
            }
        }
    },

    itemList: {
        set(uuid: string, itemList: any) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                performanceTimer("ae.itemList.set", () => {
                    itemList = itemList.filter((item: any) => item.name !== "ae2fc:fluid_drop")
                    itemList.forEach((item: any, index: number) => {
                        if (item.type === "item" || item.type === "fluid") {
                            const resourceType = item.type === "item" ? Global.staticResources.itemPanelItemMap : Global.staticResources.itemPanelFluidMap
                            const resource = resourceType.get(item.type === "item" ? item.name + "/" + item.damage : item.name)
                            if (resource) {
                                item.id = resource.id
                                item.display = resource.display
                            } else {
                                logger.warn(`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.name} not found in staticResources.itemPanel`)
                            }
                        } else if (item.type === "vis") {
                            // TODO: 处理 vis 类型
                        } else {
                            logger.error(`Unknown item type ${item.type}`)
                        }
                    })
                    targetAe.itemList = itemList
                })
                ae.itemList.update(uuid)
            }
        },
        update(uuid: string) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                targetAe.timeUpdated = new Date().getTime()
                wsWebBroadcast("data/ae/set", targetAe)
            }
        }
    },

    init(config: Config) {
        try {
            this.list = JSON.parse(fs.readFileSync('./data/ae/ae.json', 'utf8'))
            logger.debug("ae", "Json initialized successfully.")
            logger.trace("ae", this.list)
        } catch (e) {
            logger.error("ae", "Json initialization failed.")
            logger.error("ae", e)
        }
    }
}

export default ae