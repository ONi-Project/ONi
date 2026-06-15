# ONi 前端技术升级规划

## 一、现状分析

### 1.1 当前技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| MDUI | 2.1.3 | Material Design 3 Web Components |
| Zustand | 5 | 状态管理 |
| react-router-dom | 7 | 路由 |
| **Animate.css** | (旧) | CSS 动画库 |
| **progressbar.js** | (旧) | 圆形进度条 |
| **原生 CSS** | - | 全局样式 + 内联样式 |

### 1.2 主要问题

#### 问题 A：内联 `style` 泛滥
几乎所有组件都大量使用内联 `style={{}}`，例如：

```tsx
// EventPage.tsx 中典型的例子
<div style={{ marginBottom: "0.5rem", padding: "0.25rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
```

这些样式模式在全项目中高度重复（flex 布局、gap、margin、padding、opacity、fontSize 等），非常适合 Tailwind 的 utility classes。

#### 问题 B：`animate.css` 全量引入但仅用 1-2 个动画
项目使用了 animate.css 的 `.animate__fadeInUp` 和 `.animate__fadeIn` 两个动画，却引入了整个 animate.css 库。动画逻辑通过 className 和 `animationDelay` 实现 staggered 效果，代码分散且不太灵活。

**使用 animate.css 的文件：**
- `frontend/src/pages/EventPage.tsx` — 搜索栏、过滤器、事件卡片、空状态
- `frontend/src/pages/OverviewPage.tsx` — 加载状态
- `frontend/src/pages/ControlPage.tsx` — 搜索栏
- `frontend/src/pages/StatPage.tsx` — 搜索栏
- `frontend/src/pages/ToolPage.tsx` — 所有卡片
- `frontend/src/lib/renderLayout.tsx` — DynamicLayout 卡片 stagger 动画

#### 问题 C：`progressbar.js` 为单个组件引入的重量级依赖
`IndicatorCircular.tsx` 仅用于显示一个圆形进度条，却引入了整个 progressbar.js（~30KB）。该功能可以用 framer-motion 或纯 CSS/SVG 替代。

#### 问题 D：大量无意义的 class 名称
许多组件中定义了类似 `ae__view-back`、`ae__view-cpu-list-nothing`、`bot__edit-back` 的 className，但这些类在 CSS 中从未定义过，是无效 class。

**涉及文件：** `AeView.tsx`, `AeEdit.tsx`, `BotEdit.tsx`, `AeOverview.tsx`, `StatPage.tsx` 等。

#### 问题 E：`<style>` 标签嵌入 JSX
部分组件在 JSX 中嵌入 `<style>{`...`}</style>`，如 `EventPage.tsx`, `Welcome.tsx`, `IndicatorCircular.tsx`。

#### 问题 F：`style.css` 中可被 Tailwind 替代的规则
- `.grid-s`, `.grid-m`, `.grid-l`, `.grid-full` — grid 布局
- `.card`, `.card-compact`, `.card-extra-compact` — 卡片内边距
- `.card-title` — 文字样式
- `.hover-highlight` — 悬停效果
- `.panel-content` — 页面内容边距
- `#navi-drawer`, `#navrail-dim` — 导航栏样式
- scrollbar 样式
- `.animate__animated.animate__faster` — 动画覆盖

---

## 二、建议升级方案

### 方案总览

```
目标技术栈：
React 19 + MDUI 2 + Tailwind CSS v4 + Motion (framer-motion)
```

| 当前 | 目标 | 原因 |
|------|------|------|
| Animate.css | **Motion** (framer-motion) | 更好的 React 集成、类型安全、Tree-shaking、更灵活 |
| progressbar.js | **Motion** 或 **纯 CSS/SVG** | 减少依赖体积 |
| 原生 CSS (style.css) | **Tailwind CSS v4** | 消除内联样式、统一设计系统、减少 CSS 维护 |
| 内联 style 属性 | **Tailwind utility classes** | 代码更简洁、一致性更好 |
| JSX 内嵌 `<style>` | **Tailwind** | 统一样式管理 |

