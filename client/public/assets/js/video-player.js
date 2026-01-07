/**
 * VIDEO PLAYER - I AM ACTOR
 * Vanilla JavaScript testimonial video modal system
 * No dependencies, fully accessible, performant
 *
 * Features:
 * - Vimeo embed support
 * - Keyboard navigation (Escape to close)
 * - Click outside to close
 * - ARIA labels for accessibility
 * - Prevents body scroll when open
 * - Auto-cleanup on close
 */

class TestimonialVideoPlayer {
    constructor() {
        this.modal = null;
        this.modalContent = null;
        this.modalPlayer = null;
        this.modalClose = null;
        this.activeVideoId = null;
        this.init();
    }

    init() {
        // Create modal if it doesn't exist
        this.createModal();

        // Bind events
        this.bindTriggerEvents();
        this.bindModalEvents();
    }

    createModal() {
        // Check if modal already exists
        if (document.getElementById('testimonial-video-modal')) {
            this.modal = document.getElementById('testimonial-video-modal');
            this.modalContent = this.modal.querySelector('.video-modal-content');
            this.modalPlayer = this.modal.querySelector('.video-modal-player');
            this.modalClose = this.modal.querySelector('.video-modal-close');
            return;
        }

        // Create modal HTML
        const modalHTML = `
            <div id="testimonial-video-modal" class="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title">
                <div class="video-modal-content">
                    <button class="video-modal-close" aria-label="Close video">×</button>
                    <div class="video-modal-player" id="video-modal-player">
                        <!-- Video iframe will be inserted here -->
                    </div>
                </div>
                <span id="video-modal-title" class="sr-only">Testimonial Video</span>
            </div>
        `;

        // Insert modal into DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get references
        this.modal = document.getElementById('testimonial-video-modal');
        this.modalContent = this.modal.querySelector('.video-modal-content');
        this.modalPlayer = this.modal.querySelector('.video-modal-player');
        this.modalClose = this.modal.querySelector('.video-modal-close');
    }

    bindTriggerEvents() {
        // Listen for clicks on video trigger buttons
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.testimonial-video-trigger');
            if (trigger) {
                e.preventDefault();
                const videoId = trigger.dataset.videoId;
                if (videoId) {
                    this.open(videoId);
                }
            }
        });
    }

    bindModalEvents() {
        // Close button
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => {
                this.close();
            });
        }

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(videoId) {
        if (!videoId) {
            console.error('No video ID provided');
            return;
        }

        this.activeVideoId = videoId;

        // Create iframe for Vimeo
        const iframe = document.createElement('iframe');
        iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('title', 'Testimonial Video');

        // Clear existing content and add iframe
        this.modalPlayer.innerHTML = '';
        this.modalPlayer.appendChild(iframe);

        // Show modal
        this.modal.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus trap - move focus to close button
        setTimeout(() => {
            this.modalClose.focus();
        }, 100);

        // Announce to screen readers
        this.announceToScreenReader('Video player opened');
    }

    close() {
        // Hide modal
        this.modal.classList.remove('active');

        // Allow body scroll
        document.body.style.overflow = '';

        // Clean up iframe after animation
        setTimeout(() => {
            this.modalPlayer.innerHTML = '';
            this.activeVideoId = null;
        }, 400); // Match CSS transition duration

        // Announce to screen readers
        this.announceToScreenReader('Video player closed');
    }

    announceToScreenReader(message) {
        // Create or update screen reader announcement
        let announcer = document.getElementById('video-player-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'video-player-announcer';
            announcer.className = 'sr-only';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.testimonialVideoPlayer = new TestimonialVideoPlayer();
    });
} else {
    // DOM already loaded
    window.testimonialVideoPlayer = new TestimonialVideoPlayer();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestimonialVideoPlayer;
}
