// Splash Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    // Ensure splash screen is visible and main content is hidden
    if (splashScreen) splashScreen.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
    body.classList.add('splash-active');
    body.style.overflow = 'hidden';

    // Click anywhere to enter the website
    if (splashScreen) {
        splashScreen.addEventListener('click', function() {
            enterWebsite();
        });
    }

    // Press any key to enter
    document.addEventListener('keydown', function(e) {
        if (body.classList.contains('splash-active')) {
            enterWebsite();
        }
    });
});

function enterWebsite() {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    if (!splashScreen || !mainContent) return;

    // Hide splash screen with animation
    splashScreen.classList.add('hidden');
    
    // Show main content and remove splash-active class
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
        body.classList.remove('splash-active');
        body.style.overflow = 'auto';
        
        // Initialize all portfolio functionality
        initPortfolio();
    }, 800);
}

function initPortfolio() {
    // Check if elements exist before using them
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Initialize animation elements
    const animateElements = document.querySelectorAll('.animate-in');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const certificates = document.querySelectorAll('#certificates-tab .project-slider > div');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.project-dot');
    const toggleButton = document.getElementById('toggle-projects');
    const hiddenProjects = document.getElementById('hidden-projects');
    let currentIndex = 0;
    const totalCertificates = certificates.length;
    let isExpanded = false;

    // Toggle projects button
    if (toggleButton && hiddenProjects) {
        toggleButton.addEventListener('click', function() {
            if (isExpanded) {
                hiddenProjects.style.display = 'none';
                toggleButton.innerHTML = '<i class="fas fa-eye mr-2"></i>Show More Projects';
                
                setTimeout(() => {
                    const portfolioSection = document.getElementById('Portfolio');
                    if (portfolioSection) {
                        portfolioSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 300);
            } else {
                hiddenProjects.style.display = 'grid';
                toggleButton.innerHTML = '<i class="fas fa-eye-slash mr-2"></i>Show Less Projects';
                
                const hiddenProjectCards = hiddenProjects.querySelectorAll('.animate-in');
                hiddenProjectCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                    card.classList.add('animate-in');
                });
            }
            isExpanded = !isExpanded;
        });
    }

    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'Images/placeholder.jpg';
            this.alt = 'Image failed to load';
        });
    });

    // Typewriter Effect
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter-text');
        const h2Element = document.querySelector('h2');
        
        if (!h2Element) return;
        
        let element = typewriterElement;
        if (!element) {
            element = document.createElement('span');
            element.className = 'typewriter-text text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500';
            h2Element.appendChild(element);
        }
                
        const texts = ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            if (!element) return;
            
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 100 : 150);
            }
        }
        
        setTimeout(type, 1000);
    }

    // Certificate slider
    function updateSlider() {
        if (!certificates.length) return;
        
        certificates.forEach((cert, index) => {
            cert.style.display = index === currentIndex ? 'flex' : 'none';
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (totalCertificates > 0) {
                currentIndex = (currentIndex + 1) % totalCertificates;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (totalCertificates > 0) {
                currentIndex = (currentIndex - 1 + totalCertificates) % totalCertificates;
                updateSlider();
            }
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            if (!isNaN(slideIndex)) {
                currentIndex = slideIndex;
                updateSlider();
            }
        });
    });

    if (certificates.length > 0) {
        updateSlider();
    }

    // Viewport animation check
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    }
    
    function runAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.animationPlayState = 'running';
            }
        });
    }
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Run animations
    if (animateElements.length) {
        runAnimations();
        window.addEventListener('scroll', runAnimations);
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        function updateBackToTopButton() {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.offsetHeight;

            const shouldShow = scrollPosition > 300 && 
                            (scrollPosition + windowHeight) < (bodyHeight - 100);
            
            if (shouldShow) {
                backToTopButton.classList.add('visible');
                backToTopButton.style.opacity = '1';
                backToTopButton.style.pointerEvents = 'auto';
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateBackToTopButton);

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        updateBackToTopButton();
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuButton && mobileMenu) {
        // Open menu
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        // Close menu function
        function closeMobileMenu() {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
        
        // Close with close button
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }
        
        // Close when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Close when clicking outside (optional - click on backdrop)
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }

    // Initialize typewriter
    initTypewriter();
}