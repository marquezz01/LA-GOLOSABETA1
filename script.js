document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DEL MENÚ LATERAL (OFF-CANVAS) ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const navLinks = sideMenu.querySelectorAll('a');
    const pageContainer = document.getElementById('page-container');

    // Función para cerrar el menú
    function closeNav() {
        sideMenu.classList.remove('is-active');
        menuToggle.classList.remove('is-active');
        document.body.classList.remove('menu-open');
    }

    // Abrir/Cerrar menú con el botón hamburguesa
    menuToggle.addEventListener('click', () => {
        const isActive = sideMenu.classList.toggle('is-active');
        menuToggle.classList.toggle('is-active', isActive);
        document.body.classList.toggle('menu-open', isActive);
    });

    // Cerrar al hacer clic en un enlace (para navegar a la sección)
    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
    });
    
    // --- LÓGICA DEL HEADER (CAMBIO EN SCROLL) ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- ANIMACIONES DE SCROLL (Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const intersectionCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(intersectionCallback, observerOptions);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- LÓGICA DEL CAROUSEL DEL HERO ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-nav-dot');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 segundos
    
        function showSlide(index) {
            // Ocultar slide actual
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
    
            // Mostrar nuevo slide
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
    
        function nextSlide() {
            let newSlide = (currentSlide + 1) % slides.length;
            showSlide(newSlide);
        }
    
        // Event listeners para los puntos de navegación
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    
        // Iniciar el carrusel automático
        setInterval(nextSlide, slideInterval);
    }

});