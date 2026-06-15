# ONi 快速参考

## 目录速查

| 你想做什么 | 去这里 |
|-----------|--------|
| 了解项目架构 | [`.ai/ARCHITECTURE.md`](.ai/ARCHITECTURE.md) |
| 修改后端逻辑 | [`backend/src/`](backend/src/) |
| 修改前端页面 | [`frontend/src/pages/`](frontend/src/pages/) |
| 添加前端卡片 | [`frontend/src/components/cards/`](frontend/src/components/cards/) + [`cardRegistry`](frontend/src/components/cards/index.ts) |
| 添加前端区块 | [`frontend/src/components/blocks/`](frontend/src/components/blocks/) + [`blockRegistry`](frontend/src/components/blocks/index.ts) |
| 定义数据类型 | [`interface/src/data/`](interface/src/data/) |
| 定义消息协议 | [`interface/src/ws/`](interface/src/ws/) |
| 修改 OC Lua 脚本 | [`oc/oni/`](oc/oni/) |
| 修改数据持久化 | `data/` 目录下对应 JSON 文件 |
| 修改 Overview 布局 | `data/layout/overview.json` |
| 修改配置 | [`config.yml`](config.yml) |

## 常用命令

```bash
# 后端
cd backend && npm run dev     # 开发模式（热重载）
cd backend && npm run build   # 编译
cd backend && npm run start   # 生产启动

# 前端
cd frontend && npm run dev    # Vite 开发服务器
cd frontend && npm run build  # 生产构建

# 接口包
cd interface && npm run build # 编译共享类型
```

## 关键文件路径

| 文件 | 用途 |
|------|------|
| [`backend/src/index.ts`](backend/src/index.ts) | 后端入口 |
| [`backend/src/handler.ts`](backend/src/handler.ts) | 消息处理器（核心逻辑） |
| [`backend/src/server.ts`](backend/src/server.ts) | HTTP 服务/WSS 升级 |
| [`backend/src/websocket.ts`](backend/src/websocket.ts) | WebSocket 管理 |
| [`backend/src/global/index.ts`](backend/src/global/index.ts) | 全局数据模块注册 |
| [`frontend/src/App.tsx`](frontend/src/App.tsx) | 前端根组件 |
| [`frontend/src/hooks/useWebSocket.ts`](frontend/src/hooks/useWebSocket.ts) | WS 连接 Hook |
| [`frontend/src/stores/useDataStore.ts`](frontend/src/stores/useDataStore.ts) | 数据 Store |
| [`frontend/src/lib/renderLayout.tsx`](frontend/src/lib/renderLayout.tsx) | 动态布局渲染器 |
| [`interface/src/index.ts`](interface/src/index.ts) | 共享类型导出入口 |

## 数据流速查

```
OC 采集 → WS → backend/handler.ts → Global.* → wsWebBroadcast()
                                                      ↓
                                            frontend/hooks/useWebSocket.ts
                                                      ↓
                                            useDataStore (Zustand)
                                                      ↓
                                            React 组件重渲染

Web 操作 → WS → backend/handler.ts → processor.* → 更新 Global 或转发 OC
```

## 类型定义速查

| 核心接口 | 位置 |
|----------|------|
| `Ae`, `AeCpu`, `AeItem`, `AeLevelMaintain` | [`interface/src/data/ae.ts`](interface/src/data/ae.ts) |
| `Bot`, `BotTask`, `BotComponent` | [`interface/src/data/bot.ts`](interface/src/data/bot.ts) |
| `Event` | [`interface/src/data/event.ts`](interface/src/data/event.ts) |
| `Redstone` | [`interface/src/data/redstone.ts`](interface/src/data/redstone.ts) |
| `User` | [`interface/src/data/user.ts`](interface/src/data/user.ts) |
| `Layout`, `Block`, `Card` | [`interface/src/layout/base.ts`](interface/src/layout/base.ts) |
| `Message<T,D>` | [`interface/src/ws/base.ts`](interface/src/ws/base.ts) |
| `SessionWeb`, `SessionOc` | [`backend/src/interface.ts`](backend/src/interface.ts) |
