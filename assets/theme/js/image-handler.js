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
      errorText: '图片加载失败，点击重试'
    };
    
    this.init();
  }
  
  init() {
    this.setupImageHandlers();
    this.setupLazyLoading();
    this.setupIntersectionObserver();
  }
  
  // 设置图片处理器
  setupImageHandlers() {
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        this.setupImage(img);
      });
    });
  }
  
  // 设置单个图片
  setupImage(img) {
    // 设置初始状态
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // 添加错误处理
    img.addEventListener('error', (e) => {
      this.handleImageError(img);
    });
    
    // 添加加载成功处理
    img.addEventListener('load', (e) => {
      this.handleImageSuccess(img);
    });
    
    // 如果图片已经加载完成
    if (img.complete) {
      this.handleImageSuccess(img);
    }
  }
  
  // 处理图片加载失败
  handleImageError(img) {
    console.warn('图片加载失败:', img.src);
    
    // 创建错误占位符
    const placeholder = this.createPlaceholder(img, this.config.errorText, 'error');
    
    // 添加重试功能
    placeholder.addEventListener('click', () => {
      this.retryImage(img, placeholder);
    });
    
    // 替换图片
    img.style.display = 'none';
    img.parentNode.insertBefore(placeholder, img);
  }
  
  // 处理图片加载成功
  handleImageSuccess(img) {
    img.style.opacity = '1';
    img.classList.add('image-loaded');
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
    
    return placeholder;
  }
  
  // 重试加载图片
  retryImage(img, placeholder) {
    const currentSrc = img.src;
    const timestamp = new Date().getTime();
    
    // 添加时间戳避免缓存
    img.src = currentSrc.includes('?') 
      ? `${currentSrc}&t=${timestamp}` 
      : `${currentSrc}?t=${timestamp}`;
    
    // 显示图片，隐藏占位符
    img.style.display = 'block';
    placeholder.remove();
  }
  
  // 设置懒加载
  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
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
      console.warn('IntersectionObserver not supported, falling back to scroll events');
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
      console.log('所有图片预加载完成');
    } catch (error) {
      console.warn('部分图片预加载失败:', error);
    }
  }
}

// 创建全局实例
window.imageHandler = new ImageHandler();

// 导出类（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageHandler;
}
