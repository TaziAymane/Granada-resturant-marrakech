// Granada Restaurant - JavaScript Functionality

// Navigation functionality
let mobileMenuOpen = false;

// Scroll event for navigation background
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navigation');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleButton = document.querySelector('.nav-mobile-toggle');
  const hamburgerLines = toggleButton.querySelectorAll('.hamburger-line');
  
  mobileMenuOpen = !mobileMenuOpen;
  
  if (mobileMenuOpen) {
    mobileMenu.classList.add('show');
    mobileMenu.style.display = 'block';
    
    // Animate hamburger to X
    hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    hamburgerLines[1].style.opacity = '0';
    hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    mobileMenu.classList.remove('show');
    mobileMenu.style.display = 'none';
    
    // Reset hamburger
    hamburgerLines[0].style.transform = 'none';
    hamburgerLines[1].style.opacity = '1';
    hamburgerLines[2].style.transform = 'none';
  }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Close mobile menu if open
  if (mobileMenuOpen) {
    toggleMobileMenu();
  }
}

// Scroll to top
function scrollToTop() {
  window.scrollTo({ 
    top: 0, 
    behavior: 'smooth' 
  });
  
  // Close mobile menu if open
  if (mobileMenuOpen) {
    toggleMobileMenu();
  }
}

// Open Google Maps
function openGoogleMaps() {
  window.open('https://maps.google.com/?q=Granada+Restaurant+Marrakech', '_blank');
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add scroll animation class to elements
  const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
  
  // Add hover effects to menu items
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const itemName = item.querySelector('.item-name');
      if (itemName) {
        itemName.style.color = 'var(--color-primary)';
      }
    });
    
    item.addEventListener('mouseleave', () => {
      const itemName = item.querySelector('.item-name');
      if (itemName) {
        itemName.style.color = 'var(--color-foreground)';
      }
    });
  });
  
  // Add hover effects to social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.boxShadow = 'none';
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-container');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleButton = document.querySelector('.nav-mobile-toggle');
    
    if (mobileMenuOpen && 
        !nav.contains(e.target) && 
        !mobileMenu.contains(e.target) && 
        !toggleButton.contains(e.target)) {
      toggleMobileMenu();
    }
  });
  
  // Add parallax effect to hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.backgroundPosition = `center ${rate}px`;
    }
  });
  
  // Add smooth loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenuOpen) {
    toggleMobileMenu();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && mobileMenuOpen) {
    toggleMobileMenu();
  }
});

// Add loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  const initialAnimations = document.querySelectorAll('.fade-in-up[style*="animation-delay"]');
  initialAnimations.forEach(el => {
    el.style.animationPlayState = 'running';
  });
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  const nav = document.getElementById('navigation');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Add error handling for external resources
window.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    console.warn('Image failed to load:', e.target.src);
    e.target.style.display = 'none';
  }
}, true);

        document.addEventListener('DOMContentLoaded', function() {
            // Slider functionality
            const slides = document.querySelectorAll('.slide');
            const dotsContainer = document.querySelector('.slider-nav');
            const prevBtn = document.querySelector('.slider-btn.prev');
            const nextBtn = document.querySelector('.slider-btn.next');
            let currentSlide = 0;
            
            // Create dots for navigation
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            
            const dots = document.querySelectorAll('.slider-dot');
            
            // Function to go to a specific slide
            function goToSlide(n) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = n;
                
                // Handle wrap-around
                if (currentSlide < 0) currentSlide = slides.length - 1;
                if (currentSlide >= slides.length) currentSlide = 0;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            // Event listeners for buttons
            prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
            
            // Auto-advance slides
            setInterval(() => goToSlide(currentSlide + 1), 5000);
            
            // Animation on scroll
            const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right');
            
            function checkFade() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('visible');
                    }
                });
            }
            
            // Check on load and scroll
            window.addEventListener('scroll', checkFade);
            checkFade();
        });

// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update theme icon
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    }
}