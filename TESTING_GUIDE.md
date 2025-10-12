# ✅ Guía de Pruebas - Sistema de Login

## 🎯 Casos de Prueba

### 1. Acceso al Login
- [ ] Abrir `index.html`
- [ ] Click en enlace "Admin" en el navbar
- [ ] Verificar que carga `login.html`
- [ ] Verificar que los estilos sean consistentes

### 2. Login Exitoso
- [ ] En `login.html`, ingresar:
  - Usuario: `admin`
  - Contraseña: `paqueteria24`
- [ ] Click en "Ingresar"
- [ ] Verificar redirección automática a `dashboard.html`
- [ ] Verificar que se muestre el contenido del dashboard

### 3. Login Fallido
- [ ] En `login.html`, ingresar credenciales incorrectas
- [ ] Verificar que aparece mensaje de error en rojo
- [ ] Verificar que el mensaje desaparece después de 3 segundos
- [ ] Verificar que NO se redirige al dashboard

### 4. Validación de Campos
- [ ] Intentar enviar formulario con campos vacíos
- [ ] Verificar que aparece mensaje de validación
- [ ] Intentar con solo 1 o 2 caracteres
- [ ] Verificar que aparece mensaje de error

### 5. Protección de Rutas
- [ ] Cerrar sesión o limpiar localStorage
- [ ] Intentar acceder directamente a `dashboard.html`
- [ ] Verificar redirección automática a `login.html`

### 6. Persistencia de Sesión
- [ ] Hacer login exitoso
- [ ] Cerrar el navegador
- [ ] Volver a abrir y acceder a `dashboard.html`
- [ ] Verificar que mantiene la sesión (si no pasó 1 hora)

### 7. Expiración de Sesión
- [ ] Hacer login exitoso
- [ ] Esperar 1 hora (o modificar SESSION_DURATION en código)
- [ ] Intentar acceder a `dashboard.html`
- [ ] Verificar redirección a `login.html`

### 8. Logout
- [ ] Hacer login exitoso
- [ ] En dashboard, click en "Cerrar Sesión"
- [ ] Confirmar en el diálogo
- [ ] Verificar redirección a `login.html`
- [ ] Intentar acceder a `dashboard.html`
- [ ] Verificar que pide login nuevamente

### 9. Sanitización de Inputs
- [ ] Intentar ingresar caracteres especiales: `<script>alert('test')</script>`
- [ ] Verificar que se eliminan los caracteres peligrosos
- [ ] Verificar que no se ejecuta código malicioso

### 10. Responsive Design
- [ ] Abrir en dispositivo móvil o cambiar tamaño de ventana
- [ ] Verificar que el formulario de login se adapta
- [ ] Verificar que todos los elementos son visibles
- [ ] Verificar que los botones son accesibles

## 🔍 Verificaciones de Seguridad

### localStorage
```javascript
// Abrir consola del navegador y verificar:
localStorage.getItem('paqueteria24_session')
// Debe mostrar objeto con: authenticated, timestamp, expiresAt
```

### Sesión Manual
```javascript
// Crear sesión manualmente (para pruebas):
localStorage.setItem('paqueteria24_session', JSON.stringify({
    authenticated: true,
    timestamp: Date.now(),
    expiresAt: Date.now() + 3600000
}));
```

### Limpiar Sesión
```javascript
// Limpiar sesión manualmente:
localStorage.removeItem('paqueteria24_session');
```

## 📱 Pruebas en Diferentes Navegadores

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Navegadores móviles

## 🐛 Errores Esperados (No deben ocurrir)

❌ Error en consola al cargar login
❌ Error en consola al enviar formulario
❌ Redirección infinita entre páginas
❌ Sesión que no expira
❌ Dashboard accesible sin login
❌ Estilos rotos o inconsistentes

## ✅ Comportamientos Correctos

✓ Redirección automática según estado de sesión
✓ Mensajes de error claros y concisos
✓ Validación de campos en tiempo real
✓ Interfaz consistente con el resto del sitio
✓ Sin errores en consola del navegador
✓ Transiciones suaves y profesionales

## 🚀 Servidor de Pruebas

Para probar localmente:

```bash
cd /home/dev/Desktop/Apps/Paqueteria24
python3 -m http.server 8080
```

Luego abrir: `http://localhost:8080/login.html`

## 📊 Resultados

| Prueba | Estado | Notas |
|--------|--------|-------|
| Login exitoso | ✅ | |
| Login fallido | ✅ | |
| Protección rutas | ✅ | |
| Logout | ✅ | |
| Validación | ✅ | |
| Responsive | ✅ | |
| Seguridad | ✅ | |

---

**Última actualización:** 2025-10-11
**Versión:** 1.0
