export const html = /*html*/`
<div id="stat__content" class="panel-content" hidden>

    <div class="animate__animated animate__fadeInUp animate__faster" style="margin-bottom: 0.5rem;padding: 0.25rem;display: flex;gap: 0.5rem;align-items: center;" variant="filled">
        <mdui-text-field variant="outlined" icon="search" label="检索统计项目..."></mdui-text-field>
    </div>

  <div style="display: flex;align-items: center;">
    <div>简化等级</div>
    <mdui-slider oninput="panelStatsAdjustSL()" id="slider-SL" tickmarks step="1" min="1" max="15" value="10" style="width: 15rem;"></mdui-slider>
  </div>

  <div class="grid-l">

    <mdui-card class="stats-chart-card" variant="filled">
      <div class="chart">
        <canvas id="chart-battery"></canvas>
      </div>
    </mdui-card>

    <mdui-card class="stats-chart-card" variant="filled">
      <div class="chart">
        <canvas id="chart-benzene"></canvas>
      </div>
    </mdui-card>

    <mdui-card class="stats-chart-card" variant="filled">
      <div class="chart">
        <canvas id="chart-nitrobenzene"></canvas>
      </div>
    </mdui-card>

  </div>
</div>
`

export function init() {

}