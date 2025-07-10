/* ==========================================================================
   I AM ACTOR - Premium Acting Coaching Sales Page
   Main JavaScript - Core Functionality
   ========================================================================== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCountdownTimer();
    initFAQAccordion();
    initSmoothScrolling();
    initSpotCounter();
    initFormValidation();
    initModalHandlers();
    
    // Show page with fade-in effect
    document.body.style.opacity = '1';
});

// Countdown Timer
function initCountdownTimer() {
    // Set the date we're counting down to (7 days from now)
    const countDownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    
    // Update the count down every 1 second
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const finalCountdownElement = document.getElementById('final-countdown');
        
        if (daysElement) daysElement.innerHTML = days;
        if (hoursElement) hoursElement.innerHTML = hours;
        if (minutesElement) minutesElement.innerHTML = minutes;
        if (secondsElement) secondsElement.innerHTML = seconds;
        if (finalCountdownElement) finalCountdownElement.innerHTML = days;
        
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(timer);
            const timerDisplay = document.querySelector('.timer-display');
            if (timerDisplay) {
                timerDisplay.innerHTML = "OFFER EXPIRED";
            }
            if (finalCountdownElement) {
                finalCountdownElement.innerHTML = "0";
            }
        }
    }, 1000);
}

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
            }
        });
    });
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
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Spot Counter (simulated decreasing availability)
function initSpotCounter() {
    const spotsElement = document.getElementById('spots-remaining');
    if (!spotsElement) return;
    
    let spots = parseInt(spotsElement.textContent);
    const initialSpots = spots;
    
    // Decrease spots every 5 minutes (simulation)
    setInterval(() => {
        if (spots > 15) { // Don't go below 15 spots
            const decrease = Math.floor(Math.random() * 3) + 1; // 1-3 spots
            spots = Math.max(15, spots - decrease);
            spotsElement.textContent = spots;
            
            // Add pulse animation when spots decrease
            spotsElement.parentElement.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                spotsElement.parentElement.style.animation = '';
            }, 1000);
        }
    }, 5 * 60 * 1000); // Every 5 minutes
}

// Form Validation (for future contact forms)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (validateForm(data)) {
                handleFormSubmit(data);
            }
        });
    });
}

function validateForm(data) {
    let isValid = true;
    const errors = [];
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Required fields
    const requiredFields = ['name', 'email'];
    requiredFields.forEach(field => {
        if (data[field] && !data[field].trim()) {
            errors.push(`${field} is required`);
            isValid = false;
        }
    });
    
    // Display errors
    if (!isValid) {
        showAlert(errors.join('<br>'), 'error');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmit(data) {
    // Show loading state
    showAlert('Submitting...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showAlert('Thank you! We\'ll be in touch soon.', 'success');
    }, 2000);
}

// Modal Handlers
function initModalHandlers() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalClose = document.querySelectorAll('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    modalClose.forEach(close => {
        close.addEventListener('click', function() {
            closeModal();
        });
    });
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Alert System
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container') || createAlertContainer();
    
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = message;
    
    alertContainer.appendChild(alert);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alert-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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

// Analytics and Tracking
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, eventData);
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('cta_click', {
            button_text: buttonText,
            button_location: e.target.closest('section')?.className || 'unknown'
        });
    }
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scrolls
        if (scrollPercent >= 25 && scrollPercent < 50) {
            trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
            trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollPercent >= 75 && scrollPercent < 100) {
            trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollPercent >= 100) {
            trackEvent('scroll_depth', { depth: '100%' });
        }
    }
}, 1000));

// Track time on page
let timeOnPage = 0;
setInterval(() => {
    timeOnPage += 30;
    
    // Track every 30 seconds
    if (timeOnPage % 30 === 0) {
        trackEvent('time_on_page', { seconds: timeOnPage });
    }
}, 30000);

// Performance Monitoring
window.addEventListener('load', function() {
    // Track page load time
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        trackEvent('page_load_time', { load_time: loadTime });
    }
});

// Error Tracking
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
    });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/logo.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();