### 2.1 Tailwind CSS v4

**为什么选 Tailwind v4：**
- 最新版本，CSS-first 配置（不再需要 `tailwind.config.js`）
- 使用 `@import "tailwindcss"` 导入，与 Vite 集成更简单
- Utility-first 理念完美替代项目中大量的内联 style
- 内置 Design System（spacing、color、font-size 等）
- Tree-shaking 只输出用到的样式

**迁移策略：**
1. 安装 `tailwindcss` + `@tailwindcss/vite` 插件
2. 在 `style.css` 中用 `@import "tailwindcss"` 替换
3. 先将全局布局类（grid、flex、padding、margin）替换为 Tailwind 类
4. 组件级替换按照页面/组件逐个进行

**内联 style → Tailwind 对照（典型模式）：**

| 当前内联样式 | Tailwind 类 |
|---|---|
| `display: "flex"` | `flex` |
| `display: "flex", flexDirection: "column"` | `flex flex-col` |
| `display: "flex", alignItems: "center"` | `flex items-center` |
| `gap: "0.5rem"` | `gap-2` (0.5rem = 8px = 2 units) |
| `marginBottom: "0.5rem"` | `mb-2` |
| `marginTop: "1rem"` | `mt-4` |
| `padding: "1rem"` | `p-4` |
| `paddingLeft: "1.5rem", paddingRight: "1.5rem"` | `px-6` |
| `opacity: 0.5` | `opacity-50` |
| `fontSize: "larger"` | `text-lg` |
| `fontWeight: "bold"` | `font-bold` |
| `textAlign: "center"` | `text-center` |
| `marginLeft: "auto"` | `ml-auto` |
| `whiteSpace: "nowrap"` | `whitespace-nowrap` |
| `cursor: "pointer"` | `cursor-pointer` |
| `flex: 1` | `flex-1` |

### 2.2 Motion (framer-motion) 替代 Animate.css

**为什么选 Motion：**
- React 19 兼容，官方维护
- 声明式 API，直接在 JSX 中使用 `<motion.div>` 而非 className
- 支持 staggered 动画（项目目前用 `animationDelay` 模拟）
- 支持 enter/exit 动画、gesture 动画、layout 动画
- 类型安全，Tree-shakable

**迁移对照：**

| 当前 (Animate.css) | 目标 (Motion) |
|---|---|
| `<div className="animate__animated animate__fadeInUp animate__faster">` | `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>` |
| `style={{ animationDelay: "0.03s" }}` | `transition={{ delay: 0.03 }}` |
| DynamicLayout stagger 动画 | `motion.div` + `variants` + `staggerChildren` |

**`renderLayout.tsx` 是重点改造文件**，目前使用 className 方式做 stagger 动画。迁移后可以用 Motion 的 `variants` 机制：

```tsx
// 简化示例
const container = {
  animate: { transition: { staggerChildren: 0.03 } }
}
const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}
```

### 2.3 progressbar.js 替代方案

**选项 A：使用 Motion 的 `motion.div` 配合 SVG**
- 完全控制样式
- 与迁移后的其余动画代码统一
- 无需额外依赖

**选项 B：纯 CSS + SVG 圆环**
- 零依赖
- 简单场景足够

推荐选项 A，因为项目已经在引入 Motion。

### 2.4 `style.css` 清理计划

迁移后可删除或大幅精简的样式：

| 保留 | 迁移到 Tailwind |
|------|----------------|
| scrollbar 样式 | `.grid-s`, `.grid-m`, `.grid-l`, `.grid-full` |
| MDUI 覆盖 (如 `mdui-card[variant="filled"]`) | `.card`, `.card-compact`, `.card-extra-compact` |
| `#bg-texture` 背景相关 | `.card-title` |
| `#navi-drawer-bg` | `.panel-content` |
| `#navi-bottom-bar` | `.hover-highlight` |
| `#navrail-dim` | `.tooltip` |
| | `#navi-drawer` |
| | `.animate__animated.animate__faster` |

### 2.5 无意义 class 清理

