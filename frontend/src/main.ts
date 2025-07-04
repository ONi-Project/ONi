import * as layoutNavrail from "./layout/navrail"
import * as layoutTopbar from "./layout/topbar"
import * as layoutBg from "./layout/bg"

import * as contentOverview from "./content/overview"
import * as contentEvent from "./content/event"
import * as contentControl from "./content/control"
import * as contentAe from "./content/ae"
import * as contentBot from "./content/bot"
import * as contentStat from "./content/stat"
import * as contentTool from "./content/tool"
import * as contentDebug from "./content/debug"
import * as contentSetting from "./content/setting"

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

const html = /*html*/`

${layoutTopbar.html}

<div style="display: flex;width: 100dvw;height: calc(100dvh - 4rem);">

  ${layoutNavrail.html}

  <div id="navrail-dim"></div>

  <div style="overflow: hidden;width: 100%;">

    <div id="main-content-area" style="width: 100%;height: 100%;overflow: auto;">

      ${contentOverview.html}
      ${contentEvent.html}
      ${contentControl.html}
      ${contentAe.html}
      ${contentBot.html}
      ${contentStat.html}
      ${contentTool.html}
      ${contentSetting.html}

    </div>

    ${layoutBg.html}

  </div>

</div>

<div class="tooltip" id="tooltip-ae"></div>

${dialogAeOrder.html}
${dialogAeItemInfo.html}
${dialogBotTask.html}
${dialogLogin.html}
${dialogSettings.html}

`

document.getElementById("app")!.innerHTML = html

layoutNavrail.init()
layoutTopbar.init()
layoutBg.init()

contentOverview.init()
contentEvent.init()
contentControl.init()
contentAe.init()
contentBot.init()
contentStat.init()
contentTool.init()
contentSetting.init()

dialogAeOrder.init()
dialogAeItemInfo.init()
dialogBotTask.init()
dialogLogin.init()
dialogSettings.init()

settings.init()
websocket.init()
global.init()
