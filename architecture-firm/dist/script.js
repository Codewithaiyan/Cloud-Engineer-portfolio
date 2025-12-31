/**
 * AIYAN AHMED — Cloud Engineer Portfolio
 * Swiss International Style + Neo-Brutalist Tech Design
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    LoadingCurtain.init();
    CustomCursor.init();
    MobileMenu.init();
    ScrollAnimations.init();
    ContactForm.init();
    Navigation.init();
    SkillItems.init();
});

/**
 * Loading Curtain Animation
 * Black curtain reveal with name
 */
const LoadingCurtain = {
    init() {
        this.curtain = document.getElementById('curtain');
        this.isFirstVisit = !sessionStorage.getItem('visited');

        if (this.isFirstVisit) {
            sessionStorage.setItem('visited', 'true');
            setTimeout(() => {
                this.hide();
            }, 1000);
        } else {
            this.curtain.style.display = 'none';
        }
    },

    hide() {
        this.curtain.classList.add('hidden');
        setTimeout(() => {
            this.curtain.style.display = 'none';
        }, 600);
    }
};

/**
 * Custom Cursor
 * Industrial orange dot with hover effects
 */
const CustomCursor = {
    cursor: null,

    init() {
        this.cursor = document.getElementById('cursor');
        if (!this.cursor) return;

        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .project-card, .skill-item, .cert-item, .form-input, .form-submit, .social-link'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }
};

/**
 * Mobile Menu
 * Brutalist toggle menu
 */
const MobileMenu = {
    menu: null,
    toggle: null,

    init() {
        this.menu = document.getElementById('mobileMenu');
        this.toggle = document.getElementById('menuToggle');

        if (!this.menu || !this.toggle) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());

        const links = this.menu.querySelectorAll('.mobile-nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
    },

    closeMenu() {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/**
 * Skill Items Animation
 * Add hover effects to skill items
 */
const SkillItems = {
    init() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }
};

/**
 * Scroll Animations
 * Reveal elements on scroll with industrial precision
 */
const ScrollAnimations = {
    observer: null,

    init() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe elements
        const animateElements = document.querySelectorAll(
            '.project-card, .skill-category, .cert-item, .credential-main, .contact-block'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            this.observer.observe(el);
        });

        // Parallax effect for hero image
        this.initParallax();

        // Header scroll effect
        this.initHeaderScroll();
    },

    initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');

            if (scrolled < heroSection.offsetHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    },

    initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.borderBottomColor = 'var(--industrial-orange)';
            } else {
                header.style.borderBottomColor = 'var(--jet-black)';
            }
        });
    }
};

/**
 * Contact Form
 * Form validation and submission handling
 */
const ContactForm = {
    form: null,

    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        if (field.required && !value) {
            this.showError(field, 'This field is required');
            isValid = false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        return isValid;
    },

    showError(field, message) {
        field.style.borderColor = 'var(--industrial-orange)';

        let errorEl = field.parentNode.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.style.cssText = `
                font-family: var(--font-mono);
                font-size: 0.65rem;
                color: var(--industrial-orange);
                margin-top: 5px;
            `;
            field.parentNode.appendChild(errorEl);
        }
        errorEl.textContent = message;
    },

    clearError(field) {
        field.style.borderColor = 'var(--jet-black)';
        const errorEl = field.parentNode.querySelector('.error-message');
        if (errorEl) {
            errorEl.remove();
        }
    },

    async handleSubmit(e) {
        e.preventDefault();

        const inputs = this.form.querySelectorAll('.form-input');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        const submitBtn = this.form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        submitBtn.textContent = 'SENT';
        submitBtn.style.backgroundColor = '#22c55e';

        setTimeout(() => {
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 2000);
    }
};

/**
 * Navigation
 * Smooth scrolling and active state management
 */
const Navigation = {
    navLinks: [],
    sections: [],

    init() {
        this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');

        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });

        window.addEventListener('scroll', () => this.updateActiveState());
    },

    handleNavClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }
    },

    updateActiveState() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/**
 * Utility Functions
 */
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoadingCurtain,
        CustomCursor,
        MobileMenu,
        ScrollAnimations,
        ContactForm,
        Navigation,
        SkillItems,
        Utils
    };
}
