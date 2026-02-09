// AI Tech Solutions - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========== LOADER ==========
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // If page takes too long, force loader to hide
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
        }
    }, 3000);

    // ========== MOBILE NAVIGATION ==========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Toggle hamburger icon
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';

                const icon = mobileToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.nav-container') &&
                navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';

                const icon = mobileToggle.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id ||
                        (link.getAttribute('href').includes(id) && id)) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Handle page sections
        if (scrollPos < 100) {
            const homeLink = document.querySelector('a[href="index.html"]');
            const currentPage = window.location.pathname.split('/').pop();

            if (currentPage === 'index.html' || currentPage === '') {
                navLinks.forEach(link => link.classList.remove('active'));
                if (homeLink) homeLink.classList.add('active');
            }
        }
    }

    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink);

    // ========== COUNTER ANIMATION ==========
    function animateCounter(element, target, duration) {
        duration = duration || 2000;
        var start = null;
        var startValue = parseInt(element.textContent) || 0;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = Math.min((timestamp - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = Math.floor(startValue + (target - startValue) * eased);

            element.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }

    // Animate hero stats
    var statElements = document.querySelectorAll('.stat h3');
    if (statElements.length > 0) {
        var observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        var statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var element = entry.target;
                    var text = element.textContent.replace('+', '').replace('%', '');
                    var target = parseFloat(text);

                    if (!element.dataset.animated && !isNaN(target)) {
                        animateCounter(element, target);
                        element.dataset.animated = 'true';
                    }

                    statObserver.unobserve(element);
                }
            });
        }, observerOptions);

        statElements.forEach(function(stat) { statObserver.observe(stat); });
    }

    // ========== SCROLL ANIMATIONS ==========
    var animatedElements = document.querySelectorAll('.feature-card, .service-detail-card, .pricing-card, .project-card');

    var animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state for animated elements
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });

    // ========== DARK/LIGHT MODE TOGGLE ==========
    // Create theme toggle if not exists
    if (!document.querySelector('.theme-toggle')) {
        var themeToggleHTML = '<button class="theme-toggle" aria-label="Toggle theme"><i class="fas fa-sun"></i><i class="fas fa-moon"></i></button>';

        var navActions = document.querySelector('.nav-menu');
        if (navActions) {
            navActions.insertAdjacentHTML('beforeend', themeToggleHTML);
        }
    }

    // Theme toggle functionality
    var themeToggle = document.querySelector('.theme-toggle');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var savedTheme = localStorage.getItem('theme');

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ========== FORM HANDLING ==========
    var contactForms = document.querySelectorAll('.contact-form');

    contactForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            var originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(function() {
                // Show success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                // Reset after 3 seconds
                setTimeout(function() {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1500);
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');

            if (href.includes('.html') && !href.startsWith('#')) return;

            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== HOVER EFFECTS ==========
    if (window.matchMedia('(min-width: 1024px)').matches) {
        document.querySelectorAll('.feature-card, .pricing-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = this.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = (y - centerY) / 20;
                var rotateY = (centerX - x) / 20;

                this.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ========== PARALLAX EFFECT ==========
    window.addEventListener('scroll', function() {
        var scrolled = window.scrollY;
        var parallaxElements = document.querySelectorAll('.hero-bg .bg-circle');

        parallaxElements.forEach(function(el, index) {
            var speed = 0.1 * (index + 1);
            el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    });

    // ========== PROJECT FILTER (for projects page) ==========
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
                button.classList.add('active');

                var filter = button.dataset.filter;

                // Filter projects
                projectCards.forEach(function(card) {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(function() {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(function() {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== BACK TO TOP BUTTON ==========
    var backToTopHTML = '<button class="back-to-top" aria-label="Back to top"><i class="fas fa-chevron-up"></i></button>';
    document.body.insertAdjacentHTML('beforeend', backToTopHTML);

    var backToTop = document.querySelector('.back-to-top');
    backToTop.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:50px;height:50px;background:var(--gradient-primary);color:white;border:none;border-radius:50%;font-size:1.2rem;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(20px);transition:all 0.3s ease;z-index:999;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-lg);';

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== URL PARAMS FOR CONTACT FORM ==========
    var urlParams = new URLSearchParams(window.location.search);
    var serviceParam = urlParams.get('service');
    var planParam = urlParams.get('plan');

    if (serviceParam) {
        var serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = serviceParam;
        }
    }

    if (planParam) {
        var budgetSelect = document.getElementById('budget');
        if (budgetSelect) {
            var planBudgetMap = {
                'starter': '5k-10k',
                'pro': '10k-25k',
                'enterprise': '50k+'
            };
            if (planBudgetMap[planParam]) {
                budgetSelect.value = planBudgetMap[planParam];
            }
        }
    }
});
