# ONi WebSocket 消息协议

> 所有消息基于 JSON 格式，通过 WebSocket 双向传输

## 基础消息格式

```
{
    "type": "<MessageType>",
    "data": { ... }
}
```

OC 定向消息额外包含 `target` 字段：
```
{
    "type": "<MessageType>",
    "target": "<bot-uuid>",
    "data": { ... }
}
```

## 消息类型枚举

### 后端 → 前端 (ServerToWeb)

| 类型 | data 类型 | 说明 |
|------|-----------|------|
| `AuthResponse` | `user \| null` | 认证响应 |
| `LayoutOverview` | `Layout` | Overview 页面布局 |
| `DataCommonInit` | `Common[]` | 通用数据初始化 |
| `DataCommonSet` | `Common` | 通用数据更新 |
| `DataCommonAdd` | `Common` | 通用数据新增 |
| `DataCommonRemove` | `string` | 通用数据删除 (uuid) |
| `DataBotInit` | `Bot[]` | Bot 列表初始化 |
| `DataBotComponentsSet` | `Bot` | Bot 组件更新 |
| `DataBotTasksSet` | `Bot` | Bot 任务更新 |
| `DataBotAdd` | `Bot` | Bot 新增 |
| `DataBotRemove` | `string` | Bot 删除 (uuid) |
| `DataAeInit` | `Ae[]` | AE 列表初始化 |
| `DataAeItemsSet` | `Ae` | AE 物品列表更新 |
| `DataAeCpusSet` | `Ae` | AE CPU 列表更新 |
| `DataAeLevelMaintainsSet` | `Ae` | AE 存量维护更新 |
| `DataAeAdd` | `Ae` | AE 新增 |
| `DataAeRemove` | `string` | AE 删除 (uuid) |
| `DataEventInit` | `Event[]` | 事件列表初始化 |
| `DataEventSet` | `Event` | 事件更新 |
| `DataEventAdd` | `Event` | 事件新增 |
| `DataEventRemove` | `string` | 事件删除 (uuid) |
| `DataRedstoneInit` | `Redstone[]` | 红石列表初始化 |
| `DataRedstoneSet` | `Redstone` | 红石更新 |
| `DataRedstoneAdd` | `Redstone` | 红石新增 |
| `DataRedstoneRemove` | `string` | 红石删除 (uuid) |
| `DataMcServerStatusSet` | `McServerStatus` | MC 服务器状态 |
| `StaticBotTask` | `BotTask[]` | Bot 任务模板 |
| `AeOrderResult` | `AeOrderResult` | AE 合成结果 |
| `Error` | `{ message: string }` | 错误消息 |
| `Warning` | `{ message: string }` | 警告消息 |

### 前端 → 后端 (WebToServer)

| 类型 | data 类型 | 说明 |
|------|-----------|------|
| `AuthRequest` | `{ token: string }` | 认证请求 |
| `OcTaskRunSingle` | `BotTask` (target=botUuid) | 运行单次任务 |
| `OcTaskAdd` | `BotTask` (target=botUuid) | 添加任务 |
| `OcTaskRemove` | `BotTask` (target=botUuid) | 移除任务 |
| `OcForward` | `unknown` (target=botUuid) | Debug 转发 |
| `DataEventSet` | `{ uuid, name?, description?, priority?, status?, timestamp? }` | 事件更新 |
| `AeOrder` | `AeOrder` | AE 合成下单 |
| `RedstoneTask` | `{ uuid, taskUuid, value }` | 红石控制 |
| `BotComponentUpdate` | `{ uuid, taskUuid }` | 刷新 Bot 组件 |
| `DataAeLevelMaintainsSet` | `{ uuid, levelMaintains }` | 设置存量维护 |

### 后端 → OC (ServerToOc)

| 类型 | data 类型 | 说明 |
|------|-----------|------|
| `AuthResponse` | `Bot` | OC 认证响应 |
| `Task` | `BotTask[]` | 下发任务列表 |

### OC → 后端 (OcToServer)

| 类型 | data 类型 | 说明 |
|------|-----------|------|
| `AuthRequest` | `{ token: string }` | OC 认证请求 |
| `DataCommonSet` | `{ uuid, ... }` | 通用数据更新 |
| `DataEventSet` | `{ uuid, ... }` | 事件更新 |
| `DataEventAdd` | `Event` | 事件新增 |
| `DataBotComponent` | `{ uuid, components: BotComponent[] }` | Bot 组件上报 |
| `DataAeItemList` | `{ uuid, items: AeItem[] }` | AE 物品列表上报 |
| `DataAeCpuList` | `{ uuid, cpus: AeCpu[] }` | AE CPU 列表上报 |
| `AeOrderResult` | `AeOrderResult` | AE 合成结果上报 |
| `Log` | `{ level, file, location, taskUuid, message }` | OC 日志上报 |

## 消息流时序

### 认证流程
```
Web前端                   后端                    OC客户端
  │                       │                       │
  ├── AuthRequest ──────▶ │                       │
  │                       │                       │
  │◀── AuthResponse ─────┤                       │
  │◀── LayoutOverview ───┤                       │
  │◀── Data*Init ────────┤                       │
  │◀── StaticBotTask ────┤                       │
  │                       │                       │
  │                       │◀── AuthRequest ───────┤
  │                       ├── AuthResponse ──────▶│
  │                       ├── Task ──────────────▶│
```

### 数据更新流程
```
OC 采集 → DataAeItemList → 后端 Handler → Global.ae.items.set()
    → wsWebBroadcast(DataAeItemsSet) → 前端 useDataStore → UI 更新
```
