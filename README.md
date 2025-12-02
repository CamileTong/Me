# 个人作品展示网站

一个以暖色调为主题的个人作品展示网站，专注于项目展示和引流。采用 minimal 设计理念，强调视觉冲击力和内容更新的便捷性。

## 核心定位

- **作品集**: 展示个人项目作品
- **个人品牌**: 建立个人品牌形象
- **引流工具**: 吸引潜在客户和合作伙伴

## 技术栈

- **Next.js 14** (App Router) - 现代化的 React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 快速构建暖色调 UI
- **Framer Motion** - 流畅动画效果
- **Gray-matter** - Markdown 内容管理
- **React Hook Form** - 表单处理
- **Vercel** - 部署平台

## 功能特性

### 首页
- 简短的个人介绍
- 项目卡片展示（支持悬停动画）
- 暖色调视觉设计

### 私人订制
- 价格表展示
- 定制申请表单
- 功能展示

### 日志
- 双栏时间轴布局
- 左侧：私人日记/感想
- 右侧：开发日志/更新通知
- Markdown 内容支持

### 联系我
- 多种联系方式展示
- 社交媒体链接

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
personal-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── custom/            # 私人订制页
│   ├── blog/              # 日志页
│   ├── contact/           # 联系我页
│   └── api/               # API 路由
├── components/            # 可复用组件
│   ├── layout/           # 布局组件
│   ├── home/             # 首页组件
│   ├── blog/             # 日志组件
│   ├── custom/           # 私人订制组件
│   └── ui/               # UI 组件
├── lib/                   # 工具函数
├── data/                  # 静态数据
│   ├── projects.json     # 项目数据
│   ├── posts/            # 日志 Markdown 文件
│   └── social.json       # 社交媒体链接
├── types/                 # TypeScript 类型定义
└── public/               # 静态资源
```

## 内容更新

### 更新项目

编辑 `data/projects.json` 文件，添加或修改项目信息。详见 [更新指南](./USAGE.md#更新项目)。

### 更新日志

在 `data/posts/diary/` 或 `data/posts/dev/` 目录下创建新的 Markdown 文件。详见 [更新指南](./USAGE.md#更新日志)。

## 配置

### 修改个人信息

编辑 `data/social.json` 文件，更新联系方式。

### 修改主题颜色

编辑 `tailwind.config.ts` 文件，修改暖色调配置。

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 环境变量

如需使用邮件发送功能，需要配置以下环境变量：

- `RESEND_API_KEY` (如果使用 Resend)
- 或其他邮件服务的 API Key

## 开发计划

- [x] 基础项目结构
- [x] 首页和项目展示
- [x] 日志系统
- [x] 私人订制页
- [x] 联系我页
- [ ] 邮件发送功能集成
- [ ] SEO 优化
- [ ] 搜索功能
- [ ] 评论系统

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- Email: your-email@example.com
- GitHub: [your-username](https://github.com/your-username)
