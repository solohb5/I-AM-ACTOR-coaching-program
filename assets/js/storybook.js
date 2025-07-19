/* ==========================================================================
   HANS - Creative Storybook Acting Coaching JavaScript
   Warm animations and interactions for the artistic theme
   ========================================================================== */

// Global variables
let currentTestimonial = 0;
let spotsRemaining = 8;
let wordSwapInterval;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initWordSwapAnimation();
    initTestimonialCarousel();
    initPricingModal();
    initAvailabilityCounter();
    initProgressBar();
    initSmoothScrolling();
    initPageCounter();
    initScrollAnimations();
    initTracking();
    initPremiumButtonEffects();
    initAutoHidingNav();
    initScrollOffer();
});

// Word Swapping Animation
function initWordSwapAnimation() {
    const words = document.querySelectorAll('.word-swap .word');
    if (words.length === 0) return;
    
    let currentWordIndex = 0;
    
    // Set first word as active
    words[0].classList.add('active');
    
    function swapWords() {
        // Remove active class from current word
        words[currentWordIndex].classList.remove('active');
        
        // Move to next word (loop back to start if at end)
        currentWordIndex = (currentWordIndex + 1) % words.length;
        
        // Add active class to new word after a slight delay
        setTimeout(() => {
            words[currentWordIndex].classList.add('active');
        }, 200);
    }
    
    // Start the word swapping every 3 seconds
    wordSwapInterval = setInterval(swapWords, 3000);
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonials.length === 0) return;
    
    // Set first testimonial as active
    testimonials[0].classList.add('active');
    dots[0].classList.add('active');
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            trackEvent('testimonial_navigation', { 
                method: 'dot_click', 
                testimonial_index: index 
            });
        });
    });
    
    // Auto-advance testimonials every 8 seconds (only when page is visible)
    setInterval(() => {
        if (!document.hidden) {
            const nextIndex = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }
    }, 8000);
}

// Pricing Modal
function initPricingModal() {
    const modal = document.getElementById('pricing-modal');
    const openBtns = document.querySelectorAll('#main-cta, #spots-cta, #nav-cta');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (!modal) return;
    
    // Open modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Track event
            trackEvent('pricing_modal_opened', {
                trigger: this.id,
                spots_remaining: spotsRemaining
            });
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (backdrop) {
        backdrop.addEventListener('click', closeModal);
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle pricing selection
    const pricingSelects = document.querySelectorAll('.pricing-select');
    pricingSelects.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const packageName = card.querySelector('.pricing-name').textContent;
            const price = card.querySelector('.pricing-price').textContent;
            
            // Track selection
            trackEvent('package_selected', {
                package_name: packageName,
                price: price,
                spots_remaining: spotsRemaining
            });
            
            // Show booking confirmation
            showBookingConfirmation(packageName, price);
        });
    });
}

function showBookingConfirmation(packageName, price) {
    // Create booking confirmation modal
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(58, 47, 42, 0.9);
            backdrop-filter: blur(20px);
            z-index: 200;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: #FDFDF8;
                border: 2px solid rgba(210, 105, 30, 0.3);
                border-radius: 1.5rem;
                padding: 3rem;
                text-align: center;
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(210, 105, 30, 0.3);
                animation: slideInUp 0.4s ease;
            ">
                <h3 style="
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 2rem;
                    color: #3A2F2A;
                    margin-bottom: 1rem;
                ">${packageName}</h3>
                <p style="
                    font-family: 'Crimson Text', serif;
                    color: #6B5B73;
                    margin-bottom: 2rem;
                    font-size: 1.125rem;
                    font-style: italic;
                ">${price}</p>
                <p style="
                    font-family: 'Crimson Text', serif;
                    color: #6B5B73;
                    margin-bottom: 2rem;
                ">This would connect to your sacred booking system:</p>
                <ul style="
                    text-align: left;
                    margin-bottom: 2rem;
                    color: #8B7355;
                    font-family: 'Libre Baskerville', serif;
                    font-size: 0.875rem;
                ">
                    <li>Calendly Premium Integration</li>
                    <li>Stripe Payment Processing</li>
                    <li>Automated Email Sequences</li>
                    <li>CRM & Creative Analytics</li>
                </ul>
                <button onclick="this.closest('div').remove(); document.body.style.overflow = ''" style="
                    background: #D2691E;
                    color: #FDFDF8;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    font-family: 'Libre Baskerville', serif;
                    font-weight: 400;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Begin Your Creative Journey</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmation);
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.remove();
            document.body.style.overflow = '';
        }
    }, 15000);
}

// Availability Counter
function initAvailabilityCounter() {
    const spotsElements = document.querySelectorAll('#spots-remaining, #spots-large');
    
    function updateSpots() {
        // Only update if user is actively viewing the page
        if (!document.hidden && spotsRemaining > 5) {
            const timeOfDay = new Date().getHours();
            const isBusinessHours = timeOfDay >= 9 && timeOfDay <= 18;
            const chance = isBusinessHours ? 0.15 : 0.08; // Reduced frequency
            
            if (Math.random() < chance) {
                const decrease = Math.random() > 0.8 ? 2 : 1;
                spotsRemaining = Math.max(5, spotsRemaining - decrease);
                
                // Update all spot displays
                spotsElements.forEach(element => {
                    animateNumberChange(element, spotsRemaining);
                });
                
                // Update progress bar
                updateProgressBar();
                
                // Track availability change
                trackEvent('availability_decreased', {
                    new_spots: spotsRemaining,
                    decrease: decrease
                });
            }
        }
        
        // Schedule next update (15-45 minutes) - less frequent
        const nextUpdate = (15 + Math.random() * 30) * 60 * 1000;
        setTimeout(updateSpots, nextUpdate);
    }
    
    // Start after 8 minutes (longer delay)
    setTimeout(updateSpots, 8 * 60 * 1000);
}

