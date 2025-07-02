import { eventEmitter } from "../websocket"
import { layoutModel } from "@oni/interface"

export const html = /*html*/`<div id="event__content" class="panel-content">

    <div
        style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
        <mdui-text-field variant="outlined" icon="search" label="搜索事件..."></mdui-text-field>
    </div>
    <div>
        <mdui-chip selectable icon="info">通知</mdui-chip>
        <mdui-chip selectable icon="warning">警告</mdui-chip>
        <mdui-chip selectable icon="dangerous">紧急</mdui-chip>
    </div>


    <div style="margin-top: 1rem;display: flex;flex-direction: column;gap: 0.5rem;">

        <mdui-card variant="filled" class="card event__card event__card-info">
            <div style="display: flex;align-items: center;gap: 1rem;">
                <div>
                    <mdui-icon name="info"></mdui-icon>
                </div>
                <div>
                    <div>
                        Title Here
                    </div>
                    <div style="font-size: small;opacity: 0.5;">
                        Description Here
                    </div>
                    <div style="opacity: 0.25;font-size: small;">2025-01-01 12:00:00</div>
                </div>
                <mdui-checkbox style="margin-left: auto;"></mdui-checkbox>
            </div>
        </mdui-card>

        <mdui-card variant="filled" class="card event__card event__card-warning">
            <div style="display: flex;align-items: center;gap: 1rem;">
                <div>
                    <mdui-icon name="warning"></mdui-icon>
                </div>
                <div>
                    <div>
                        Title Here
                    </div>
                    <div style="font-size: small;opacity: 0.5;">
                        Description Here
                    </div>
                    <div style="opacity: 0.25;font-size: small;">2025-01-01 12:00:00</div>
                </div>
                <mdui-checkbox style="margin-left: auto;"></mdui-checkbox>
            </div>
        </mdui-card>

        <mdui-card variant="filled" class="card event__card event__card-dangerous">
            <div style="display: flex;align-items: center;gap: 1rem;">
                <div>
                    <mdui-icon name="dangerous"></mdui-icon>
                </div>
                <div>
                    <div>
                        Title Here
                    </div>
                    <div style="font-size: small;opacity: 0.5;">
                        Description Here
                    </div>
                    <div style="opacity: 0.25;font-size: small;">2025-01-01 12:00:00</div>
                </div>
                <mdui-checkbox style="margin-left: auto;"></mdui-checkbox>
            </div>
        </mdui-card>

        <mdui-card variant="filled" class="card event__card event__card-inactive">
            <div style="display: flex;align-items: center;gap: 1rem;">
                <div>
                    <mdui-icon name="info"></mdui-icon>
                </div>
                <div>
                    <div>
                        Title Here
                    </div>
                    <div style="font-size: small;opacity: 0.5;">
                        Description Here
                    </div>
                    <div style="opacity: 0.25;font-size: small;">2025-01-01 12:00:00</div>
                </div>
                <mdui-checkbox style="margin-left: auto;" checked></mdui-checkbox>
            </div>
        </mdui-card>

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

export function init() {
    eventEmitter.on("message", m => {

        // if (isDataEventInit(m)) {
        //     let layout: layoutModel.Layout = [{
        //         type: m.data.length == 0 ? "grid-full" : "grid-full",
        //         content: []
        //     }]
        //     m.data.forEach(event => {
        //         layout[0].content.push({
        //             type: "card",
        //             id: "event",
        //             config: {
        //                 uuid: event.uuid,
        //                 title: event.name,
        //                 description: event.description,
        //                 priority: event.priority,
        //                 status: event.status,
        //                 timestamp: event.timestamp
        //             }
        //         })
        //     })

        //     if (layout[0].content.length == 0) {
        //         layout[0].content.push({
        //             type: "card",
        //             id: "no-event",
        //             config: {}
        //         })
        //     }

        //     renderLayout(layout, document.getElementById("event__content")!)
        // }
    })
}