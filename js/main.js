// ===== Scroll Animation with Intersection Observer =====
document.addEventListener('DOMContentLoaded', function() {

    // ===== Intersection Observer for Scroll Animations =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ===== Tab Navigation =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');

            // Re-observe elements in the newly visible tab for animations
            const newTabContent = document.getElementById(tabId);
            const newAnimatedElements = newTabContent.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
            newAnimatedElements.forEach(el => {
                el.classList.remove('visible');
                scrollObserver.observe(el);
            });
        });
    });

    // ===== Grade Tabs =====
    const gradeBtns = document.querySelectorAll('.grade-btn');
    const gradeContents = document.querySelectorAll('.grade-content');

    gradeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const gradeId = this.getAttribute('data-grade');

            // Remove active class from all buttons and contents
            gradeBtns.forEach(b => b.classList.remove('active'));
            gradeContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(gradeId).classList.add('active');
        });
    });

    // ===== Subject Selector (과목 선택) =====
    const subjectBtns = document.querySelectorAll('.subject-btn');
    const subjectContents = document.querySelectorAll('.subject-content');

    subjectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const subjectId = this.getAttribute('data-subject');

            // Remove active class from all buttons and contents
            subjectBtns.forEach(b => b.classList.remove('active'));
            subjectContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.querySelector(`.subject-content[data-subject="${subjectId}"]`);
            if (targetContent) {
                targetContent.classList.add('active');

                // Re-observe elements in the newly visible content for animations
                const newAnimatedElements = targetContent.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
                newAnimatedElements.forEach(el => {
                    el.classList.remove('visible');
                    scrollObserver.observe(el);
                });
            }
        });
    });

    // ===== Accordion =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Card Hover Effect Enhancement =====
    const schoolCards = document.querySelectorAll('.school-card');

    schoolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== Back to Top Button =====
    const scrollThreshold = 300;
    let backToTopBtn = document.querySelector('.back-to-top');

    // Create back to top button if it doesn't exist
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', '맨 위로 이동');
        document.body.appendChild(backToTopBtn);
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Parallax Effect on Header =====
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            header.style.backgroundPositionY = rate + 'px';
        });
    }

    // ===== Number Counter Animation =====
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe number elements for counter animation
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/(\d+)/);
                if (match && !el.dataset.animated) {
                    const number = parseInt(match[0]);
                    el.dataset.animated = 'true';
                    animateValue(el, 0, number, 1500);
                }
                numberObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    // Observe credit numbers
    document.querySelectorAll('.credit-number').forEach(el => {
        numberObserver.observe(el);
    });

    // ===== Search Functionality (if needed later) =====
    function searchContent(query) {
        const searchTerm = query.toLowerCase();
        const accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
                if (searchTerm.length > 2) {
                    item.classList.add('active');
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    // ===== Print Functionality =====
    window.printPage = function() {
        window.print();
    };

    // ===== Local Storage for Preferences =====
    function savePreference(key, value) {
        localStorage.setItem('curriculum_' + key, value);
    }

    function getPreference(key) {
        return localStorage.getItem('curriculum_' + key);
    }

    // Save last visited tab
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            savePreference('lastTab', tabId);
        });
    });

    // Restore last visited tab
    const lastTab = getPreference('lastTab');
    if (lastTab) {
        const savedTabBtn = document.querySelector(`.tab-btn[data-tab="${lastTab}"]`);
        const savedTabContent = document.getElementById(lastTab);
        if (savedTabBtn && savedTabContent) {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            savedTabBtn.classList.add('active');
            savedTabContent.classList.add('active');
        }
    }

    // ===== Tag Click Effect =====
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // ===== Ripple Effect on Buttons =====
    const buttons = document.querySelectorAll('.tab-btn, .grade-btn, .card-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
            ripple.style.left = (e.clientX - rect.left - Math.max(rect.width, rect.height) / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - Math.max(rect.width, rect.height) / 2) + 'px';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== Stagger Animation for Cards =====
    const staggerElements = document.querySelectorAll('.school-card, .feature-item, .time-card, .grade-card, .change-item');
    staggerElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    console.log('2022 개정 교육과정 안내 페이지가 로드되었습니다.');
});

// ===== Utility Functions =====

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Debounce function for search
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
