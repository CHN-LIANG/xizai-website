// 滚动修复脚本 - 最简版本
(function() {
    'use strict';
    
    // 确保页面加载完成后启用滚动
    function enableScrolling() {
        // 移除可能阻止滚动的样式
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        
        // 确保所有section都可以滚动
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.overflow = 'visible';
        });
    }
    
    // 主函数
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // 启用滚动
        enableScrolling();
    }
    
    // 启动修复
    init();
    
    // 如果页面已经加载完成，立即执行
    if (document.readyState !== 'loading') {
        init();
    }
    
})();
