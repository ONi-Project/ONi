import { isMobileDevice } from "../utils"
import { toggleDrawer, toggleFold } from "./navrail"
import { user } from "../websocket"
import { endpoint } from "../settings"

export const html = /*html*/`
<mdui-top-app-bar scroll-behavior="shrink elevate" scroll-target="#main-content-area" style="position: relative;">

  <mdui-button-icon icon="menu" id="navi-toggler" style="margin-left: 0.5rem;"></mdui-button-icon>

  <img src="resources/icon.png" style="height: 100%; margin-left: 0.5rem; margin-right: 0.5rem;opacity: 0.7;" />

  <mdui-top-app-bar-title>
    <div style="display: flex;flex-direction: row;">
      <div style="font-weight: bolder;">ONi</div>
      &nbsp;
      <mdui-badge>dev</mdui-badge>
    </div>
    <div id="navi-label" slot="label-large" style="font-weight: bold;height: 100%;font-size: 2rem;margin-left: 3rem;opacity: 0.9;"></div>
  </mdui-top-app-bar-title>


  <div style="flex-grow: 1"></div>

  <div style="align-self: center; opacity: 0.2;" id="slogan"></div>


</mdui-top-app-bar>
`

export function init() {

  if (isMobileDevice()) {
    document.getElementById("navi-toggler")!.addEventListener("click", () => {
      toggleDrawer()
    })
  } else {
    document.getElementById("navi-toggler")!.addEventListener("click", () => {
      toggleFold()
    })
  }


}

export function initSlogan() {
  if (!isMobileDevice()) {
    // const slogan = ["豆！豆！痛いよ！", "人間！妖怪！誰でも歓迎！"]
    // elem.innerText = `"${slogan[Math.floor(Math.random() * slogan.length)]}"`

    const elem = document.getElementById("slogan")!
    elem.innerText = `${user.name} @ ${endpoint}`
  }
}