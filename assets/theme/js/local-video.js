// 本地背景视频优化脚本
(function() {
    'use strict';

    // 等待页面加载完成
    function initLocalVideo() {
        const videoElement = document.querySelector('.mbr-background-video video');
        if (!videoElement) return;

        const videoContainer = document.querySelector('.mbr-background-video');
        
        // 添加加载状态类
        videoContainer.classList.add('loading');

        // 视频加载完成后的处理
        videoElement.addEventListener('loadeddata', function() {
            videoContainer.classList.remove('loading');
            console.log('本地背景视频加载完成');
        });

        // 视频播放开始后的处理
        videoElement.addEventListener('play', function() {
            videoContainer.classList.remove('loading');
        });

        // 视频加载失败的处理
        videoElement.addEventListener('error', function() {
            console.log('视频加载失败，使用备用背景图片');
            videoContainer.classList.remove('loading');
            // 隐藏视频，显示备用图片
            videoElement.style.display = 'none';
        });

        // 确保视频自动播放
        videoElement.addEventListener('canplay', function() {
            // 尝试播放视频
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log('自动播放失败:', error);
                    // 如果自动播放失败，显示播放按钮
                    showPlayButton(videoContainer);
                });
            }
        });

        // 移动端优化
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // 移动端降低视频质量以提升性能
            videoElement.style.objectFit = 'cover';
            
            // 移动端暂停时显示播放按钮
            videoElement.addEventListener('pause', function() {
                showPlayButton(videoContainer);
            });
        }

        // 性能优化：滚动时暂停视频
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (videoElement.paused) return;
            
            // 滚动时暂停视频
            videoElement.pause();
            
            // 停止滚动后恢复播放
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                if (!videoElement.paused) return;
                videoElement.play().catch(function(error) {
                    console.log('恢复播放失败:', error);
                });
            }, 1000);
        });
    }

    // 显示播放按钮
    function showPlayButton(container) {
        // 移除现有的播放按钮
        const existingButton = container.querySelector('.play-button');
        if (existingButton) return;

        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '▶';
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid white;
            border-radius: 50%;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
        `;

        playButton.addEventListener('click', function() {
            const video = container.querySelector('video');
            if (video) {
                video.play().then(function() {
                    playButton.style.display = 'none';
                }).catch(function(error) {
                    console.log('手动播放失败:', error);
                });
            }
        });

        playButton.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.9)';
            this.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });

        playButton.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0.7)';
            this.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        container.appendChild(playButton);
    }

    // 视频预加载优化
    function preloadVideo() {
        const videoElement = document.querySelector('.mbr-background-video video');
        if (!videoElement) return;

        // 设置预加载属性
        videoElement.preload = 'metadata';
        
        // 设置视频质量
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('webkit-playsinline', '');
        
        // 移动端优化
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            videoElement.setAttribute('muted', '');
            videoElement.setAttribute('autoplay', '');
        }
    }

    // 主函数
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // 初始化本地视频
        try {
            initLocalVideo();
            preloadVideo();
        } catch (error) {
            console.log('本地视频初始化失败:', error);
        }
    }

    // 启动优化
    init();

    // 如果页面已经加载完成，立即执行
    if (document.readyState !== 'loading') {
        init();
    }

})();
