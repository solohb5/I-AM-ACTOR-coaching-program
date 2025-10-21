/* ==========================================================================
   THE ACTOR'S JOURNEY - Interactive Features
   Minimal, clean JavaScript for the journey landing page
   ========================================================================== */

// Simple analytics stub (replace with real analytics when ready)
function trackEvent(eventName, eventData = {}) {
    console.log('[Analytics]', eventName, eventData);

    // TODO: Add Google Analytics tracking here
    // Example: gtag('event', eventName, eventData);

    // Or Plausible Analytics:
    // Example: plausible(eventName, { props: eventData });
}

// Track page load
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_loaded', {
        page: 'actors_journey',
        timestamp: new Date().toISOString()
    });

    // Track CTA clicks
    initCTATracking();

    // Track scroll depth
    initScrollTracking();
});

// Track all CTA button clicks
function initCTATracking() {
    // Track Stripe payment links
    const stripeLinks = document.querySelectorAll('a[href*="buy.stripe.com"]');
    stripeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const priceText = this.textContent.trim();
            trackEvent('stripe_checkout_clicked', {
                button_text: priceText,
                href: this.href,
                location: getButtonLocation(this)
            });
        });
    });

    // Track Calendly links
    const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    calendlyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackEvent('calendly_clicked', {
                button_text: this.textContent.trim(),
                location: getButtonLocation(this)
            });
        });
    });

    // Track navigation clicks
    const navCTA = document.querySelector('.nav-cta-btn');
    if (navCTA) {
        navCTA.addEventListener('click', function() {
            trackEvent('nav_cta_clicked', {
                destination: this.getAttribute('onclick') || '#investment'
            });
        });
    }

    // Track hero CTA
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', function() {
            trackEvent('hero_cta_clicked', {
                destination: this.getAttribute('onclick') || '#investment'
            });
        });
    }
}

// Get button location context
function getButtonLocation(element) {
    const section = element.closest('section');
    if (!section) return 'unknown';

    if (section.classList.contains('hero')) return 'hero';
    if (section.id === 'investment') return 'investment_section';
    if (section.querySelector('.footer')) return 'footer';

    return 'content';
}

// Track scroll depth milestones
function initScrollTracking() {
    const milestones = {
        25: false,
        50: false,
        75: false,
        100: false
    };

    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

        Object.keys(milestones).forEach(milestone => {
            if (scrollPercent >= milestone && !milestones[milestone]) {
                milestones[milestone] = true;
                trackEvent('scroll_depth', {
                    depth: milestone + '%'
                });
            }
        });
    });
}

// Track time on page
let timeOnPage = 0;
setInterval(function() {
    timeOnPage += 30;

    // Track every 30 seconds
    if (timeOnPage % 30 === 0) {
        trackEvent('time_on_page', {
            seconds: timeOnPage
        });
    }
}, 30000);

// Track page visibility changes
document.addEventListener('visibilitychange', function() {
    trackEvent('page_visibility_change', {
        hidden: document.hidden,
        time_on_page: timeOnPage
    });
});

// Global error tracking
window.addEventListener('error', function(e) {
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});
