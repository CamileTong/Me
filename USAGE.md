# 使用指南

本文档详细说明如何更新项目展示和日志内容。

## 目录

- [更新项目](#更新项目)
- [更新日志](#更新日志)
- [添加图片](#添加图片)
- [修改联系方式](#修改联系方式)
- [部署更新](#部署更新)

---

## 更新项目

### 项目数据结构

项目数据存储在 `data/projects.json` 文件中，格式如下：

```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "项目名称",
      "description": "详细描述（可选，用于详情页）",
      "shortDescription": "简短描述（用于卡片展示）",
      "image": "/images/projects/project-1.jpg",
      "link": "https://example.com",
      "tags": ["React", "Next.js"],
      "date": "2025-01-15",
      "featured": true
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | string | 是 | 项目唯一标识符 |
| `title` | string | 是 | 项目名称 |
| `description` | string | 否 | 详细描述 |
| `shortDescription` | string | 是 | 卡片显示的简短描述 |
| `image` | string | 是 | 项目主图路径（相对于 public 目录） |
| `link` | string | 否 | 项目链接（如果有） |
| `tags` | string[] | 否 | 项目标签数组 |
| `date` | string | 是 | 项目日期（格式：YYYY-MM-DD） |
| `featured` | boolean | 否 | 是否精选项目 |

### 添加新项目

1. **准备项目图片**
   - 将图片放在 `public/images/projects/` 目录下
   - 建议图片尺寸：800x600px 或 1200x800px
   - 支持格式：jpg, png, webp

2. **编辑 `data/projects.json`**
   ```json
   {
     "projects": [
       // ... 现有项目
       {
         "id": "project-new",
         "title": "新项目",
         "description": "这是一个新项目的详细描述",
         "shortDescription": "新项目的简短描述",
         "image": "/images/projects/new-project.jpg",
         "link": "https://new-project.com",
         "tags": ["React", "TypeScript"],
         "date": "2025-01-20",
         "featured": false
       }
     ]
   }
   ```

3. **保存文件并重新部署**

### 修改现有项目

直接编辑 `data/projects.json` 文件中对应项目的字段即可。

### 删除项目

从 `projects` 数组中删除对应的项目对象。

### 示例

```json
{
  "projects": [
    {
      "id": "e-commerce",
      "title": "电商平台",
      "description": "一个功能完整的电商平台，包含商品展示、购物车、支付等功能。",
      "shortDescription": "功能完整的电商平台，支持在线购物和支付",
      "image": "/images/projects/e-commerce.jpg",
      "link": "https://ecommerce.example.com",
      "tags": ["Next.js", "TypeScript", "Stripe"],
      "date": "2025-01-18",
      "featured": true
    }
  ]
}
```

---

## 更新日志

### 日志文件结构

日志文件存储在 `data/posts/` 目录下，分为两个子目录：

- `diary/` - 私人日记/感想
- `dev/` - 开发日志/更新通知

### 文件命名规则

日志文件命名格式：`YYYY-MM-DD-slug.md`

- `YYYY-MM-DD`: 日期（必须）
- `slug`: 简短标识符（用于 URL，建议使用英文和连字符）

示例：
- `2025-12-02-first-diary.md`
- `2025-11-20-new-feature.md`

### Markdown 文件格式

每个日志文件必须包含 front matter（文件头部的 YAML 配置）和正文内容：

```markdown
---
title: 日志标题
date: 2025-12-02
category: diary
excerpt: 这是日志的摘要，会显示在时间轴上
image: /images/blog/blog-image.jpg
---

# 日志标题

这里是日志的正文内容，支持 Markdown 语法。

## 二级标题

可以添加列表：

- 项目 1
- 项目 2

也可以添加代码块：

\`\`\`javascript
console.log('Hello World');
\`\`\`
```

### Front Matter 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 日志标题 |
| `date` | string | 是 | 发布日期（格式：YYYY-MM-DD） |
| `category` | string | 是 | 分类：`diary` 或 `dev` |
| `excerpt` | string | 否 | 摘要（显示在时间轴上） |
| `image` | string | 否 | 配图路径（相对于 public 目录） |

### 添加新日志

#### 添加私人日记

1. **创建 Markdown 文件**
   - 在 `data/posts/diary/` 目录下创建新文件
   - 文件名格式：`YYYY-MM-DD-slug.md`

2. **编写内容**
   ```markdown
   ---
   title: 我的思考
   date: 2025-12-05
   category: diary
   excerpt: 分享一些个人思考和感悟
   ---

   # 我的思考

   今天想分享一些关于...

   ## 主题一

   内容...

   ## 主题二

   内容...
   ```

3. **保存文件并重新部署**

#### 添加开发日志

1. **创建 Markdown 文件**
   - 在 `data/posts/dev/` 目录下创建新文件
   - 文件名格式：`YYYY-MM-DD-slug.md`

2. **编写内容**
   ```markdown
   ---
   title: 新功能发布
   date: 2025-12-05
   category: dev
   excerpt: 记录新功能的开发过程和实现细节
   ---

   # 新功能发布

   今天完成了新功能的开发...

   ## 功能说明

   - 功能 1
   - 功能 2

   ## 技术实现

   使用以下技术栈：

   \`\`\`typescript
   // 代码示例
   \`\`\`
   ```

### 修改现有日志

直接编辑对应的 Markdown 文件即可。

### 删除日志

删除对应的 Markdown 文件即可。

### Markdown 语法支持

日志内容支持完整的 Markdown 语法：

- **标题**: `# H1`, `## H2`, `### H3`
- **粗体**: `**粗体**`
- **斜体**: `*斜体*`
- **链接**: `[链接文本](URL)`
- **图片**: `![alt](image-url)`
- **列表**: `- 项目` 或 `1. 项目`
- **代码块**: ` ```language `
- **引用**: `> 引用内容`
- **表格**: Markdown 表格语法
- **任务列表**: `- [ ] 任务`

### 示例

**文件**: `data/posts/diary/2025-12-05-weekend-thoughts.md`

```markdown
---
title: 周末思考
date: 2025-12-05
category: diary
excerpt: 周末的一些思考和感悟
---

# 周末思考

这个周末我思考了很多关于...

## 关于设计

设计不仅仅是美观，更重要的是...

## 关于技术

技术应该服务于用户，而不是...

## 总结

通过这次思考，我意识到...
```

**文件**: `data/posts/dev/2025-12-05-performance-optimization.md`

```markdown
---
title: 性能优化实践
date: 2025-12-05
category: dev
excerpt: 记录网站性能优化的过程和结果
---

# 性能优化实践

今天对网站进行了性能优化...

## 优化目标

- 减少首屏加载时间
- 优化图片加载
- 减少 JavaScript 包大小

## 实施步骤

### 1. 图片优化

使用 Next.js Image 组件：

\`\`\`tsx
<Image
  src="/images/project.jpg"
  alt="Project"
  width={800}
  height={600}
/>
\`\`\`

### 2. 代码分割

...

## 优化结果

- 首屏加载时间：从 3s 降至 1.5s
- 图片加载：优化 60%
- 包大小：减少 40%

## 总结

通过这次优化，网站性能得到了显著提升...
```

---

## 添加图片

### 项目图片

1. 将图片放在 `public/images/projects/` 目录下
2. 在 `data/projects.json` 中引用：
   ```json
   {
     "image": "/images/projects/your-image.jpg"
   }
   ```

### 日志配图

1. 将图片放在 `public/images/blog/` 目录下
2. 在 Markdown 文件的 front matter 中引用：
   ```yaml
   image: /images/blog/your-image.jpg
   ```
3. 或在正文中使用 Markdown 语法：
   ```markdown
   ![图片描述](/images/blog/your-image.jpg)
   ```

### 图片建议

- **格式**: JPG, PNG, WebP
- **尺寸**: 
  - 项目主图：800x600px 或 1200x800px
  - 日志配图：800x400px 或 1200x600px
- **大小**: 建议压缩后小于 500KB
- **优化**: 可以使用工具如 [TinyPNG](https://tinypng.com/) 压缩图片

---

## 修改联系方式

编辑 `data/social.json` 文件：

```json
{
  "email": "your-email@example.com",
  "xiaohongshu": "https://www.xiaohongshu.com/user/profile/your-id",
  "qq": "123456789",
  "github": "https://github.com/your-username"
}
```

### 字段说明

- `email`: 邮箱地址（必填）
- `xiaohongshu`: 小红书链接（可选）
- `qq`: QQ 号码（可选）
- `github`: GitHub 链接（可选）
- 可以添加其他社交媒体链接

---

## 部署更新

### 本地开发

1. 修改内容文件（`projects.json` 或 Markdown 文件）
2. 保存文件
3. 开发服务器会自动重新加载（如果正在运行 `npm run dev`）

### 生产部署

#### 使用 Vercel（推荐）

1. **提交更改到 Git**
   ```bash
   git add .
   git commit -m "更新项目和日志"
   git push
   ```

2. **自动部署**
   - Vercel 会自动检测到代码更改
   - 自动触发构建和部署
   - 通常几分钟内完成

#### 手动部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署到服务器**
   - 将构建后的 `.next` 目录和静态文件上传到服务器
   - 配置服务器运行 `npm start`

### 验证更新

部署完成后，访问网站验证：

- 检查新项目是否显示在首页
- 检查新日志是否显示在日志页
- 检查图片是否正确加载
- 检查链接是否正常工作

---

## 常见问题

### Q: 项目图片不显示？

A: 检查以下几点：
1. 图片路径是否正确（相对于 `public` 目录）
2. 图片文件是否存在
3. 图片格式是否支持
4. 清除浏览器缓存

### Q: 日志不显示？

A: 检查以下几点：
1. 文件命名格式是否正确（`YYYY-MM-DD-slug.md`）
2. Front matter 格式是否正确（YAML 语法）
3. `category` 字段是否为 `diary` 或 `dev`
4. `date` 字段格式是否正确（`YYYY-MM-DD`）

### Q: Markdown 渲染不正确？

A: 检查以下几点：
1. Markdown 语法是否正确
2. 代码块是否使用正确的语法（三个反引号）
3. 特殊字符是否需要转义

### Q: 如何修改网站标题和描述？

A: 编辑 `app/layout.tsx` 文件中的 `metadata` 对象：

```typescript
export const metadata: Metadata = {
  title: '你的网站标题',
  description: '你的网站描述',
};
```

### Q: 如何修改导航栏链接？

A: 编辑 `components/layout/Navigation.tsx` 文件中的 `navItems` 数组。

---

## 最佳实践

1. **定期更新内容**: 保持网站内容的新鲜度
2. **优化图片**: 压缩图片以提高加载速度
3. **编写清晰的描述**: 项目描述和日志摘要要清晰明了
4. **使用有意义的文件名**: 文件名应该能够反映内容
5. **保持一致性**: 保持内容格式和风格的一致性
6. **备份数据**: 定期备份 `data` 目录下的文件

---

## 需要帮助？

如果遇到问题，可以：

1. 查看项目文档
2. 检查代码注释
3. 提交 Issue 到 GitHub
4. 联系开发者

---

**最后更新**: 2025-01-XX

