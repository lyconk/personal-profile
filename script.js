document.addEventListener('DOMContentLoaded', () => {
    // 导航栏活跃状态处理
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    // 滚动监听
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-warm-500');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-warm-500');
            }
        });
        
        // 添加滚动触发动画
        animateOnScroll();
    });
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-active');
            }
        });
    }
    
    // 添加动画类
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // 初始化加载动画
    setTimeout(() => {
        document.body.classList.add('loaded');
        animateOnScroll();
    }, 100);
    
    // 添加暗色/亮色模式切换（可选功能，默认注释掉）
    /*
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.classList.add('theme-toggle');
    themeToggle.title = '切换暗/亮模式';
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
    */
    
    // 渐入效果
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.transitionDelay = `${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
});

// 为页面添加一些交互元素
window.addEventListener('load', () => {
    // 创建返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.title = '返回顶部';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-warm-500);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        font-size: 20px;
        box-shadow: 0 4px 10px rgba(234, 88, 12, 0.3);
    `;
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(10px)';
        }
    });
    
    // 为卡片添加悬停效果
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 20px rgba(234, 88, 12, 0.12)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 6px rgba(234, 88, 12, 0.05)';
        });
    });
}); 