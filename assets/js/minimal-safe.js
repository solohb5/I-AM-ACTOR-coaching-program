/* Minimal Safe JavaScript - Emergency Fix */

document.addEventListener('DOMContentLoaded', function() {
    // Only essential functionality
    initPricingModal();
    initTestimonialCarousel();
});

// Simple pricing modal
function initPricingModal() {
    const buttons = document.querySelectorAll('#main-cta, #nav-cta, #spots-cta');
    const modal = document.getElementById('pricing-modal');
    const closeBtn = document.getElementById('modal-close');
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (!modal) return;
    
    buttons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
}

// Simple testimonial carousel
function initTestimonialCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    
    if (cards.length === 0) return;
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            cards[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            cards[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        });
    });
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
        cards[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }, 5000);
}