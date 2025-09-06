// Modern JavaScript for Pizza Web App
class PizzaWebApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupHeaderScroll();
        this.setupParallaxEffects();
        this.preloadImages();
    }

    setupEventListeners() {
        // Download button handlers
        document.querySelectorAll('.download-btn:not(.coming-soon)').forEach(btn => {
            btn.addEventListener('click', this.handleDownload.bind(this));
        });

        document.querySelectorAll('.download-btn.coming-soon').forEach(btn => {
            btn.addEventListener('click', this.handleComingSoon.bind(this));
        });

        // Add to cart handlers
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', this.handleAddToCart.bind(this));
        });

        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', this.handleNewsletterSignup.bind(this));
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in').forEach(el => {
            observer.observe(el);
        });

        // Stagger animations for cards
        document.querySelectorAll('.feature-card, .menu-item').forEach((card, index) => {
            card.dataset.delay = index * 100;
            card.classList.add('animate-fade-in');
            observer.observe(card);
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');

                // Animate toggle icon
                const icon = mobileToggle.querySelector('i');
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });

            // Close menu when clicking on links
            mobileMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }

    setupMenuFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const menuItems = document.querySelectorAll('.menu-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Filter menu items with animation
                menuItems.forEach((item, index) => {
                    const category = item.dataset.category;

                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.animation = 'fadeInUp 0.5s ease forwards';
                        }, index * 50);
                    } else {
                        item.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;

                parallaxElements.forEach(element => {
                    const speed = element.dataset.parallax || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }

    preloadImages() {
        // Preload critical images for better performance
        const imageUrls = [
            // Add your image URLs here
        ];

        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    handleDownload(e) {
        e.preventDefault();
        const platform = e.currentTarget.dataset.platform || 'android';

        // Add click animation
        e.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.currentTarget.style.transform = '';
        }, 150);

        // Show custom notification
        this.showNotification(
            'Download Starting',
            `Preparing ${platform} app download...`,
            'success'
        );

        // Simulate download process
        setTimeout(() => {
            this.showNotification(
                'Download Available',
                'Your download will begin shortly. Thank you for choosing Friends Pizza Hut!',
                'info'
            );
        }, 2000);
    }

    handleComingSoon(e) {
        e.preventDefault();
        this.showNotification(
            'Coming Soon!',
            'iOS app is in development. We\'ll notify you when it\'s available!',
            'info'
        );
    }

    handleAddToCart(e) {
        e.preventDefault();
        const menuItem = e.target.closest('.menu-item');
        const itemName = menuItem.querySelector('.menu-item-title').textContent;
        const itemPrice = menuItem.querySelector('.menu-item-price').textContent;

        // Add animation to button
        e.target.style.transform = 'scale(0.9)';
        e.target.innerHTML = '<i class="fas fa-check"></i> Added!';

        setTimeout(() => {
            e.target.style.transform = '';
            e.target.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
        }, 2000);

        this.showNotification(
            'Added to Cart',
            `${itemName} (${itemPrice}) has been added to your cart!`,
            'success'
        );

        // Update cart counter (if exists)
        this.updateCartCounter();
    }

    handleNewsletterSignup(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        if (this.validateEmail(email)) {
            this.showNotification(
                'Subscribed!',
                'Thank you for subscribing to our newsletter!',
                'success'
            );
            e.target.reset();
        } else {
            this.showNotification(
                'Invalid Email',
                'Please enter a valid email address.',
                'error'
            );
        }
    }

    updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            const currentCount = parseInt(cartCounter.textContent) || 0;
            cartCounter.textContent = currentCount + 1;

            // Add bounce animation
            cartCounter.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                cartCounter.style.animation = '';
            }, 500);
        }
    }

    showNotification(title, message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Add show class for animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.classList.add('removing');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Utility method for throttling scroll events
    throttle(func, wait) {
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

    // Method to add custom CSS animations
    addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: scale(1);
                }
                to {
                    opacity: 0;
                    transform: scale(0.8);
                }
            }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border-left: 4px solid var(--primary-color);
                max-width: 400px;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification.removing {
                transform: translateX(100%);
            }

            .notification-success {
                border-left-color: var(--success-color);
            }

            .notification-error {
                border-left-color: var(--warning-color);
            }

            .notification-content {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .notification-title {
                font-weight: 600;
                color: var(--text-primary);
            }

            .notification-message {
                font-size: 14px;
                color: var(--text-secondary);
            }

            .notification-close {
                position: absolute;
                top: 8px;
                right: 8px;
                background: none;
                border: none;
                color: var(--text-light);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s ease;
            }

            .notification-close:hover {
                background: var(--surface-color);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PizzaWebApp();
    app.addCustomAnimations();
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Add performance optimizations
if ('IntersectionObserver' in window) {
    // Lazy load images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
