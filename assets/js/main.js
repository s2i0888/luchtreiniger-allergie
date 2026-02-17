// Main JavaScript for Luchtreiniger Allergie
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Add CSS for pyramid section
    const pyramidCSS = `
        .pyramid-section {
            padding: 4rem 0;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }
        
        .pyramid-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .pyramid-layer {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s;
        }
        
        .pyramid-layer:hover {
            transform: translateY(-5px);
        }
        
        .layer-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: white;
        }
        
        .pyramid-layer h3 {
            color: #1f2937;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .pyramid-layer p {
            color: #6b7280;
            line-height: 1.6;
        }
        
        .placeholder-text {
            text-align: center;
            padding: 3rem;
            color: #9ca3af;
            font-style: italic;
            background: #f9fafb;
            border-radius: 8px;
            border: 2px dashed #d1d5db;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = pyramidCSS;
    document.head.appendChild(style);
    
    // Trust badge animation
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Range slider styling
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    rangeSliders.forEach(slider => {
        // Create value display
        const valueDisplay = slider.nextElementSibling;
        if (valueDisplay && valueDisplay.classList.contains('range-value')) {
            slider.addEventListener('input', function() {
                const value = this.value;
                const min = this.min || 0;
                const max = this.max || 100;
                const percent = ((value - min) / (max - min)) * 100;
                
                // Update display
                valueDisplay.querySelector('span').textContent = value;
                
                // Style the slider track
                this.style.background = `linear-gradient(to right, #3b82f6 ${percent}%, #e5e7eb ${percent}%)`;
            });
            
            // Initialize
            slider.dispatchEvent(new Event('input'));
        }
    });
    
    // Affiliate link tracking (placeholder)
    document.querySelectorAll('a[href*="amazon"], a[href*="bol.com"], a[href*="coolblue"]').forEach(link => {
        if (link.getAttribute('href').includes('?')) {
            link.setAttribute('href', link.getAttribute('href') + '&tag=luchtreinig0f-21');
        } else {
            link.setAttribute('href', link.getAttribute('href') + '?tag=luchtreinig0f-21');
        }
        
        // Add click tracking
        link.addEventListener('click', function() {
            // Here you would send analytics data
            console.log('Affiliate link clicked:', this.href);
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Newsletter form (placeholder)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would send to your email service
            alert(`Bedankt voor je aanmelding! We sturen updates naar: ${email}`);
            this.reset();
        });
    }
});