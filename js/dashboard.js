// ===================================
// DASHBOARD - Paquetería24
// Principios: DRY, SOLID, YAGNI
// ===================================

// Clase principal del Dashboard (Single Responsibility)
class Dashboard {
    constructor() {
        this.contacts = this.loadContacts();
        this.filteredContacts = [...this.contacts];
        this.init();
    }

    // Inicialización
    init() {
        this.renderContacts();
        this.attachEventListeners();
    }

    // Cargar contactos desde localStorage
    loadContacts() {
        const data = localStorage.getItem('paqueteria24_contacts');
        
        // Si no hay datos, cargar datos de ejemplo (mock)
        if (!data || JSON.parse(data).length === 0) {
            const mockData = this.getMockData();
            localStorage.setItem('paqueteria24_contacts', JSON.stringify(mockData));
            return mockData;
        }
        
        return JSON.parse(data);
    }

    // Datos de ejemplo para demostración
    getMockData() {
        return [
            {
                nombre: "Tienda El Sol",
                cedula: "218765432",
                telefono: "099876543",
                email: "contacto@elsol.com",
                paqueteria: ["mercado-libre", "ecommerce"],
                comentario: "Necesito información sobre tarifas para envíos nacionales. Tengo un volumen de aproximadamente 50 paquetes semanales.",
                fecha: new Date('2024-10-01T10:30:00').toISOString()
            },
            {
                nombre: "Juan Pérez",
                cedula: "512345678",
                telefono: "098765432",
                email: "juan.perez@gmail.com",
                paqueteria: ["privado"],
                comentario: "Quiero enviar un paquete urgente a Punta del Este. ¿Cuánto demora?",
                fecha: new Date('2024-10-02T14:20:00').toISOString()
            },
            {
                nombre: "Moda Bella SA",
                cedula: "219876543",
                telefono: "099123456",
                email: "ventas@modabella.com.uy",
                paqueteria: ["mercado-libre"],
                comentario: "Somos vendedores de Mercado Libre y buscamos integración automática para nuestros envíos.",
                fecha: new Date('2024-10-03T09:15:00').toISOString()
            },
            {
                nombre: "María Rodríguez",
                cedula: "487654321",
                telefono: "095432198",
                email: "maria.r@hotmail.com",
                paqueteria: ["ecommerce"],
                comentario: "Tengo una tienda online y necesito un servicio confiable de entregas. ¿Ofrecen seguimiento en tiempo real?",
                fecha: new Date('2024-10-03T16:45:00').toISOString()
            },
            {
                nombre: "Distribuidora Norte",
                cedula: "217890123",
                telefono: "099234567",
                email: "logistica@disnorte.com",
                paqueteria: ["mercado-libre", "ecommerce", "privado"],
                comentario: "Buscamos un partner logístico para manejar toda nuestra operación de envíos. Volumen alto.",
                fecha: new Date('2024-10-04T11:00:00').toISOString()
            },
            {
                nombre: "Carlos Méndez",
                cedula: "398765432",
                telefono: "092345678",
                email: "carlos.mendez@outlook.com",
                paqueteria: [],
                comentario: "Consulta sobre costos de envío para paquetes pequeños dentro de Montevideo.",
                fecha: new Date('2024-10-04T08:30:00').toISOString()
            },
            {
                nombre: "TechStore Uruguay",
                cedula: "216543210",
                telefono: "099887766",
                email: "info@techstore.uy",
                paqueteria: ["ecommerce"],
                comentario: "Vendemos electrónicos online. Necesitamos garantías sobre el manejo cuidadoso de productos frágiles.",
                fecha: new Date('2024-10-04T13:15:00').toISOString()
            },
            {
                nombre: "Ana Silva",
                cedula: "543210987",
                telefono: "091234567",
                email: "ana.silva@gmail.com",
                paqueteria: ["privado"],
                comentario: "Necesito enviar documentos importantes a Colonia. ¿Tienen servicio express?",
                fecha: new Date('2024-10-04T15:45:00').toISOString()
            }
        ];
    }

