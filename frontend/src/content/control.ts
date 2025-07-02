import { layoutModel, wsServerToWebGuard } from "@oni/interface"
import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"

export const html = /*html*/`<div id="control__content" class="panel-content" hidden>
    <div
        style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
        <mdui-text-field variant="outlined" icon="search" label="搜索红石控制器..."></mdui-text-field>
    </div>
    <div id="control__list">
    </div>
</div>`

export function init() {
    eventEmitter.on("message", m => {
        if (wsServerToWebGuard.isDataRedstoneInit(m)) {

            let layout: layoutModel.Layout = [{
                type: "grid-m",
                content: []
            }]

            m.data.forEach(redstone => {
                if (redstone.type == "digital") {
                    layout[0].content.push({
                        type: "card",
                        id: "control-redstone-digital",
                        config: {
                            uuid: redstone.uuid,
                            botUuid: redstone.botUuid,
                            name: redstone.name,
                            description: redstone.description,
                            value: redstone.value,
                            side: redstone.side
                        }
                    })
                } else if (redstone.type == "analog") {
                    layout[0].content.push({
                        type: "card",
                        id: "control-redstone-analog",
                        config: {
                            uuid: redstone.uuid,
                            botUuid: redstone.botUuid,
                            name: redstone.name,
                            description: redstone.description,
                            value: redstone.value,
                            side: redstone.side
                        }
                    })
                }
            })

            renderLayout(layout, document.getElementById("control__list")!)

        }
    })
}