/**
 * 图片加载诊断脚本
 * 用于检测和诊断图片加载问题
 */

class ImageDebugger {
  constructor() {
    this.results = [];
    this.init();
  }

  init() {
    console.log('🔍 开始图片诊断...');
    this.checkAllImages();
    this.checkNetworkStatus();
    this.checkFileAccess();
  }

  // 检查所有图片
  checkAllImages() {
    const images = document.querySelectorAll('img');
    console.log(`📸 发现 ${images.length} 张图片`);

    images.forEach((img, index) => {
      this.analyzeImage(img, index);
    });
  }

  // 分析单个图片
  analyzeImage(img, index) {
    const result = {
      index: index,
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      currentSrc: img.currentSrc,
      status: 'unknown'
    };

    // 检查图片状态
    if (img.complete) {
      if (img.naturalWidth === 0) {
        result.status = 'error';
        result.error = '图片加载失败或损坏';
      } else {
        result.status = 'success';
        result.dimensions = `${img.naturalWidth}x${img.naturalHeight}`;
      }
    } else {
      result.status = 'loading';
    }

    // 添加事件监听器
    img.addEventListener('load', () => {
      result.status = 'success';
      result.dimensions = `${img.naturalWidth}x${img.naturalHeight}`;
      this.updateResult(result);
    });

    img.addEventListener('error', (e) => {
      result.status = 'error';
      result.error = '图片加载失败';
      this.updateResult(result);
    });

    this.results.push(result);
    this.logResult(result);
  }

  // 更新结果
  updateResult(result) {
    const index = this.results.findIndex(r => r.index === result.index);
    if (index !== -1) {
      this.results[index] = result;
      this.logResult(result);
    }
  }

  // 记录结果
  logResult(result) {
    const statusIcon = result.status === 'success' ? '✅' : 
                      result.status === 'error' ? '❌' : '⏳';
    
    console.log(`${statusIcon} 图片${result.index + 1}: ${result.src}`);
    console.log(`   状态: ${result.status}`);
    if (result.dimensions) console.log(`   尺寸: ${result.dimensions}`);
    if (result.error) console.log(`   错误: ${result.error}`);
    console.log('---');
  }

  // 检查网络状态
  checkNetworkStatus() {
    if ('navigator' in window && 'onLine' in navigator) {
      console.log(`🌐 网络状态: ${navigator.onLine ? '在线' : '离线'}`);
    }

    if ('connection' in navigator) {
      const connection = navigator.connection;
      console.log(`📡 连接类型: ${connection.effectiveType || '未知'}`);
      console.log(`📊 下行速度: ${connection.downlink || '未知'} Mbps`);
    }
  }

  // 检查文件访问
  checkFileAccess() {
    // 测试几个关键图片文件
    const testImages = [
      'assets/images/photo-1704022810195-de7199db478c.jpeg',
      'assets/images/background1.jpg',
      'assets/images/photo-1607556114526-058f5efdf49e.jpeg'
    ];

    testImages.forEach(src => {
      this.testImageAccess(src);
    });
  }

  // 测试图片访问
  testImageAccess(src) {
    const img = new Image();
    img.onload = () => {
      console.log(`✅ 文件访问成功: ${src} (${img.naturalWidth}x${img.naturalHeight})`);
    };
    img.onerror = () => {
      console.log(`❌ 文件访问失败: ${src}`);
    };
    img.src = src;
  }

  // 生成诊断报告
  generateReport() {
    console.log('\n📋 图片诊断报告');
    console.log('================');
    
    const successCount = this.results.filter(r => r.status === 'success').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;
    const loadingCount = this.results.filter(r => r.status === 'loading').length;

    console.log(`总图片数: ${this.results.length}`);
    console.log(`✅ 成功: ${successCount}`);
    console.log(`❌ 失败: ${errorCount}`);
    console.log(`⏳ 加载中: ${loadingCount}`);

    if (errorCount > 0) {
      console.log('\n❌ 失败的图片:');
      this.results.filter(r => r.status === 'error').forEach(result => {
        console.log(`   - ${result.src}: ${result.error}`);
      });
    }

    return {
      total: this.results.length,
      success: successCount,
      error: errorCount,
      loading: loadingCount,
      results: this.results
    };
  }
}

// 创建全局实例
window.imageDebugger = new ImageDebugger();

// 5秒后生成报告
setTimeout(() => {
  window.imageDebugger.generateReport();
}, 5000);

// 导出（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageDebugger;
}