在迁移过程中移除所有没有对应 CSS 定义的 className，如：
- `ae__view-back`, `ae__view-cpu-list`, `ae__view-cpu-list-nothing`, `ae__view-item-list`...
- `bot__edit-back`, `bot__edit-tasks`, `bot__edit-components`...
- `ae__overview-time-updated`, `ae__overview-cpu-status`...
- `event__card`, `event__card-warning`...
- `power-box-{1-14}`...

---

## 三、实施步骤（建议顺序）

### Phase 1: 基础设施搭建

| # | 任务 | 说明 |
|---|------|------|
| 1.1 | 安装 Tailwind CSS v4 + @tailwindcss/vite | 修改 `vite.config.ts` 添加插件 |
| 1.2 | 安装 Motion (framer-motion) | `npm install motion` |
| 1.3 | 更新 `style.css` 导入 Tailwind | `@import "tailwindcss"` |
| 1.4 | 验证构建成功 | `npm run build` 无报错 |

### Phase 2: 全局样式迁移

| # | 任务 | 说明 |
|---|------|------|
| 2.1 | 将 `style.css` 中的 grid/flex 布局类替换为 Tailwind utilities | 并在组件中直接使用 |
| 2.2 | 导航栏样式迁移 | `#navi-drawer` → Tailwind |
| 2.3 | 背景纹理样式保留或精简 | `#bg-texture` 保留但确认样式 |

### Phase 3: 动画系统迁移

| # | 任务 | 说明 |
|---|------|------|
| 3.1 | **`renderLayout.tsx`** — DynamicLayout 动画迁移 | className → motion 组件 + variants |
| 3.2 | **`EventPage.tsx`** — 动画迁移 | 3 处 animate__ 替换 |
| 3.3 | **`OverviewPage.tsx`** — 加载动画迁移 | 1 处 animate__ 替换 |
| 3.4 | **`ControlPage.tsx`** — 搜索栏动画迁移 | 1 处 animate__ 替换 |
| 3.5 | **`StatPage.tsx`** — 搜索栏动画迁移 | 1 处 animate__ 替换 |
| 3.6 | **`ToolPage.tsx`** — 所有卡片动画迁移 | 6 处 animate__ 替换 |
| 3.7 | 移除 animate.css 依赖 | `npm uninstall animate.css` |
| 3.8 | 清理 `style.css` 中 animate.css 覆盖 | 删除 `.animate__animated.animate__faster` |

### Phase 4: 组件内联样式迁移（按复杂度排序）

| # | 任务 | 文件 | 说明 |
|---|------|------|------|
| 4.1 | **简单组件** | `CreateBot.tsx`, `NoEvent.tsx`, `UserInfo.tsx`, `Welcome.tsx` | 少量内联样式 |
| 4.2 | **布局组件** | `AppLayout.tsx`, `NavRail.tsx`, `TopBar.tsx`, `BgTexture.tsx` | 核心布局，需谨慎 |
| 4.3 | **卡片组件** | `ServerStatus.tsx`, `AeOverview.tsx`, `BotOverview.tsx` | 中等复杂度 |
| 4.4 | **控制卡片** | `ControlRedstoneDigital.tsx`, `ControlRedstoneAnalog.tsx` | 中等复杂度 |
| 4.5 | **指示器** | `IndicatorBar.tsx`, `IndicatorCircular.tsx` | 含 progressbar.js 迁移 |
| 4.6 | **页面组件** | `OverviewPage.tsx`, `ControlPage.tsx`, `StatPage.tsx`, `ToolPage.tsx` | 含动画迁移 |
| 4.7 | **复杂页面** | `EventPage.tsx`, `AePage.tsx`, `BotPage.tsx`, `SettingsPage.tsx` | 含 `<style>` 标签清理 |
| 4.8 | **标签页** | `AeView.tsx`, `AeEdit.tsx`, `BotEdit.tsx` | 最复杂的组件，大量内联样式 |
| 4.9 | **对话框** | `LoginDialog.tsx`, `SettingsDialog.tsx`, `AeItemInfoDialog.tsx`, `AeOrderDialog.tsx`, `AeItemSelectDialog.tsx`, `BotTaskDialog.tsx` | 各自独立 |

