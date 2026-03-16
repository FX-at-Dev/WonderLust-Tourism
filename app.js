 // Initialize Icons
        lucide.createIcons();

        // 1. Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('glass');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('glass');
            }
        });

        // 2. Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobile-menu');
        function toggleMobileMenu() {
            mobileMenu.classList.toggle('active');
        }

        // 3. Scroll Reveal Animation Logic
        const revealElements = document.querySelectorAll('.reveal');
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;
            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();

        // 4. Destination Filtering
        function filterDestinations(category) {
            const cards = document.querySelectorAll('.destination-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => {
                if (btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    // Reset animation
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // 5. Toast Notification
        function showToast(message) {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `
                <i data-lucide="check-circle"></i>
                <span>${message}</span>
            `;
            container.appendChild(toast);
            lucide.createIcons();

            setTimeout(() => {
                toast.classList.add('toast-exit');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        function openBooking() {
            showToast('Booking system initialized!');
        }

        // 6. Stats Counter Animation
        const counters = document.querySelectorAll('.counter');
        let hasAnimatedCounters = false;

        const animateCounters = () => {
            const statsSection = document.getElementById('stats');
            const sectionPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (!hasAnimatedCounters && sectionPosition < screenPosition) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const speed = 200; 
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const inc = target / speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                hasAnimatedCounters = true;
            }
        };
        window.addEventListener('scroll', animateCounters);

        // 7. Testimonial Slider Logic
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slide-dot');

        function setSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            setSlide(currentSlide);
        }, 5000);

        // 8. Enhanced 3D Tilt Effect for Cards
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.destination-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x > -50 && x < rect.width + 50 && y > -50 && y < rect.height + 50) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -3; 
                    const rotateY = ((x - centerX) / centerX) * 3;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    card.style.transition = 'none';
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    card.style.transition = 'all 0.3s ease';
                }
            });
        });