# 🚀 快速开始指南

这是一个简化版的快速开始指南，帮助你在 5 分钟内将网站部署到 GitHub Pages。

## ⚡ 5分钟部署

### 步骤 1: 创建 GitHub 仓库 (1分钟)

1. 访问 https://github.com/new
2. 输入仓库名称，例如 `ap-csa-learning`
3. 选择 **Public**
4. **不要**勾选任何初始化选项
5. 点击 **Create repository**

### 步骤 2: 修改配置文件 (2分钟)

在项目根目录找到 `vite.config.ts`，修改 `base` 配置：

```typescript
export default defineConfig({
  // ... 其他配置
  base: '/ap-csa-learning/',  // 改成你的仓库名！
});
```

**⚠️ 重要**: 
- 如果你的仓库名是 `my-website`，就改成 `'/my-website/'`
- 注意前后都要有斜杠 `/`

### 步骤 3: 推送代码 (1分钟)

在项目根目录打开终端，运行：

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换成你的用户名和仓库名）
git remote add origin https://github.com/你的用户名/ap-csa-learning.git

# 推送
git push -u origin main
```

**如果推送失败**，可能需要先配置 Git：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 步骤 4: 启用 GitHub Pages (1分钟)

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 **Source** 下拉菜单选择 **GitHub Actions**
5. 等待几分钟，部署完成！

### 步骤 5: 访问网站

部署完成后，你的网站地址是：

```
https://你的用户名.github.io/ap-csa-learning/
```

例如：`https://john-doe.github.io/ap-csa-learning/`

## 🎉 完成！

现在你可以分享这个链接给同学和老师了！

## 🔄 更新网站

以后每次修改代码后，只需要：

```bash
git add .
git commit -m "描述你的更改"
git push
```

网站会自动更新（需要等待 2-3 分钟）。

## ❓ 常见问题

### Q: 页面显示 404

**A**: 检查 `vite.config.ts` 中的 `base` 配置是否与仓库名匹配。

### Q: 样式丢失

**A**: 确保 `base` 配置正确，并且以 `/` 开头和结尾。

### Q: 部署失败

**A**: 
1. 进入仓库的 **Actions** 标签
2. 点击失败的工作流查看错误信息
3. 通常是依赖安装或构建错误
4. 在本地运行 `pnpm build` 检查是否有错误

### Q: 如何查看部署状态

**A**: 
1. 进入仓库主页
2. 点击顶部的 **Actions** 标签
3. 查看最新的工作流运行状态
4. 绿色 ✓ 表示成功，红色 ✗ 表示失败

## 📚 下一步

- 查看 [GitHub Pages 完整部署指南](./GITHUB_DEPLOYMENT.md)
- 学习 [如何添加新章节](./ADDING_NEW_CHAPTER.md)
- 阅读 [项目结构说明](./PROJECT_STRUCTURE.md)

## 💡 提示

### 本地测试

在推送到 GitHub 之前，先在本地测试：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 在浏览器打开 http://localhost:3000
```

### 构建测试

确保构建成功：

```bash
pnpm build
```

如果有错误，修复后再推送。

### 预览构建结果

```bash
pnpm preview
```

这会启动一个本地服务器预览构建后的网站。

## 🎨 自定义

### 修改网站标题

编辑 `client/index.html`：

```html
<title>你的网站标题</title>
```

### 修改主页内容

编辑 `client/src/pages/Home.tsx`

### 添加新页面

查看 [添加新章节指南](./ADDING_NEW_CHAPTER.md)

## 🔒 隐私设置

如果你想让仓库保持私有：

1. 升级到 GitHub Pro（学生可免费获取）
2. 或使用 Vercel/Netlify 等支持私有仓库的服务

## 📞 需要帮助？

- 查看完整文档
- 开启一个 Issue
- 联系老师或同学

---

**祝你部署顺利！🎉**
