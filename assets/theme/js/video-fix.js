// 背景视频修复脚本
(function() {
    'use strict';

    // 等待页面加载完成
    function initVideo() {
        // 查找背景视频section
        const videoSection = document.querySelector('[data-bg-video]');
        if (!videoSection) return;

        // 获取视频URL
        const videoUrl = videoSection.getAttribute('data-bg-video');
        if (!videoUrl) return;

        // 检查是否是YouTube链接
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            // 提取YouTube视频ID
            const videoId = extractYouTubeId(videoUrl);
            if (videoId) {
                // 创建新的视频背景
                createYouTubeBackground(videoSection, videoId);
            }
        }
    }

    // 提取YouTube视频ID
    function extractYouTubeId(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // 创建YouTube背景视频
    function createYouTubeBackground(section, videoId) {
        // 移除现有的视频元素
        const existingVideo = section.querySelector('.mbr-background-video');
        if (existingVideo) {
            existingVideo.remove();
        }

        // 创建新的视频容器
        const videoContainer = document.createElement('div');
        videoContainer.className = 'mbr-background-video';
        videoContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        `;

        // 创建iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
        iframe.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100vw;
            height: 100vh;
            transform: translate(-50%, -50%);
            border: none;
            pointer-events: none;
        `;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');

        // 添加到容器
        videoContainer.appendChild(iframe);
        
        // 插入到section的开头
        section.insertBefore(videoContainer, section.firstChild);

        // 确保内容在视频之上
        const overlay = section.querySelector('.mbr-overlay');
        if (overlay) {
            overlay.style.zIndex = '1';
        }

        // 确保文字内容在视频之上
        const contentElements = section.querySelectorAll('.mbr-section-title, .mbr-text, .mbr-section-btn');
        contentElements.forEach(element => {
            element.style.position = 'relative';
            element.style.zIndex = '2';
        });
    }

    // 备用方案：使用静态背景图片
    function createFallbackBackground(section) {
        // 创建背景图片容器
        const bgContainer = document.createElement('div');
        bgContainer.className = 'mbr-background-image';
        bgContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('assets/images/background1.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: 0;
        `;

        // 插入到section的开头
        section.insertBefore(bgContainer, section.firstChild);
    }

    // 主函数
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // 尝试初始化视频
        try {
            initVideo();
        } catch (error) {
            console.log('视频初始化失败，使用备用背景:', error);
            // 如果视频失败，使用备用背景
            const videoSection = document.querySelector('[data-bg-video]');
            if (videoSection) {
                createFallbackBackground(videoSection);
            }
        }
    }

    // 启动修复
    init();

    // 如果页面已经加载完成，立即执行
    if (document.readyState !== 'loading') {
        init();
    }

})();
