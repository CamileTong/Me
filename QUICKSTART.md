# 快速启动指南

## 第一步：安装依赖

```bash
npm install
```

## 第二步：配置个人信息

### 1. 修改联系方式

编辑 `data/social.json`：

```json
{
  "email": "your-email@example.com",
  "xiaohongshu": "https://www.xiaohongshu.com/user/profile/your-id",
  "qq": "123456789",
  "github": "https://github.com/your-username"
}
```

### 2. 修改网站标题

编辑 `app/layout.tsx`，修改 `metadata`：

```typescript
export const metadata: Metadata = {
  title: '你的网站标题',
  description: '你的网站描述',
};
```

### 3. 修改个人介绍

编辑 `components/home/Hero.tsx`，修改介绍文字。

## 第三步：添加你的项目

编辑 `data/projects.json`，添加你的项目信息。详见 [USAGE.md](./USAGE.md#更新项目)。

## 第四步：添加你的日志

在 `data/posts/diary/` 或 `data/posts/dev/` 目录下创建 Markdown 文件。详见 [USAGE.md](./USAGE.md#更新日志)。

## 第五步：添加图片

- 项目图片：放在 `public/images/projects/` 目录
- 日志配图：放在 `public/images/blog/` 目录

## 第六步：启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 第七步：部署

### 使用 Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 注册/登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 点击 "Deploy"

Vercel 会自动检测 Next.js 项目并完成部署。

### 其他部署方式

参考 Next.js 官方文档：[部署 Next.js 应用](https://nextjs.org/docs/deployment)

## 下一步

- 阅读 [README.md](./README.md) 了解项目详情
- 阅读 [USAGE.md](./USAGE.md) 了解如何更新内容
- 自定义主题颜色（编辑 `tailwind.config.ts`）
- 添加更多功能

## 常见问题

**Q: 如何修改主题颜色？**

A: 编辑 `tailwind.config.ts` 文件中的 `colors.warm` 配置。

**Q: 如何添加新的导航链接？**

A: 编辑 `components/layout/Navigation.tsx` 文件中的 `navItems` 数组。

**Q: 如何修改价格表？**

A: 编辑 `components/custom/PricingTable.tsx` 文件中的 `pricingItems` 数组。

**Q: 如何集成邮件发送功能？**

A: 编辑 `lib/email.ts` 文件，集成 Resend 或其他邮件服务。需要配置环境变量。

---

祝你使用愉快！🎉

