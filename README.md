# Astro 博客项目

这是一个基于 [Astro](https://astro.build)、[React](https://reactjs.org) 和 [Tailwind CSS](https://tailwindcss.com) 构建的个人博客项目。它采用了复古/磁带风格的设计。

## 项目结构

该项目遵循标准的 Astro 项目结构：

```text
astro_blog/
├── public/             # 静态资源（字体、图标等）
├── src/
│   ├── components/     # 可复用的 UI 组件（React & Astro）
│   │   ├── Icons.tsx       #SVG 图标
│   │   ├── Navbar.tsx      # 导航栏
│   │   ├── PostCard.tsx    # 博客文章预览卡片
│   │   └── ProfileCard.tsx # 侧边栏个人资料卡片
│   ├── content/        # 内容集合
│   │   ├── config.ts       # 内容架构定义
│   │   └── posts/          # Markdown 博客文章（.md 文件）
│   ├── layouts/        # 页面布局
│   │   └── BaseLayout.astro # 主 HTML 包装器
│   ├── pages/          # 应用路由
│   │   ├──KXindex.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   └── posts/          # 动态文章路由
│   │       └── [...slug].astro
│   ├── styles/         # 全局样式（如有）
│   └── env.d.ts        # TypeScript 声明
├── astro.config.mjs    # Astro 配置
├── tailwind.config.mjs # Tailwind CSS 配置
└── package.json        # 依赖和脚本
```

## 维护指南

### 1. 添加新的博客文章

要添加一篇新文章，请在 `src/content/posts/` 目录下创建一个新的 Markdown 文件。
文件**必须**包含以下格式的头部信息（Frontmatter）：

```markdown
---
title: '你的文章标题'
date: 'YYYY-MM-DD'       # 例如：2023-10-27
tag: '分类名称'           # 可选，默认为 'GENERAL'
excerpt: '文章的简短摘要。'
image: 'https://...'     # 可选，封面图片的 URL
---

# 这里是正文

使用 Markdown 编写你的文章内容。
```

### 2. 图片使用指南

**方式一：本地图片（推荐）**
1. 将图片放入 `public/` 文件夹（建议新建 `public/images/` 文件夹）。
2. 在 Frontmatter 中使用绝对路径引用：
   ```yaml
   image: '/images/my-pic.jpg'  # 对应文件 public/images/my-pic.jpg
   ```

**方式二：在线图片**
直接填写完整的图片 URL 地址即可。

### 3. 修改 UI 组件

- **导航栏：** 编辑 `src/components/Navbar.tsx`。
- **个人信息：** 编辑 `src/components/ProfileCard.tsx` 以更新头像、简介和社交链接。
- **文章预览：** 编辑 `src/components/PostCard.tsx` 以更改文章在列表页的显示方式。
- **图标：** 在 `src/components/Icons.tsx` 中添加或修改 SVG 图标。

### 3. 布局与样式

- **全局布局：** `src/layouts/BaseLayout.astro` 包含了 `<html>`、`<head>` 和 `<body>` 标签，以及全局样式（字体、滚动条等）。
- **样式：** 项目使用 Tailwind CSS。你可以修改 `tailwind.config.mjs` 来自定义主题（如颜色、字体）。

### 4. 配置

- **内容架构：** 如果你想为博客文章添加新字段（例如作者、阅读时间），请更新 `src/content/config.ts` 中的架构定义。
- **Astro 配置：** `astro.config.mjs` 处理 React 和 Tailwind 等集成配置。

## 开发命令

在终端中从项目根目录运行以下命令：

| 命令                      | 作用                                             |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 安装依赖                                         |
| `npm run dev`             | 在 `localhost:4321` 启动本地开发服务器           |
| `npm run build`           | 构建生产环境站点到 `./dist/` 目录                |
| `npm run preview`         | 在本地预览构建后的站点                           |