function animateNumberChange(element, newNumber) {
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.3s ease';
    
    // Count animation
    const startNumber = parseInt(element.textContent);
    const duration = 800;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(startNumber + (newNumber - startNumber) * easeProgress);
        
        element.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Progress Bar
function initProgressBar() {
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const percentage = (spotsRemaining / 50) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                trackEvent('smooth_scroll', {
                    target: targetId
                });
            }
        });
    });
}

// Page Counter
function initPageCounter() {
    const pageNumber = document.getElementById('page-number');
    if (!pageNumber) return;
    
    const chapters = document.querySelectorAll('.chapter');
    
    function updatePageNumber() {
        const scrollPosition = window.scrollY;
        let currentChapter = 1;
        
        chapters.forEach((chapter, index) => {
            if (scrollPosition >= chapter.offsetTop - 200) {
                currentChapter = index + 1;
            }
        });
        
        pageNumber.textContent = `Page ${currentChapter}`;
    }
    
    window.addEventListener('scroll', throttle(updatePageNumber, 100));
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.chapter-header, .pathway-card, .testimonial-container, .about-content, .spots-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Event Tracking
function initTracking() {
    // Track page load
    trackEvent('storybook_page_loaded', {
        initial_spots: spotsRemaining,
        user_agent_mobile: /Mobi|Android/i.test(navigator.userAgent)
    });
    
    // Track scroll depth
    let maxScroll = 0;
    
    const throttledScrollHandler = throttle(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track milestone scrolls
            const milestones = [25, 50, 75, 90, 100];
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && scrollPercent < milestone + 5) {
                    trackEvent('scroll_milestone', {
                        milestone: milestone,
                        session_id: generateSessionId()
                    });
                }
            });
        }
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
        trackEvent('page_visibility_change', {
            hidden: document.hidden,
            spots_remaining: spotsRemaining
        });
    });
}

function trackEvent(eventName, eventData = {}) {
    const trackingData = {
        ...eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        scroll_position: window.pageYOffset,
        page_url: window.location.href
    };
    
    // Analytics tracking only
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, trackingData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', { event_name: eventName, ...trackingData });
    }
}

// Utility Functions
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

// Keyboard Interactions
document.addEventListener('keydown', function(e) {
    // B key to open booking
    if (e.key === 'b' || e.key === 'B') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            const modal = document.getElementById('pricing-modal');
            if (modal && !modal.classList.contains('active')) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                trackEvent('keyboard_shortcut_used', { key: 'b', action: 'open_booking' });
            }
        }
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        scrollToNextSection();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPrevSection();
    }
});

function scrollToNextSection() {
    const chapters = document.querySelectorAll('.chapter');
    const currentScroll = window.pageYOffset;
    
    for (let chapter of chapters) {
        if (chapter.offsetTop > currentScroll + 100) {
            chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const chapters = Array.from(document.querySelectorAll('.chapter')).reverse();
    const currentScroll = window.pageYOffset;
    
    for (let chapter of chapters) {
        if (chapter.offsetTop < currentScroll - 100) {
            chapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Performance Monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        trackEvent('storybook_performance', {
            total_load_time: loadTime,
            dom_content_loaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            device_type: window.innerWidth > 768 ? 'desktop' : 'mobile'
        });
    }
});

// Premium Auto-Hiding Navigation
function initAutoHidingNav() {
    const nav = document.querySelector('.nav-storybook');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavVisibility() {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        // Show nav at top of page or when scrolling up
        if (scrollY <= 100 || scrollDelta < 0) {
            nav.classList.remove('nav-hidden');
            nav.classList.add('nav-visible');
        }
        // Hide nav when scrolling down (after 100px)
        else if (scrollDelta > 0 && scrollY > 100) {
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-visible');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestNavUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavVisibility);
            ticking = true;
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestNavUpdate, { passive: true });
    
    // Always show nav initially
    nav.classList.add('nav-visible');
}

// Premium Button Effects
function initPremiumButtonEffects() {
    const buttons = document.querySelectorAll('.story-button');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add magnetic effect (only on desktop)
        if (window.innerWidth > 768) {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                button.style.transform = `translateY(-4px) scale(1.02) translate(${deltaX}px, ${deltaY}px)`;
            });
        }
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = '';
        });
    });
}

// Scroll offer effect
function initScrollOffer() {
    const nav = document.querySelector('.nav-storybook');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Show offer when scrolled down more than 200px
        if (currentScrollY > 200) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll);
}

// Error Handling
window.addEventListener('error', function(e) {
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
    });
});

// Add CSS animations for modals
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
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);