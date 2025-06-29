import { Config } from "../interface.js"
import fs from "fs"
import { loggerGlobal as logger } from "../logger.js"
import { wsWebBroadcast } from "../websocket.js"
import { deepEqual, performanceTimer } from "../utils.js"
import Global from "./index.js"
import { aeModel, aeModelGuard, newServerToWebMessage } from "@oni/interface"
import { layoutModel } from "@oni/interface"

let ae = {
    // AE 列表
    list: [] as aeModel.Ae[],

    get(uuid: string) {
        return this.list.find(ae => ae.uuid === uuid)
    },

    add(ae: aeModel.Ae) {
        this.list.push(ae)
        wsWebBroadcast(newServerToWebMessage("DataAeAdd", ae))
    },

    remove(uuid: string) {
        let index = this.list.findIndex(ae => ae.uuid === uuid)
        if (index >= 0) {
            let ae = this.list[index]
            this.list.splice(index, 1)
            wsWebBroadcast(newServerToWebMessage("DataAeRemove", uuid))
        } else {
            logger.warn("ae.remove", "Ae not found.")
        }
    },

    // getListLayout() {
    //     let content: layoutModel.PageContentElement[] = []

    //     this.list.forEach(ae => {
    //         content.push({
    //             type: "card",
    //             id: "ae-overview",
    //             config: {
    //                 uuid: ae.uuid,
    //                 name: ae.name,
    //             }
    //         })
    //     })

    //     let _ = [{
    //         type: "grid-m",
    //         content: content
    //     }]

    //     return _
    // },

    // getEditLayout() {
    //     let content: layoutModel.PageContentElement[] = []

    //     this.list.forEach(ae => {
    //         content.push({
    //             type: "tab",
    //             id: "ae-edit",
    //             config: {
    //                 uuid: ae.uuid,
    //                 name: ae.name,
    //             }
    //         })
    //     })

    //     let _ = [{
    //         type: "raw",
    //         content: content
    //     }]

    //     return _
    // },

    // getViewLayout() {
    //     let content: layoutModel.PageContentElement[] = []

    //     this.list.forEach(ae => {
    //         content.push({
    //             type: "tab",
    //             id: "ae-view",
    //             config: {
    //                 uuid: ae.uuid,
    //                 name: ae.name,
    //             }
    //         })
    //     })

    //     let _ = [{
    //         type: "raw",
    //         content: content
    //     }]

    //     return _
    // },

    cpus: {
        set(uuid: string, cpus: aeModel.AeCpu[]) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                cpus.forEach((cpu: aeModel.AeCpu) => {
                    if (cpu.busy && cpu.finalOutput) {
                        const finalOutput = cpu.finalOutput
                        const itemPanelItem = Global.staticResources.itemPanelItem.find(itemPanelItem => (itemPanelItem.name == finalOutput.name) && (itemPanelItem.damage == finalOutput.damage))
                        const itemPanelFluid = Global.staticResources.itemPanelFluid.find(itemPanelFluid => itemPanelFluid.name == finalOutput.name)
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
                ae.cpus.update(targetAe)
            }
        },
        update(ae: aeModel.Ae) {
            ae.timeUpdated = new Date().getTime()
            wsWebBroadcast(newServerToWebMessage("DataAeCpusSet", ae))
        }
    },

    items: {
        set(uuid: string, itemList: aeModel.AeItem[]) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                performanceTimer("ae.itemList.set", () => {
                    itemList = itemList.filter((item: aeModel.AeItem) => item.name !== "ae2fc:fluid_drop")
                    itemList.forEach((item: aeModel.AeItem, index: number) => {
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
                    targetAe.items = itemList
                })
                ae.items.update(targetAe)
            }
        },
        update(ae: aeModel.Ae) {
            ae.timeUpdated = new Date().getTime()
            wsWebBroadcast(newServerToWebMessage("DataAeItemsSet", ae))
        }
    },

    save() {
        const MODULE_NAME = "ae.save"
        const FILE_PATH = "./data/ae/ae.json"
        try {
            fs.writeFileSync(FILE_PATH, JSON.stringify(this.list), 'utf8')
            logger.debug(MODULE_NAME, "Json saved successfully.")
        } catch (e) {
            logger.error(MODULE_NAME, "Json save failed.")
            logger.error(MODULE_NAME, e)
        }
    },

    init(config: Config) {
        const MODULE_NAME = "ae.init"
        const FILE_PATH = "./data/ae/ae.json"
        try {
            let json = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'))
            if (aeModelGuard.isAeArray(json)) {
                this.list = json
                logger.debug(MODULE_NAME, "Json initialized successfully.")
                logger.trace(MODULE_NAME, this.list)
            } else {
                logger.error(MODULE_NAME, "Json initialization failed. Invalid data format.")
            }
        } catch (e) {
            logger.error(MODULE_NAME, "Json initialization failed.")
            logger.error(MODULE_NAME, e)
        }
    }
}

export default ae