    // Renderizar contactos en la tabla
    renderContacts() {
        const tbody = document.getElementById('contacts-tbody');
        const noDataMessage = document.getElementById('no-data-message');
        
        // Actualizar contadores
        this.updateCounters();
        
        if (this.filteredContacts.length === 0) {
            tbody.innerHTML = '';
            noDataMessage.classList.add('show');
            return;
        }

        noDataMessage.classList.remove('show');
        tbody.innerHTML = this.filteredContacts.map(contact => this.createTableRow(contact)).join('');
    }

    // Actualizar contadores de estadísticas
    updateCounters() {
        const totalCount = document.getElementById('total-count');
        const filteredCount = document.getElementById('filtered-count');
        
        if (totalCount) {
            totalCount.textContent = this.contacts.length;
        }
        
        if (filteredCount) {
            filteredCount.textContent = this.filteredContacts.length;
        }
    }

    // Crear fila de tabla (DRY)
    createTableRow(contact) {
        return `
            <tr>
                <td>${this.escapeHtml(contact.nombre)}</td>
                <td>${this.escapeHtml(contact.cedula)}</td>
                <td>${this.escapeHtml(contact.telefono)}</td>
                <td>${this.escapeHtml(contact.email)}</td>
                <td>${this.renderBadges(contact.paqueteria)}</td>
                <td>${this.escapeHtml(contact.comentario)}</td>
                <td>${this.formatDate(contact.fecha)}</td>
            </tr>
        `;
    }

    // Renderizar badges de tipos de paquetería (DRY)
    renderBadges(paqueteria) {
        if (!paqueteria || paqueteria.length === 0) {
            return '<span class="badge badge-privado">Ninguno</span>';
        }
        
        return paqueteria.map(tipo => {
            const badgeClass = `badge badge-${tipo}`;
            const label = this.formatBadgeLabel(tipo);
            return `<span class="${badgeClass}">${label}</span>`;
        }).join('');
    }

    // Formatear etiqueta de badge
    formatBadgeLabel(tipo) {
        const labels = {
            'mercado-libre': 'Mercado Libre',
            'ecommerce': 'E-commerce',
            'privado': 'Privado'
        };
        return labels[tipo] || tipo;
    }

    // Formatear fecha
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-UY', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Escapar HTML para prevenir XSS (Security)
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Filtrar contactos por búsqueda y tipo
    filterContacts() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filterType = document.getElementById('filter-type').value;

        this.filteredContacts = this.contacts.filter(contact => {
            const matchesSearch = this.matchesSearchTerm(contact, searchTerm);
            const matchesType = this.matchesType(contact, filterType);
            return matchesSearch && matchesType;
        });

        this.renderContacts();
    }

    // Verificar si coincide con término de búsqueda (DRY)
    matchesSearchTerm(contact, term) {
        if (!term) return true;
        
        const searchableFields = [
            contact.nombre,
            contact.cedula,
            contact.email,
            contact.telefono
        ];
        
        return searchableFields.some(field => 
            field.toLowerCase().includes(term)
        );
    }

    // Verificar si coincide con el tipo de paquetería
    matchesType(contact, type) {
        if (type === 'all') return true;
        return contact.paqueteria && contact.paqueteria.includes(type);
    }

    // Adjuntar event listeners
    attachEventListeners() {
        document.getElementById('search-input').addEventListener('input', () => this.filterContacts());
        document.getElementById('filter-type').addEventListener('change', () => this.filterContacts());
        document.getElementById('btn-logout').addEventListener('click', () => this.logout());
        document.getElementById('btn-clear-data').addEventListener('click', () => this.clearData());
    }

    // Logout
    logout() {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            window.location.href = 'index.html';
        }
    }

    // Limpiar todos los datos y recargar datos de ejemplo
    clearData() {
        if (confirm('¿Estás seguro de limpiar todos los datos? Se cargarán nuevamente los datos de ejemplo.')) {
            localStorage.removeItem('paqueteria24_contacts');
            this.contacts = this.loadContacts();
            this.filteredContacts = [...this.contacts];
            this.renderContacts();
            
            // Resetear filtros
            document.getElementById('search-input').value = '';
            document.getElementById('filter-type').value = 'all';
            
            alert('✅ Datos limpiados. Se cargaron nuevamente los datos de ejemplo.');
        }
    }
}

// Inicializar Dashboard cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
