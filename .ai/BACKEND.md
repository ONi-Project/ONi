# ONi 后端架构

> 路径: [`backend/`](backend/) | TypeScript → 编译到 `lib/` | Node.js ESM

## 启动流程

[`backend/src/index.ts`](backend/src/index.ts) 是入口，按顺序执行：

1. 加载 [`config.yml`](config.yml)（不存在则从 `config.yml.default` 复制）
2. 初始化模块（按顺序）：`Logger` → `Global` → `Server` → `Websocket`
3. 启动定时任务：`TaskMcServerStatus`

```typescript
initializeModule(Logger, 'Logger')
initializeModule(Global, 'Global')
initializeModule(Server, 'Server')
initializeModule(Websocket, 'Websocket')
TaskMcServerStatus.init(config)
```

## 模块分层

### 1. [`Server`](backend/src/server.ts) — Express HTTP 服务

- 监听端口，提供 `/` 路由（EJS 渲染 index 页面）
- `server.on("upgrade")` 拦截 WS 升级请求，按路径分发：
  - `/ws/web` → `wssWeb`
  - `/ws/oc` → `wssOc`
- `POST /api/oc/wsSend` — OC HTTP Fallback 接口
- 静态文件服务 `public/`

### 2. [`Websocket`](backend/src/websocket.ts) — WS 连接管理

- **两个独立 WSS**: `wssWeb`（前端）和 `wssOc`（OC 客户端）
- 每个连接分配 `sessionId` + 认证标记 `authenticated`
- 消息通过 [`Handler`](backend/src/handler.ts) 分发处理
- 广播函数：
  - [`wsWebBroadcast()`](backend/src/websocket.ts:63) — 推送给所有已认证 Web 客户端
  - [`wsOcBroadcast()`](backend/src/websocket.ts:71) — 推送给所有已认证 OC 客户端
  - [`wsOcSendByBotUuid()`](backend/src/websocket.ts:79) — 按 bot uuid 推送

### 3. [`Handler`](backend/src/handler.ts) — 消息处理器

核心处理器对象 `processor`，包含：

| 处理器 | 功能 |
|--------|------|
| `processor.auth.web` | Web 端 Token 认证，认证后下发所有初始数据 |
| `processor.auth.oc` | OC 端 Token 认证，认证后下发任务列表 |
| `processor.data.commonSet` | 更新通用数据 → 广播 |
| `processor.data.eventSet/eventAdd` | 更新/添加事件 → 广播 |
| `processor.data.ae.items` | 设置 AE 物品列表 → 广播 |
| `processor.data.ae.cpus` | 设置 AE CPU 列表 → 广播 |
| `processor.data.ae.levelMaintains` | 设置 AE 存量维护 → 广播 |
| `processor.data.bot.component` | 设置 Bot 组件列表 → 广播 |
| `processor.ae.order` | 处理 Web 发起的 AE 合成请求 → 转发给 OC |
| `processor.ae.orderResult` | 处理 OC 返回的合成结果 → 广播给 Web |
| `processor.redstone.task` | 处理 Web 红石控制 → 转发给 OC |
| `processor.bot.componentUpdate` | 处理 Web 组件刷新请求 → 转发给 OC |
| `processor.web2oc.*` | Web→OC 任务管理（运行/添加/删除/转发） |
| `processor.oc.log` | OC 日志写入文件 |

### 4. [`Global`](backend/src/global/index.ts) — 数据模块集

所有数据模块共享相同的 CRUD 模式：

```
init(config) → 从 JSON 文件加载
add(data)    → 添加到内存列表 + 广播
get(uuid)    → 按 UUID 查找
remove(uuid) → 从列表移除 + 广播
save()       → 写入 JSON 文件（带定时自动保存）
```

| 模块 | 文件 | 数据文件 | 用途 |
|------|------|----------|------|
| [`user`](backend/src/global/user.ts) | `data/user/user.json` | 用户管理 & Token 认证 |
| [`bot`](backend/src/global/bot.ts) | `data/bot/bot.json` | OC 机器人管理、任务调度 |
| [`ae`](backend/src/global/ae.ts) | - | AE 网络数据（物品/CPU/存量维护） |
| [`common`](backend/src/global/common.ts) | `data/common/common.json` | 通用数据 |
| [`event`](backend/src/global/event.ts) | `data/event/event.json` | 事件/告警数据 |
| [`redstone`](backend/src/global/redstone.ts) | `data/redstone/redstone.json` | 红石控制组件 |
| [`mcServerStatus`](backend/src/global/mcServerStatus.ts) | - | Minecraft 服务器状态（Ping） |
| [`staticResources`](backend/src/global/staticResources.ts) | `data/itempanel/*`, `data/bot/task.json` | 静态资源（物品映射/任务模板） |

### 5. 定时任务

- [`TaskMcServerStatus`](backend/src/task/mcServerStatus.ts) — 定期 Ping Minecraft 服务器获取在线状态
- 各 Global 模块通过 `setInterval` 定期自动保存数据

## 日志系统

[`backend/src/logger.ts`](backend/src/logger.ts) — 基于 log4js，按类别分 logger：

| Logger | 用途 |
|--------|------|
| `loggerMain` | 主进程日志 |
| `loggerGlobal` | 全局模块日志 |
| `loggerWebsocket` | WebSocket 连接日志 |
| `loggerServer` | HTTP 服务日志 |
| `loggerHandler` | 消息处理日志 |
| `loggerPerformance` | 性能计时日志 |
| `loggerOcOverWs` | OC 通过 WS 上报的日志 |

## 接口定义

[`backend/src/interface.ts`](backend/src/interface.ts) 中定义了：
- [`SessionWeb`](backend/src/interface.ts:4) — Web 端 WS 会话（含 user）
- [`SessionOc`](backend/src/interface.ts:10) — OC 端 WS 会话（含 bot）
- [`Config`](backend/src/interface.ts:16) — 配置接口

## 工具函数

[`backend/src/utils.ts`](backend/src/utils.ts)：
- `deepEqual()` — 深度比较
- `performanceTimer()` — 性能计时包装器
- `send()` — 安全发送 JSON 消息
