export function html(_config: any) {
  return /* html */`
<mdui-card variant="filled" class="card">
 <div class="card-welcome__card-content">
    <div class="card-welcome__image-container">
      <img class="card-welcome__responsive-image" src="resources/oni_large.png">
    </div>
    <div class="card-welcome__text-container">
      <div>
        <h1>欢迎使用 ONi！</h1>
        <p>这是一个为 GTNH 而设计的监控工具，使用 OpenComputers 在游戏中进行通信，后端基于 Node.js 开发。</p>
        <p>ONi 是一个开源项目，欢迎有能力、有想法的开发者为项目做贡献！</p>
        <p>本卡片为示例卡片，主页支持自定义，详见其他标签页。</p>
      </div>
      <div style="margin-top: auto; width: fit-content;">
        <mdui-chip elevated style="margin-right: 0.5rem;" href="https://github.com/ONi-Project/ONi/" target="_blank">GitHub 仓库</mdui-chip>
        <mdui-chip elevated href="https://doc.oni.akyuu.cn/" target="_blank">使用教程</mdui-chip>
      </div>
    </div>
  </div>
</mdui-card>
  
<style>
.card-welcome__card-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.card-welcome__image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-welcome__responsive-image {
    max-height: 30rem;
    max-width: 30rem;
    object-fit: contain;
    width: 100%;
    height: auto;
}

.card-welcome__text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
}

@media (min-width: 550px) {
    .card-welcome__card-content {
    flex-direction: row;
    }

    .card-welcome__image-container, .card-welcome__text-container {
    flex: 1;
    }
}
</style>
`}

export function init() {

}