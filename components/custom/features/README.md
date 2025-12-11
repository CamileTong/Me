# 碎片功能使用说明

## 功能列表

### 1. 戳戳乐 (PokeFun)
- **功能**：点击 GIF 区域，随机显示文字泡
- **配置**：在 `featuresConfig.ts` 中修改 `messages` 数组
- **GIF 替换**：将 GIF 文件放在 `public/images/features/poke-placeholder.gif`，或修改配置中的 `gif` 路径

### 2. 字卡 (WordCard)
- **功能**：左侧输入文字保存，右侧点击随机抽取
- **存储**：使用 localStorage，key 为 `wordcard-items`
- **使用**：输入文字，用逗号或换行分隔，点击"保存"后即可抽取

### 3. 不同的表情 (EmojiSwitch)
- **功能**：双击 GIF1 切换到 GIF2，播放完成后自动切回
- **GIF 替换**：
  - GIF1: `public/images/features/emoji1-placeholder.gif`
  - GIF2: `public/images/features/emoji2-placeholder.gif`
- **时长配置**：在 `featuresConfig.ts` 中修改 `gif1Duration` 和 `gif2Duration`

## 添加新功能

1. 在 `components/custom/features/` 目录下创建新组件
2. 在 `featuresConfig.ts` 中添加配置：

```typescript
{
  id: 'new-feature',
  title: '新功能',
  component: NewFeature,
  props: {
    // 配置项
  },
}
```

3. 组件会自动显示在功能展示区

## GIF 替换步骤

1. 将 GIF 文件放入 `public/images/features/` 目录
2. 修改 `featuresConfig.ts` 中对应功能的 `gif` 路径
3. 如果使用占位符路径，直接替换同名文件即可

