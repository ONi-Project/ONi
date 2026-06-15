# ONi AI 开发指引

> 本文件为 AI 辅助开发提供项目级指引，确保代码风格一致、架构边界清晰

## 项目概览

ONi 是一个 GTNH 服务器管理面板，核心架构为 **OC Lua 采集数据 → Node.js 后端处理 → Web 前端展示**。

```
oc/ (Lua 采集) → ws://host/ws/oc → backend/ (TypeScript) → ws://host/ws/web → frontend/ (React)
```

## 代码规范

### 通用规则

1. **遵循现有模式进行扩展** — 新增功能时应参考同模块已有实现，保持代码风格一致
2. **TypeScript 严格模式** — 避免 `any` 类型，优先使用 `interface` 定义数据结构
3. **所有消息类型必须在 `@oni/interface` 中定义** — 前后端共用类型，确保类型安全

### 后端开发 ([`backend/`](backend/))

**架构约束**:
- 项目为 ESM (`"type": "module"`)，所有相对 import 必须带 `.js` 扩展名
- 入口文件: [`backend/src/index.ts`](backend/src/index.ts) → 编译到 `backend/lib/`
- 开发模式: `npm run dev` (nodemon + tsx)
- 构建: `npm run build` (tsc)

**模块化规则**:
- 所有数据模块继承 `Global` 命名空间，通过 [`backend/src/global/index.ts`](backend/src/global/index.ts) 统一导出
- 数据模块遵循标准 CRUD 模式：`add/get/remove/save/init`
- 数据变更后必须调用 `wsWebBroadcast()` 推送到前端
- 新增数据模块需在 `Global.init()` 中注册

**消息处理**:
- Web 消息 → [`handler.webMessage()`](backend/src/handler.ts:15)
- OC 消息 → [`handler.ocMessage()`](backend/src/handler.ts:92)
- 新增消息类型 → 在 `processor` 对象中添加对应处理器，并在 `@oni/interface` 中定义类型和 guard

**配置文件**: [`config.yml`](config.yml) — Yaml 格式，含 `port`, `log_level`, `debug`, `mc_server_ip` 等

### 前端开发 ([`frontend/`](frontend/))

**架构约束**:
- React 19 + TypeScript + Vite 6
- UI: MDUI v2 (Material Design 3 Web Components)，使用 `mdui-*` 自定义元素
- 路由: react-router-dom v7 (BrowserRouter)
- 状态管理: Zustand v5

**新增页面**:
1. 在 [`frontend/src/pages/`](frontend/src/pages/) 创建页面组件
2. 在 [`AppLayout.tsx`](frontend/src/components/layout/AppLayout.tsx) 中添加路由
3. 在导航栏 (`NavRail` 或 `TopBar`) 中添加入口

**新增卡片** (服务端驱动布局使用):
1. 在 [`frontend/src/components/cards/`](frontend/src/components/cards/) 创建卡片组件
2. 在 [`cardRegistry`](frontend/src/components/cards/index.ts) 中注册（kebab-case 命名）
3. 在服务器端 `data/layout/overview.json` 中添加对应布局配置

**新增对话框**:
1. 在 [`frontend/src/components/dialogs/`](frontend/src/components/dialogs/) 创建
2. 使用 MDUI 的 `mdui-dialog` 组件

**WebSocket 消息处理**:
- 在 [`useWebSocket.ts`](frontend/src/hooks/useWebSocket.ts) 的 `session.onmessage` 中添加消息类型的 case
- 调用 `useDataStore` 的对应方法更新状态
- 使用 `@oni/interface` 中的 guard 函数进行类型收窄

### 共享接口开发 ([`interface/`](interface/))

**规则**:
- 所有跨前后端的数据类型和消息类型必须先在此定义
- Guard 文件（`.guard.ts`）使用 `io-ts` 生成运行时校验
- 修改后需执行 `npm run build` 重新编译
- 通过 `npm run build` 在 backend 和 frontend 中使用最新类型

### OC Lua 开发 ([`oc/`](oc/))

**规则**:
- Lua 5.3 语法，运行在 OpenComputers 环境
- 使用 OC 标准库: `component`, `computer`, `internet`, `websocket`, `uuid`, `dkjson`
- 所有报错/警告使用 `ws_log` 模块发送给后端
- 任务通过 `newTask(ws, taskUuid, config)` 工厂函数创建
- 消息发送使用 `ws:send(json.encode(message))`

## 数据持久化

所有数据以 JSON 文件存储在 `data/` 目录，通过 `setInterval` 定时自动保存（间隔由 `config.data_auto_save_interval` 控制）。

| 数据文件 | 对应模块 |
|----------|----------|
| `data/user/user.json` | user |
| `data/bot/bot.json` | bot |
| `data/common/common.json` | common |
| `data/event/event.json` | event |
| `data/redstone/redstone.json` | redstone |
| `data/itempanel/item.csv` | staticResources (物品映射) |
| `data/itempanel/liquid.json` | staticResources (流体映射) |
| `data/bot/task.json` | staticResources (任务模板) |
| `data/layout/overview.json` | Overview 页面布局 |

## 常见开发任务

### 新增数据模块
1. 在 [`interface/src/data/`](interface/src/data/) 定义类型 + guard
2. 在 [`interface/src/index.ts`](interface/src/index.ts) 导出
3. 在 [`backend/src/global/`](backend/src/global/) 创建模块实现 CRUD
4. 在 [`backend/src/global/index.ts`](backend/src/global/index.ts) 注册
5. 在 [`interface/src/ws/`](interface/src/ws/) 定义消息类型
6. 在 [`backend/src/handler.ts`](backend/src/handler.ts) 添加处理器
7. 在 [`frontend/src/stores/useDataStore.ts`](frontend/src/stores/useDataStore.ts) 添加状态
8. 在 [`frontend/src/hooks/useWebSocket.ts`](frontend/src/hooks/useWebSocket.ts) 添加消息处理

### 新增 WS 消息类型
1. [`interface/src/ws/xxx-to-xxx.ts`] 定义类型
2. 运行 interface 构建指令来生成类型 guard 函数
3. [`interface/src/index.ts`] 导出
4. 发送端使用 `newXxxMessage()` 工厂函数
5. 接收端使用 `isXxxMessage()` guard 收窄类型

### 新增服务端驱动布局卡片
1. 在 [`frontend/src/components/cards/`] 创建 React 组件，接收 `config` prop
2. 在 [`cardRegistry`](frontend/src/components/cards/index.ts) 注册
3. 在 `data/layout/overview.json` 的 layout 数组中添加卡片配置
