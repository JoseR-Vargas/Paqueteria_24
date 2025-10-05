// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const whatsappBtn = document.getElementById('whatsapp-btn');
const comentarioTextarea = document.getElementById('comentario');
const charCount = document.getElementById('char-count');

// Navbar hamburguesa functionality
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Contador de caracteres para el textarea
comentarioTextarea.addEventListener('input', () => {
    const currentLength = comentarioTextarea.value.length;
    charCount.textContent = currentLength;
    
    // Cambiar color si se acerca al límite
    if (currentLength > 250) {
        charCount.style.color = '#e74c3c';
    } else if (currentLength > 200) {
        charCount.style.color = '#f39c12';
    } else {
        charCount.style.color = '#047BA4';
    }
});

// Validación del formulario
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const paqueteriaSeleccionada = Array.from(document.querySelectorAll('input[name="paqueteria"]:checked'))
        .map(checkbox => checkbox.value);
    
    const data = {
        nombre: formData.get('nombre').trim(),
        cedula: formData.get('cedula').trim(),
        telefono: formData.get('telefono').trim(),
        email: formData.get('email').trim(),
        comentario: formData.get('comentario').trim(),
        paqueteria: paqueteriaSeleccionada,
        fecha: new Date().toISOString()
    };
    
    // Validaciones
    if (!data.nombre) {
        showError('El nombre es obligatorio');
        return;
    }
    
    if (!data.cedula) {
        showError('La cédula o RUT es obligatorio');
        return;
    }
    
    if (!data.telefono) {
        showError('El teléfono es obligatorio');
        return;
    }
    
    if (!data.email) {
        showError('El email es obligatorio');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showError('Por favor ingresa un email válido');
        return;
    }
    
    if (!data.comentario) {
        showError('El comentario es obligatorio');
        return;
    }
    
    if (data.comentario.length > 300) {
        showError('El comentario no puede exceder 300 caracteres');
        return;
    }
    
    // Guardar en localStorage
    saveContact(data);
    
    // Si todo está bien, mostrar mensaje de éxito
    showSuccess('¡Formulario enviado correctamente! Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
    charCount.textContent = '0';
    charCount.style.color = '#047BA4';
});

