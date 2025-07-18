/* ==========================================================================
   I AM ACTOR - Premium Acting Coaching Sales Page
   Animations JavaScript - Scroll Animations & Interactive Effects
   ========================================================================== */

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverEffects();
    initParallaxEffects();
    initCountUpAnimations();
    initTypewriterEffect();
    initStaggerAnimations();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add stagger delay for multiple elements
                if (entry.target.hasAttribute('data-stagger')) {
                    const delay = parseInt(entry.target.getAttribute('data-stagger')) * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('section, .path-card, .package-card, .testimonial, .step');
    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        el.setAttribute('data-stagger', index);
        observer.observe(el);
    });
}

// Hover Effects
function initHoverEffects() {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.cta-button');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.1;
            const deltaY = (e.clientY - centerY) * 0.1;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'translate(0, 0)';
        });
    });
    
    // Tilt effect for cards
    const tiltElements = document.querySelectorAll('.path-card, .package-card');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / rect.width * 20;
            const deltaY = (e.clientY - centerY) / rect.height * 20;
            
            element.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) translateZ(20px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .promise');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${parallax}px)`;
        });
    });
}

// Count Up Animations
function initCountUpAnimations() {
    const countElements = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                animateCount(element, target);
                observer.unobserve(element);
            }
        });
    });
    
    countElements.forEach(element => {
        observer.observe(element);
    });
}

function animateCount(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, stepTime);
}

// Typewriter Effect
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(element, text);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

function typeWriter(element, text) {
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Stagger Animations
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-fade-in-up');
                        }, index * 150);
                    });
                    observer.unobserve(container);
                }
            });
        });
        
        observer.observe(container);
    });
}

// Smooth Page Transitions
function initPageTransitions() {
    const body = document.body;
    
    // Fade in on load
    window.addEventListener('load', () => {
        body.classList.add('loaded');
    });
    
    // Fade out on navigation
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('http')) {
            e.preventDefault();
            body.classList.add('fade-out');
            
            setTimeout(() => {
                window.location.href = e.target.getAttribute('href');
            }, 500);
        }
    });
}

// Particle Effect
function initParticleEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    document.body.appendChild(canvas);
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#00C896';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Text Reveal Animation
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const words = text.split(' ');
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            element.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = entry.target.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-emerald);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Floating Action Button
function initFloatingButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-button';
    fab.innerHTML = '↑';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: var(--color-emerald);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 24px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0, 200, 150, 0.3);
    `;
    
    document.body.appendChild(fab);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(100px)';
        }
    });
    
    fab.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading Animation
function initLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Mouse Cursor Effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(0, 200, 150, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .cta-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize advanced animations based on preferences
function initAdvancedAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initParticleEffect();
        initTextReveal();
        initScrollProgress();
        initFloatingButton();
        initLoadingAnimation();
        initCustomCursor();
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initAdvancedAnimations();
});

// Performance monitoring
function measurePerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        // Page loaded in ${loadTime}ms
        
        // Track Core Web Vitals
        if ('web-vital' in window) {
            // This would be used with a library like web-vitals
            // Core Web Vitals tracking enabled
        }
    }
}

// Call performance monitoring
window.addEventListener('load', measurePerformance);