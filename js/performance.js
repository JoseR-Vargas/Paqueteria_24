// Performance optimizations for Paquetería24
(function() {
    'use strict';
    
    // Optimizar scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Aquí se ejecutarán las funciones de scroll optimizadas
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Optimizar resize events
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Funciones de resize optimizadas
        }, 250);
    }
    
    // Lazy load de imágenes críticas
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Inicializar optimizaciones cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', lazyLoadImages);
    } else {
        lazyLoadImages();
    }
    
    // Event listeners optimizados
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
})();
