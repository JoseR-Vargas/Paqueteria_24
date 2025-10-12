# Sistema de Login - Paquetería24

## 🔐 Credenciales de Acceso

**Usuario:** `admin`  
**Contraseña:** `paqueteria24`

## 📋 Características

### Seguridad
- ✅ Sesión con expiración automática (1 hora)
- ✅ Validación de credenciales con hash básico
- ✅ Protección de rutas (redirección automática)
- ✅ Sanitización de inputs
- ✅ Logout seguro

### Arquitectura
- **Principios aplicados:**
  - **DRY**: Código reutilizable (AuthService compartido)
  - **SOLID**: Separación de responsabilidades en clases
  - **YAGNI**: Solo lo necesario, sin código innecesario

## 🚀 Flujo de Autenticación

1. **Login** (`login.html`)
   - Usuario ingresa credenciales
   - Validación y sanitización de inputs
   - Creación de sesión con timestamp
   - Redirección al dashboard

2. **Dashboard** (`dashboard.html`)
   - Verificación de sesión al cargar
   - Si no hay sesión válida → redirección a login
   - Botón de logout disponible

3. **Logout**
   - Confirmación del usuario
   - Limpieza de sesión
   - Redirección a login

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- `login.html` - Página de inicio de sesión
- `js/login.js` - Lógica de autenticación
- `LOGIN_CREDENTIALS.md` - Este archivo

### Archivos Modificados
- `css/styles.css` - Estilos para login
- `js/dashboard.js` - Protección de ruta y logout

## 🔧 Clases Principales

### AuthService
```javascript
- validateCredentials(username, password)
- createSession()
- isSessionValid()
- logout()
```

### FormValidator
```javascript
- validateField(value, minLength)
- sanitizeInput(value)
```

### LoginController
```javascript
- handleSubmit(e)
- showError(message)
- redirectToDashboard()
```

## ⚠️ Notas de Seguridad

⚠️ **IMPORTANTE**: Este es un sistema de autenticación básico para desarrollo.

Para producción se recomienda:
- Backend con autenticación JWT
- Encriptación bcrypt para contraseñas
- HTTPS obligatorio
- Rate limiting
- 2FA (autenticación de dos factores)
- Tokens CSRF

## 🧪 Cómo Probar

1. Abrir `login.html` en el navegador
2. Ingresar credenciales (admin/paqueteria24)
3. Verificar redirección al dashboard
4. Probar botón de logout
5. Intentar acceder directamente a `dashboard.html` sin login

## 🎨 Estilos

Los estilos del login mantienen la coherencia con el resto del sitio:
- Colores corporativos (ciruleo, azul golfo, turquesa)
- Fuentes consistentes (Lobster, Montserrat, Poppins, Muli)
- Diseño responsive
- Transiciones suaves
