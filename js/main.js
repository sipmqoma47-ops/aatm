// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event from bubbling
            mobileMenu.classList.toggle('hidden');
            
            // Animate icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-90');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            const isClickInside = mobileMenuBtn.contains(event.target) || mobileMenu.contains(event.target);
            if (!isClickInside) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Close mobile menu when a link is clicked
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (since there's no backend)
        setTimeout(function() {
            // Show success message
            const messageDiv = document.getElementById('form-message');
            messageDiv.className = 'mt-4 p-4 rounded-lg message-success border-2';
            messageDiv.innerHTML = `
                <div class="flex items-start">
                    <svg class="w-6 h-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div>
                        <p class="font-bold">Message sent successfully!</p>
                        <p class="text-sm mt-1">Thank you for contacting AAMP. We'll get back to you within 24 hours.</p>
                    </div>
                </div>
            `;
            messageDiv.classList.remove('hidden');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted with data:', formData);
            
            // Hide message after 5 seconds
            setTimeout(function() {
                messageDiv.classList.add('hidden');
            }, 5000);
            
        }, 1500);
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll event listener for navbar
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 10) {
        navbar.classList.add('shadow-2xl');
    } else {
        navbar.classList.remove('shadow-2xl');
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .product-card, .product-card-detailed').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading class to images
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.classList.add('skeleton');
        img.addEventListener('load', function() {
            img.classList.remove('skeleton');
        });
    }
});

// WhatsApp Button Click Tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // In production, you might want to track this with analytics
    });
});

// Phone Link Click Tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone link clicked:', this.getAttribute('href'));
        // In production, you might want to track this with analytics
    });
});

// Email Link Click Tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Email link clicked:', this.getAttribute('href'));
        // In production, you might want to track this with analytics
    });
});

// Add current year to footer copyright (if needed)
const currentYear = new Date().getFullYear();
const copyrightText = document.querySelector('footer p');
if (copyrightText && currentYear > 2024) {
    copyrightText.textContent = copyrightText.textContent.replace('2024', currentYear);
}

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Log page view
console.log('Page loaded:', document.title);
console.log('AAMP Website - Premium Industrial Lubricants');
