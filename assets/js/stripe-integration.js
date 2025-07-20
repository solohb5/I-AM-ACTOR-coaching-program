/* ==========================================================================
   STRIPE PAYMENT INTEGRATION
   Connects pricing modal to Stripe Checkout
   ========================================================================== */

// Package configurations (must match backend)
const STRIPE_PACKAGES = {
    single: {
        id: 'single',
        name: 'Creative Single',
        price: '$97',
        sessions: 1,
        description: 'Perfect for immediate breakthrough'
    },
    journey: {
        id: 'journey', 
        name: 'Artistic Journey',
        price: '$237',
        sessions: 3,
        description: 'Most artists choose this'
    },
    mastery: {
        id: 'mastery',
        name: 'Creative Mastery', 
        price: '$325',
        sessions: 5,
        description: 'Maximum value & flexibility'
    }
};

// Initialize Stripe integration
function initStripeIntegration() {
    // Replace the existing pricing selection handler
    const pricingSelects = document.querySelectorAll('.pricing-select');
    
    pricingSelects.forEach(btn => {
        // Remove all existing event listeners by cloning the element
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            // Disable button to prevent double clicks
            newBtn.disabled = true;
            newBtn.textContent = 'Processing...';
            
            // Get package information
            const card = this.closest('.pricing-card');
            const packageId = determinePackageId(card);
            
            if (!packageId) {
                console.error('Could not determine package type');
                resetButton(newBtn);
                return;
            }
            
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
                console.error('Checkout error:', error);
                showPaymentError(error.message);
                resetButton(newBtn);
            }
        });
    });
}

// Determine package ID from card
function determinePackageId(card) {
    const packageName = card.querySelector('.pricing-name')?.textContent?.trim();
    
    // Map package names to IDs
    if (packageName?.includes('Creative Single')) return 'single';
    if (packageName?.includes('Artistic Journey')) return 'journey'; 
    if (packageName?.includes('Creative Mastery')) return 'mastery';
    
    // Fallback: check price
    const price = card.querySelector('.pricing-price')?.textContent?.trim();
    if (price?.includes('97')) return 'single';
    if (price?.includes('237')) return 'journey';
    if (price?.includes('325')) return 'mastery';
    
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
        console.error('Failed to create checkout session:', error);
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
        
        // Optionally show a message
        console.log('Payment was canceled');
    }
}

// Check for return parameters on page load
document.addEventListener('DOMContentLoaded', handleStripeReturn);