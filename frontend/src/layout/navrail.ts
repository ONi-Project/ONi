import { ListItem, setTheme, type NavigationDrawer } from 'mdui'
import 'mdui/components/navigation-drawer.js'
import 'mdui/components/navigation-rail-item.js'
import 'mdui/components/navigation-rail.js'
import { isMobileDevice } from '../utils'

export const html = /*html*/`
<div id="navi-drawer">

  <!-- <img id="navi-drawer-bg" src="resources/icon.png" /> -->

  <data hidden debugMode="<%= debugMode %>"></data>

</div>
`

const railItems = ["overview", "event", "control", "ae", "bot", "stat", "tool", "setting"]
const railItemsDisplay = ["看板", "事件", "控制", "AE", "BOT", "统计", "工具", "设置"]
const railItemsIcon = ["home--outlined", "crisis_alert", "tune--outlined", "grid_on--outlined", "adb--outlined", "insert_chart--outlined", "build--outlined", "settings--outlined"]

let folded = true
let drawerOpen = false

export function init() {

  (document.getElementById("navi-drawer")! as NavigationDrawer).open = true

  const drawer = document.getElementById("navi-drawer")!

  railItems.reverse()
  railItemsDisplay.reverse()
  railItemsIcon.reverse()

  railItems.forEach((item, i) => {
    const node = document.createElement("mdui-list-item")
    node.setAttribute("rounded", "")
    node.id = `rail-${item}`
    node.icon = `${railItemsIcon[i]}`
    // node.headline = railItemsDisplay[i]

    if (item == "setting") {
      node.style.marginTop = "auto"
      node.style.marginBottom = "12px"
    }

    drawer.insertBefore(node, drawer.firstChild)

  })

  railItems.reverse()
  railItemsDisplay.reverse()
  railItemsIcon.reverse()

  folded = true

  function hideAll() {
    railItems.forEach(item => {
      document.getElementById(`${item}__content`)!.setAttribute("hidden", "true")
    })
  }

  railItems.forEach(item => {

    document.getElementById(`rail-${item}`)!.addEventListener("click", () => {
      hideAll()
      // toggleLeftNavi(false)

      document.getElementById(`${item}__content`)!.removeAttribute("hidden")
      document.getElementById("navi-label")!.innerText = railItemsDisplay[railItems.indexOf(item)]
      document.getElementById("main-content-area")!.scrollTo({ top: 0 })

      railItems.forEach(item => {
        (document.getElementById(`rail-${item}`)! as ListItem).active = false
      });

      (document.getElementById(`rail-${item}`)! as ListItem).active = true

    })

  })



  // 导轨双方案切换
  if (isMobileDevice()) {
    console.log("移动端布局")

    toggleFold(false)

    const drawer = document.getElementById("navi-drawer")!

    drawer.style.position = "fixed"
    drawer.style.left = "-152px"
    drawer.style.zIndex = "100"

    const dim = document.getElementById("navrail-dim")!
    dim.addEventListener("click", () => {
      toggleDrawer(false)
    })

    railItems.forEach(item => {
      document.getElementById(`rail-${item}`)!.addEventListener("click", () => {
        toggleDrawer(false)
      })
    })

  }


  document.getElementById(`rail-${railItems[0]}`)!.click()

  // 深色模式
  // const buttonDarkMode = document.getElementById("buttonDarkMode")! as Button
  const darkMode = localStorage.getItem('darkMode')
  if (darkMode === 'true' || (darkMode === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {

    // buttonDarkMode.icon = "light_mode"
    setTheme("dark")
  }

  // buttonDarkMode.addEventListener("click", () => {

  //   if (getTheme() == "light") {
  //     buttonDarkMode.icon = "light_mode"
  //     localStorage.setItem('darkMode', 'true')
  //     setTheme("dark")
  //   } else {
  //     buttonDarkMode.icon = "dark_mode"
  //     localStorage.setItem('darkMode', 'false')
  //     setTheme("light")
  //   }
  // })

  // 自定义配色
  // const colorPicker = document.getElementById("colorPicker") as HTMLInputElement
  // const color = localStorage.getItem("customColor")!
  // if (color != undefined) {
  //   setColorScheme(color)
  // }
  // colorPicker.addEventListener('input', function () {
  //   setColorScheme(colorPicker.value)
  //   localStorage.setItem("customColor", colorPicker.value)
  // })
  // document.getElementById("buttonColor")!.addEventListener("click", () => {
  //   colorPicker.click()
  // })

}

// 切换左侧导航栏的显示状态（移动端布局）
export function toggleDrawer(tf?: boolean) {
  if (typeof tf === "undefined") { tf = !drawerOpen }
  const dim = document.getElementById("navrail-dim")!
  const drawer = document.getElementById("navi-drawer")!
  if (tf) {
    drawer.style.left = "0"
    dim.style.opacity = "1"
    dim.style.pointerEvents = "auto"
  } else {
    drawer.style.left = "-152px"
    dim.style.opacity = "0"
    dim.style.pointerEvents = "none"
  }
  drawerOpen = tf
}

// 切换左侧导航栏的折叠状态（桌面端布局）
export function toggleFold(tf?: boolean) {
  if (typeof tf === "undefined") { tf = !folded }
  if (tf) {
    railItems.forEach(item => {
      (document.getElementById(`rail-${item}`)! as ListItem).headline = ""
    })
    document.getElementById("navi-drawer")!.style.minWidth = "56px"
    document.getElementById("navi-drawer")!.style.width = "56px"
  } else {
    setTimeout(() => {
      railItems.forEach((item, i) => {
        (document.getElementById(`rail-${item}`)! as ListItem).headline = railItemsDisplay[i]
      })
    }, 100)
    document.getElementById("navi-drawer")!.style.minWidth = "140px"
    document.getElementById("navi-drawer")!.style.width = "140px"
  }
  folded = tf
}