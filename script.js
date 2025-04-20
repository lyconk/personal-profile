document.addEventListener('DOMContentLoaded', () => {
    // 创建Matrix代码雨效果
    createMatrixRain();

    // 初始化粒子效果（如果存在）
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00ff41"
                },
                "shape": {
                    "type": "char",
                    "character": {
                        "value": ["0", "1"],
                        "font": "Share Tech Mono",
                        "style": "",
                        "weight": "400"
                    },
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 10,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 5,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ff41",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.6
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

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
            link.classList.remove('active');
            
            if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-warm-500');
                link.classList.add('active');
            }
        });
        
        // 添加滚动触发动画
        animateOnScroll();
    });
    
    // 平滑滚动
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
                
                // 添加矩阵故障效果
                addMatrixEffect(link);
                
                // 添加声音效果
                playMatrixSound('click');
            });
        }
    });
    
    // 滚动动画
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-active');
                
                // 延迟添加扫描线效果
                setTimeout(() => {
                    element.classList.add('scanned');
                }, 500);
            }
        });
    }
    
    // 添加Matrix效果到元素
    function addMatrixEffect(element) {
        // 添加故障效果
        const text = element.textContent;
        const originalText = text;
        
        // 创建故障文本
        element.innerHTML = `<span class="glitch">${text}</span>`;
        const glitch = element.querySelector('.glitch');
        
        // 故障效果动画
        let iterations = 0;
        const maxIterations = 10;
        const interval = setInterval(() => {
            if (iterations < maxIterations) {
                let scrambledText = '';
                
                // 随机字符替换
                for (let i = 0; i < text.length; i++) {
                    if (Math.random() < 0.3) {
                        const randomChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                        scrambledText += randomChar;
                    } else {
                        scrambledText += text[i];
                    }
                }
                
                glitch.textContent = scrambledText;
                iterations++;
            } else {
                clearInterval(interval);
                glitch.textContent = originalText;
                
                // 移除故障类
                setTimeout(() => {
                    element.textContent = originalText;
                }, 200);
            }
        }, 50);
    }
    
    // 添加页面元素到滚动动画
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // 为标题添加终端效果
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.classList.add('typewriter');
    });
    
    // 矩阵风格的点击波纹效果
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function(e) {
            addRippleEffect(e, this);
            playMatrixSound('click');
        });
    });
    
    // 创建黑客帝国风格的波纹效果
    function addRippleEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.backgroundColor = 'rgba(0, 255, 65, 0.3)';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // 创建Matrix代码雨背景
    function createMatrixRain() {
        const matrixBg = document.createElement('div');
        matrixBg.classList.add('matrix-code-bg');
        document.body.appendChild(matrixBg);
        
        // Matrix字符集
        const chars = "01010101アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        // 创建多个代码雨列
        for (let i = 0; i < 30; i++) {
            const column = document.createElement('span');
            column.style.left = `${Math.random() * 100}%`;
            column.style.animationDuration = `${5 + Math.random() * 15}s`;
            column.style.fontSize = `${Math.random() * 10 + 10}px`;
            
            // 生成随机Matrix字符
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += chars[Math.floor(Math.random() * chars.length)];
            }
            
            column.textContent = text;
            matrixBg.appendChild(column);
        }
    }
    
    // 给文档添加黑客帝国风格的光标跟踪效果
    const cursorTrail = document.createElement('div');
    cursorTrail.classList.add('cursor-trail');
    document.body.appendChild(cursorTrail);
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.style.left = `${e.clientX}px`;
        cursorTrail.style.top = `${e.clientY}px`;
        
        // 随机生成1和0的痕迹
        if (Math.random() > 0.97) {
            const digit = document.createElement('span');
            digit.textContent = Math.random() > 0.5 ? '1' : '0';
            digit.style.position = 'absolute';
            digit.style.color = '#00ff41';
            digit.style.left = `${e.clientX + (Math.random() * 40 - 20)}px`;
            digit.style.top = `${e.clientY + (Math.random() * 40 - 20)}px`;
            digit.style.fontSize = `${Math.random() * 12 + 8}px`;
            digit.style.opacity = '0.8';
            digit.style.pointerEvents = 'none';
            document.body.appendChild(digit);
            
            // 淡出并移除
            setTimeout(() => {
                digit.style.transition = 'opacity 1s, transform 1s';
                digit.style.opacity = '0';
                digit.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    digit.remove();
                }, 1000);
            }, 300);
        }
    });
    
    // 创建终端启动动画
    createBootSequence();
    
    // Matrix音效
    function playMatrixSound(type) {
        let sound;
        
        if (type === 'boot') {
            sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhMUABICEVDR0a0AMAAAANAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
        } else if (type === 'click') {
            sound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB7QdEUABICEVur/pXgAAAANAAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tAxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
        }
        
        if (sound) {
            sound.volume = 0.3;
            sound.play().catch(e => console.log('Audio play prevented:', e));
        }
    }
    
    // 创建终端启动序列
    function createBootSequence() {
        const bootScreen = document.createElement('div');
        bootScreen.id = 'boot-screen';
        bootScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: black;
            color: #00ff41;
            font-family: 'Share Tech Mono', monospace;
            z-index: 9999;
            padding: 2rem;
            box-sizing: border-box;
            overflow: hidden;
        `;
        
        document.body.appendChild(bootScreen);
        
        // 启动序列内容
        const bootText = [
            { text: "正在初始化系统...", delay: 500 },
            { text: "载入黑客帝国协议...", delay: 800 },
            { text: "正在连接矩阵...", delay: 1200 },
            { text: "启动安全模块...", delay: 600 },
            { text: "正在解码现实...", delay: 1000 },
            { text: "系统启动完成", delay: 800 }
        ];
        
        // 播放启动音效
        playMatrixSound('boot');
        
        // 显示启动文本
        let currentLine = 0;
        let bootInterval = setInterval(() => {
            if (currentLine < bootText.length) {
                const line = document.createElement('div');
                line.textContent = `> ${bootText[currentLine].text}`;
                line.style.marginBottom = '1rem';
                bootScreen.appendChild(line);
                
                currentLine++;
                
                // 自动滚动到底部
                bootScreen.scrollTop = bootScreen.scrollHeight;
            } else {
                clearInterval(bootInterval);
                
                // 添加最终消息并淡出
                setTimeout(() => {
                    const finalMessage = document.createElement('div');
                    finalMessage.textContent = "> 欢迎进入矩阵...";
                    finalMessage.style.color = '#39ff14';
                    finalMessage.style.fontSize = '1.5rem';
                    finalMessage.style.fontWeight = 'bold';
                    bootScreen.appendChild(finalMessage);
                    
                    // 淡出启动屏幕
                    setTimeout(() => {
                        bootScreen.style.transition = 'opacity 1s ease';
                        bootScreen.style.opacity = '0';
                        
                        setTimeout(() => {
                            bootScreen.remove();
                        }, 1000);
                    }, 1500);
                }, 1000);
            }
        }, 1000);
    }
});

// 创建返回顶部按钮和全局CSS效果
window.addEventListener('load', () => {
    // 创建Matrix返回顶部按钮
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.title = '返回顶部';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.7);
        color: #00ff41;
        border: 1px solid #00ff41;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 20px;
        box-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
    `;
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 播放黑客帝国声音
        playMatrixSound();
        addMatrixGlitchEffect(backToTopButton);
    });
    
    // 监听滚动显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });
    
    // 添加Matrix风格CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Matrix风格光标 */
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 1px solid #00ff41;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            mix-blend-mode: difference;
            transition: width 0.2s, height 0.2s;
            z-index: 9999;
        }
        
        /* Matrix风格波纹效果 */
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            border: 1px solid #00ff41;
            transform: scale(0);
            animation: matrixRipple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes matrixRipple {
            to {
                transform: scale(2.5);
                opacity: 0;
                border-width: 0.1px;
            }
        }
        
        /* 扫描线效果 */
        .scanned::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: #00ff41;
            opacity: 0.7;
            box-shadow: 0 0 10px #00ff41, 0 0 5px #00ff41;
            z-index: 1;
            animation: scan 1.5s linear;
        }
        
        @keyframes scan {
            0% {
                top: 0;
            }
            100% {
                top: 100%;
            }
        }
        
        /* 闪烁故障效果 */
        @keyframes textGlitch {
            0% {
                opacity: 1;
                transform: translate(0);
                color: #00ff41;
            }
            10% {
                opacity: 0.8;
                transform: translate(-2px, 2px);
                color: #39ff14;
            }
            20% {
                opacity: 0.9;
                transform: translate(2px, -2px);
                color: #00ff41;
            }
            30% {
                opacity: 1;
                transform: translate(0);
                color: #00ff41;
            }
            40% {
                opacity: 0.7;
                transform: translate(-1px, 1px);
                color: #0f0;
            }
            50% {
                opacity: 1;
                transform: translate(0);
                color: #00ff41;
            }
            100% {
                opacity: 1;
                transform: translate(0);
                color: #00ff41;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Matrix声音效果
    function playMatrixSound() {
        const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhMUABICEVDR0a0AMAAAANAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play prevented:', e));
    }
    
    // 添加黑客帝国故障效果
    function addMatrixGlitchEffect(element) {
        // 保存原始内容
        const originalContent = element.innerHTML;
        
        // 创建故障效果
        element.style.animation = 'textGlitch 0.5s forwards';
        
        // 恢复原始内容
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    }
});