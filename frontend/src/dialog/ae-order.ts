export const html = /*html*/`
<mdui-dialog id="ae__order-dialog" style="padding: 0 !important;">
  <div class="card-title">
    主网 - 请求订单
  </div>

  <mdui-card style="display: flex;align-items: center;gap: 0.5rem;margin-top: 1rem;padding: 1rem;">
    <img src="./resources/itempanel/item/8207_0.png" style="height: 3rem;">
    <div>海珀珍</div>
    <div style="margin-left: auto;opacity: 0.5;">库存数量：111</div>
  </mdui-card>

  <div style="display: flex;align-items: center;gap: 0.25rem;margin-top: 1rem;">
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-100</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-10</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="remove"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">-1</div>
    </div>
    <mdui-text-field style="margin-top: 0.25rem;" label="数量" value="1"></mdui-text-field>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+1</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+10</div>
    </div>
    <div style="display: flex;align-items: center;flex-direction: column;">
      <mdui-button-icon icon="add"></mdui-button-icon>
      <div style="font-size: x-small;margin-top: -0.8rem;opacity: 0.5;">+100</div>
    </div>
  </div>

  <div style="display: flex;gap: 0.5rem;margin-top: 1rem;">
    <mdui-button full-width variant="outlined" style="flex: 1" onclick="this.parentElement.parentElement.open=false">取消</mdui-button>
    <mdui-button full-width style="flex: 4">下一步</mdui-button>
  </div>

  <data hidden></data>

</mdui-dialog>
`

export function init(){
    
}