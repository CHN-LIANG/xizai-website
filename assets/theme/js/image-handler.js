/**
 * 熙载咨询网站图片处理模块
 * 功能：错误处理、懒加载、图片优化
 */

class ImageHandler {
  constructor() {
    this.config = {
      lazyLoadThreshold: 0.1, // 懒加载阈值
      retryAttempts: 3,        // 重试次数
      placeholderText: '图片加载中...',
      errorText: '图片加载失败，点击重试',
      debug: true              // 启用调试模式
    };
    
    this.init();
  }
  
  init() {
    if (this.config.debug) {
      console.log('🖼️ 图片处理器初始化...');
    }
    
    this.setupImageHandlers();
    this.setupLazyLoading();
    this.setupIntersectionObserver();
    
    if (this.config.debug) {
      console.log('✅ 图片处理器初始化完成');
    }
  }
  
  // 设置图片处理器
  setupImageHandlers() {
    // 立即处理已存在的图片
    this.processExistingImages();
    
    // 监听DOM变化，处理动态添加的图片
    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // 元素节点
              if (node.tagName === 'IMG') {
                this.setupImage(node);
              } else {
                const images = node.querySelectorAll && node.querySelectorAll('img');
                if (images) {
                  images.forEach(img => this.setupImage(img));
                }
              }
            }
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  
  // 处理已存在的图片
  processExistingImages() {
    const images = document.querySelectorAll('img');
    if (this.config.debug) {
      console.log(`📸 发现 ${images.length} 张图片，开始处理...`);
    }
    
    images.forEach((img, index) => {
      this.setupImage(img, index);
    });
  }
  
  // 设置单个图片
  setupImage(img, index = 0) {
    if (this.config.debug) {
      console.log(`🔧 设置图片 ${index + 1}: ${img.src}`);
    }
    
    // 设置初始状态
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // 添加错误处理
    img.addEventListener('error', (e) => {
      if (this.config.debug) {
        console.warn(`❌ 图片加载失败: ${img.src}`);
      }
      this.handleImageError(img);
    });
    
    // 添加加载成功处理
    img.addEventListener('load', (e) => {
      if (this.config.debug) {
        console.log(`✅ 图片加载成功: ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
      }
      this.handleImageSuccess(img);
    });
    
    // 如果图片已经加载完成
    if (img.complete) {
      if (img.naturalWidth === 0) {
        if (this.config.debug) {
          console.warn(`⚠️ 图片已加载但尺寸为0: ${img.src}`);
        }
        this.handleImageError(img);
      } else {
        if (this.config.debug) {
          console.log(`✅ 图片已加载: ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
        }
        this.handleImageSuccess(img);
      }
    }
  }
  
  // 处理图片加载失败
  handleImageError(img) {
    // 创建错误占位符
    const placeholder = this.createPlaceholder(img, this.config.errorText, 'error');
    
    // 添加重试功能
    placeholder.addEventListener('click', () => {
      if (this.config.debug) {
        console.log(`🔄 重试加载图片: ${img.src}`);
      }
      this.retryImage(img, placeholder);
    });
    
    // 替换图片
    img.style.display = 'none';
    img.parentNode.insertBefore(placeholder, img);
    
    // 添加重试计数器
    if (!img.retryCount) {
      img.retryCount = 0;
    }
  }
  
  // 处理图片加载成功
  handleImageSuccess(img) {
    img.style.opacity = '1';
    img.classList.add('image-loaded');
    
    // 移除重试计数器
    if (img.retryCount) {
      delete img.retryCount;
    }
  }
  
  // 创建占位符
  createPlaceholder(img, text, type = 'loading') {
    const placeholder = document.createElement('div');
    placeholder.className = `img-placeholder img-${type}`;
    placeholder.innerHTML = `<div>${text}</div>`;
    
    // 复制图片的样式
    placeholder.style.width = img.style.width || '100%';
    placeholder.style.height = img.style.height || '100%';
    placeholder.style.minHeight = '100px';
    placeholder.style.cursor = type === 'error' ? 'pointer' : 'default';
    
    // 添加样式
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.backgroundColor = type === 'error' ? '#f8d7da' : '#d1ecf1';
    placeholder.style.color = type === 'error' ? '#721c24' : '#0c5460';
    placeholder.style.border = `2px solid ${type === 'error' ? '#f5c6cb' : '#bee5eb'}`;
    placeholder.style.borderRadius = '8px';
    placeholder.style.fontSize = '14px';
    placeholder.style.fontWeight = 'bold';
    
    return placeholder;
  }
  
  // 重试加载图片
  retryImage(img, placeholder) {
    if (!img.retryCount) {
      img.retryCount = 0;
    }
    
    if (img.retryCount >= this.config.retryAttempts) {
      if (this.config.debug) {
        console.warn(`❌ 图片重试次数已达上限: ${img.src}`);
      }
      placeholder.innerHTML = '<div>图片加载失败，请检查网络连接</div>';
      return;
    }
    
    img.retryCount++;
    
    const currentSrc = img.src;
    const timestamp = new Date().getTime();
    
    // 添加时间戳避免缓存
    img.src = currentSrc.includes('?') 
      ? `${currentSrc}&t=${timestamp}` 
      : `${currentSrc}?t=${timestamp}`;
    
    // 显示图片，隐藏占位符
    img.style.display = 'block';
    placeholder.remove();
    
    if (this.config.debug) {
      console.log(`🔄 第 ${img.retryCount} 次重试: ${img.src}`);
    }
  }
  
  // 设置懒加载
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    if (this.config.debug) {
      console.log(`🦥 设置 ${images.length} 张图片的懒加载`);
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadLazyImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      threshold: this.config.lazyLoadThreshold
    });

