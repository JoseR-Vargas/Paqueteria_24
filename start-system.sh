#!/bin/bash

echo "🚀 Iniciando sistema completo Paquetería24..."

# Función para limpiar procesos al salir
cleanup() {
    echo "🧹 Limpiando procesos..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    exit 0
}

# Configurar señal de limpieza
trap cleanup SIGINT SIGTERM

# Navegar al directorio del backend
cd /home/dev/Desktop/Apps/Paqueteria24_BACK/paqueteria24

echo "📦 Iniciando backend NestJS..."
npm run start:dev &
BACKEND_PID=$!

echo "⏳ Esperando que el backend se inicie..."
sleep 15

echo "🧪 Probando conexión con el backend..."
curl -f http://localhost:3000/form || echo "❌ Backend no está disponible"

echo ""
echo "✅ Sistema iniciado!"
echo "📊 Backend: http://localhost:3000"
echo "🌐 Frontend: file:///home/dev/Desktop/Apps/Paqueteria24/index.html"
echo "🧪 Test: file:///home/dev/Desktop/Apps/Paqueteria24/test-backend.html"
echo "📋 Dashboard: file:///home/dev/Desktop/Apps/Paqueteria24/dashboard.html"
echo ""
echo "Presiona Ctrl+C para detener todos los servicios"

# Mantener el script corriendo
wait $BACKEND_PID