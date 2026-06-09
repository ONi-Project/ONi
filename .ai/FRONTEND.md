# ONi 前端架构

> 路径: [`frontend/`](frontend/) | React 19 + TypeScript + Vite + MDUI 2

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 6 + @tailwindcss/vite
- **UI 库**: MDUI v2 (Material Design 3 Web Components)
- **样式**: Tailwind CSS v4
- **状态管理**: Zustand v5
- **路由**: react-router-dom v7
- **动画**: Motion (framer-motion)
- **其他**: pinyin-pro, expr-eval

## 目录结构

```
frontend/src/
├── App.tsx                          # 根组件 - BrowserRouter
├── main.tsx                         # 入口 - 挂载 React
├── style.css                        # 全局样式
├── vite-env.d.ts                    # Vite 类型声明
│
├── pages/                           # 路由页面
│   ├── OverviewPage.tsx             # 概览页（服务端驱动布局）
│   ├── AePage.tsx                   # AE 网络管理
│   ├── BotPage.tsx                  # Bot 管理
│   ├── ControlPage.tsx              # 控制面板（红石等）
│   ├── EventPage.tsx                # 事件/告警
│   ├── DebugPage.tsx                # 调试
│   ├── SettingsPage.tsx             # 设置
│   ├── StatPage.tsx                 # 统计
│   └── ToolPage.tsx                 # 工具
│
├── components/                      # UI 组件
│   ├── layout/                      # 布局组件
│   │   ├── AppLayout.tsx            # 主布局（顶栏+导航+内容区）
│   │   ├── NavRail.tsx              # 导航 Rail
│   │   ├── TopBar.tsx               # 顶部栏
│   │   └── BgTexture.tsx            # 背景纹理
│   │
│   ├── cards/                       # 卡片组件（服务端驱动布局使用）
│   │   ├── index.ts                 # 卡片注册表 cardRegistry
│   │   ├── Welcome.tsx              # 欢迎卡片
│   │   ├── UserInfo.tsx             # 用户信息卡片
│   │   ├── ServerStatus.tsx         # 服务器状态卡片
│   │   ├── NoEvent.tsx              # 无事件卡片
│   │   ├── CreateBot.tsx            # 创建 Bot 卡片
│   │   ├── AeOverview.tsx           # AE 概览卡片
│   │   ├── BotOverview.tsx          # Bot 概览卡片
│   │   ├── ControlRedstoneDigital.tsx  # 数字红石控制
│   │   ├── ControlRedstoneAnalog.tsx   # 模拟红石控制
│   │   ├── IndicatorBar.tsx         # 条形指示器
│   │   └── IndicatorCircular.tsx    # 圆形指示器
│   │
│   ├── blocks/                      # 区块布局组件
│   │   ├── index.ts                 # 区块注册表 blockRegistry
│   │   ├── GridFull.tsx             # 全宽网格
│   │   ├── GridL.tsx                # 大网格
│   │   ├── GridM.tsx                # 中网格
│   │   ├── GridS.tsx                # 小网格
│   │   └── Raw.tsx                  # 原始布局（无包裹）
│   │
│   ├── tabs/                        # 标签页组件（惰性加载）
│   │   ├── index.ts                 # Tab 注册表
│   │   ├── AeView.tsx               # AE 详情视图
│   │   ├── AeEdit.tsx               # AE 编辑视图
│   │   └── BotEdit.tsx              # Bot 编辑视图
│   │
│   └── dialogs/                     # 对话框组件
│       ├── LoginDialog.tsx          # 登录对话框
│       ├── AeItemInfoDialog.tsx     # AE 物品信息对话框
│       ├── AeItemSelectDialog.tsx   # AE 物品选择对话框
│       ├── AeOrderDialog.tsx        # AE 合成下单对话框
│       ├── BotTaskDialog.tsx        # Bot 任务编辑对话框
│       └── SettingsDialog.tsx       # 设置对话框
│
├── hooks/
│   └── useWebSocket.ts              # WebSocket 连接 Hook（含自动重连）
│
├── stores/                          # Zustand 状态管理
│   ├── useAuthStore.ts              # 认证状态（endpoint/token/user）
│   ├── useWebSocketStore.ts         # WS 连接状态
│   └── useDataStore.ts              # 全局数据 Store（AE/Bot/Event/...）
│
└── lib/
    ├── renderLayout.tsx             # 服务端驱动布局渲染器 DynamicLayout
    └── utils.ts                     # 工具函数
```

## 关键架构模式

### 服务端驱动布局 (Server-Driven Layout)

[`DynamicLayout`](frontend/src/lib/renderLayout.tsx) 组件接收 `Layout` JSON（来自服务器），通过注册表模式查找对应的 React 组件进行渲染。

```
服务器下发 layout JSON:
[
  { type: "grid-m", content: [
      { type: "card", id: "ae-overview", config: {...} },
      { type: "card", id: "bot-overview", config: {...} }
  ]}
]

DynamicLayout 渲染流程:
1. 遍历 blocks → 用 blockRegistry 找 Block 组件（GridFull/GridM等）
2. 遍历 block.content → 用 cardRegistry 找 Card 组件
3. kebab-case → camelCase 转换（"ae-overview" → "aeOverview"）
4. 传入 config props 渲染
```

- **卡片注册表**: [`components/cards/index.ts`](frontend/src/components/cards/index.ts)
- **区块注册表**: [`components/blocks/index.ts`](frontend/src/components/blocks/index.ts)

### WebSocket 通信

[`useWebSocket`](frontend/src/hooks/useWebSocket.ts) Hook 管理 WS 生命周期：

1. 从 `useAuthStore` 获取 endpoint/token
2. 连接 `ws://{endpoint}/ws/web`
3. 发送 `AuthRequest` 消息进行认证
4. 认证成功后，服务器下发所有初始数据
5. 后续数据变更通过 WS 实时推送
6. 断线自动重连（1秒间隔）

### 状态管理

三层 Store 分离：
- **`useAuthStore`** — 认证相关（endpoint, token, user），持久化到 localStorage
- **`useWebSocketStore`** — WS 连接状态（session, connected）
- **`useDataStore`** — 业务数据（ae, bot, event, common, redstone, ...），CRUD 方法

### 路由设计

[`App.tsx`](frontend/src/App.tsx) 使用 BrowserRouter，所有路由通过 `AppLayout` 组件统一管理布局（顶栏 + 导航 Rail + 内容区）。

## 数据同步流

```
服务器 WS 推送 → useWebSocket Hook 解析消息类型
→ 调用 useDataStore 的对应 setter/adder/remover
→ Zustand 状态更新 → React 组件重渲染
```
