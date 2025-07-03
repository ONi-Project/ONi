import { Config } from "../interface"
import fs from "fs"
import { loggerGlobal as logger } from "../logger"
import { wsWebBroadcast } from "../websocket"
import { deepEqual, performanceTimer } from "../utils"
import Global from "./index"
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
                targetAe.items = itemList
                ae.items.update(targetAe)
            } else {
                logger.warn("ae.items.set", "Ae not found.")
            }
        },
        update(ae: aeModel.Ae) {
            ae.timeUpdated = new Date().getTime()
            wsWebBroadcast(newServerToWebMessage("DataAeItemsSet", ae))
        }
    },

    levelMaintains: {
        set(uuid: string, levelMaintains: aeModel.AeLevelMaintain[]) {
            let targetAe = ae.list.find(ae => ae.uuid === uuid)
            if (targetAe) {
                targetAe.levelMaintains = levelMaintains
                ae.levelMaintains.update(targetAe)
            } else {
                logger.warn("ae.levelMaintains.set", "Ae not found.")
            }
        },
        update(ae: aeModel.Ae) {
            ae.timeUpdated = new Date().getTime()
            wsWebBroadcast(newServerToWebMessage("DataAeLevelMaintainsSet", ae))
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