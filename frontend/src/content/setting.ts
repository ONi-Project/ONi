export const html =
/*html*/`<div id="setting__content" class="panel-content" style="height: 100%;" hidden>

    <div style="display: flex;height: 100%;gap: 1rem;">

        <!-- <div style="border-left: 2px solid #ffffff20;margin: 1rem;"></div> -->

        <div id="setting__navi" style="width: 10rem;height: 100%;">
            <mdui-menu style="margin-top: 0rem;border-radius: 0.75rem;">
                <mdui-menu-item icon="brush" rounded>
                    外观
                </mdui-menu-item>
                <mdui-menu-item icon="color_lens" rounded>
                    主题
                </mdui-menu-item>
                <mdui-menu-item icon="account_circle" rounded>
                    账户
                </mdui-menu-item>
            </mdui-menu>
        </div>

        <div style="flex-grow: 1;">


            <mdui-card variant="filled" class="card">
                TEST
            </mdui-card>

        </div>

    </div>

    <style>
        #setting__navi {
            /* background-color: rgb(var(--mdui-color-surface-container-low)); */
        }
    </style>
</div>`
export function init() {

}