import * as layoutNavrail from "./layout/navrail.js"
import * as layoutTopbar from "./layout/topbar.js"
import * as layoutBg from "./layout/bg.js"

import * as contentOverview from "./content/overview.js"
import * as contentEvent from "./content/event.js"
import * as contentControl from "./content/control.js"
import * as contentAe from "./content/ae.js"
import * as contentBot from "./content/bot.js"
import * as contentStat from "./content/stat.js"
import * as contentTool from "./content/tool.js"
import * as contentDebug from "./content/debug.js"
import * as contentSetting from "./content/setting.js"

import * as dialogAeOrder from "./dialog/ae-order.js"
import * as dialogAeItemInfo from "./dialog/ae-item-info.js"
import * as dialogAeItemSelect from "./dialog/ae-item-select.js"
import * as dialogBotTask from "./dialog/bot-task.js"
import * as dialogLogin from "./dialog/login.js"
import * as dialogSettings from "./dialog/settings.js"

import * as settings from "./settings.js"
import * as websocket from "./websocket.js"
import * as global from "./global.js"

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
${dialogAeItemSelect.html}
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
dialogAeItemSelect.init()
dialogBotTask.init()
dialogLogin.init()
dialogSettings.init()

settings.init()
websocket.init()
global.init()