### Phase 5: progressbar.js 替换

| # | 任务 | 说明 |
|---|------|------|
| 5.1 | `IndicatorCircular.tsx` — 用 Motion SVG 重写 | 移除 progressbar.js |
| 5.2 | 移除 progressbar.js 依赖 | `npm uninstall progressbar.js` |

### Phase 6: 收尾清理

| # | 任务 | 说明 |
|---|------|------|
| 6.1 | 移除 `style.css` 中所有被 Tailwind 替代的规则 | 仅保留 scrollbar 和 MDUI 覆盖 |
| 6.2 | 移除所有无意义的 className | 如 `ae__view-back`, `bot__edit-back` 等 |
| 6.3 | 移除 JSX 中嵌入的 `<style>` 标签 | 全部迁移到 Tailwind |
| 6.4 | 全局检查 + 构建验证 | `npm run build` |

---

## 四、注意事项与风险

1. **MDUI Web Components 优先级高于 Tailwind**：MDUI 的 `<mdui-card>`、`<mdui-button>` 等自定义元素的样式通过 CSS 变量控制，Tailwind 需要与之配合而非冲突。MDUI 内部的样式不受 Tailwind 影响，这是设计期望的。

2. **Tailwind v4 配置方式变化**：Tailwind v4 使用 CSS-first 配置（`@theme` directive），而非传统的 `tailwind.config.js`。需要熟悉新配置方式。

3. **Motion API 注意**：Motion（framer-motion）的 `motion.div` 组件无法直接用于 MDUI Web Components（如 `mdui-card`），需要在外部包裹一层 `<motion.div>`。

4. **内联样式迁移可以分批进行**：不必一次全部完成，Tailwind 与内联 style 可以共存。建议按页面/组件分批迁移。

5. **`renderLayout.tsx` 中的动画逻辑**：DynamicLayout 的动画逻辑涉及布局层级，建议优先改造以获得更好的动画效果。

---

## 五、可扩展性设计（针对项目框架阶段）

> 项目目前处于框架搭建阶段，很多功能尚未实现。因此 Motion 动画架构需要设计为可复用的模式，方便后续新增组件时能快速接入。

### 5.1 推荐：定义集中式动画配置

在 `frontend/src/lib/` 下新建 `animations.ts`，集中管理所有动画变体 variants：

```typescript
// frontend/src/lib/animations.ts
// 集中管理所有动画变体，新组件直接复用
import type { Variants } from "motion/react"

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.03 },
  },
}

// 后续可扩展：scaleIn, slideInLeft, slideInRight, flipIn 等
```

这样任何新组件只需要：
```tsx
import { motion } from "motion/react"
import { fadeInUp, staggerContainer } from "../../lib/animations"

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.div variants={fadeInUp}>新卡片</motion.div>
</motion.div>
```

**优点：**
- **零配置接入**：新组件只需 import + wrap
- **一致性**：所有动画参数集中管理
- **可扩展**：随时添加新变体（`slideInLeft`、`scaleIn`、`flipIn` 等）
- **Tree-shakable**：只引用用到的变体

### 5.2 动画 Wrapper 组件（备选）

如果希望更简洁，可以创建一个 `<AnimatedDiv>` 包装组件：

