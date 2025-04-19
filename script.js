// Enhanced JavaScript for Be Me Website

document.addEventListener('DOMContentLoaded', function() {
    // Animate logo on page load
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.style.opacity = '0';
        logoImage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            logoImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            logoImage.style.opacity = '1';
            logoImage.style.transform = 'translateY(0)';
        }, 300);
    }

    // Remove categories section from the page
    const categoriesSection = document.querySelector('.categories');
    if (categoriesSection) {
        categoriesSection.remove();
    }

    // Update product images in the Most Loved Products section
    const updateProductImages = () => {
        const productImages = document.querySelectorAll('.product-card .product-image img');
        
        // Map of product images to their new sources
        const productImageMap = [
            {
                alt: "Hiphugger Period Panty",
                src: "images/hiphuggerperiod panty .webp"
            },
            {
                alt: "Disposable Period Panty",
                src: "images/disposable_img1_470x.progressive.png.webp"
            },
            {
                alt: "Menstrual Cup",
                src: "images/product_2_4cb095f1-9535-463b-a151-7bca7f441438_470x.progressive.png.webp"
            },
            {
                alt: "Period Cramp Comfort",
                src: "images/Applicator_img2_470x.progressive.png.webp"
            }
        ];
        
        // Update each product image if it exists
        productImages.forEach((img, index) => {
            if (index < productImageMap.length) {
                img.src = productImageMap[index].src;
                img.alt = productImageMap[index].alt;
            }
        });
    };
    
    // Run the update function
    updateProductImages();

    // Add page transition effect
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    // Add transition styles
    const transitionStyle = document.createElement('style');
    transitionStyle.textContent = `
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            z-index: 9999;
            transform: translateY(100%);
            transition: transform 0.5s ease;
        }
        
        .page-transition.active {
            transform: translateY(0);
        }
        
        .page-transition.fade-out {
            transform: translateY(-100%);
        }
    `;
    document.head.appendChild(transitionStyle);

    // Handle navigation links
    const navLinks = document.querySelectorAll('nav a:not([target="_blank"])');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply transition for internal links
            const href = this.getAttribute('href');
            if (href.startsWith('#') || href === '' || href === '/') return;
            
            e.preventDefault();
            const targetURL = this.href;
            
            // Activate transition
            pageTransition.classList.add('active');
            
            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = targetURL;
            }, 500);
        });
    });

    // Add transition when page loads
    pageTransition.classList.add('active');
    setTimeout(() => {
        pageTransition.classList.add('fade-out');
        setTimeout(() => {
            pageTransition.classList.remove('active');
            pageTransition.classList.remove('fade-out');
        }, 500);
    }, 300);

    // Add sticky header that shrinks on scroll
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    // Add styles for the sticky header
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        header {
            transition: all 0.3s ease;
        }
        
        header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 10px 0;
            transform: translateY(0);
        }
        
        header.sticky.hidden {
            transform: translateY(-100%);
        }
        
        body.has-sticky-header {
            padding-top: ${headerHeight}px;
        }
    `;
    document.head.appendChild(headerStyle);
    
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add sticky class when scrolled past threshold
        if (scrollTop > scrollThreshold) {
            header.classList.add('sticky');
            document.body.classList.add('has-sticky-header');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky');
            document.body.classList.remove('has-sticky-header');
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (hero) {
            // Parallax effect - move background slightly as user scrolls
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });

    // Add reveal animations for sections when they come into view
    const revealSections = document.querySelectorAll('.featured-products, .benefits, .testimonials, .blog, .newsletter');
    
    const revealOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        });
    };
    
    const sectionsObserver = new IntersectionObserver(revealSection, revealOptions);
    
    revealSections.forEach(section => {
        section.classList.add('section-hidden');
        sectionsObserver.observe(section);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Initially hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        for (let i = 0; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
        
        // Show the selected testimonial
        testimonials[index].style.display = 'block';
        testimonials[index].classList.add('pulse');
        setTimeout(() => {
            testimonials[index].classList.remove('pulse');
        }, 1000);
        
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Auto-slide functionality
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showTestimonial(currentSlide);
    }, 5000);

    // Product Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--sharp-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Product Quick View and Add to Cart Animations
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Quick view functionality would go here
            // For now just show an alert
            alert('Quick view functionality would open a modal with product details.');
        });
    });
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Add to cart animation
            const cartCount = document.querySelector('.cart-count');
            const currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Create animation effect
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('img').src;
            
            const floatingImage = document.createElement('img');
            floatingImage.src = productImage;
            floatingImage.style.position = 'fixed';
            floatingImage.style.zIndex = '1000';
            floatingImage.style.width = '50px';
            floatingImage.style.height = '50px';
            floatingImage.style.borderRadius = '50%';
            floatingImage.style.objectFit = 'cover';
            
            // Position at the button
            const buttonRect = this.getBoundingClientRect();
            floatingImage.style.top = buttonRect.top + 'px';
            floatingImage.style.left = buttonRect.left + 'px';
            
            document.body.appendChild(floatingImage);
            
            // Get cart position
            const cart = document.querySelector('.cart');
            const cartRect = cart.getBoundingClientRect();
            
            // Animate to cart
            floatingImage.style.transition = 'all 0.8s ease-in-out';
            setTimeout(() => {
                floatingImage.style.top = cartRect.top + 'px';
                floatingImage.style.left = cartRect.left + 'px';
                floatingImage.style.opacity = '0';
                floatingImage.style.transform = 'scale(0.3)';
            }, 10);
            
            // Add pop effect to cart icon
            cart.classList.add('pulse');
            setTimeout(() => {
                cart.classList.remove('pulse');
            }, 1000);
            
            // Remove after animation
            setTimeout(() => {
                document.body.removeChild(floatingImage);
            }, 800);
        });
    });

    // Add hover effect to benefits list items
    const benefitsItems = document.querySelectorAll('.benefits-list li');
    benefitsItems.forEach((item, index) => {
        // Add staggered entrance animation
        setTimeout(() => {
            item.classList.add('animated');
        }, 300 * index);
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.backgroundColor = 'var(--white)';
            this.style.boxShadow = 'var(--shadow)';
            
            // Animate the icon
            const icon = this.querySelector('i');
            icon.style.backgroundColor = 'var(--accent-color)';
            icon.style.color = 'var(--primary-color)';
            icon.style.transform = 'translateY(-50%) scale(1.1) rotate(360deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
            
            // Reset icon animation
            const icon = this.querySelector('i');
            icon.style.backgroundColor = 'var(--primary-color)';
            icon.style.color = 'var(--white)';
            icon.style.transform = 'translateY(-50%) scale(1)';
        });
    });
    
    // Add animation to benefits image
    const benefitsImage = document.querySelector('.benefits-image img');
    if (benefitsImage) {
        // Add pulse effect every few seconds
        setInterval(() => {
            benefitsImage.classList.add('subtle-pulse');
            setTimeout(() => {
                benefitsImage.classList.remove('subtle-pulse');
            }, 1000);
        }, 5000);
    }
    
    // Add CSS for benefits animations
    const benefitsStyle = document.createElement('style');
    benefitsStyle.textContent = `
        .benefits-list li {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.5s ease;
        }
        
        .benefits-list li.animated {
            opacity: 1;
            transform: translateX(0);
        }
        
        .benefits-list li i {
            transition: all 0.5s ease;
        }
        
        @keyframes subtle-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
        
        .subtle-pulse {
            animation: subtle-pulse 1s ease;
        }
        
        /* Make benefits heading more attractive */
        .benefits-content h2 {
            position: relative;
            display: inline-block;
        }
        
        .benefits-content h2::before {
            content: '';
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            border-top: 3px solid var(--accent-color);
            border-right: 3px solid var(--accent-color);
        }
    `;
    document.head.appendChild(benefitsStyle);

    // Add animations for decorative accents
    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Randomly position decorative accents on small screens
    function positionAccents() {
        const accents = document.querySelectorAll('.decorative-accent');
        if (window.innerWidth < 768) {
            accents.forEach(accent => {
                // Position randomly but within viewport
                const top = randomFloat(10, 80);
                const left = randomFloat(5, 80);
                accent.style.top = `${top}%`;
                accent.style.left = `${left}%`;
            });
        }
    }
    
    // Initial positioning
    positionAccents();
    
    // Reposition on resize
    window.addEventListener('resize', positionAccents);
    
    // Add parallax effect to decorative accents
    window.addEventListener('mousemove', function(e) {
        const accents = document.querySelectorAll('.decorative-accent');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        accents.forEach((accent, index) => {
            const speed = index % 2 === 0 ? 20 : -20;
            const x = speed * (mouseX - 0.5);
            const y = speed * (mouseY - 0.5);
            
            accent.style.transform = `translate(${x}px, ${y}px) rotate(${index * 5}deg)`;
        });
    });
    
    // Add scroll-triggered animations for wave dividers
    const waveDividers = document.querySelectorAll('.wave-divider');
    
    const waveDividerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = entry.target.classList.contains('top-wave') ? 
                        'translateY(0) rotate(180deg)' : 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );
    
    waveDividers.forEach(divider => {
        divider.style.opacity = '0';
        divider.style.transition = 'opacity 1s ease, transform 1s ease';
        divider.style.transform = divider.classList.contains('top-wave') ? 
            'translateY(20px) rotate(180deg)' : 'translateY(20px)';
        waveDividerObserver.observe(divider);
    });
    
    // Add scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
        
        // Hide scroll indicator when scrolled down
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight * 0.3) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }
    
    // Add pulse effect to highlighted buttons
    const highlightButtons = document.querySelectorAll('.btn-primary.highlight');
    highlightButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add animations and interactions for blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        // Add staggered entrance animation
        setTimeout(() => {
            card.classList.add('blog-revealed');
        }, 200 * index);
        
        // Add tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation - max 5 degrees
            const rotateX = (mouseY / (cardRect.height / 2)) * -3;
            const rotateY = (mouseX / (cardRect.width / 2)) * 3;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-text')) return; // Don't trigger on button click
            
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Add styles for blog animations
    const blogStyle = document.createElement('style');
    blogStyle.textContent = `
        .blog-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .blog-revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.8s linear;
            pointer-events: none;
            z-index: 10;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(blogStyle);

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Submit form if validation passes
            // Show success message
            const formContainer = this.parentElement;
            this.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="check-mark">✓</div>
                <h3>Thank you for subscribing!</h3>
                <p>You'll receive our latest updates and offers.</p>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Add CSS for success message
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    padding: 20px;
                }
                
                .check-mark {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    background-color: var(--success-color);
                    color: white;
                    border-radius: 50%;
                    line-height: 50px;
                    font-size: 30px;
                    margin-bottom: 20px;
                    animation: scale-in 0.5s ease;
                }
                
                @keyframes scale-in {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(successStyle);
        });
    }

    // Add image slider to the page
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'main-slider';
    
    // Create slider HTML structure
    sliderContainer.innerHTML = `
        <div class="slider-container">
            <div class="slider-wrapper">
                <div class="slider-track">
                    <div class="slide"><img src="images/slider1.png" alt="Be Me Slide 1"></div>
                    <div class="slide"><img src="images/slider2.png" alt="Be Me Slide 2"></div>
                    <div class="slide"><img src="images/silder3.png" alt="Be Me Slide 3"></div>
                    <div class="slide"><img src="images/silder4.png" alt="Be Me Slide 4"></div>
                </div>
            </div>
            <button class="slider-btn prev-btn">&lt;</button>
            <button class="slider-btn next-btn">&gt;</button>
            <div class="slider-dots"></div>
        </div>
    `;
    
    // Add slider styles
    const sliderStyles = document.createElement('style');
    sliderStyles.textContent = `
        .main-slider {
            margin: 0 auto;
            padding: 40px 0;
        }
        
        .slider-container {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: var(--shadow);
        }
        
        .slider-wrapper {
            overflow: hidden;
        }
        
        .slider-track {
            display: flex;
            transition: transform 0.5s ease-in-out;
        }
        
        .slide {
            min-width: 100%;
            box-sizing: border-box;
        }
        
        .slide img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
        
        .slider-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background-color: rgba(255, 255, 255, 0.7);
            border: none;
            border-radius: 50%;
            font-size: 20px;
            color: var(--primary-color);
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .slider-btn:hover {
            background-color: var(--white);
            color: var(--primary-dark);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
        
        .prev-btn {
            left: 20px;
        }
        
        .next-btn {
            right: 20px;
        }
        
        .slider-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
        }
        
        .slider-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .slider-dot.active {
            background-color: var(--primary-color);
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(sliderStyles);
    
    // Insert slider after the hero section if it exists, or as the first element of the main content
    if (hero) {
        hero.parentNode.insertBefore(sliderContainer, hero.nextSibling);
    } else {
        const main = document.querySelector('main') || document.body;
        main.prepend(sliderContainer);
    }
    
    // Initialize slider functionality
    const track = sliderContainer.querySelector('.slider-track');
    const slides = sliderContainer.querySelectorAll('.slide');
    const dotsContainer = sliderContainer.querySelector('.slider-dots');
    const prevBtn = sliderContainer.querySelector('.prev-btn');
    const nextBtn = sliderContainer.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Create dots based on number of slides
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Set initial position
    updateSliderPosition();
    
    // Add event listeners for buttons
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSliderPosition();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    });
    
    // Function to update the slider position
    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSliderPosition();
    }
    
    // Auto advance slides
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition();
    }, 5000);
    
    // Pause auto-advance on hover
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSliderPosition();
        }, 5000);
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, go to next slide
            currentIndex = (currentIndex + 1) % slides.length;
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, go to previous slide
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateSliderPosition();
    }

    // Add category slider
    const categorySlider = document.createElement('div');
    categorySlider.className = 'category-slider-section';
    
    // Create category slider HTML structure
    categorySlider.innerHTML = `
        <div class="container">
            <h2 class="section-title">Product Categories</h2>
            <div class="category-slider-container">
                <div class="category-slider-wrapper">
                    <div class="category-slider-track">
                        <div class="category-slide">
                            <div class="category-item">
                                <img src="images/period essensial.webp" alt="Period Essentials">
                                <h3>Period Essentials</h3>
                            </div>
                        </div>
                        <div class="category-slide">
                            <div class="category-item">
                                <img src="images/hyigne freshness.webp" alt="Hygiene & Freshness">
                                <h3>Hygiene & Freshness</h3>
                            </div>
                        </div>
                        <div class="category-slide">
                            <div class="category-item">
                                <img src="images/selfcare.webp" alt="Self Care">
                                <h3>Self Care</h3>
                            </div>
                        </div>
                        <div class="category-slide">
                            <div class="category-item">
                                <img src="images/compact cleaing .webp" alt="Compact Cleaning">
                                <h3>Compact Cleaning</h3>
                            </div>
                        </div>
                        <div class="category-slide">
                            <div class="category-item">
                                <img src="images/period pain and comfort.webp" alt="Period Pain & Comfort">
                                <h3>Period Pain & Comfort</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="category-slider-btn category-prev-btn">&lt;</button>
                <button class="category-slider-btn category-next-btn">&gt;</button>
            </div>
        </div>
    `;
    
    // Add category slider styles
    const categorySliderStyles = document.createElement('style');
    categorySliderStyles.textContent = `
        .category-slider-section {
            padding: 60px 0;
            background-color: var(--light-bg);
        }
        
        .category-slider-container {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            overflow: visible;
        }
        
        .category-slider-wrapper {
            overflow: hidden;
            padding: 20px 0;
        }
        
        .category-slider-track {
            display: flex;
            gap: 30px;
            transition: transform 0.5s ease;
        }
        
        .category-slide {
            min-width: calc(25% - 23px);
            box-sizing: border-box;
        }
        
        .category-item {
            background-color: var(--white);
            border-radius: 10px;
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: all 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        
        .category-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .category-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .category-item:hover img {
            transform: scale(1.1);
        }
        
        .category-item h3 {
            padding: 15px;
            text-align: center;
            margin: 0;
            background-color: var(--white);
            color: var(--primary-color);
            font-size: 18px;
        }
        
        .category-slider-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            background-color: var(--primary-color);
            border: none;
            border-radius: 50%;
            font-size: 18px;
            color: var(--white);
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .category-slider-btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-50%) scale(1.1);
        }
        
        .category-prev-btn {
            left: -20px;
        }
        
        .category-next-btn {
            right: -20px;
        }
        
        @media (max-width: 992px) {
            .category-slide {
                min-width: calc(33.333% - 20px);
            }
        }
        
        @media (max-width: 768px) {
            .category-slide {
                min-width: calc(50% - 15px);
            }
        }
        
        @media (max-width: 576px) {
            .category-slide {
                min-width: 100%;
            }
        }
    `;
    document.head.appendChild(categorySliderStyles);
    
    // Insert category slider after main slider
    const mainSlider = document.querySelector('.main-slider');
    if (mainSlider) {
        mainSlider.parentNode.insertBefore(categorySlider, mainSlider.nextSibling);
    } else {
        const main = document.querySelector('main') || document.body;
        main.appendChild(categorySlider);
    }
    
    // Category Slider Functionality
    const categoryTrack = categorySlider.querySelector('.category-slider-track');
    const categorySlides = categorySlider.querySelectorAll('.category-slide');
    const categoryPrevBtn = categorySlider.querySelector('.category-prev-btn');
    const categoryNextBtn = categorySlider.querySelector('.category-next-btn');
    let categoryCurrentIndex = 0;
    let slidesToShow = 4; // Default for desktop
    
    // Update slidesToShow based on window width
    function updateSlidesToShow() {
        if (window.innerWidth <= 576) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 768) {
            slidesToShow = 2;
        } else if (window.innerWidth <= 992) {
            slidesToShow = 3;
        } else {
            slidesToShow = 4;
        }
        updateCategorySliderPosition();
    }
    
    // Initial call to set the right number of slides
    updateSlidesToShow();
    
    // Listen for resize events
    window.addEventListener('resize', updateSlidesToShow);
    
    // Add event listeners for category slider buttons
    categoryPrevBtn.addEventListener('click', () => {
        if (categoryCurrentIndex > 0) {
            categoryCurrentIndex--;
            updateCategorySliderPosition();
        }
    });
    
    categoryNextBtn.addEventListener('click', () => {
        if (categoryCurrentIndex < categorySlides.length - slidesToShow) {
            categoryCurrentIndex++;
            updateCategorySliderPosition();
        }
    });
    
    // Function to update the category slider position
    function updateCategorySliderPosition() {
        const slideWidth = categorySlider.querySelector('.category-slide').offsetWidth + 30; // 30px is the gap
        categoryTrack.style.transform = `translateX(-${categoryCurrentIndex * slideWidth}px)`;
        
        // Update button states
        categoryPrevBtn.style.opacity = categoryCurrentIndex === 0 ? '0.5' : '1';
        categoryNextBtn.style.opacity = categoryCurrentIndex >= categorySlides.length - slidesToShow ? '0.5' : '1';
    }
    
    // Apply hover effects to category items
    const categoryItems = categorySlider.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Interactive floating elements
    const floatingElements = document.querySelectorAll('.floating-element');

    // Enhance parallax effect for floating elements
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            // Different parallax speeds based on element type and position
            let speedFactor = 1;
            
            if (element.classList.contains('product-float')) {
                speedFactor = element.classList.contains('large') ? 30 : 25;
            } else if (element.classList.contains('character-float')) {
                speedFactor = element.classList.contains('large') ? 20 : 15;
            }
            
            // Alternate direction based on index for more varied movement
            const directionX = index % 2 === 0 ? 1 : -1;
            const directionY = index % 3 === 0 ? 1 : -1;
            
            const xOffset = speedFactor * (mouseX - 0.5) * directionX;
            const yOffset = speedFactor * (mouseY - 0.5) * directionY;
            
            // Apply transform while preserving original animation
            element.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    
    // Add click interactions for floating elements
    floatingElements.forEach((element) => {
        // Only apply to product floats, not characters
        if (element.classList.contains('product-float')) {
            element.style.pointerEvents = 'auto';
            element.style.cursor = 'pointer';
            
            // Add pulse effect on hover
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
                
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
            
            // Show product info on click
            element.addEventListener('click', function() {
                // Create and show a tooltip with product information
                const productName = this.querySelector('img').alt;
                
                // Clear any existing tooltips
                const existingTooltips = document.querySelectorAll('.product-tooltip');
                existingTooltips.forEach(tooltip => tooltip.remove());
                
                // Create new tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'product-tooltip';
                tooltip.innerHTML = `
                    <h4>${productName}</h4>
                    <p>Click to explore our ${productName} collection!</p>
                `;
                
                // Style the tooltip
                const tooltipStyle = document.createElement('style');
                tooltipStyle.textContent = `
                    .product-tooltip {
                        position: absolute;
                        top: -80px;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: var(--white);
                        border-radius: 10px;
                        padding: 10px 15px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        z-index: 10;
                        min-width: 150px;
                        text-align: center;
                        animation: tooltipFadeIn 0.3s ease;
                        pointer-events: none;
                    }
                    
                    .product-tooltip::after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid var(--white);
                    }
                    
                    .product-tooltip h4 {
                        color: var(--primary-color);
                        margin-bottom: 5px;
                        font-size: 16px;
                    }
                    
                    .product-tooltip p {
                        font-size: 12px;
                        margin-bottom: 0;
                    }
                    
                    @keyframes tooltipFadeIn {
                        from {
                            opacity: 0;
                            transform: translate(-50%, 10px);
                        }
                        to {
                            opacity: 1;
                            transform: translate(-50%, 0);
                        }
                    }
                `;
                document.head.appendChild(tooltipStyle);
                
                this.appendChild(tooltip);
                
                // Remove tooltip after a few seconds
                setTimeout(() => {
                    if (tooltip.parentNode === this) {
                        this.removeChild(tooltip);
                    }
                }, 3000);
            });
        }
    });
    
    // Randomly reposition character floats occasionally for more dynamic feeling
    setInterval(() => {
        const characterFloats = document.querySelectorAll('.character-float');
        characterFloats.forEach((character, index) => {
            // Only move one character at a time for subtle effect
            if (index === Math.floor(Math.random() * characterFloats.length)) {
                const currentTransform = character.style.transform || '';
                
                // Store original position
                if (!character.dataset.originalTransform) {
                    character.dataset.originalTransform = currentTransform;
                }
                
                // Add a small random movement
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                
                character.style.transition = 'transform 2s ease';
                character.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                // Return to original position after delay
                setTimeout(() => {
                    character.style.transform = character.dataset.originalTransform;
                }, 2000);
            }
        });
    }, 5000);
}); 