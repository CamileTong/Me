## 技术栈
- **Next.js 14** 
- **TypeScript** 
- **Tailwind CSS**
- **Framer Motion** 
- **Gray-matter** 
- **React Hook Form** 
- **Vercel** 

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
pnpm run build
```

### 启动生产服务器

```bash
pnpm start
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

### 修改主题颜色

编辑 `tailwind.config.ts` 文件，修改暖色调配置。

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
- [ ] 搜索功能
- [ ] 评论系统

