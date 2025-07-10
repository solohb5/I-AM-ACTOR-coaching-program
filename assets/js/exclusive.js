/* ==========================================================================
   I AM ACTOR - Premium $10,000 Website JavaScript
   Sophisticated interactions and animations
   ========================================================================== */

// Premium Loading & Initialization
document.addEventListener('DOMContentLoaded', function() {
    initPremiumLoading();
    initCustomCursor();
    initScrollAnimations();
    initParallaxEffects();
    initMicroInteractions();
    initPremiumBookingButton();
    initAvailabilityCounter();
    initSmoothScrolling();
    initPremiumTracking();
    initKeyboardInteractions();
});

// Premium Loading Animation
function initPremiumLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    // Hide body initially
    body.style.opacity = '0';
    
    // Premium loading sequence
    window.addEventListener('load', function() {
        setTimeout(() => {
            // Fade out loading screen
            loadingScreen.classList.add('fade-out');
            
            // Fade in body with premium animation
            setTimeout(() => {
                body.style.opacity = '1';
                body.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Trigger scroll animations
                triggerInitialAnimations();
                
                // Remove loading screen from DOM
                setTimeout(() => {
                    loadingScreen.remove();
                }, 800);
            }, 400);
        }, 2000); // 2 second loading screen
    });
}

// Custom Cursor with Premium Effects
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, button, .service, .package, .logo');
    
    // Only on desktop devices
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Hover effects for interactive elements
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                element.style.cursor = 'none';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                element.style.cursor = 'auto';
            });
        });
        
        // Hide default cursor on interactive elements
        interactiveElements.forEach(element => {
            element.style.cursor = 'none';
        });
    } else {
        cursor.style.display = 'none';
    }
}

// Premium Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.title-section, .services h2, .service, .packages, .details, .booking, .availability-section, .footer');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        observer.observe(element);
    });
}

