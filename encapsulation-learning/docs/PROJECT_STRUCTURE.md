# 📂 项目结构说明

本文档详细说明了 AP CSA 学习平台的项目结构和各文件的作用。

## 🌳 目录树

```
ap-csa-learning/
├── .github/                    # GitHub 配置
│   └── workflows/
│       └── deploy.yml         # 自动部署工作流
│
├── client/                     # 前端应用
│   ├── public/                # 静态资源目录
│   │   └── 404.html          # SPA 路由重定向页面
│   │
│   ├── src/                   # 源代码
│   │   ├── components/       # React 组件
│   │   │   └── ui/          # shadcn/ui 组件库
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── radio-group.tsx
│   │   │       ├── label.tsx
│   │   │       └── ...      # 其他 UI 组件
│   │   │
│   │   ├── pages/            # 页面组件
│   │   │   ├── Home.tsx     # 主页 - 章节导航
│   │   │   ├── WhyEncapsulation.tsx
│   │   │   ├── RealWorldDangers.tsx
│   │   │   ├── AccessorsModifiers.tsx
│   │   │   ├── InteractiveDemo.tsx
│   │   │   ├── Quiz.tsx
│   │   │   └── Discussion.tsx
│   │   │
│   │   ├── lib/              # 工具函数
│   │   │   └── utils.ts     # 通用工具函数
│   │   │
│   │   ├── App.tsx           # 应用根组件 & 路由配置
│   │   ├── main.tsx          # 应用入口
│   │   └── index.css         # 全局样式 & Tailwind 配置
│   │
│   └── index.html             # HTML 模板
│
├── docs/                      # 项目文档
│   ├── GITHUB_DEPLOYMENT.md  # GitHub Pages 部署指南
│   ├── ADDING_NEW_CHAPTER.md # 添加新章节指南
│   └── PROJECT_STRUCTURE.md  # 本文件
│
├── .gitignore                 # Git 忽略文件
├── package.json               # 项目依赖和脚本
├── pnpm-lock.yaml            # pnpm 锁文件
├── tsconfig.json             # TypeScript 配置
├── tsconfig.node.json        # Node.js TypeScript 配置
├── vite.config.ts            # Vite 构建配置
├── tailwind.config.js        # Tailwind CSS 配置
├── components.json           # shadcn/ui 配置
└── README.md                 # 项目说明
```

## 📄 核心文件说明

### 配置文件

#### `package.json`
定义项目依赖和脚本命令。

**关键脚本**:
```json
{
  "scripts": {
    "dev": "vite",              // 启动开发服务器
    "build": "tsc && vite build", // 构建生产版本
    "preview": "vite preview"    // 预览构建结果
  }
}
```

**主要依赖**:
- `react` & `react-dom`: React 框架
- `wouter`: 轻量级路由库
- `lucide-react`: 图标库
- `tailwindcss`: CSS 框架
- `typescript`: 类型检查
- `vite`: 构建工具

#### `vite.config.ts`
Vite 构建工具配置。

**关键配置**:
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'), // 路径别名
    },
  },
  base: '/',  // 部署基础路径（GitHub Pages 需要修改）
  build: {
    outDir: 'dist',  // 构建输出目录
  },
});
```

#### `tsconfig.json`
TypeScript 编译器配置。

**重要设置**:
- `strict: true` - 启用严格类型检查
- `jsx: "react-jsx"` - React 17+ JSX 转换
- `paths: { "@/*": ["./client/src/*"] }` - 路径映射

#### `tailwind.config.js`
Tailwind CSS 配置文件。

**内容扫描**:
```javascript
content: [
  "./client/index.html",
  "./client/src/**/*.{js,ts,jsx,tsx}",
]
```

#### `components.json`
shadcn/ui 组件库配置。

**关键设置**:
- `style: "default"` - 使用默认样式
- `tailwind.css: "client/src/index.css"` - 样式文件位置
- `aliases.components: "@/components"` - 组件路径别名

### 前端核心文件

#### `client/index.html`
应用的 HTML 模板。

**关键元素**:
- `<div id="root">` - React 挂载点
- Google Fonts 链接 - 字体资源
- SPA 路由重定向脚本 - 支持 GitHub Pages

#### `client/src/main.tsx`
应用入口文件。

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### `client/src/App.tsx`
根组件和路由配置。

**结构**:
```typescript
import { Route, Switch } from 'wouter';
import Home from '@/pages/Home';
// ... 其他页面导入

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/why-encapsulation" component={WhyEncapsulation} />
      // ... 其他路由
      <Route>404 页面</Route>
    </Switch>
  );
}
```

#### `client/src/index.css`
全局样式和 Tailwind 配置。

**包含**:
- Tailwind 基础层、组件层、工具层
- CSS 变量（颜色主题）
- 自定义样式类

### 页面组件

#### `client/src/pages/Home.tsx`
主页 - 显示所有章节的导航卡片。

**功能**:
- 章节列表展示
- 学习路径概览
- 导航到各章节

#### `client/src/pages/WhyEncapsulation.tsx`
第一页 - 为什么需要封装。

**内容**:
- 公共字段的问题
- 好设计 vs 坏设计对比
- 代码示例

#### `client/src/pages/RealWorldDangers.tsx`
第二页 - 真实世界的危险。

**内容**:
- 4个真实场景（银行、教育、游戏、医疗）
- 标签页切换
- 问题和解决方案对比

#### `client/src/pages/AccessorsModifiers.tsx`
第三页 - 访问器和修饰符。

**内容**:
- Getter/Setter 详解
- 命名规范
- 验证逻辑
- 最佳实践

#### `client/src/pages/InteractiveDemo.tsx`
第四页 - 交互式演示。

**内容**:
- 可运行的代码示例
- 好设计 vs 坏设计对比
- 实时演示效果

#### `client/src/pages/Quiz.tsx`
第五页 - 知识检测。

**功能**:
- 8道选择题
- 即时反馈
- 分数计算
- 答案解释

#### `client/src/pages/Discussion.tsx`
第六页 - 讨论问题。

**内容**:
- 深度思考问题
- 可展开的答案
- 引导性讨论

### UI 组件

位于 `client/src/components/ui/`，由 shadcn/ui 提供：

- `button.tsx` - 按钮组件
- `card.tsx` - 卡片容器
- `tabs.tsx` - 标签页切换
- `radio-group.tsx` - 单选按钮组
- `label.tsx` - 表单标签
- `collapsible.tsx` - 可折叠容器

### 工具函数

#### `client/src/lib/utils.ts`
通用工具函数。

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 合并 Tailwind 类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### GitHub Actions

#### `.github/workflows/deploy.yml`
自动部署工作流。

**触发条件**:
- 推送到 `main` 分支
- 手动触发

**步骤**:
1. 检出代码
2. 设置 Node.js 和 pnpm
3. 安装依赖
4. 构建项目
5. 部署到 GitHub Pages

### 文档

#### `docs/GITHUB_DEPLOYMENT.md`
详细的 GitHub Pages 部署指南。

**包含**:
- 部署步骤
- 配置说明
- 常见问题解决

#### `docs/ADDING_NEW_CHAPTER.md`
添加新章节的完整指南。

**包含**:
- 文件创建步骤
- 代码模板
- 设计建议
- 最佳实践

#### `docs/PROJECT_STRUCTURE.md`
本文件 - 项目结构说明。

## 🔄 数据流

```
用户访问 URL
    ↓
