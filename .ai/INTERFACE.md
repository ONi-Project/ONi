# ONi 共享接口包 (`@oni/interface`)

> 路径: [`interface/`](interface/) | TypeScript 包，backend & frontend 共用

## 用途

作为 monorepo 中的共享类型包，通过 npm workspace `file:../interface` 被 [`backend`](backend/package.json:15) 和 [`frontend`](frontend/package.json:12) 引用。

## 模块划分

[`interface/src/index.ts`](interface/src/index.ts) 统一导出所有类型和运行时 guard：

### 数据类型 (Data Models)

| 模块 | 文件 | 核心类型 |
|------|------|----------|
| [`aeModel`](interface/src/data/ae.ts) | `data/ae.ts` | `Ae`, `AeCpu`, `AeItem`, `AeLevelMaintain`, `AeOrder`, `AeOrderResult` |
| [`botModel`](interface/src/data/bot.ts) | `data/bot.ts` | `Bot`, `BotTask`, `BotComponent` |
| [`commonModel`](interface/src/data/common.ts) | `data/common.ts` | `Common` |
| [`eventModel`](interface/src/data/event.ts) | `data/event.ts` | `Event` |
| [`redstoneModel`](interface/src/data/redstone.ts) | `data/redstone.ts` | `Redstone` |
| [`userModel`](interface/src/data/user.ts) | `data/user.ts` | `User` |
| [`mcServerStatusModel`](interface/src/data/mcServerStatus.ts) | `data/mcServerStatus.ts` | `McServerStatus` |
| [`staticModel`](interface/src/data/static.ts) | `data/static.ts` | `ItemPanelItem`, `ItemPanelLiquid`, `BotTask` |
| [`layoutModel`](interface/src/layout/base.ts) | `layout/base.ts` | `Layout`, `Block`, `Card` |

### WebSocket 消息类型 (Message Protocol)

**基本消息格式** ([`ws/base.ts`](interface/src/ws/base.ts)):
```typescript
interface Message<T, D> {
    type: T      // 消息类型标识
    data: D      // 消息负载
}
interface OcMessage<T, D, Target> extends Message<T, D> {
    target: Target  // 目标 bot uuid
}
```

**消息通道**:

| 通道 | 源→目标 | 文件 |
|------|----------|------|
| [`ServerToWeb`](interface/src/ws/server-to-web.ts) | 后端 → 前端 | `ws/server-to-web.ts` |
| [`WebToServer`](interface/src/ws/web-to-server.ts) | 前端 → 后端 | `ws/web-to-server.ts` |
| [`ServerToOc`](interface/src/ws/server-to-oc.ts) | 后端 → OC 客户端 | `ws/server-to-oc.ts` |
| [`OcToServer`](interface/src/ws/oc-to-server.ts) | OC 客户端 → 后端 | `ws/oc-to-server.ts` |
| [`General`](interface/src/ws/general.ts) | 通用消息 (Error/Warning) | `ws/general.ts` |

### 工具函数

| 文件 | 功能 |
|------|------|
| [`createMessage.ts`](interface/src/utils/createMessage.ts) | 创建消息的工厂函数 (`newServerToWebMessage`, `newWebToServerMessage`, `newServerToOcMessage`, `newOcToServerMessage`, `newGeneralMessage`) |
| [`messageTypeMap.ts`](interface/src/utils/messageTypeMap.ts) | 消息类型映射 |
| [`union.ts`](interface/src/utils/union.ts) | 联合类型生成 |

### 运行时 Guard (数据校验)

每个 data 模块和 ws 模块都有一一对应的 `.guard.ts` 文件，通过 `io-ts` 生成运行时类型检查函数（如 `isAeArray`, `isMessage` 等）。

## 开发

```bash
cd interface
npm run build    # 编译 TypeScript → lib/
npm run test     # 运行测试
```

Guard 通过 PowerShell 脚本生成:
```
interface/script/generate-interface-guard.ps1
interface/script/generate-union.ts
```
