import { send } from "../websocket"

export function html(config: any) {
  return /*html*/`
${config.priority == 0 && config.status == 0 ? '<mdui-card variant="filled" class="card-compact event__card" style="background-color: rgba(50, 50, 127, 0.5);">' : ''}
${config.priority == 1 && config.status == 0 ? '<mdui-card variant="filled" class="card-compact event__card" style="background-color: rgba(127, 127, 50, 0.5);">' : ''}
${config.priority == 2 && config.status == 0 ? '<mdui-card variant="filled" class="card-compact event__card" style="background-color: rgba(127, 50, 50, 0.5);">' : ''}
${config.status == 1 ? '<mdui-card variant="filled" class="card-compact event__card">' : ''}

  <div style="display: flex;align-items: center;gap: 1rem;margin-top: -0.25rem;">
    ${config.priority == 0 ? '<mdui-icon name="info"></mdui-icon>' : ''}
    ${config.priority == 1 ? '<mdui-icon name="warning"></mdui-icon>' : ''}
    ${config.priority == 2 ? '<mdui-icon name="wifi_tethering_error"></mdui-icon>' : ''}
    <div style="font-size: larger; "><b>${config.title}</b></div>
    <mdui-button-icon
    class="event__card-finish-button"
    ${config.status == 1 ? "disabled" : ""}
    icon='${config.status == 1 ? "check_box" : "check_box_outline_blank"} '
    style="margin-left: auto;"
    ></mdui-button-icon>
  </div>
  
  <div style="opacity: 0.5;">${config.description}</div>
  
  <data hidden uuid="${config.uuid}"></data>

</mdui-card>
`}

export function init() {
  document.querySelectorAll(".event__card").forEach(element => {
    let uuid = element.querySelector("data")!.getAttribute("uuid")

    element.querySelector(".event__card-finish-button")!.addEventListener("click", _event => {
      send({ type: 'update/event', data: { uuid: uuid, status: 1 } })
    })
  })
}