```tsx
// frontend/src/components/AnimatedDiv.tsx
import { motion, type Variants } from "motion/react"
import { fadeInUp, fadeIn } from "../lib/animations"

type AnimationType = "fadeInUp" | "fadeIn"

interface AnimatedDivProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
}

const variants: Record<AnimationType, Variants> = { fadeInUp, fadeIn }

export function AnimatedDiv({ children, animation = "fadeInUp", delay = 0, className }: AnimatedDivProps) {
  return (
    <motion.div
      variants={variants[animation]}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

用法：`<AnimatedDiv animation="fadeInUp" delay={0.03}>新卡片</AnimatedDiv>`

### 5.3 DynamicLayout 动画升级

`renderLayout.tsx` 是核心动画入口，后端下发布局后自动渲染卡片。建议改造为：

```tsx
// grid-full 使用 fadeIn（整体渐入）
// 其他 grid 使用 staggerContainer + fadeInUp（逐一弹入）
```

后续只要后端新增卡片 ID，前端注册新卡片组件后，动画自动适配。

### 5.4 progressbar.js 替换的可扩展性

建议将 `IndicatorCircular.tsx` 中的圆形进度条提取为可复用的 `<CircularProgress>` 组件：

```tsx
// frontend/src/components/CircularProgress.tsx
// 使用 Motion 的 SVG 动画能力
// 以后项目中其他需要圆形进度的地方可以直接复用
```

### 5.5 Tailwind v4 的 @theme 自定义

在 `style.css` 中使用 Tailwind v4 的 `@theme` directive 定义项目级设计 tokens：

```css
@import "tailwindcss";

@theme {
  --color-surface-container-highest: rgba(var(--mdui-color-surface-container-highest));
  /* 后续可扩展项目专用的颜色/间距/字体 tokens */
}
```

MDUI 主题色变量可以和 Tailwind utility classes 打通，新组件可直接使用 `bg-surface-container-highest` 等类名。

---

## 六、迁移前后对比

| 指标 | 迁移前 | 迁移后 |
|------|--------|--------|
| 依赖库 | animate.css + progressbar.js | motion |
| 样式方案 | 全局 CSS + 内联 style + `<style>` 标签 | Tailwind CSS v4 |
| CSS 文件 | 1 个全局文件 + N 个内嵌 `<style>` | 1 个极简全局文件 |
| 动画方式 | className 字符串拼接 | 声明式 motion 组件 |
| 构建体积 | animate.css ~70KB + progressbar.js ~30KB | motion tree-shakable |
| 开发体验 | 无类型检查、样式分散 | 统一的 utility classes、更好的 DX |
| 扩展性 | 新组件需手动拼 className 和 animationDelay | 新组件 import 动画变体即可 |

---

## 七、附：受影响文件完整列表

需要修改的 30+ 个文件：

### 配置层
- `frontend/vite.config.ts` — 添加 @tailwindcss/vite 插件
- `frontend/package.json` — 依赖变更
- `frontend/src/main.tsx` — 可能调整导入顺序
- `frontend/src/style.css` — 替换为 Tailwind 导入

### 新增文件
- `frontend/src/lib/animations.ts` — 集中管理动画变体 variants
- `frontend/src/components/CircularProgress.tsx` — 可复用圆形进度组件（可选）

### 核心层
- `frontend/src/lib/renderLayout.tsx` — 动画逻辑重写

### 页面层 8 个
- `OverviewPage.tsx` · `EventPage.tsx` · `ControlPage.tsx`
- `AePage.tsx` · `BotPage.tsx` · `StatPage.tsx`
- `ToolPage.tsx` · `SettingsPage.tsx`

### 布局层 4 个
- `AppLayout.tsx` · `NavRail.tsx` · `TopBar.tsx` · `BgTexture.tsx`

### 卡片层 11 个
- `Welcome.tsx` · `UserInfo.tsx` · `ServerStatus.tsx` · `NoEvent.tsx`
- `CreateBot.tsx` · `AeOverview.tsx` · `BotOverview.tsx`
- `ControlRedstoneDigital.tsx` · `ControlRedstoneAnalog.tsx`
- `IndicatorBar.tsx` · `IndicatorCircular.tsx`

### 区块层 5 个
- `GridFull.tsx` · `GridL.tsx` · `GridM.tsx` · `GridS.tsx` · `Raw.tsx`

### 标签页层 3 个
- `AeView.tsx` · `AeEdit.tsx` · `BotEdit.tsx`

### 对话框层 6 个
- `LoginDialog.tsx` · `SettingsDialog.tsx`
- `AeItemInfoDialog.tsx` · `AeItemSelectDialog.tsx`
- `AeOrderDialog.tsx` · `BotTaskDialog.tsx`
