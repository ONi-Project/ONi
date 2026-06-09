export default function WelcomeCard() {
  return (
    <mdui-card variant="filled" className="card">
      <div className="flex flex-col h-full md:flex-row">
        <div className="flex-1 flex justify-center items-center">
          <img
            className="max-h-[30rem] max-w-[30rem] object-contain w-full h-auto"
            src="resources/oni_large.png"
            alt="ONi Logo"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center p-4">
          <div>
            <h1>欢迎使用 ONi！</h1>
            <p>
              这是一个为 GTNH 而设计的监控工具，使用 OpenComputers
              在游戏中进行通信，后端基于 Node.js 开发。
            </p>
            <p>
              ONi 是一个开源项目，欢迎有能力、有想法的开发者为项目做贡献！
            </p>
            <p>本卡片为示例卡片，主页支持自定义，详见其他标签页。</p>
          </div>
          <div className="mt-auto w-fit">
            <mdui-chip
              elevated
              className="mr-2"
              href="https://github.com/ONi-Project/ONi/"
              target="_blank"
            >
              GitHub 仓库
            </mdui-chip>
            <mdui-chip
              elevated
              href="https://doc.oni.akyuu.cn/"
              target="_blank"
            >
              使用教程
            </mdui-chip>
          </div>
        </div>
      </div>
    </mdui-card>
  )
}

// Registry entry
export const welcomeConfig = {
  component: WelcomeCard,
}
