// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't prevent default for external links
        if (link.getAttribute('href').startsWith('http')) {
            return;
        }
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove header background based on scroll position
    if (scrollTop > 100) {
        header.style.background = 'rgba(23, 23, 26, 0.98)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.2)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(23, 23, 26, 0.95)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.1)';
        header.style.boxShadow = 'none';
    }
    
    // Keep header always visible (fixed)
    header.style.transform = 'translateY(0)';
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    rootMargin: '-50% 0px -50% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const navLink = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current section link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Scroll animations
const observeElements = document.querySelectorAll('.about-card, .service-card, .tech-category, .contact-item');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

observeElements.forEach(el => {
    el.classList.add('scroll-fade');
    fadeInObserver.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-container');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitBtn = contactForm.querySelector('.btn-primary');
        
        // Disable form during submission
        formInputs.forEach(input => input.disabled = true);
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Re-enable form
            formInputs.forEach(input => {
                input.disabled = false;
                input.value = '';
            });
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
            
            // Show success message
            showNotification('Mensagem enviada com sucesso!', 'success');
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Button click animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleCSS);

// Typing animation for hero code block
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Initialize typing animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const codeLines = document.querySelectorAll('.code-line');
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                }, index * 500);
            });
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    // Animate elements with stagger
    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add cursor trail effect for hero section
let mouseX = 0;
let mouseY = 0;
const trail = [];
const trailLength = 5;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createTrailDot() {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #7641E6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.8;
        transition: all 0.2s ease;
    `;
    
    document.body.appendChild(dot);
    return dot;
}

// Only show trail in hero section
function updateTrail() {
    const heroRect = document.querySelector('.hero')?.getBoundingClientRect();
    
    if (heroRect && mouseX >= heroRect.left && mouseX <= heroRect.right && 
        mouseY >= heroRect.top && mouseY <= heroRect.bottom) {
        
        trail.forEach((dot, index) => {
            if (dot && dot.parentNode) {
                const factor = (index + 1) / trailLength;
                dot.style.left = mouseX - 2 + 'px';
                dot.style.top = mouseY - 2 + 'px';
                dot.style.opacity = 0.8 * factor;
                dot.style.transform = `scale(${factor})`;
            }
        });
        
        // Add new dot
        if (trail.length < trailLength) {
            trail.push(createTrailDot());
        } else {
            const oldDot = trail.shift();
            if (oldDot && oldDot.parentNode) {
                document.body.removeChild(oldDot);
            }
            trail.push(createTrailDot());
        }
    } else {
        // Remove all trail dots when not in hero
        trail.forEach(dot => {
            if (dot && dot.parentNode) {
                document.body.removeChild(dot);
            }
        });
        trail.length = 0;
    }
    
    requestAnimationFrame(updateTrail);
}

// Start trail animation
requestAnimationFrame(updateTrail);

// Tech stack hover effects
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

console.log('OpenKit website loaded successfully! 🚀');