
// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const themeToggleNav = document.getElementById('themeToggleNav');
const scrollProgress = document.getElementById('scrollProgress');
const formContato = document.getElementById('formContato');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (this.getAttribute('href') === '#') return;

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Back to Top - Fixed to go to home section
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        window.scrollTo({
            top: homeSection.offsetTop,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Theme Toggle Function
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.documentElement.style.setProperty('--primary-dark', '#19142a');
        document.documentElement.style.setProperty('--primary-darker', '#130e24');
        document.documentElement.style.setProperty('--primary-deep', '#0f0a21');
        document.documentElement.style.setProperty('--primary-black', '#130e25');
        document.documentElement.style.setProperty('--white', '#ffffff');
        document.documentElement.style.setProperty('--white-soft', '#fefefe');

        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.setAttribute('data-tooltip', 'Modo Claro');
        }
        if (themeToggleNav) {
            themeToggleNav.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleNav.setAttribute('data-tooltip', 'Modo Claro');
        }
    } else {
        document.documentElement.style.setProperty('--primary-dark', '#f8f9fa');
        document.documentElement.style.setProperty('--primary-darker', '#e9ecef');
        document.documentElement.style.setProperty('--primary-deep', '#dee2e6');
        document.documentElement.style.setProperty('--primary-black', '#ffffff');
        document.documentElement.style.setProperty('--white', '#212529');
        document.documentElement.style.setProperty('--white-soft', '#343a40');

        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('data-tooltip', 'Modo Escuro');
        }
        if (themeToggleNav) {
            themeToggleNav.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleNav.setAttribute('data-tooltip', 'Modo Escuro');
        }
    }
}

// Theme Toggle Event Listeners
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
if (themeToggleNav) {
    themeToggleNav.addEventListener('click', toggleTheme);
}

// Initialize theme on page load (light theme by default)
document.addEventListener('DOMContentLoaded', () => {
    // Apply light theme initially
    document.documentElement.style.setProperty('--primary-dark', '#f8f9fa');
    document.documentElement.style.setProperty('--primary-darker', '#e9ecef');
    document.documentElement.style.setProperty('--primary-deep', '#dee2e6');
    document.documentElement.style.setProperty('--primary-black', '#ffffff');
    document.documentElement.style.setProperty('--white', '#212529');
    document.documentElement.style.setProperty('--white-soft', '#343a40');

    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.setAttribute('data-tooltip', 'Modo Escuro');
    }
    if (themeToggleNav) {
        themeToggleNav.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleNav.setAttribute('data-tooltip', 'Modo Escuro');
    }
});

// Window Scroll Events
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrolled / docHeight) * 100;

    // Update scroll progress
    scrollProgress.style.width = scrollPercent + '%';

    // Header scroll effect
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrolled > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            // Animate counters for stat items
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('.stat-number');
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.about-text, .about-image, .director-content, .services-intro, .service-card, .projects-works-intro, .works-carousel-wrapper, .work-card, .client-display, .clients-carousel, .project-card, .contact-info, .contact-form, .fade-in-up, .fade-in-left, .fade-in-right, .stat-item').forEach(el => {
    observer.observe(el);
});

// Clients Carousel Functionality
function initClientsCarousel() {
    const clientItems = document.querySelectorAll('.client-item');
    const clientLogoLarge = document.getElementById('clientLogoLarge');
    let currentIndex = 0;
    let autoRotateInterval;

    // Client data (using CSS-based placeholders instead of external URLs)
    const clientsData = {
        1: {
            name: 'Petrobras',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Logo_Lojas_Havan.jpg',
            smallLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Logo_Lojas_Havan.jpg'
        },
        2: {
            name: 'Vale',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Mitsubishi_motors_new_logo.svg',
            smallLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Mitsubishi_motors_new_logo.svg'
        },
        3: {
            name: 'CSN',
            logo: 'https://www.siglaseabreviaturas.com/wp-content/uploads/2014/11/PG-siglas.png',
            smallLogo: 'https://www.siglaseabreviaturas.com/wp-content/uploads/2014/11/PG-siglas.png'
        },
        4: {
            name: 'Usiminas',
            logo: 'https://logodownload.org/wp-content/uploads/2014/05/gerdau-logo-1-1.png',
            smallLogo: 'https://logodownload.org/wp-content/uploads/2014/05/gerdau-logo-1-1.png'
        },
        5: {
            name: 'Gerdau',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiByeD0iMTUiIGZpbGw9IiNFRTM1MjQiLz4KPHBhdGggZD0iTTM2IDU0SDcyVjkwSDM2VjU0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMTA4IDU0SDE0NFY5MEgxMDhWNTRaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik03MiA5MEgxMDhWMTI2SDcyVjkwWiIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSI5MCIgY3k9IjEzMyIgcj0iNyIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K',
            smallLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iOCIgZmlsbD0iI0VFMzUyNCIvPgo8cGF0aCBkPSJNMTAgMTVIMjBWMjVIMTBWMTVaIiBmaWxsPSIjRkZGRkZGIi8+CjxwYXRoIGQ9Ik0zMCAxNUg0MFYyNUgzMFYxNVoiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTIwIDI1SDMwVjM1SDIwVjI1WiIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIyNSIgY3k9IjM3IiByPSIyIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo='
        }
    };

    // Update client logos in small buttons
    clientItems.forEach((item, index) => {
        const clientId = item.getAttribute('data-client');
        const clientData = clientsData[clientId];
        const img = item.querySelector('img');
        if (img && clientData) {
            img.src = clientData.smallLogo;
            img.alt = clientData.name;
        }
    });

    function selectClient(index) {
        // Remove active class from all items
        clientItems.forEach(i => i.classList.remove('active'));

        // Add active class to selected item
        if (clientItems[index]) {
            clientItems[index].classList.add('active');

            // Get client data
            const clientId = clientItems[index].getAttribute('data-client');
            const clientData = clientsData[clientId];

            // Update large logo display with smooth animation
            clientLogoLarge.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            clientLogoLarge.style.transform = 'scale(0.9)';
            clientLogoLarge.style.opacity = '0.6';

            setTimeout(() => {
                clientLogoLarge.innerHTML = `
                            <img src="${clientData.logo}" alt="${clientData.name}" title="${clientData.name}" style="transition: all 0.3s ease;">
                        `;

                // Animate back to normal
                setTimeout(() => {
                    clientLogoLarge.style.transform = 'scale(1)';
                    clientLogoLarge.style.opacity = '1';
                }, 50);
            }, 150);
        }
    }

    function startAutoRotation() {
        autoRotateInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % clientItems.length;
            selectClient(currentIndex);
        }, 4000); // Change every 4 seconds for better user experience
    }

    function stopAutoRotation() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    clientItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            stopAutoRotation();
            currentIndex = index;
            selectClient(currentIndex);

            // Restart auto rotation after 6 seconds of no interaction
            setTimeout(() => {
                if (!autoRotateInterval) {
                    startAutoRotation();
                }
            }, 6000);
        });

        // Add hover effects with smooth transitions
        item.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                this.style.transform = 'translateY(-5px) scale(1.1)';
            }
        });

        item.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });

    // Pause auto rotation when hovering over the carousel
    const clientsCarousel = document.querySelector('.clients-carousel');
    if (clientsCarousel) {
        clientsCarousel.addEventListener('mouseenter', stopAutoRotation);
        clientsCarousel.addEventListener('mouseleave', startAutoRotation);
    }

    // Set first item as active and start auto rotation
    if (clientItems.length > 0) {
        selectClient(0);
        startAutoRotation();
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initClientsCarousel);

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 500 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Enhanced Form Submission with Loading State
formContato.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = formContato.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        // Success feedback
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
        submitBtn.style.backgroundColor = '#28a745';

        // Show success message
        showNotification('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.', 'success');

        // Reset form
        formContato.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;

    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : '#007bff'};
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 350px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
});

