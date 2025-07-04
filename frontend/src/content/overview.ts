import { wsServerToWebGuard } from "@oni/interface"
import { renderLayout } from "../renderer"
import { eventEmitter } from "../websocket"
import { setEndpoint, setToken } from "../settings"

export const html = /*html*/`<div id="overview__content" class="panel-content">
  
  <div id="overview__loading" style="display: flex;flex-direction: column;align-items: center;margin-top: 35%;">
    <div class="animate__animated animate__fadeInUp animate__faster" style="margin: 2rem;width: 25rem;max-width: 90%;text-align: center;">
      <div style="font-size: larger;text-align: center;margin-bottom: 1rem;opacity: 0.75;">
        少女祈祷中...
      </div>
      <mdui-circular-progress></mdui-circular-progress>
      <div class="animate__animated animate__fadeIn animate__faster" id="overview__loading-timeout" style="display: none;margin-top: 2rem;">
        <div style="font-size: small;opacity: 0.5;">加载耗时似乎比预期长，可以尝试以下操作：</div>
        <mdui-button id="overview__loading-timeout-clear" full-width style="margin-top: 0.5rem;">重新填写凭证</mdui-button>
      </div>
    </div>
  </div>


</div>`

export function init() {
  eventEmitter.on("message", m => {
    if (wsServerToWebGuard.isLayoutOverview(m)) {
      renderLayout(m.data, document.getElementById("overview__content")!)
    }
  })

  document.getElementById("overview__loading-timeout-clear")!.addEventListener("click", () => {
    setEndpoint("")
    setToken("")
    location.reload()
  })

  setTimeout(() => {
    let tips = document.getElementById("overview__loading-timeout")
    if (tips) {
      tips.style.display = "block"
    }
  }, 5000)
}