export function html(config: any) {
    return /*html*/`
<mdui-card class="card" variant="filled">
  <div style="display: flex;align-items: center;gap: 0.5rem;">
    <mdui-icon name="smart_toy--outlined" style="font-size: 2rem;"></mdui-icon>

    <div>
      <div style="font-size: larger;"><b>${config.name}</b></div>
    </div>

    <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>

    <div>
      <div style="opacity: 1;">在线 - WebSocket</div>
      <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
    </div>

  </div>

  <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
    <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
      <mdui-icon name="schedule"></mdui-icon>
      <div>创建于 2021-08-15 12:00:00</div>
    </div>

    <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
      <mdui-icon name="commit"></mdui-icon>
      <div>Oni Lib v1</div>
    </div>
  </div>

  <div style="display: flex;align-items: center;gap: 0.5rem;margin-top: 0.5rem;">
    <mdui-chip elevated style="margin-right: auto;" class="bot__button-edit">
      编辑
      <mdui-icon slot="icon" name="edit"></mdui-icon>
    </mdui-chip>
  </div>

  <data hidden uuid="${config.uuid}"></data>
</mdui-card>
`}

export function init() {
    Array.from(document.getElementById("bot__list")!.firstElementChild!.children!).forEach(element => {
        element.querySelector(".bot__button-edit")!.addEventListener("click", _event => {
            let uuid = element.querySelector("data")!.getAttribute("uuid")
            document.querySelectorAll(".bot__edit").forEach(elementEdit => {
                if (elementEdit.querySelector("data")!.getAttribute("uuid") == uuid) {
                    (elementEdit as HTMLElement).hidden = false
                } else {
                    (elementEdit as HTMLElement).hidden = true
                }
            })
            document.getElementById("bot__edit")!.hidden = false
            document.getElementById("bot__list")!.hidden = true
        })
    })
}