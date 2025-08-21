# 文章系统部署说明

## 问题说明
当前文章系统使用 `localStorage` 存储，只能在发布文章的本地设备上看到。

## 解决方案

### 方案1：使用JSON文件存储（推荐）
1. 文章数据保存在 `data/articles.json` 文件中
2. 所有访问者都能看到文章
3. 需要手动更新JSON文件

### 方案2：使用服务器API（完整解决方案）
1. 创建 `/api/update-articles` 接口
2. 文章自动保存到服务器
3. 实时同步到所有设备

## 当前实现
- ✅ 已创建示例文章 `data/articles.json`
- ✅ 已修改代码优先从JSON文件加载
- ✅ 已添加API调用逻辑（需要服务器支持）

## 部署步骤

### 1. 上传文件到服务器
```bash
git add data/articles.json news/index.html contact/index.html
git commit -m "添加文章数据文件，支持多设备访问"
git push origin main
```

### 2. 确保服务器支持
- 确保 `data/articles.json` 文件可访问
- 如果需要实时更新，配置服务器API

### 3. 测试访问
- 在不同设备上访问网站
- 检查文章是否正常显示

## 注意事项
- JSON文件需要手动更新
- 建议定期备份文章数据
- 考虑使用数据库存储（长期方案）
