/**
 * LAZY LOADING SYSTEM - I AM ACTOR
 * Performance optimization for images and videos
 * Uses Intersection Observer API (native, no dependencies)
 *
 * Features:
 * - Lazy load images with blur-up placeholder technique
 * - Lazy load background videos
 * - Responsive image support (srcset)
 * - Fade-in animation on load
 * - Fallback for older browsers
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px 0px', // Load 50px before entering viewport
            threshold: 0.01,
            imageSelector: '.lazy-image',
            videoSelector: '.lazy-video',
            ...options
        };

        this.imageObserver = null;
        this.videoObserver = null;

        this.init();
    }

    init() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback: load all images immediately
            this.loadAllImagesImmediately();
            return;
        }

        // Initialize observers
        this.initImageObserver();
        this.initVideoObserver();

        // Observe elements
        this.observeImages();
        this.observeVideos();
    }

    initImageObserver() {
        this.imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            }
        );
    }

    initVideoObserver() {
        this.videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.loadVideo(entry.target);
                        this.videoObserver.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            }
        );
    }

    observeImages() {
        const images = document.querySelectorAll(this.options.imageSelector);
        images.forEach((img) => {
            this.imageObserver.observe(img);
        });
    }

    observeVideos() {
        const videos = document.querySelectorAll(this.options.videoSelector);
        videos.forEach((video) => {
            this.videoObserver.observe(video);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (!src && !srcset) {
            return;
        }

        // Create temporary image to preload
        const tempImg = new Image();

        // Handle load success
        tempImg.onload = () => {
            // Set actual source
            if (src) {
                img.src = src;
            }
            if (srcset) {
                img.srcset = srcset;
            }

            // Remove placeholder blur
            img.classList.remove('lazy-image-placeholder');

            // Add loaded class for fade-in animation
            img.classList.add('loaded');

            // Clean up data attributes
            delete img.dataset.src;
            delete img.dataset.srcset;
        };

        // Handle load error
        tempImg.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            img.classList.add('loaded'); // Show placeholder anyway
        };

        // Start loading
        if (srcset) {
            tempImg.srcset = srcset;
        }
        if (src) {
            tempImg.src = src;
        }
    }

    loadVideo(video) {
        const sources = video.querySelectorAll('source[data-src]');

        sources.forEach((source) => {
            const src = source.dataset.src;
            if (src) {
                source.src = src;
                delete source.dataset.src;
            }
        });

        // Reload video with new sources
        video.load();

        // Add loaded class for fade-in
        video.classList.add('loaded');

        // Play if autoplay is set
        if (video.hasAttribute('autoplay')) {
            video.play().catch((error) => {
                // Autoplay was prevented (usually on mobile)
                console.log('Autoplay prevented:', error);
            });
        }
    }

    loadAllImagesImmediately() {
        // Fallback for browsers without Intersection Observer
        const images = document.querySelectorAll(this.options.imageSelector);
        images.forEach((img) => {
            this.loadImage(img);
        });

        const videos = document.querySelectorAll(this.options.videoSelector);
        videos.forEach((video) => {
            this.loadVideo(video);
        });
    }

    // Public method to manually observe new elements (for dynamic content)
    observe(elements) {
        if (!Array.isArray(elements)) {
            elements = [elements];
        }

        elements.forEach((element) => {
            if (element.classList.contains(this.options.imageSelector.replace('.', ''))) {
                this.imageObserver.observe(element);
            } else if (element.classList.contains(this.options.videoSelector.replace('.', ''))) {
                this.videoObserver.observe(element);
            }
        });
    }

    // Public method to disconnect observers (cleanup)
    disconnect() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
        if (this.videoObserver) {
            this.videoObserver.disconnect();
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lazyLoader = new LazyLoader();
    });
} else {
    // DOM already loaded
    window.lazyLoader = new LazyLoader();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}
