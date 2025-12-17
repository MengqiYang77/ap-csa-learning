# 📘 GitHub Pages 部署指南

本指南将教你如何将 AP CSA 学习网站部署到 GitHub Pages，让你的网站可以在线访问。

## 📋 前置要求

- GitHub 账号
- Git 已安装在你的电脑上
- 项目代码（当前的 encapsulation-learning 项目）

## 🚀 部署步骤

### 步骤 1: 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库信息：
   - **Repository name**: `ap-csa-learning`（或你喜欢的名字）
   - **Description**: `Interactive learning platform for AP Computer Science A`
   - **Public/Private**: 选择 `Public`（GitHub Pages 免费版需要公开仓库）
   - **不要**勾选 "Initialize this repository with a README"
4. 点击 `Create repository`

### 步骤 2: 配置 Vite 构建设置

在项目根目录创建或修改 `vite.config.ts`：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  // 重要：设置 base 为你的仓库名
  base: '/ap-csa-learning/',  // 改成你的仓库名！
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
```

**⚠️ 重要提示**: 
- 如果你的仓库名是 `my-ap-csa`，那么 `base` 应该是 `'/my-ap-csa/'`
- 如果你使用自定义域名，`base` 可以设置为 `'/'`

### 步骤 3: 添加构建脚本

在 `package.json` 中确保有以下脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 步骤 4: 创建 GitHub Actions 工作流

创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Build
        run: pnpm build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 5: 初始化 Git 并推送到 GitHub

在项目根目录打开终端，执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: AP CSA Encapsulation Learning Platform"

# 添加远程仓库（替换成你的 GitHub 用户名和仓库名）
git remote add origin https://github.com/YOUR_USERNAME/ap-csa-learning.git

# 推送到 GitHub
git push -u origin main
```

**如果推送失败，可能需要先设置 Git 用户信息：**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 步骤 6: 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 `Source` 下选择 `GitHub Actions`
5. 保存设置

### 步骤 7: 等待部署完成

1. 回到仓库主页
2. 点击顶部的 `Actions` 标签
3. 你会看到一个正在运行的工作流（Deploy to GitHub Pages）
4. 等待几分钟，直到显示绿色的 ✓ 标记
5. 部署完成后，你的网站将在以下地址可访问：
   ```
   https://YOUR_USERNAME.github.io/ap-csa-learning/
   ```

## 🔄 后续更新

每次你修改代码并推送到 GitHub 的 `main` 分支时，网站会自动重新部署：

```bash
# 修改代码后...
git add .
git commit -m "描述你的更改"
git push
```

## 🎨 自定义域名（可选）

如果你有自己的域名（比如 `www.myapcsa.com`）：

1. 在域名提供商处添加 CNAME 记录，指向 `YOUR_USERNAME.github.io`
2. 在 GitHub 仓库的 `Settings` → `Pages` 中，在 `Custom domain` 输入你的域名
3. 勾选 `Enforce HTTPS`
4. 修改 `vite.config.ts` 中的 `base` 为 `'/'`

## ❌ 常见问题

### 问题 1: 页面显示 404

**原因**: `base` 配置不正确

**解决方案**: 
- 检查 `vite.config.ts` 中的 `base` 是否与你的仓库名匹配
- 确保 `base` 以 `/` 开头和结尾，例如 `'/ap-csa-learning/'`

### 问题 2: 样式丢失或资源加载失败

**原因**: 路径配置问题

**解决方案**:
- 确保所有资源引用使用相对路径或通过 Vite 的 `import` 导入
- 不要在代码中硬编码绝对路径如 `/assets/image.png`
- 使用 `import logo from './assets/logo.png'` 的方式导入资源

### 问题 3: 路由刷新后 404

**原因**: GitHub Pages 不支持客户端路由

**解决方案**: 创建 `public/404.html` 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AP CSA Learning</title>
    <script>
      // 将 404 重定向到 index.html，保留路径信息
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/ap-csa-learning/'">
  </head>
  <body></body>
</html>
```

然后在 `index.html` 的 `<head>` 中添加：

```html
<script>
  (function() {
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect != location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### 问题 4: Actions 工作流失败

**可能原因**:
- Node.js 版本不兼容
- 依赖安装失败
- 构建错误

**解决方案**:
1. 点击失败的工作流查看详细日志
2. 检查错误信息
3. 在本地运行 `pnpm build` 确保构建成功
4. 修复错误后重新推送

## 📊 监控部署状态

在仓库主页添加部署状态徽章：

在 `README.md` 中添加：

```markdown
![Deploy Status](https://github.com/YOUR_USERNAME/ap-csa-learning/actions/workflows/deploy.yml/badge.svg)
```

## 🔒 私有仓库部署

如果你想使用私有仓库：

1. 升级到 GitHub Pro（学生可以免费获取 GitHub Student Pack）
2. 或者使用其他托管服务如 Vercel、Netlify（支持私有仓库免费部署）

## 📚 相关资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 🎉 完成！

现在你的 AP CSA 学习网站已经成功部署到 GitHub Pages 了！你可以分享链接给同学和老师。

**下一步**: 查看 `ADDING_NEW_CHAPTER.md` 学习如何添加新的章节内容。
