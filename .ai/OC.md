# ONi OpenComputers 客户端脚本

> 路径: [`oc/`](oc/) | Lua 5.3, 运行在 Minecraft GTNH 的 OC 电脑中

## 文件结构

```
oc/
├── config.lua              # 配置文件（服务端地址/端口/token等）
└── oni/
    ├── ae.lua              # AE (Applied Energistics) 网络交互
    ├── component.lua       # OC 设备组件检测
    └── gt_machine.lua      # GT (GregTech) 机器交互
```

## 通信架构

OC 电脑通过 **WebSocket** 连接到后端 `ws://host/ws/oc`：

```
OC Lua                  后端 Node.js
  │                        │
  ├── AuthRequest ──────▶  ├── 验证 token，下发 Bot 信息 + 任务列表
  │                        │
  ├── DataAeItemList ────▶ ├── 解析 → Global.ae.items.set() → 广播给 Web
  ├── DataAeCpuList ─────▶ ├── 解析 → Global.ae.cpus.set() → 广播给 Web
  ├── DataBotComponent ──▶ ├── 解析 → Global.bot.components.set() → 广播给 Web
  ├── AeOrderResult ─────▶ ├── 解析 → 广播给 Web
  ├── Log ────────────────▶ ├── 写入 logs/oc.log
  │                        │
  ◀─── Task ────────────── ├── 收到任务指令，执行对应操作
```

## 各模块功能

### [`ae.lua`](oc/oni/ae.lua) (486行)

AE 网络操作模块：

| 函数 | 功能 |
|------|------|
| `ae.updateAeComponents()` | 扫描所有以 `me_` 开头的 OC 组件 |
| `ae.getAeComponents()` | 获取 AE 组件列表（未使用） |
| `ae.getCpus(ws, taskUuid, uuid, targetAeUuid)` | 获取 CPU 列表（含状态、正在合成的物品） |
| `ae.getItems(ws, taskUuid, uuid, targetAeUuid)` | 获取物品列表（含类型/数量/可合成标记） |
| `ae.request(ws, taskUuid, uuid, name, damage, amount)` | 发起合成请求，轮询直到完成或失败 |
| `ae.levelMaintainCheck(ws, taskUuid, uuid, targetUuid, list)` | 存量维护检查 |
| `ae.newTask(ws, taskUuid, config)` | 任务工厂函数，按 mode 创建对应任务 |

**合成请求流程图**:
```
ae.request():
1. 查找可合成物品（comp.getCraftables）
2. 生成 craftUuid，调用 request(amount)
3. 轮询 60 秒检查状态
   - hasFailed() → 发送失败结果
   - isCanceled() → 发送取消结果
   - isDone() → 发送成功结果
4. 使用循环队列（maxHistoryTask=100）管理历史任务
```

### [`component.lua`](oc/oni/component.lua) (83行)

OC 设备组件检测模块：

| 函数 | 功能 |
|------|------|
| `component.getComponent()` | 通过 `computer.getDeviceInfo()` 获取所有组件列表 |
| `component.update()` | 增量更新检测，返回 `(hasChanged, componentList)` |
| `component.newTask(ws, taskUuid, config)` | 任务工厂，上报组件列表 |

### [`gt_machine.lua`](oc/oni/gt_machine.lua) (239行)

GregTech 机器交互模块：

| 函数 | 功能 |
|------|------|
| `gt_machine.updateMachine()` | 扫描所有 `gt_machine` 组件 |
| `gt_machine.getMachine(ws, taskUuid)` | 上报 GT 机器列表 |
| `gt_machine.getMachineInfo(ws, taskUuid, address)` | 获取单个 GT 机器详细信息 |
| `gt_machine.checkAllMachine(ws, taskUuid, type)` | 批量检查所有机器状态 |
| `gt_machine.newTask(ws, taskUuid, config)` | 任务工厂 |

## 任务系统

OC 端通过接收后端下发的 `Task` 消息执行周期性或一次性任务：

```lua
-- Task 消息格式
{
    type = "Task",
    data = {
        {
            task = "ae|component|redstone|...",
            interval = 60,      -- 执行间隔（秒），-1 表示一次性
            taskUuid = "...",
            config = { ... }    -- 任务参数
        }
    }
}
```

每个模块通过 `newTask(ws, taskUuid, config)` 工厂函数创建实际执行函数，由主调度循环驱动。
