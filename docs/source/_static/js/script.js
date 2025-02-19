// Theme Switching
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = 'light';

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Intersection Observer for animations
const animatedElements = document.querySelectorAll('.animate-up');
let delay = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${delay}s`;
            entry.target.style.animationPlayState = 'running';
            delay += 0.2;
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach((element) => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
});

// Mobile Navigation
const mobileNav = document.querySelector('.main-nav');
const mobileNavToggle = document.createElement('button');
mobileNavToggle.classList.add('mobile-nav-toggle');
mobileNavToggle.innerHTML = `
    <svg viewBox="0 0 24 24" width="24" height="24">
        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
`;

document.querySelector('.header-container').insertBefore(mobileNavToggle, mobileNav);

mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Smooth Scrolling
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
