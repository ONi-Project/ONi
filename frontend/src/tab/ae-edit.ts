export function html(config: any) {
    return /*html*/`
<div class="ae__edit">
  <div style="display: flex;align-items: center;margin-bottom: 0.5rem;gap:0.5rem;">
      <mdui-button-icon icon="arrow_back" class="ae__edit-back"></mdui-button-icon>
      <div style="font-weight: bold;font-size:large">编辑 - ${config.name}</div>
  </div>
  
  <div class="grid-full">
      <mdui-card class="card" variant="filled">
      <div style="display: flex;align-items: center;gap: 0.5rem;">
  
          <mdui-icon name="grid_on--outlined" style="font-size: 2rem;"></mdui-icon>
  
          <div>
          <div style="font-size: larger;white-space: nowrap;"><b>${config.name}</b></div>
          </div>
  
          <mdui-divider vertical style="margin-left: 0.5rem;margin-right: 0.5rem;"></mdui-divider>
  
          <div>
          <div style="opacity: 1;">数据更新 - 刚刚</div>
          <div style="opacity: 0.25;font-size: smaller;">${config.uuid}</div>
          </div>
  
      </div>
  
      <div style="display: flex;flex-direction: column;gap: 0.25rem;margin-top: 0.25rem;">
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
          <mdui-icon name="schedule"></mdui-icon>
          <div>创建于 2021-08-15 12:00:00</div>
          </div>
  
          <div style="display: flex;opacity: 0.75;gap: 0.5rem;">
          <mdui-icon name="memory"></mdui-icon>
          <div>16/16 核心空闲</div>
          </div>
      </div>
  
  
      </mdui-card>
  </div>
  
  <div class="grid-l">
      <mdui-card class="card" variant="filled">
      <div class="card-title">
          库存维持
      </div>
      <mdui-list style="margin-left: -1rem;margin-right: -1rem;">
          <mdui-list-item>
          <div style="display: flex;align-items: center;gap: 0.5rem;">
              <img src="./resources/itempanel/item/392_0.png" style="height: 3rem;">
              <div>
              <div>马铃薯</div>
              <div style="font-size: smaller;opacity: 0.5;">正在请求...</div>
              </div>
              <div style="opacity: 0.5;text-align: right;margin-left: auto;">99 / 100</div>
          </div>
          </mdui-list-item>
          <mdui-list-item>
          <div style="display: flex;align-items: center;gap: 0.5rem;">
              <img src="./resources/itempanel/item/393_0.png" style="height: 3rem;">
              <div>
              <div>熟马铃薯</div>
              <div style="font-size: smaller;opacity: 0.5;">原材料不足</div>
              </div>
              <div style="opacity: 0.5;text-align: right;margin-left: auto;">514 / 114K</div>
          </div>
          </mdui-list-item>
          <mdui-list-item>
          <div style="display: flex;align-items: center;gap: 0.5rem;">
              <img src="./resources/itempanel/item/391_0.png" style="height: 3rem;">
              <div>
              <div>胡萝卜</div>
              <div style="font-size: smaller;opacity: 0.5;">已达到设定数量</div>
              </div>
              <div style="opacity: 0.5;text-align: right;margin-left: auto;">514 / 114</div>
          </div>
          </mdui-list-item>
      </mdui-list>
      <mdui-chip elevated style="margin-right: auto;">
          编辑
          <mdui-icon slot="icon" name="edit"></mdui-icon>
      </mdui-chip>
      </mdui-card>
  
  
      <mdui-card class="card" variant="filled">
      <div class="card-title">
          操作
      </div>
  
      <mdui-chip elevated style="background-color: rgb(var(--mdui-color-error-container));margin-right: auto;margin-top: 0.5rem;">
          删除 ${config.name}
          <mdui-icon slot="icon" name="delete"></mdui-icon>
      </mdui-chip>
  
      </mdui-card>
  
  </div>
  
  <data hidden uuid="${config.uuid}"></data>
</div>
`}

export function init() {
    document.querySelectorAll(".ae__edit-back").forEach(element => {
        element.addEventListener("click", _event => {
            document.getElementById("ae__edit")!.hidden = true
            document.getElementById("ae__list")!.hidden = false
            document.getElementById("ae__topbar")!.hidden = false
        })
    })
}