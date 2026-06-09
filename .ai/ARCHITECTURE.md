# ONi 项目架构总览

> ONi — A web panel designed for GTNH | Powered by OpenComputers

## 整体架构

ONi 是一个**三端架构**的 GTNH 服务器管理面板：

```
┌─────────────────────────────────────────────────────────┐
│                    Web 前端 (Frontend)                    │
│              React + MDUI + Zustand + Vite              │
│                   用户浏览器 / PWA                       │
└────────────────────┬────────────────────────────────────┘
                     │ WebSocket (ws://host/ws/web)
                     ▼
┌─────────────────────────────────────────────────────────┐
│                    Node.js 后端 (Backend)                 │
│    Express + ws + TypeScript → 编译到 JS (lib/) 运行     │
│                                                         │
│   ┌───────────┐  ┌───────────┐  ┌───────────────────┐  │
│   │ Server    │  │ Websocket │  │ Global 数据模块    │  │
│   │ (Express) │  │ (wssWeb   │  │ ├─ user           │  │
│   │           │  │  wssOc)   │  │ ├─ bot            │  │
│   │ HTTP API  │  │           │  │ ├─ ae             │  │
│   │ 静态资源  │  │ Handler   │  │ ├─ common         │  │
│   └───────────┘  └───────────┘  │ ├─ redstone       │  │
│                                  │ ├─ event          │  │
│                                  │ ├─ mcServerStatus │  │
│                                  │ └─ staticResources│  │
│                                  └───────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ WebSocket (ws://host/ws/oc)
                     ▼
┌─────────────────────────────────────────────────────────┐
│               OpenComputers Lua (OC 客户端)              │
│   在 Minecraft GTNH 服务器中的 OC 电脑上运行              │
│   ├─ main.lua (通过 config.lua 配置连接)                 │
│   ├─ oni/ae.lua — AE 网络交互                            │
│   ├─ oni/component.lua — 组件检测                       │
│   └─ oni/gt_machine.lua — GT 机器交互                   │
└─────────────────────────────────────────────────────────┘
```

## 项目模块划分

| 目录 | 用途 | 技术栈 |
|------|------|--------|
| [`backend/`](backend/) | Node.js 后端服务器 | TypeScript → JS, Express, ws, log4js |
| [`frontend/`](frontend/) | Web 前端 SPA | React 19, MDUI 2, Zustand, Vite |
| [`interface/`](interface/) | 共享类型定义 + 消息协议 | TypeScript, io-ts guard |
| [`oc/`](oc/) | OpenComputers Lua 脚本 | Lua 5.3, OC API |
| [`itempanel/`](itempanel/) | 物品面板数据 (CSV) | - |
| [`scripts/`](scripts/) | 工具脚本 | - |
| [`tools/`](tools/) | 开发工具 | - |
| [`_draft/`](_draft/) | 草稿/规划文件 | JSONC |

## 核心数据流

```
OC 电脑 (Lua)                   后端 (Node.js)                   Web 前端 (React)
─────────────────              ────────────────               ─────────────────
 采集 AE 物品/CPU 列表 ──WS──▶  Handler 解析 →               ◀──WS 广播── Global 数据变更
 采集组件列表         ──WS──▶  Global 模块更新               ◀──WS 广播── 实时推送
 采集 GT 机器数据     ──WS──▶  → wsWebBroadcast()            Zustand Store 更新
                                                             React 组件重渲染
 接收任务指令         ◀──WS──  Bot.tasks 变更
 执行合成/红石控制    ◀──WS──  Web 用户操作 → Handler
```

## 关键设计决策

1. **三类 WebSocket 通道** — 通过 HTTP Upgrade 区分路径 `/ws/web`（前端）和 `/ws/oc`（OC 客户端），使用 Express 内置的 `server.on("upgrade")` 分发。
2. **OC HTTP Fallback** — 由于 OC 的 WebSocket 对大消息支持不佳，提供 `POST /api/oc/wsSend` 作为临时方案，内部二次建立 WS 连接转发。
3. **服务端驱动布局** — 前端 Overview 页面使用 `DynamicLayout` 组件，根据服务器下发的 `Layout` JSON 动态渲染卡片和区块，实现前端无需发版即可修改布局。
4. **TypeScript 共享接口** — `interface/` 包被 backend 和 frontend 通过 npm workspace (file:) 引用，保证前后端类型一致。通过 `io-ts` 生成运行时 guard 函数用于消息校验。
5. **JSON 文件持久化** — 所有数据（user, bot, ae, event, common, redstone）存储在 `data/` 目录下的 JSON 文件中，定时自动保存。
