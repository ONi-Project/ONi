# ONi 项目规则

## 核心规则

1. 优先阅读 [`.ai/`](.ai/) 目录下的文档以了解项目架构和开发指引
2. 除非必要不要扫描整个项目 — 使用 `.ai/` 目录的文档快速定位需要修改的文件

## AI 参考文档

`.ai/` 目录包含以下文档，按阅读优先级排列：

| 文档 | 内容 | 适用场景 |
|------|------|----------|
| [`.ai/ARCHITECTURE.md`](.ai/ARCHITECTURE.md) | 项目整体架构概览 | 初次接触项目 |
| [`.ai/CODING.md`](.ai/CODING.md) | AI 开发指引和代码规范 | 需要修改代码时 |
| [`.ai/QUICK_REFERENCE.md`](.ai/QUICK_REFERENCE.md) | 目录/命令/文件/数据流速查 | 快速定位资源 |
| [`.ai/BACKEND.md`](.ai/BACKEND.md) | 后端架构详情 | 后端开发/调试 |
| [`.ai/FRONTEND.md`](.ai/FRONTEND.md) | 前端架构详情 | 前端开发/调试 |
| [`.ai/INTERFACE.md`](.ai/INTERFACE.md) | 共享接口包详情 | 修改类型定义 |
| [`.ai/OC.md`](.ai/OC.md) | OC Lua 客户端详情 | OC 脚本开发 |
| [`.ai/MESSAGE_PROTOCOL.md`](.ai/MESSAGE_PROTOCOL.md) | WebSocket 消息协议 | 消息调试/新增消息类型 |

## 开发指南

- 后端使用 TypeScript ESM (`"type": "module"`)，import 必须带 `.js` 扩展名
- 前端使用 React 19 + MDUI 2 + Zustand
- 所有跨前后端类型定义在 [`interface/`](interface/) 包中
- OC 使用 Lua 5.3，通过 WebSocket 与后端通信

## 当文档中的架构与实际不符时

当发现项目文档与实际代码结构不一致时：

1. 分析差异
2. 判断是否属于真实架构变更
3. 更新相关文档
4. 在回复末尾输出：
   "参考架构文档已更新"

对于不确定的变更：
不要修改文档，向用户确认。