import { mcServerStatus } from "../global"
import { eventEmitter } from "../websocket"

export function html(_config: any) {
    return /*html*/`
<mdui-card variant="filled" class="card card-server-status__card">

  <div style="display: flex;align-items: center;">
    <div style="font-size: larger;"><b>服务器状态</b></div>
    <div style="opacity: 0.5;">&nbsp;@&nbsp;</div>
    <div style="opacity: 0.5;" class="card-server-status__ip"></div>
  </div>

  <div style="display: flex;align-items: center;">
    <mdui-icon name="bolt"></mdui-icon>
    &nbsp;
    <div class="card-server-status__status" style="font-weight: bold;">运行正常</div>
    &nbsp;
    <div class="card-server-status__online-players" style="opacity: 0.5;">(0/1)</div>
  </div>

  <div style="display: flex;align-items: center;">
    <mdui-icon name="engineering"></mdui-icon>
    &nbsp;
    <div><b>在线员工：</b><span class="card-server-status__players-list">Akyuu</span></div>
  </div>

  <div style="display: flex;align-items: center;">
    <div class="card-server-status__motd" style="opacity: 0.25;font-size: smaller;">GT New Horizons
    </div>
  </div>

</mdui-card>
`}

export function init() {
    // 卡片更新监听事件
    eventEmitter.addEventListener("message", async (event: any) => {
        const { type, data } = event.data
        if (type == "update/mcServerStatus") {
            document.querySelectorAll(".card-server-status__card").forEach(element => {

                const { ip, online, motd, players } = data

                // 更新文本
                element.querySelector(".card-server-status__status")!.innerHTML = online ? "运行正常" : "服务器离线"
                element.querySelector(".card-server-status__motd")!.innerHTML = motd
                element.querySelector(".card-server-status__online-players")!.innerHTML = `(${players.online}/${players.max})`
                element.querySelector(".card-server-status__players-list")!.innerHTML = players.list ? players.list.map((player: any) => player.name).join(", ") : "无"

                ip
            })
        }
    })

    // 初始化卡片
    document.querySelectorAll(".card-server-status__card").forEach(element => {

        const { ip, online, motd, players } = mcServerStatus

        // 更新文本
        element.querySelector(".card-server-status__ip")!.innerHTML = ip
        element.querySelector(".card-server-status__status")!.innerHTML = online ? "运行正常" : "服务器离线"
        element.querySelector(".card-server-status__motd")!.innerHTML = motd
        element.querySelector(".card-server-status__online-players")!.innerHTML = `(${players.online}/${players.max})`
        element.querySelector(".card-server-status__players-list")!.innerHTML = players.list ? players.list.map((player: any) => player.name).join(", ") : "无"

    })
}