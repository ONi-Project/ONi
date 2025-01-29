export const html = /*html*/`
<mdui-dialog close-on-overlay-click id="ae__item-info-dialog" style="padding: 0 !important;">

  <div class="card-title" style="display: flex;align-items: center;margin-bottom: 0.5rem;">
    <mdui-icon name="category" style="margin-right: 0.5rem;"></mdui-icon>
    <div>物品信息</div>
  </div>

  <mdui-card style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;padding: 1rem;width: 20rem;">
    <img id="ae__item-info-dialog-icon" src="./resources/itempanel/item/2_0.png" style="height: 3rem;">
    <div id="ae__item-info-dialog-display"></div>
    <div id="ae__item-info-dialog-amount" style="margin-left: auto;opacity: 0.5;">10K</div>
  </mdui-card>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width id="ae__item-info-dialog-close-button" variant="outlined" style="flex: 1">关闭</mdui-button>
    <mdui-button full-width id="ae__item-info-dialog-request-button" style="flex: 4">请求合成</mdui-button>
  </div>

</mdui-dialog>
`

export function init(){

}