    images.forEach(img => imageObserver.observe(img));
  }
  
  // 加载懒加载图片
  loadLazyImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    if (this.config.debug) {
      console.log(`🦥 懒加载图片: ${src}`);
    }

    // 创建加载占位符
    const placeholder = this.createPlaceholder(img, this.config.placeholderText, 'loading');
    img.parentNode.insertBefore(placeholder, img);
    img.style.display = 'none';

    // 创建新图片对象
    const newImg = new Image();
    newImg.onload = () => {
      img.src = src;
      img.removeAttribute('data-src');
      img.style.display = 'block';
      placeholder.remove();
      this.handleImageSuccess(img);
    };

    newImg.onerror = () => {
      this.handleImageError(img);
      placeholder.remove();
    };

    newImg.src = src;
  }
  
  // 设置交叉观察器
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      if (this.config.debug) {
        console.warn('⚠️ IntersectionObserver not supported, falling back to scroll events');
      }
      this.setupScrollFallback();
    }
  }
  
  // 滚动回退方案
  setupScrollFallback() {
    let ticking = false;
    
    const updateImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        if (this.isElementInViewport(img)) {
          this.loadLazyImage(img);
        }
      });
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateImages);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
  }
  
  // 检查元素是否在视口中
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // 预加载图片
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }
  
  // 批量预加载图片
  async preloadImages(srcs) {
    const promises = srcs.map(src => this.preloadImage(src));
    try {
      await Promise.all(promises);
      if (this.config.debug) {
        console.log('✅ 所有图片预加载完成');
      }
    } catch (error) {
      if (this.config.debug) {
        console.warn('⚠️ 部分图片预加载失败:', error);
      }
    }
  }
  
  // 获取统计信息
  getStats() {
    const images = document.querySelectorAll('img');
    const loaded = document.querySelectorAll('img.image-loaded').length;
    const total = images.length;
    
    return {
      total: total,
      loaded: loaded,
      failed: total - loaded,
      successRate: total > 0 ? (loaded / total * 100).toFixed(1) : 0
    };
  }
  
  // 生成诊断报告
  generateReport() {
    const stats = this.getStats();
    const report = {
      timestamp: new Date().toISOString(),
      stats: stats,
      config: this.config,
      userAgent: navigator.userAgent,
      online: navigator.onLine
    };
    
    if (this.config.debug) {
      console.log('📊 图片加载统计报告:', report);
    }
    
    return report;
  }
}

// 等待DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.imageHandler = new ImageHandler();
  });
} else {
  window.imageHandler = new ImageHandler();
}

// 导出类（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageHandler;
}
