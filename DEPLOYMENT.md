# 文章系统部署说明

## 问题说明
当前文章系统使用 `localStorage` 存储，只能在发布文章的本地设备上看到。

## 解决方案

### 方案1：使用JSON文件存储（推荐）
1. 文章数据保存在 `data/articles.json` 文件中
2. 所有访问者都能看到文章
3. 需要手动更新JSON文件

### 方案2：GitHub Actions完全自动化（强烈推荐）
1. 发布文章后自动生成JSON文件
2. 自动提交到Git并推送到GitHub
3. 自动部署到GitHub Pages
4. **完全无需手动操作！**

## 当前实现
- ✅ 已创建示例文章 `data/articles.json`
- ✅ 已修改代码优先从JSON文件加载
- ✅ 已实现自动生成JSON文件功能
- ✅ 已创建GitHub Actions自动部署工作流
- ✅ 发布文章后自动提交到Git并部署
- ✅ 完全自动化，无需手动操作

## 部署步骤

### 1. 初始部署
```bash
git add .github/workflows/auto-deploy.yml data/articles.json news/index.html contact/index.html
git commit -m "添加GitHub Actions自动部署，实现文章完全自动化发布"
git push origin main
```

### 2. 日常文章发布流程
1. **发布文章**：在联系页面填写并提交文章
2. **自动处理**：系统自动生成JSON文件并提交到Git
3. **自动部署**：GitHub Actions自动部署到GitHub Pages
4. **完成**：几分钟后其他设备就能看到文章！

### 3. 自动化优势
- ✅ **零手动操作**：发布文章后什么都不用做
- ✅ **实时同步**：自动部署到所有设备
- ✅ **完全免费**：使用GitHub免费服务
- ✅ **可靠稳定**：GitHub Actions保证部署成功

### 3. 测试访问
- 在不同设备上访问网站
- 检查文章是否正常显示

## 注意事项
- JSON文件需要手动更新
- 建议定期备份文章数据
- 考虑使用数据库存储（长期方案）
