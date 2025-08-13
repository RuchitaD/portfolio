// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme icon
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Header background and scroll progress on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrollProgress = document.querySelector('.progress-line');
    
    // Header background
    if (window.scrollY > 100) {
        header.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(18, 18, 18, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = body.getAttribute('data-theme') === 'dark' 
            ? 'rgba(18, 18, 18, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    // Scroll progress bar
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Marketing tools interaction
function initializeMarketingIcons() {
    const marketingIcons = document.querySelectorAll('.marketing-icon');
    
    marketingIcons.forEach((icon, index) => {
        // Add click interaction
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 212, 170, 0.4);
                transform: scale(0);
                animation: marketingRipple 0.6s ease-out;
                left: 50%;
                top: 50%;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;
            
            icon.style.position = 'relative';
            icon.appendChild(ripple);
            
            // Show tooltip longer on click
            icon.style.opacity = '0.8';
            setTimeout(() => {
                icon.style.opacity = '0.15';
                ripple.remove();
            }, 1000);
            
            // Show notification with tool info
            const toolName = icon.getAttribute('data-tooltip');
            showNotification(`Expert in ${toolName} 🚀`, 'info');
        });
        
        // Enhanced hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.animationPlayState = 'paused';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.animationPlayState = 'running';
        });
    });
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.getElementById('typed-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
    
    // Initialize marketing icons
    initializeMarketingIcons();
    
    // Show marketing expertise notification after page load
    setTimeout(() => {
        showNotification('🚀 Hover over the floating icons to explore my expertise!', 'info');
    }, 3000);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (target > 99 ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (target > 99 ? '+' : target === 100 ? '%' : '+');
        }
    }
    updateCounter();
}

// Skills Progress Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500);
    });
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate counters when stats section comes into view
            if (entry.target.classList.contains('about-stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            // Animate skill bars when skills section comes into view
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animation - Only for skills and stats
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.stat, .about-stats, .skills'
    );
    
    animateElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced hover effects for portfolio items
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Skill tags enhanced hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 8px 20px rgba(255, 107, 53, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    document.body.classList.add('loaded');
});

// Enhanced parallax effect with marketing icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.shape');
    const particles = document.querySelectorAll('.particle');
    const marketingIcons = document.querySelectorAll('.marketing-icon');
    
    // Hero parallax
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Shapes parallax
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
    
    // Particle parallax
    particles.forEach((particle, index) => {
        const speed = 0.02 + (index * 0.01);
        particle.style.transform += ` translateY(${scrolled * speed}px)`;
    });
    
    // Marketing icons parallax
    marketingIcons.forEach((icon, index) => {
        const speed = 0.05 + (index * 0.02);
        const currentTransform = icon.style.transform || '';
        // Only add parallax if not already in floating animation
        if (!currentTransform.includes('translateY(100vh)')) {
            icon.style.transform = currentTransform + ` translateY(${scrolled * speed}px)`;
        }
    });
    
    // Update connecting lines on scroll
    if (scrolled % 50 === 0) { // Optimize by updating every 50px
        drawConnectingLines();
    }
});

// Add mouse move effect to hero image
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image-placeholder');
    
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth - 0.5) * 20;
            const yPercent = (clientY / innerHeight - 0.5) * 20;
            
            heroImage.style.transform = `perspective(1000px) rotateX(${yPercent * 0.1}deg) rotateY(${xPercent * 0.1}deg)`;
        });
    }
});

// Button ripple effect
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
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
});

// Photo Upload and Management Functions
function triggerPhotoUpload() {
    document.getElementById('photoUpload').click();
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImg = document.querySelector('.profile-img');
            const placeholder = document.querySelector('.hero-image-placeholder');
            
            if (profileImg) {
                profileImg.src = e.target.result;
                profileImg.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Add upload animation
                profileImg.style.opacity = '0';
                profileImg.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    profileImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    profileImg.style.opacity = '1';
                    profileImg.style.transform = 'scale(1)';
                }, 100);
                
                // Show success notification
                showNotification('Photo uploaded successfully! 📸', 'success');
            }
        };
        reader.readAsDataURL(file);
    }
}


let filtersEnabled = true;
function togglePhotoFilters() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        filtersEnabled = !filtersEnabled;
        
        if (filtersEnabled) {
            profileImg.style.filter = `
                brightness(1.1) 
                contrast(1.1) 
                saturate(1.2)
                drop-shadow(0 0 10px rgba(0, 212, 170, 0.3))
            `;
        } else {
            profileImg.style.filter = 'none';
        }
        
        showNotification(
            filtersEnabled ? 'Filters enabled ✨' : 'Filters disabled 🎨', 
            'info'
        );
    }
}

// Photo interaction effects
document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.querySelector('.hero-image-container');
    const profileImg = document.querySelector('.profile-img');
    
    if (photoContainer && profileImg) {
        // Add click-to-zoom effect
        profileImg.addEventListener('click', () => {
            profileImg.style.transform = profileImg.style.transform === 'scale(1.3)' 
                ? 'scale(1)' 
                : 'scale(1.3)';
            
            // Reset after 2 seconds
            setTimeout(() => {
                profileImg.style.transform = 'scale(1)';
            }, 2000);
        });
        
        // Add mouse follow effect for wave
        photoContainer.addEventListener('mousemove', (e) => {
            const waveElement = document.querySelector('.hand-wave');
            if (waveElement) {
                const rect = photoContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Subtle movement based on mouse position
                const moveX = (x - rect.width / 2) * 0.1;
                const moveY = (y - rect.height / 2) * 0.1;
                
                waveElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        photoContainer.addEventListener('mouseleave', () => {
            const waveElement = document.querySelector('.hand-wave');
            if (waveElement) {
                waveElement.style.transform = 'translate(0, 0)';
            }
        });
    }
});

// Add CSS for marketing tools animations
const marketingStyle = document.createElement('style');
marketingStyle.textContent = `
    @keyframes marketingRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .marketing-icon.clicked {
        animation: marketingBounce 0.5s ease;
    }
    
    @keyframes marketingBounce {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.3);
        }
    }
`;
document.head.appendChild(marketingStyle);

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);