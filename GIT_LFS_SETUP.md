# 🚀 Git LFS 设置指南

## 📋 概述
由于您的网站包含大文件（如68.5M的视频文件），GitHub有100MB的文件大小限制。Git LFS（Large File Storage）可以解决这个问题。

## 🔧 安装 Git LFS

### Windows 用户
```bash
# 使用 Chocolatey
choco install git-lfs

# 或下载安装包
# 访问：https://git-lfs.github.com/
```

### macOS 用户
```bash
# 使用 Homebrew
brew install git-lfs

# 或使用 MacPorts
sudo port install git-lfs
```

### Linux 用户
```bash
# Ubuntu/Debian
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs

# CentOS/RHEL
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.rpm.sh | sudo bash
sudo yum install git-lfs
```

## ⚙️ 配置 Git LFS

### 1. 初始化 Git LFS
```bash
# 在项目目录中运行
git lfs install
```

### 2. 跟踪大文件
```bash
# 跟踪视频文件
git lfs track "*.mp4"

# 跟踪图片文件
git lfs track "*.jpg"
git lfs track "*.jpeg"
git lfs track "*.png"

# 跟踪其他大文件类型
git lfs track "*.pdf"
git lfs track "*.zip"
```

### 3. 提交 .gitattributes 文件
```bash
git add .gitattributes
git commit -m "配置 Git LFS 跟踪大文件"
```

## 📁 文件管理

### 添加大文件
```bash
# 正常添加文件
git add assets/images/background-video.mp4
git add assets/images/*.jpeg

# 提交更改
git commit -m "添加背景视频和图片资源"
```

### 推送到 GitHub
```bash
# 推送所有分支和标签
git push --all

# 或推送当前分支
git push origin main
```

## 🔍 验证设置

### 检查 LFS 状态
```bash
# 查看 LFS 跟踪的文件
git lfs ls-files

# 查看 LFS 状态
git lfs status
```

### 检查文件大小
```bash
# 查看仓库中的大文件
git lfs ls-files | xargs ls -lh
```

## 🚨 常见问题解决

### 问题1：文件仍然过大
**解决方案**：
1. 确保已安装 Git LFS
2. 检查 `.gitattributes` 文件配置
3. 重新添加文件：`git rm --cached <file>` 然后 `git add <file>`

### 问题2：推送失败
**解决方案**：
1. 检查网络连接
2. 确保 GitHub 账户有足够权限
3. 尝试分批推送文件

### 问题3：克隆仓库后文件显示为指针
**解决方案**：
```bash
# 拉取 LFS 文件
git lfs pull

# 或克隆时包含 LFS 文件
git clone --recurse-submodules <repository-url>
```

## 📊 文件大小建议

### 推荐文件大小
- **视频文件**：< 100MB（GitHub 限制）
- **图片文件**：< 10MB
- **文档文件**：< 50MB

### 优化建议
1. **视频压缩**：使用 FFmpeg 压缩到 1080p 或 720p
2. **图片优化**：使用 WebP 格式，压缩 JPEG 质量
3. **文档压缩**：转换为 PDF 或压缩格式

## 🎯 最佳实践

### 1. 定期清理
```bash
# 清理未使用的 LFS 文件
git lfs prune
```

### 2. 备份策略
- 重要文件备份到云存储
- 使用多个 Git 仓库备份
- 定期检查 LFS 状态

### 3. 团队协作
- 确保所有成员安装 Git LFS
- 在 README 中添加 LFS 安装说明
- 定期同步 LFS 配置

## 🔗 相关链接

- [Git LFS 官网](https://git-lfs.github.com/)
- [GitHub 文件大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
- [FFmpeg 视频压缩指南](https://ffmpeg.org/documentation.html)

## ✅ 完成检查清单

- [ ] 安装 Git LFS
- [ ] 初始化 LFS 配置
- [ ] 配置 `.gitattributes` 文件
- [ ] 跟踪大文件类型
- [ ] 提交 LFS 配置
- [ ] 测试文件上传
- [ ] 验证 GitHub 显示正常

## 🎉 完成！

设置完成后，您就可以正常上传大文件到 GitHub 了！如果遇到问题，请参考常见问题解决方案或联系技术支持。