// Función para guardar contacto en localStorage (DRY)
function saveContact(data) {
    const contacts = JSON.parse(localStorage.getItem('paqueteria24_contacts') || '[]');
    contacts.push(data);
    localStorage.setItem('paqueteria24_contacts', JSON.stringify(contacts));
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar errores
function showError(message) {
    // Remover mensajes anteriores
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: 500;
    `;
    errorDiv.textContent = message;
    
    contactForm.insertBefore(errorDiv, contactForm.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Función para mostrar éxito
function showSuccess(message) {
    // Remover mensajes anteriores
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        text-align: center;
        font-weight: 500;
    `;
    successDiv.textContent = message;
    
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Funcionalidad del botón de WhatsApp
whatsappBtn.addEventListener('click', () => {
    // Obtener datos del formulario
    const formData = new FormData(contactForm);
    const paqueteriaSeleccionada = Array.from(document.querySelectorAll('input[name="paqueteria"]:checked'))
        .map(checkbox => checkbox.value);
    
    const data = {
        nombre: formData.get('nombre').trim(),
        cedula: formData.get('cedula').trim(),
        telefono: formData.get('telefono').trim(),
        email: formData.get('email').trim(),
        comentario: formData.get('comentario').trim(),
        paqueteria: paqueteriaSeleccionada
    };
    
    // Validar que al menos el nombre esté completo
    if (!data.nombre) {
        showError('Por favor completa al menos el nombre para enviar por WhatsApp');
        return;
    }
    
    // Crear mensaje para WhatsApp
    let whatsappMessage = `Hola! Me interesa conocer más sobre los servicios de Paquetería24.\n\n`;
    whatsappMessage += `*Datos de contacto:*\n`;
    whatsappMessage += `Nombre: ${data.nombre}\n`;
    
    if (data.cedula) {
        whatsappMessage += `Cédula/RUT: ${data.cedula}\n`;
    }
    if (data.telefono) {
        whatsappMessage += `Teléfono: ${data.telefono}\n`;
    }
    if (data.email) {
        whatsappMessage += `Email: ${data.email}\n`;
    }
    
    if (data.paqueteria.length > 0) {
        const paqueteriaLabels = {
            'mercado-libre': 'Mercado Libre',
            'ecommerce': 'E-commerce',
            'privado': 'Privado'
        };
        whatsappMessage += `Paquetería a Enviar: ${data.paqueteria.map(p => paqueteriaLabels[p]).join(', ')}\n`;
    }
    
    if (data.comentario) {
        whatsappMessage += `Comentario: ${data.comentario}\n`;
    }
    
    whatsappMessage += `\n¡Espero su respuesta!`;
    
    // Número de WhatsApp (formato internacional)
    const phoneNumber = '59899783238'; // Uruguay +598, sin el 0 inicial
    
    // Crear URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
});

// Smooth scrolling para enlaces de navegación
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

// Cerrar menú al hacer scroll
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Efecto de scroll en navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, rgba(4, 123, 164, 0.95), rgba(4, 4, 83, 0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #047BA4, #040453)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animación de números en estadísticas (optimizada)
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        console.warn('No se encontraron elementos .stat-number');
        return;
    }
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// Intersection Observer optimizado
let hasAnimatedNumbers = false;

const observerOptions = {
    threshold: 0.1, // Reducido para que se active más fácilmente
    rootMargin: '0px'
};

// Observar secciones para animaciones
document.addEventListener('DOMContentLoaded', () => {
    // Crear observer después de que DOM esté listo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Solo animar números una vez
                if (entry.target.classList.contains('stats-section') && !hasAnimatedNumbers) {
                    hasAnimatedNumbers = true;
                    animateNumbers();
                }
                
                // Agregar clase de animación a elementos
                entry.target.classList.add('animate-in');
                
                // Dejar de observar elementos ya animados
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Seleccionar secciones después de que DOM esté listo
    const sectionsToAnimate = document.querySelectorAll('.about-section, .values-section, .stats-section, .process-section, .benefits-section, .phrases-section, .integrations-section');
    
    if (sectionsToAnimate.length > 0) {
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Inicializar elementos de animación
    initializeAnimateElements();
});

// Animación de entrada optimizada con throttling
let isAnimating = false;
let animateElements = [];

function initializeAnimateElements() {
    animateElements = document.querySelectorAll('.service-card, .benefit-item, .process-item, .stat-item, .integration-item, .about-card, .value-item, .phrase-item');

    // Configurar elementos iniciales
    if (animateElements.length > 0) {
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        });
    }
}

// Función optimizada para animar elementos
function animateOnScroll() {
    if (isAnimating || animateElements.length === 0) return;
    
    isAnimating = true;
    requestAnimationFrame(() => {
        animateElements.forEach(element => {
            if (element.style.opacity === '0') {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            }
        });
        isAnimating = false;
    });
}

// Throttled scroll listener
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(animateOnScroll, 16);
});

// Ejecutar después de que todo esté cargado
window.addEventListener('load', () => {
    if (animateElements.length === 0) {
        initializeAnimateElements();
    }
    animateOnScroll();
});

// Optimización de imágenes con lazy loading mejorado
document.addEventListener('DOMContentLoaded', () => {
    // Delay para mejorar performance inicial
    setTimeout(() => {
        const valueImages = document.querySelectorAll('.value-item img');
        
        valueImages.forEach(img => {
            // Agregar loading lazy para mejor performance
            img.loading = 'lazy';
            img.decoding = 'async';
            
            // Agregar error handling optimizado
            img.addEventListener('error', () => {
                console.warn(`Error cargando imagen: ${img.src}`);
                // Fallback a emoji si la imagen falla
                const parent = img.parentElement;
                const fallbackEmojis = ['🚚', '📦', '🤝', '⚡', '💡'];
                const index = Array.from(parent.parentElement.children).indexOf(parent);
                if (fallbackEmojis[index]) {
                    img.style.display = 'none';
                    const emojiSpan = document.createElement('span');
                    emojiSpan.textContent = fallbackEmojis[index];
                    emojiSpan.style.fontSize = '3rem';
                    emojiSpan.style.marginBottom = '1rem';
                    parent.insertBefore(emojiSpan, img);
                }
            });
        });
    }, 200);
});
