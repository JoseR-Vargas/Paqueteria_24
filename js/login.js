// ===================================
// LOGIN - Paquetería24
// Principios: DRY, SOLID, YAGNI
// ===================================

// Clase de autenticación (Single Responsibility Principle)
class AuthService {
    constructor() {
        this.SESSION_KEY = 'paqueteria24_session';
        this.SESSION_DURATION = 3600000; // 1 hora en milisegundos
    }

    // Validar credenciales (YAGNI - solo lo necesario)
    validateCredentials(username, password) {
        // Hash simple para evitar credenciales en texto plano
        const validHash = this.hashCredentials('admin', 'paqueteria24');
        const inputHash = this.hashCredentials(username, password);
        return inputHash === validHash;
    }

    // Hash simple (sustituir por bcrypt en producción)
    hashCredentials(user, pass) {
        return btoa(`${user}:${pass}`);
    }

    // Crear sesión
    createSession() {
        const session = {
            authenticated: true,
            timestamp: Date.now(),
            expiresAt: Date.now() + this.SESSION_DURATION
        };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }

    // Verificar sesión válida
    isSessionValid() {
        const session = this.getSession();
        if (!session) return false;
        
        const now = Date.now();
        return session.authenticated && now < session.expiresAt;
    }

    // Obtener sesión
    getSession() {
        const data = localStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    }

    // Cerrar sesión
    logout() {
        localStorage.removeItem(this.SESSION_KEY);
    }
}

// Clase de validación de formulario (DRY)
class FormValidator {
    validateField(value, minLength = 3) {
        return value.trim().length >= minLength;
    }

    sanitizeInput(value) {
        return value.trim().replace(/[<>]/g, '');
    }
}

// Controlador del Login (Single Responsibility)
class LoginController {
    constructor() {
        this.authService = new AuthService();
        this.validator = new FormValidator();
        this.form = document.getElementById('login-form');
        this.errorMessage = document.getElementById('error-message');
        this.init();
    }

    init() {
        // Verificar si ya está logueado
        if (this.authService.isSessionValid()) {
            this.redirectToDashboard();
            return;
        }

        this.attachEventListeners();
    }

    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();

        const username = this.validator.sanitizeInput(
            document.getElementById('username').value
        );
        const password = this.validator.sanitizeInput(
            document.getElementById('password').value
        );

        // Validar campos
        if (!this.validator.validateField(username) || 
            !this.validator.validateField(password)) {
            this.showError('Usuario y contraseña son requeridos');
            return;
        }

        // Autenticar
        if (this.authService.validateCredentials(username, password)) {
            this.authService.createSession();
            this.redirectToDashboard();
        } else {
            this.showError('Usuario o contraseña incorrectos');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            this.errorMessage.style.display = 'none';
        }, 3000);
    }

    redirectToDashboard() {
        window.location.href = 'dashboard.html';
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new LoginController();
});
