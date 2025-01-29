import * as layoutNavrail from "./layout/navrail"
import * as layoutTopbar from "./layout/topbar"
import * as layoutBg from "./layout/bg"

import * as contentOverview from "./content/overview"
import * as contentEvent from "./content/event"
import * as contentControl from "./content/control"
import * as contentAe from "./content/ae"
import * as contentBot from "./content/bot"
import * as contentStat from "./content/stat"
import * as contentDebug from "./content/debug"

import * as dialogAeOrder from "./dialog/ae-order"
import * as dialogAeItemInfo from "./dialog/ae-item-info"
import * as dialogBotTask from "./dialog/bot-task"
import * as dialogLogin from "./dialog/login"
import * as dialogSettings from "./dialog/settings"

import * as settings from "./settings"
import * as websocket from "./websocket"
import * as global from "./global"

import "mdui/mdui.css"
import "./style.css"

const debugMode = true

const html = /*html*/`

<div>
  ${layoutNavrail.html}
</div>

<div style="overflow: hidden;position: relative; ">

  ${layoutTopbar.html}

<div id="main-content-area" style="height: calc(100dvh - 7rem);overflow: auto;">

  ${contentOverview.html}
  ${contentEvent.html}
  ${contentControl.html}
  ${contentAe.html}
  ${contentBot.html}
  ${contentStat.html}
  ${debugMode ? contentDebug.html : ""}

</div>

${layoutBg.html}

</div>

${dialogAeOrder.html}
${dialogAeItemInfo.html}
${dialogBotTask.html}
${dialogLogin.html}
${dialogSettings.html}

`

document.body.innerHTML = html

layoutNavrail.init()
layoutTopbar.init()
layoutBg.init()

contentOverview.init()
contentEvent.init()
contentControl.init()
contentAe.init()
contentBot.init()
contentStat.init()
contentDebug.init()

dialogAeOrder.init()
dialogAeItemInfo.init()
dialogBotTask.init()
dialogLogin.init()
dialogSettings.init()

settings.init()
websocket.init()
global.init()

// 样式注入
window.onload = function () {
  // 顶栏
  const e1 = document.querySelector("mdui-top-app-bar-title")!
  const sr = e1.shadowRoot!

  sr.children[0].classList.replace("variant-small", "variant-medium")
  sr.children[1].classList.replace("variant-small", "variant-medium")

  // 侧边栏
  const e2 = document.getElementById("navi-drawer")!
  let s2 = document.createElement('style')
  s2.innerHTML = `
      .panel {
      height: 100% !important;
      width: 5.0625rem !important;
      }
  `
  e2.appendChild(s2)
}
