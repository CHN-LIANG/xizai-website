# 🎥 本地背景视频设置指南

## 📋 概述
本指南将帮助你用本地的4K视频替换首页失效的YouTube背景视频。

## 🚀 快速设置步骤

### 步骤1：准备视频文件
1. **复制视频文件**：将你的4K视频文件复制到 `assets/images/` 目录
2. **重命名**：建议重命名为 `background-video.mp4`
3. **文件位置**：`assets/images/background-video.mp4`

### 步骤2：视频格式要求
- **格式**：MP4（推荐）
- **编码**：H.264
- **分辨率**：4K (3840x2160) 或 1080p (1920x1080)
- **帧率**：24fps 或 30fps
- **比特率**：建议不超过 10Mbps（4K）或 5Mbps（1080p）

### 步骤3：文件大小优化
由于你的视频是200多MB，建议进行以下优化：

#### 使用FFmpeg压缩（推荐）
```bash
# 压缩4K视频到1080p，大幅减少文件大小
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# 或者压缩到720p，进一步减少文件大小
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

#### 在线工具压缩
- **HandBrake**：免费开源视频压缩工具
- **Online Video Converter**：在线压缩工具
- **CloudConvert**：支持多种格式转换

## 🔧 技术实现详情

### 已完成的修改

#### 1. HTML结构更新 (`index.html`)
- 移除了YouTube视频嵌入
- 添加了本地HTML5视频元素
- 包含备用背景图片

#### 2. CSS样式优化 (`assets/theme/css/video-background.css`)
- 响应式视频布局
- 移动端优化
- 性能优化样式
- 加载状态指示

#### 3. JavaScript功能 (`assets/theme/js/local-video.js`)
- 自动播放优化
- 移动端兼容性
- 性能优化（滚动时暂停）
- 错误处理和备用方案

### 视频元素特性
```html
<video autoplay muted loop playsinline>
  <source src="assets/images/background-video.mp4" type="video/mp4">
  <!-- 备用背景图片 -->
  <img src="assets/images/background1.jpg" alt="背景图片">
</video>
```

- **autoplay**：自动播放
- **muted**：静音播放（移动端必需）
- **loop**：循环播放
- **playsinline**：移动端内联播放

## 📱 移动端优化

### 自动播放策略
- 移动端自动播放可能被阻止
- 提供手动播放按钮
- 滚动时暂停视频以节省电量

### 性能优化
- 移动端降低视频质量
- 使用 `object-fit: cover` 确保覆盖
- 预加载优化

## 🎯 自定义选项

### 修改视频路径
如果你想使用不同的文件名，修改以下位置：
1. `index.html` 中的 `src="assets/images/background-video.mp4"`
2. 确保文件存在于指定路径

### 调整视频样式
在 `assets/theme/css/video-background.css` 中：
```css
/* 调整视频透明度 */
.mbr-background-video video {
  opacity: 0.8; /* 0.0-1.0 */
}

/* 调整视频位置 */
.mbr-background-video video {
  object-position: center center; /* 居中显示 */
}
```

### 修改播放行为
在 `assets/theme/js/local-video.js` 中：
```javascript
// 禁用滚动时暂停功能
// 注释掉或删除相关代码

// 修改自动播放延迟
setTimeout(function() {
  videoElement.play();
}, 2000); // 2秒后播放
```

## 🚨 常见问题解决

### 视频无法播放
1. **检查文件路径**：确保视频文件在正确位置
2. **检查文件格式**：确保是MP4格式
3. **检查文件权限**：确保文件可读
4. **检查浏览器支持**：现代浏览器支持MP4

### 视频加载缓慢
1. **压缩视频文件**：减少文件大小
2. **降低分辨率**：从4K降到1080p或720p
3. **优化编码**：使用H.264编码
4. **启用CDN**：如果部署到服务器

### 移动端问题
1. **自动播放失败**：点击播放按钮手动播放
2. **性能问题**：降低视频质量
3. **兼容性问题**：确保使用现代浏览器

## 📊 性能建议

### 文件大小建议
- **桌面端**：最大 50MB
- **移动端**：最大 20MB
- **4K视频**：压缩到1080p或720p

### 编码建议
- **视频编码**：H.264
- **音频编码**：AAC
- **关键帧间隔**：2秒
- **比特率**：根据分辨率调整

### 服务器配置
如果部署到服务器，建议：
- 启用Gzip压缩
- 配置适当的缓存头
- 使用CDN加速
- 启用HTTP/2

## 🔍 测试检查清单

- [ ] 视频文件已复制到正确位置
- [ ] 视频格式为MP4
- [ ] 文件大小合理（建议<50MB）
- [ ] 桌面端自动播放正常
- [ ] 移动端播放正常
- [ ] 备用背景图片显示正常
- [ ] 页面滚动性能良好
- [ ] 不同浏览器兼容性测试

## 📞 技术支持

如果遇到问题：
1. 检查浏览器控制台错误信息
2. 确认文件路径和格式
3. 测试不同的视频文件
4. 检查网络和服务器配置

## 🎉 完成！

设置完成后，你的首页将显示本地4K视频作为背景，提供更好的用户体验和加载性能！