// Current Year for Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Multi-Card Works Carousel Functionality
function initWorksCarousel() {
    const container = document.getElementById('worksCarouselContainer');
    const prevBtn = document.getElementById('prevWorksBtn');
    const nextBtn = document.getElementById('nextWorksBtn');
    const dotsContainer = document.getElementById('worksDots');
    const cards = document.querySelectorAll('.work-card');

    if (!container || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) {
        return;
    }

    let currentIndex = 0;
    let cardsPerView = 3;
    let autoRotateInterval;
    const totalCards = cards.length;
    let maxIndex = Math.max(0, totalCards - cardsPerView);

    // Calculate cards per view based on screen size
    function updateCardsPerView() {
        const containerWidth = container.parentElement.offsetWidth;
        if (containerWidth <= 768) {
            cardsPerView = 1;
        } else if (containerWidth <= 1200) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }

        maxIndex = Math.max(0, totalCards - cardsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        updateCarousel();
        createDots();
    }

    // Create navigation dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const numberOfDots = Math.ceil(totalCards / cardsPerView);

        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === Math.floor(currentIndex / cardsPerView)) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i * cardsPerView));
            dotsContainer.appendChild(dot);
        }
    }

    // Update carousel position with smooth animation
    function updateCarousel() {
        const cardWidth = container.children[0] ? container.children[0].offsetWidth : 0;
        const gap = 30;
        const offset = -(currentIndex * (cardWidth + gap));

        container.style.transform = `translateX(${offset}px)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / cardsPerView));
        });

        // Update button states (allow infinite loop)
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
        resetAutoRotate();
    }

    // Next slide with infinite loop
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    }

    // Previous slide with infinite loop
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
    }

    // Auto rotate functionality - smoother timing
    function startAutoRotate() {
        autoRotateInterval = setInterval(() => {
            nextSlide();
        }, 3500); // Slightly faster at 3.5 seconds
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    function resetAutoRotate() {
        stopAutoRotate();
        setTimeout(startAutoRotate, 1500); // Shorter pause after interaction
    }

    // Touch/swipe functionality for mobile
    let startX = 0;
    let isDragging = false;
    let hasMoved = false;

    function handleTouchStart(e) {
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        isDragging = true;
        hasMoved = false;
        stopAutoRotate();
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        hasMoved = true;
        // Allow some movement but don't prevent default to maintain smooth scrolling feel
    }

    function handleTouchEnd(e) {
        if (!isDragging || !hasMoved) return;
        isDragging = false;

        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const diffX = startX - endX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        resetAutoRotate();
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoRotate();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoRotate();
    });

    // Touch events - more responsive
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events for desktop drag
    container.addEventListener('mousedown', handleTouchStart);
    container.addEventListener('mousemove', handleTouchMove);
    container.addEventListener('mouseup', handleTouchEnd);
    container.addEventListener('mouseleave', handleTouchEnd);

    // Pause auto-rotate on hover
    const carouselSection = container.closest('.projects-works');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoRotate);
        carouselSection.addEventListener('mouseleave', () => {
            if (!isDragging) startAutoRotate();
        });
    }

    // Handle window resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCardsPerView, 100);
    });

    // Initialize
    updateCardsPerView();
    startAutoRotate();
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initWorksCarousel);

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add stagger animation to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn, .submit-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
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