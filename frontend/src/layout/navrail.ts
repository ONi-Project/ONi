import 'mdui/components/navigation-rail.js'
import 'mdui/components/navigation-rail-item.js'
import 'mdui/components/navigation-drawer.js'
import { getTheme, setColorScheme, setTheme, type Button, type NavigationRail, type NavigationDrawer } from 'mdui'

export const html = /*html*/`
<mdui-navigation-drawer id="navi-drawer" placement="right" modal close-on-esc close-on-overlay-click>
  <mdui-navigation-rail id="navi-rail" placement="right" divider>

    <!-- 深色模式切换 -->
    <mdui-button-icon slot="bottom" id="buttonDarkMode" icon="dark_mode">
    </mdui-button-icon>

    <!-- 设置配色 -->
    <mdui-button-icon slot="bottom" id="buttonColor" icon="color_lens">

    </mdui-button-icon>
    <input type="color" id="colorPicker" hidden>

    <!-- 设置 -->
    <mdui-button-icon slot="bottom" id="buttonSettings" icon="settings">
    </mdui-button-icon>

    <img id="navi-rail-bg" src="resources/icon.png" />


  </mdui-navigation-rail>

  <style>
    #navi-rail-bg {
      position: absolute;
      bottom: -80px;
      right: -90px;
      width: 200px;
      height: 200px;
      opacity: 0.2;
      filter: grayscale(100%);
    }

    #navi-rail {
      overflow: hidden;
    }
  </style>

  <data hidden debugMode="<%= debugMode %>"></data>

</mdui-navigation-drawer>
`

export function init() {

  let debugMode = "false"

  let railItems = ["overview", "event", "control", "ae", "bot", "stat", "debug"]
  let railItemsDisplay = ["总览", "事件", "控制", "AE", "BOT", "统计", "调试"]
  let railItemsIcon = ["home--outlined", "crisis_alert", "tune--outlined", "grid_on--outlined", "adb--outlined", "insert_chart--outlined", "terminal--outlined"]

  if (debugMode == "true") {
    railItems.push("debug")
    railItemsDisplay.push("调试")
    railItemsIcon.push("terminal--outlined")
  }

  const rail = document.getElementById("navi-rail")
  railItems.forEach((item, i) => {
    const node = document.createElement("mdui-navigation-rail-item")
    node.id = `rail-${item}`
    node.icon = `${railItemsIcon[i]}`
    node.innerHTML = railItemsDisplay[i]
    if (rail) {
      rail.appendChild(node)
    } else {
      console.error("navrail init error")
    }
  })

  function hideAll() {
    railItems.forEach(item => {
      document.getElementById(`${item}__content`)!.setAttribute("hidden", "true")
    })
  }

  railItems.forEach(item => {

    document.getElementById(`rail-${item}`)!.addEventListener("click", () => {
      hideAll()
      toggleLeftNavi(false)

      document.getElementById(`${item}__content`)!.removeAttribute("hidden")
      document.getElementById("navi-label")!.innerText = railItemsDisplay[railItems.indexOf(item)]
      document.getElementById("main-content-area")!.scrollTo({ top: 0 })

    })

  })

  // 导轨双方案切换
  if (window.innerWidth / window.innerHeight > 0.7) {
    console.log("横屏")

    const drawer = document.getElementById("navi-drawer") as NavigationDrawer
    const rail = document.getElementById("navi-rail") as NavigationRail

    drawer.removeChild(rail)
    drawer.parentNode!.insertBefore(rail, drawer)

    document.getElementById("navi-toggler")!.style["display"] = "none"
    rail.placement = "left"
  }

  setTimeout(() => {
    document.getElementById(`rail-${railItems[0]}`)!.click()
  }, 100)

  // 深色模式
  const buttonDarkMode = document.getElementById("buttonDarkMode")! as Button
  const darkMode = localStorage.getItem('darkMode')
  if (darkMode === 'true' || (darkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

    buttonDarkMode.icon = "light_mode"
    setTheme("dark")
  }

  buttonDarkMode.addEventListener("click", () => {

    if (getTheme() == "light") {
      buttonDarkMode.icon = "light_mode"
      localStorage.setItem('darkMode', 'true')
      setTheme("dark")
    } else {
      buttonDarkMode.icon = "dark_mode"
      localStorage.setItem('darkMode', 'false')
      setTheme("light")
    }
  })

  // 自定义配色
  const colorPicker = document.getElementById("colorPicker") as HTMLInputElement
  const color = localStorage.getItem("customColor")!
  if (color != undefined) {
    setColorScheme(color)
  }
  colorPicker.addEventListener('input', function () {
    setColorScheme(colorPicker.value)
    localStorage.setItem("customColor", colorPicker.value)
  })
  document.getElementById("buttonColor")!.addEventListener("click", () => {
    colorPicker.click()
  })

}

// 切换左侧导航栏的显示状态
export function toggleLeftNavi(tf?: boolean) {
  const e = document.getElementById("navi-drawer") as NavigationDrawer

  if (typeof tf === "undefined") {
    e.open = !e.open
  } else {
    e.open = tf
  }

}