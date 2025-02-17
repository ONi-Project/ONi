export function html(config: any) {
  return /*html*/`
<mdui-card class="card ae__list-item" variant="filled">
  <div style="display: flex;align-items: center;gap: 0.5rem;">
    <mdui-icon name="grid_on--outlined" style="font-size: 2rem;"></mdui-icon>

    <div>
      <div style="font-size: larger;white-space: nowrap;"><b>${config.name}</b></div>
    </div>

    <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>

    <div>
      <div class="ae__view-time-updated" style="opacity: 1;">...</div>
      <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
    </div>

  </div>

  <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
    <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
      <mdui-icon name="schedule"></mdui-icon>
      <div class="ae__view-time-created">...</div>
    </div>

    <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
      <mdui-icon name="memory"></mdui-icon>
      <div class="ae__view-cpu-status">...</div>
    </div>

    <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
      <mdui-icon name="category"></mdui-icon>
      <div>1/3 库存维持已达标</div>
    </div>
  </div>

  <div style="display: flex;align-items: center;gap: 0.5rem;margin-top: 0.5rem;">
    <mdui-chip elevated class="ae__button-view">
      查看
      <mdui-icon slot="icon" name="pageview"></mdui-icon>
    </mdui-chip>

    <mdui-chip elevated style="margin-right: auto;" class="ae__button-edit">
      编辑
      <mdui-icon slot="icon" name="edit"></mdui-icon>
    </mdui-chip>
  </div>

  <data hidden uuid="${config.uuid}"></data>
</mdui-card>
`}

export function init() {

  Array.from(document.getElementById("ae__list")!.firstElementChild!.children!).forEach(element => {
    element.querySelector(".ae__button-view")!.addEventListener("click", _event => {
      let uuid = element.querySelector("data")!.getAttribute("uuid")
      document.querySelectorAll(".ae__view").forEach(elementView => {

        if (elementView.querySelector("data")!.getAttribute("uuid") == uuid) {
          (elementView as HTMLElement).hidden = false
        } else {
          (elementView as HTMLElement).hidden = true
        }
      })
      document.getElementById("ae__view")!.hidden = false
      document.getElementById("ae__list")!.hidden = true
      document.getElementById("ae__topbar")!.hidden = true
    })
    element.querySelector(".ae__button-edit")!.addEventListener("click", _event => {
      let uuid = element.querySelector("data")!.getAttribute("uuid")
      document.querySelectorAll(".ae__edit").forEach(elementEdit => {
        if (elementEdit.querySelector("data")!.getAttribute("uuid") == uuid) {
          (elementEdit as HTMLElement).hidden = false
        } else {
          (elementEdit as HTMLElement).hidden = true
        }
      })
      document.getElementById("ae__edit")!.hidden = false
      document.getElementById("ae__list")!.hidden = true
      document.getElementById("ae__topbar")!.hidden = true
    })
  })

}