index.html 加载
    ↓
main.tsx 初始化 React
    ↓
App.tsx 路由匹配
    ↓
对应的页面组件渲染
    ↓
使用 UI 组件构建界面
    ↓
用户交互（点击、输入等）
    ↓
状态更新（useState）
    ↓
组件重新渲染
```

## 🎨 样式系统

### Tailwind CSS 工作流

1. 在 JSX 中使用 Tailwind 类名
2. Vite 处理时，Tailwind 扫描文件
3. 生成最终的 CSS
4. 注入到页面中

### CSS 变量

在 `index.css` 中定义：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... 更多变量 */
}
```

在组件中使用：

```tsx
<div className="bg-background text-foreground">
  内容
</div>
```

## 🧩 组件组合

### 典型页面结构

```tsx
export default function PageName() {
  // 1. 状态管理
  const [state, setState] = useState();

  // 2. 事件处理
  const handleClick = () => { /* ... */ };

  // 3. 渲染
  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div>
        <h1>标题</h1>
        <p>描述</p>
      </div>

      {/* 主要内容 */}
      <Card>
        <CardHeader>
          <CardTitle>卡片标题</CardTitle>
        </CardHeader>
        <CardContent>
          内容
        </CardContent>
      </Card>

      {/* 导航 */}
      <div className="flex justify-between">
        <Link href="/prev">
          <Button>上一页</Button>
        </Link>
        <Link href="/next">
          <Button>下一页</Button>
        </Link>
      </div>
    </div>
  );
}
```

## 📦 构建输出

运行 `pnpm build` 后：

```
dist/
├── index.html           # 主 HTML 文件
├── assets/             # 静态资源
│   ├── index-[hash].js  # 打包的 JavaScript
│   ├── index-[hash].css # 打包的 CSS
│   └── ...             # 其他资源
└── 404.html            # 路由重定向页面
```

## 🔍 开发工作流

1. **启动开发服务器**: `pnpm dev`
2. **修改代码**: 编辑 `.tsx` 或 `.css` 文件
3. **热更新**: Vite 自动刷新浏览器
4. **类型检查**: TypeScript 实时检查错误
5. **构建**: `pnpm build`
6. **预览**: `pnpm preview`
7. **部署**: 推送到 GitHub（自动部署）

## 🎯 最佳实践

### 文件命名

- 组件文件: `PascalCase.tsx`
- 工具文件: `camelCase.ts`
- 样式文件: `kebab-case.css`

### 组件组织

- 一个文件一个主要组件
- 相关的小组件可以放在同一文件
- 可复用组件放在 `components/`
- 页面组件放在 `pages/`

### 样式规范

- 优先使用 Tailwind 类名
- 避免内联样式
- 使用 CSS 变量保持一致性
- 响应式设计使用 Tailwind 断点

### 类型安全

- 为所有 props 定义接口
- 使用 TypeScript 严格模式
- 避免使用 `any` 类型

## 📚 相关资源

- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [Wouter 文档](https://github.com/molefrog/wouter)

---

**需要帮助？** 查看其他文档或开启一个 Issue！
