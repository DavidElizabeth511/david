// Intersection Observer for animated elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature boxes and content sections
document.querySelectorAll('.feature-box, .content h2, .content h3, .stat-item').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';

    header.insertBefore(menuButton, nav);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Responsive menu handling
    const checkWidth = () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            nav.classList.add('mobile');
        } else {
            menuButton.style.display = 'none';
            nav.classList.remove('mobile', 'active');
        }
    };

    window.addEventListener('resize', checkWidth);
    checkWidth();
};

createMobileMenu();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const header = document.querySelector('.header');
    
    if (scrolled > 50) {
        header.style.background = 'rgba(0, 100, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(0, 100, 0, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Animate statistics when in view
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;

        const updateStat = () => {
            current += increment;
            if (current <= target) {
                if (stat.textContent.includes('$')) {
                    stat.textContent = `$${Math.round(current)}B+`;
                } else if (stat.textContent.includes('%')) {
                    stat.textContent = `${current.toFixed(2)}%`;
                } else if (stat.textContent.includes('/')) {
                    stat.textContent = '24/7';
                } else {
                    stat.textContent = `${Math.round(current)}M+`;
                }
                setTimeout(updateStat, stepTime);
            }
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(stat);
    });
};

animateStats();
