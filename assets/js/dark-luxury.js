/* ==========================================================================
   HANS - Dark Luxury Acting Coaching JavaScript
   Sophisticated interactions for the dramatic dark theme
   ========================================================================== */

// Global variables
let mousePosition = { x: 0, y: 0 };
let spotsRemaining = 32;
let scrollY = 0;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMouseTracking();
    initializeScrollEffects();
    initializeMagneticButtons();
    initializePricingModal();
    initializeAvailabilityCounter();
    initializeProgressBar();
    initializeFloatingOrbs();
    initializeKeyboardShortcuts();
});

// Mouse Tracking for Interactive Elements
function initializeMouseTracking() {
    document.addEventListener('mousemove', (e) => {
        mousePosition.x = (e.clientX / window.innerWidth) * 100;
        mousePosition.y = (e.clientY / window.innerHeight) * 100;
        
        // Update floating orbs position based on mouse
        updateOrbPositions();
    });
}

function updateOrbPositions() {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    if (orb1) {
        const newX = 10 + (mousePosition.x * 0.02);
        const newY = 10 + (mousePosition.y * 0.02);
        orb1.style.left = `${newX}%`;
        orb1.style.top = `${newY}%`;
    }
    
    if (orb2) {
        const newX = 70 - (mousePosition.x * 0.01);
        const newY = 60 - (mousePosition.y * 0.01);
        orb2.style.right = `${100 - newX}%`;
        orb2.style.top = `${newY}%`;
    }
}

// Scroll Effects with Parallax
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScroll() {
        scrollY = window.pageYOffset;
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
        
        // Parallax effect for knight background
        const knight = document.querySelector('.knight-background');
        if (knight) {
            knight.style.transform = `translateY(calc(-50% + ${scrollY * -0.2}px))`;
        }
        
        // Update floating orbs based on scroll
        updateOrbsOnScroll();
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
    
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.testimonial-card, .spots-card, .about-content, .section-title'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

function updateOrbsOnScroll() {
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 + (index * 0.05);
        const yOffset = scrollY * speed;
        orb.style.transform = `translateY(${yOffset}px)`;
    });
}

// Magnetic Button Effects
function initializeMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = 'none';
        });
        
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Limit the movement
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        // Click effect
        btn.addEventListener('click', function(e) {
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
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Pricing Modal
function initializePricingModal() {
    const modal = document.getElementById('pricing-modal');
    const openBtns = document.querySelectorAll('#main-cta, #spots-cta');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.querySelector('.modal-backdrop');
    
    // Open modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', function() {
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
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
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
            
            // Simulate booking process
            showBookingConfirmation(packageName, price);
        });
    });
}

function showBookingConfirmation(packageName, price) {
    // Create booking confirmation
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            z-index: 200;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%);
                border: 1px solid #00c896;
                border-radius: 1rem;
                padding: 3rem;
                text-align: center;
                max-width: 500px;
                box-shadow: 0 20px 60px rgba(0, 200, 150, 0.3);
                animation: slideInUp 0.4s ease;
            ">
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: #ffffff;
                    margin-bottom: 1rem;
                ">${packageName}</h3>
                <p style="
                    font-family: 'Inter', sans-serif;
                    color: #cccccc;
                    margin-bottom: 2rem;
                    font-size: 1.125rem;
                ">${price}</p>
                <p style="
                    font-family: 'Inter', sans-serif;
                    color: #cccccc;
                    margin-bottom: 2rem;
                ">This would connect to your booking system:</p>
                <ul style="
                    text-align: left;
                    margin-bottom: 2rem;
                    color: #999999;
                    font-family: 'Inter', sans-serif;
                ">
                    <li>Calendly Premium Integration</li>
                    <li>Stripe Payment Processing</li>
                    <li>Automated Email Sequences</li>
                    <li>CRM & Analytics Tracking</li>
                </ul>
                <button onclick="this.closest('div').remove(); document.body.style.overflow = ''" style="
                    background: #00c896;
                    color: #000000;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    cursor: pointer;
                ">Close</button>
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
function initializeAvailabilityCounter() {
    const spotsElements = document.querySelectorAll('#spots-remaining, #spots-large');
    
    function updateSpots() {
        if (spotsRemaining > 15) {
            const timeOfDay = new Date().getHours();
            const isBusinessHours = timeOfDay >= 9 && timeOfDay <= 18;
            const chance = isBusinessHours ? 0.25 : 0.15;
            
            if (Math.random() < chance) {
                const decrease = Math.random() > 0.8 ? 2 : 1;
                spotsRemaining = Math.max(15, spotsRemaining - decrease);
                
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
        
        // Schedule next update (5-20 minutes)
        const nextUpdate = (5 + Math.random() * 15) * 60 * 1000;
        setTimeout(updateSpots, nextUpdate);
    }
    
    // Start after 2 minutes
    setTimeout(updateSpots, 2 * 60 * 1000);
}

function animateNumberChange(element, newNumber) {
    element.style.animation = 'pulse 0.6s ease';
    
    // Count animation
    const startNumber = parseInt(element.textContent);
    const duration = 1000;
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
                element.style.animation = '';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Progress Bar
function initializeProgressBar() {
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
        const percentage = (spotsRemaining / 50) * 100;
        progressFill.style.width = `${percentage}%`;
    }
}

// Floating Orbs Enhancement
function initializeFloatingOrbs() {
    const orbs = document.querySelectorAll('.floating-orb');
    
    orbs.forEach((orb, index) => {
        // Add random initial position variation
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        orb.style.left = `${randomX}%`;
        orb.style.top = `${randomY}%`;
        
        // Add random animation delay
        const delay = Math.random() * 6;
        orb.style.animationDelay = `-${delay}s`;
    });
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // B key to open booking
        if (e.key === 'b' || e.key === 'B') {
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                const modal = document.getElementById('pricing-modal');
                if (!modal.classList.contains('active')) {
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
}

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentScroll = window.pageYOffset;
    
    for (let section of sections) {
        if (section.offsetTop > currentScroll + 100) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const sections = Array.from(document.querySelectorAll('section')).reverse();
    const currentScroll = window.pageYOffset;
    
    for (let section of sections) {
        if (section.offsetTop < currentScroll - 100) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
        }
    }
}

// Event Tracking
function trackEvent(eventName, eventData = {}) {
    const trackingData = {
        ...eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        scroll_position: window.pageYOffset,
        mouse_position: mousePosition,
        page_url: window.location.href
    };
    
    // Track event for analytics (Google Analytics 4, Facebook Pixel)
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, trackingData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CustomEvent', { event_name: eventName, ...trackingData });
    }
}

// Performance Monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        trackEvent('dark_luxury_performance', {
            total_load_time: loadTime,
            dom_content_loaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            device_type: window.innerWidth > 768 ? 'desktop' : 'mobile'
        });
    }
});

// Page Visibility API
document.addEventListener('visibilitychange', function() {
    trackEvent('page_visibility_change', {
        hidden: document.hidden,
        spots_remaining: spotsRemaining
    });
});

// Error Handling
window.addEventListener('error', function(e) {
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
    });
});

// Add CSS animations
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
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

// Initialize page state
trackEvent('dark_luxury_page_loaded', {
    initial_spots: spotsRemaining,
    user_agent_mobile: /Mobi|Android/i.test(navigator.userAgent)
});