// Professional Portfolio JavaScript with Enhanced Photo Features

class Portfolio {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupPortfolioFilters();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupLightbox();
        this.setupImageLoading();
        this.setupNotifications();
    }
    
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    setupPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        // Staggered animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    setupLightbox() {
        // Close lightbox when clicking outside or pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
        
        // Add keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    // Previous image logic (can be implemented later)
                } else if (e.key === 'ArrowRight') {
                    // Next image logic (can be implemented later)
                }
            }
        });
    }
    
    setupImageLoading() {
        // Lazy loading for portfolio images
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading animation
                    img.style.opacity = '0';
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    };
                    
                    // Add error handling for broken images
                    img.onerror = () => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    };
                    
                    // Add hover effect for portfolio items
                    const portfolioItem = img.closest('.portfolio-item');
                    if (portfolioItem) {
                        portfolioItem.addEventListener('mouseenter', () => {
                            if (window.innerWidth > 768) {
                                img.style.transform = 'scale(1.1)';
                            }
                        });
                        
                        portfolioItem.addEventListener('mouseleave', () => {
                            img.style.transform = 'scale(1)';
                        });
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe all portfolio images
        document.querySelectorAll('.portfolio-image img').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Handle profile image loading
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            profileImage.addEventListener('load', () => {
                const placeholder = document.querySelector('.avatar-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            });
            
            profileImage.addEventListener('error', () => {
                const placeholder = document.querySelector('.avatar-placeholder');
                if (placeholder) {
                    placeholder.style.display = 'flex';
                }
            });
        }
    }
    
    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            // Add input validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Validate all fields
                let isValid = true;
                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    this.showNotification('Please fill in all required fields correctly.', 'error');
                    return;
                }
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                try {
                    // Simulate form submission
                    await this.submitForm(new FormData(form));
                    
                    // Success state
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = '#10b981';
                    
                    // Show success message
                    this.showNotification('Thank you for your message! I\'ll get back to you soon. 😊', 'success');
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                        
                        // Clear any validation styles
                        inputs.forEach(input => {
                            this.clearFieldError(input);
                        });
                    }, 3000);
                    
                } catch (error) {
                    // Error state
                    submitBtn.innerHTML = '<i class="fas fa-times"></i> Error Occurred';
                    submitBtn.style.backgroundColor = '#ef4444';
                    
                    this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        // Clear previous errors
        this.clearFieldError(field);
        
        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    async submitForm(formData) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    setupNotifications() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }
    
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        
        // Remove existing notifications of the same type
        container.querySelectorAll(`.notification-${type}`).forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-size: 14px;
            margin-bottom: 1rem;
            pointer-events: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;
        
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for service cards
                    if (entry.target.classList.contains('service-card')) {
                        const cards = document.querySelectorAll('.service-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.service-card, .about-text, .about-skills, .contact-card, .contact-form-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                const isClickInsideNav = hamburger.contains(e.target) || navMenu.contains(e.target);
                if (!isClickInsideNav && navMenu.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });
            
            // Close menu when window is resized to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMobileMenu();
                }
            });
        }
    }
    
    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            
            // Show mobile menu
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'white';
            navMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            navMenu.style.padding = '1rem';
            navMenu.style.gap = '1rem';
            navMenu.style.borderRadius = '0 0 8px 8px';
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMobileMenu();
        }
    }
    
    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
        
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.width = '';
        navMenu.style.background = '';
        navMenu.style.boxShadow = '';
        navMenu.style.padding = '';
        navMenu.style.gap = '';
        navMenu.style.borderRadius = '';
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Enhanced Lightbox functionality
function openLightbox(imageSrc, title, description = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    
    // Set image source
    lightboxImage.src = `/static/${imageSrc}`;
    lightboxImage.onerror = () => {
        lightboxImage.src = `https://via.placeholder.com/800x600/6366f1/ffffff?text=Image+Not+Found`;
    };
    
    // Set content
    lightboxTitle.textContent = title;
    if (lightboxDescription) {
        lightboxDescription.textContent = description;
    }
    
    // Show lightbox
    lightbox.style.display = 'flex';
    lightbox.style.opacity = '0';
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Add loading state
    lightboxImage.style.opacity = '0';
    lightboxImage.onload = () => {
        lightboxImage.style.opacity = '1';
    };
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.opacity = '0';
    
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 200);
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    console.log('🎯 Student Portfolio - Loaded Successfully!');
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        '/static/images/profile-placeholder.jpg',
        '/static/images/gallery1.jpg',
        '/static/images/gallery2.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Remove any loading indicators
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {
    // Enable :hover styles on touch devices
    document.body.classList.add('touch-device');
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate layouts if needed
        window.dispatchEvent(new Event('resize'));
    }, 500);
});

// Add scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show scroll to top button after scrolling
let scrollToTopBtn;
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transform: scale(0.8);
            `;
            scrollToTopBtn.onclick = scrollToTop;
            document.body.appendChild(scrollToTopBtn);
        }
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'scale(1)';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'scale(0.8)';
    }
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Skip links functionality
    if (e.key === 'Tab' && e.shiftKey) {
        // Handle reverse tab navigation
    } else if (e.key === 'Tab') {
        // Handle forward tab navigation
    }
    
    // Close modals with Escape
    if (e.key === 'Escape') {
        closeLightbox();
        const portfolio = window.portfolio;
        if (portfolio) {
            portfolio.closeMobileMenu();
        }
    }
});
