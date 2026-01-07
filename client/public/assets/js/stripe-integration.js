/* ==========================================================================
   STRIPE PAYMENT INTEGRATION
   Connects pricing modal to Stripe Checkout
   ========================================================================== */

// Simple analytics stub (replace with real analytics later)
function trackEvent(eventName, eventData = {}) {
    // TODO: Integrate with Google Analytics, Plausible, or other service
    // Example: gtag('event', eventName, eventData);
}

// Package configurations (must match backend)
const STRIPE_PACKAGES = {
    single: {
        id: 'single',
        name: 'Discovery Session',
        price: '$109',
        sessions: 1,
        description: 'Perfect starting point'
    },
    growth: {
        id: 'growth', 
        name: 'Growth Package',
        price: '$267',
        sessions: 3,
        description: '$89 per session'
    },
    transformation: {
        id: 'transformation',
        name: 'Transformation Package', 
        price: '$474',
        sessions: 6,
        description: '$79 per session - Best value'
    }
};

// Initialize Stripe integration
function initStripeIntegration() {
    // Handle option-button buttons
    const optionButtons = document.querySelectorAll('.option-button');
    
    optionButtons.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Get package directly from data attribute
            const packageId = this.dataset.package;
            
            if (!packageId) {
                showPaymentError('Package selection error. Please try again.');
                return;
            }
            
            // Store original button content
            const originalContent = this.innerHTML;
            
            // Disable button to prevent double clicks
            btn.disabled = true;
            btn.innerHTML = 'Processing...';
            
            // Track selection
            trackEvent('stripe_checkout_initiated', {
                package_id: packageId,
                package_name: STRIPE_PACKAGES[packageId].name,
                price: STRIPE_PACKAGES[packageId].price
            });
            
            try {
                // Call your backend to create checkout session
                await initiateStripeCheckout(packageId);
            } catch (error) {
                showPaymentError(error.message);
                btn.disabled = false;
                btn.innerHTML = originalContent;
            }
        });
    });
}

// Determine package ID from card
function determinePackageId(card) {
    const packageName = card.querySelector('.pricing-name')?.textContent?.trim();
    
    // Map package names to IDs
    if (packageName?.includes('Discovery Session') || packageName?.includes('Single Session')) return 'single';
    if (packageName?.includes('Growth Package')) return 'growth'; 
    if (packageName?.includes('Transformation Package')) return 'transformation';
    
    // Fallback: check price
    const price = card.querySelector('.pricing-price')?.textContent?.trim();
    if (price?.includes('109')) return 'single';
    if (price?.includes('267')) return 'growth';
    if (price?.includes('474')) return 'transformation';
    
    return null;
}

// Initiate Stripe checkout
async function initiateStripeCheckout(packageId) {
    const packageInfo = STRIPE_PACKAGES[packageId];
    
    // Get customer email if available (could add email collection modal here)
    const customerEmail = ''; // Optional: collect email first
    const customerName = '';  // Optional: collect name first
    
    try {
        // Call your backend API
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                packageType: packageId,
                customerEmail: customerEmail,
                customerName: customerName
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const { sessionId, url } = await response.json();
        
        if (url) {
            // Redirect to Stripe Checkout
            window.location.href = url;
        } else {
            throw new Error('No checkout URL received');
        }
        
    } catch (error) {
        throw error;
    }
}

// Reset button state
function resetButton(btn) {
    btn.disabled = false;
    btn.textContent = 'Begin This Journey';
}

// Show payment error
function showPaymentError(message) {
    // Create error modal
    const errorModal = document.createElement('div');
    errorModal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: #FFFFFF;
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
                max-width: 400px;
                margin: 1rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            ">
                <div style="
                    font-size: 3rem;
                    margin-bottom: 1rem;
                ">⚠️</div>
                <h3 style="
                    font-family: 'Cinzel', serif;
                    font-size: 1.5rem;
                    color: #DC2626;
                    margin-bottom: 1rem;
                ">Payment Error</h3>
                <p style="
                    color: #6B7280;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                ">${message || 'Something went wrong. Please try again or contact support.'}</p>
                <button onclick="this.closest('div').remove()" style="
                    background: #111827;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 8px;
                    padding: 0.75rem 1.5rem;
                    cursor: pointer;
                    font-weight: 600;
                ">Try Again</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorModal);
    
    // Track error
    trackEvent('stripe_checkout_error', {
        error_message: message
    });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorModal.parentNode) {
            errorModal.remove();
        }
    }, 10000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initStripeIntegration();
});

// Handle successful return from Stripe
function handleStripeReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('canceled') === 'true') {
        // Handle canceled payment
        trackEvent('stripe_checkout_canceled');
    }
}

// Check for return parameters on page load
document.addEventListener('DOMContentLoaded', handleStripeReturn);