// Parallax Effects
function initParallaxEffects() {
    const knight = document.querySelector('.knight-background');
    const header = document.querySelector('.header');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        const headerRate = scrolled * 0.1;
        
        if (knight) {
            knight.style.transform = `translateY(calc(-50% + ${rate}px))`;
        }
        
        if (header) {
            header.style.transform = `translateY(${headerRate}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
}

// Micro-Interactions
function initMicroInteractions() {
    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Service card interactions
    const services = document.querySelectorAll('.service');
    services.forEach((service, index) => {
        service.addEventListener('mouseenter', () => {
            service.style.transform = 'translateY(-6px) scale(1.01)';
            service.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            
            // Subtle animation for other cards
            services.forEach((otherService, otherIndex) => {
                if (otherIndex !== index) {
                    otherService.style.opacity = '0.8';
                    otherService.style.transform = 'scale(0.99)';
                }
            });
        });
        
        service.addEventListener('mouseleave', () => {
            service.style.transform = 'translateY(0) scale(1)';
            service.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            
            // Reset other cards
            services.forEach(otherService => {
                otherService.style.opacity = '1';
                otherService.style.transform = 'scale(1)';
            });
        });
    });
    
    // Package hover effects with stagger
    const packages = document.querySelectorAll('.package');
    packages.forEach((pkg, index) => {
        pkg.addEventListener('mouseenter', () => {
            pkg.style.transform = 'translateX(8px) scale(1.01)';
            pkg.style.background = 'rgba(0, 200, 150, 0.04)';
            
            // Subtle glow effect
            pkg.style.boxShadow = '0 0 20px rgba(0, 200, 150, 0.1)';
        });
        
        pkg.addEventListener('mouseleave', () => {
            pkg.style.transform = 'translateX(0) scale(1)';
            pkg.style.background = 'transparent';
            pkg.style.boxShadow = 'none';
        });
    });
}

// Premium Booking Button
function initPremiumBookingButton() {
    const bookButton = document.querySelector('.book-button');
    if (!bookButton) return;
    
    // Add premium click animation
    bookButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = 100;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: buttonRipple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        // Premium loading state
        const originalText = this.textContent;
        this.textContent = 'Connecting...';
        this.style.background = 'linear-gradient(135deg, #00A080 0%, #00C896 100%)';
        this.style.transform = 'translateY(-2px) scale(0.98)';
        this.style.pointerEvents = 'none';
        
        // Track the interaction
        trackPremiumEvent('premium_booking_click', {
            button_text: originalText,
            spots_remaining: document.getElementById('spots-remaining')?.textContent || 'unknown',
            scroll_position: window.pageYOffset,
            time_on_page: getTimeOnPage()
        });
        
        // Simulate premium booking process
        setTimeout(() => {
            // Create premium modal or redirect to booking system
            showPremiumBookingModal();
            
            // Reset button
            this.textContent = originalText;
            this.style.background = 'linear-gradient(135deg, #00C896 0%, #00E5AC 100%)';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.pointerEvents = 'auto';
            
            ripple.remove();
        }, 1500);
    });
    
    // Advanced hover effects
    let hoverTimeout;
    bookButton.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        this.style.transform = 'translateY(-6px) scale(1.05)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(0, 200, 150, 0.15)';
        
        // Subtle glow animation
        hoverTimeout = setTimeout(() => {
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 60px rgba(0, 200, 150, 0.25)';
        }, 200);
    });
    
    bookButton.addEventListener('mouseleave', function() {
        clearTimeout(hoverTimeout);
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
}

// Premium Availability Counter
function initAvailabilityCounter() {
    const spotsElement = document.getElementById('spots-remaining');
    if (!spotsElement) return;
    
    let spots = 32;
    const minSpots = 15;
    
    // Premium counter animation
    function animateSpotUpdate(newSpots) {
        spotsElement.classList.add('updated');
        
        // Count animation
        const startSpots = parseInt(spotsElement.textContent);
        const duration = 800;
        const startTime = performance.now();
        
        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const currentSpots = Math.round(startSpots + (newSpots - startSpots) * easeProgress);
            
            spotsElement.textContent = currentSpots;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setTimeout(() => {
                    spotsElement.classList.remove('updated');
                }, 200);
            }
        }
        
        requestAnimationFrame(updateCount);
    }
    
    // Smart availability updates
    function updateSpots() {
        if (spots > minSpots) {
            const timeOfDay = new Date().getHours();
            const isBusinessHours = timeOfDay >= 9 && timeOfDay <= 18;
            const chance = isBusinessHours ? 0.3 : 0.15;
            
            if (Math.random() < chance) {
                const decrease = Math.random() > 0.7 ? 2 : 1;
                const newSpots = Math.max(minSpots, spots - decrease);
                
                if (newSpots !== spots) {
                    spots = newSpots;
                    animateSpotUpdate(spots);
                    
                    // Track availability change
                    trackPremiumEvent('availability_decreased', {
                        new_spots: spots,
                        decrease: decrease
                    });
                }
            }
        }
        
        // Schedule next update (8-25 minutes)
        const nextUpdate = (8 + Math.random() * 17) * 60 * 1000;
        setTimeout(updateSpots, nextUpdate);
    }
    
    // Start after 3 minutes
    setTimeout(updateSpots, 3 * 60 * 1000);
}

// Premium Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Premium smooth scroll with easing
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.offsetTop - 100;
                const distance = targetPosition - startPosition;
                const duration = 1200;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Ease in-out cubic
                    const ease = progress < 0.5 
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
                
                trackPremiumEvent('smooth_scroll', {
                    target: targetId,
                    distance: Math.abs(distance)
                });
            }
        });
    });
}

// Premium Event Tracking
function initPremiumTracking() {
    // Advanced scroll tracking
    let maxScroll = 0;
    let scrollSessions = [];
    let currentSession = { start: Date.now(), maxDepth: 0 };
    
    const throttledScrollHandler = throttle(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            currentSession.maxDepth = scrollPercent;
            
            // Track milestone scrolls with premium data
            const milestones = [25, 50, 75, 90, 100];
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && scrollPercent < milestone + 5) {
                    trackPremiumEvent('scroll_milestone', {
                        milestone: milestone,
                        time_to_reach: Date.now() - currentSession.start,
                        session_id: generateSessionId()
                    });
                }
            });
        }
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Track engagement quality
    let mouseMovements = 0;
    let keystrokes = 0;
    
    document.addEventListener('mousemove', throttle(() => {
        mouseMovements++;
    }, 500));
    
    document.addEventListener('keydown', () => {
        keystrokes++;
    });
    
    // Page visibility tracking
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            trackPremiumEvent('page_hidden', {
                time_visible: Date.now() - currentSession.start,
                engagement_score: calculateEngagementScore()
            });
        } else {
            currentSession.start = Date.now();
        }
    });
    
    // Track premium interactions
    const premiumElements = document.querySelectorAll('.service, .package, .book-button, .logo');
    premiumElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            trackPremiumEvent('element_hover', {
                element_type: element.className,
                position: getElementPosition(element)
            });
        });
    });
}

// Keyboard Interactions
function initKeyboardInteractions() {
    document.addEventListener('keydown', function(e) {
        // Premium keyboard shortcuts
        if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            document.querySelector('.book-button')?.click();
        }
        
        if (e.key === 'Escape') {
            closePremiumModal();
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            scrollToNextSection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            scrollToPrevSection();
        }
    });
}

// Premium Modal System
function showPremiumBookingModal() {
    // In a real implementation, this would show a sophisticated booking interface
    // For now, we'll simulate the premium experience
    
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 1.5rem;
                text-align: center;
                max-width: 500px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                animation: slideInUp 0.4s ease-out;
            ">
                <h3 style="margin-bottom: 1rem; font-family: 'Libre Baskerville', serif;">Premium Booking System</h3>
                <p style="margin-bottom: 2rem; color: #666;">This would connect to your premium booking system:</p>
                <ul style="text-align: left; margin-bottom: 2rem; color: #666;">
                    <li>Calendly Premium</li>
                    <li>Stripe Checkout</li>
                    <li>Automated email sequences</li>
                    <li>CRM integration</li>
                </ul>
                <button onclick="this.closest('div').remove()" style="
                    background: linear-gradient(135deg, #00C896 0%, #00E5AC 100%);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                ">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

function closePremiumModal() {
    const modal = document.querySelector('[style*="backdrop-filter"]');
    if (modal) {
        modal.remove();
    }
}

// Trigger Initial Animations
function triggerInitialAnimations() {
    // Trigger header animation
    const header = document.querySelector('.header');
    if (header) {
        header.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Stagger service animations
    const services = document.querySelectorAll('.service');
    services.forEach((service, index) => {
        setTimeout(() => {
            service.style.opacity = '1';
            service.style.transform = 'translateY(0)';
        }, 500 + index * 200);
    });
}

// Utility Functions
function trackPremiumEvent(eventName, eventData = {}) {
    const premiumData = {
        ...eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        session_id: generateSessionId(),
        page_url: window.location.href
    };
    
    console.log('Premium Event:', eventName, premiumData);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, premiumData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', { event_name: eventName, ...premiumData });
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getTimeOnPage() {
    return Math.round((Date.now() - performance.timing.navigationStart) / 1000);
}

function calculateEngagementScore() {
    const timeOnPage = getTimeOnPage();
    const scrollDepth = maxScroll || 0;
    const interactionQuality = (mouseMovements + keystrokes) / timeOnPage;
    
    return Math.round((timeOnPage * 0.3 + scrollDepth * 0.5 + interactionQuality * 0.2) / 10);
}

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        viewport_percent: {
            x: Math.round((rect.left / window.innerWidth) * 100),
            y: Math.round((rect.top / window.innerHeight) * 100)
        }
    };
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section, .title-section, .services, .packages');
    const currentScroll = window.pageYOffset;
    
    for (let section of sections) {
        if (section.offsetTop > currentScroll + 50) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const sections = Array.from(document.querySelectorAll('section, .title-section, .services, .packages')).reverse();
    const currentScroll = window.pageYOffset;
    
    for (let section of sections) {
        if (section.offsetTop < currentScroll - 50) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Add CSS animations for modal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes buttonRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Premium Error Handling
window.addEventListener('error', function(e) {
    trackPremiumEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno,
        error_stack: e.error?.stack
    });
});

// Premium Performance Monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        trackPremiumEvent('premium_performance', {
            total_load_time: loadTime,
            dom_content_loaded: domContentLoaded,
            first_paint: performance.getEntriesByType('paint')[0]?.startTime || null,
            largest_contentful_paint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || null
        });
    }
});