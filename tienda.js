// ==========================================
// VARIABLES GLOBALES DEL CARRITO
// ==========================================
let carrito = [];

// ==========================================
// 1. ABRIR Y CERRAR EL CARRITO LATERAL
// ==========================================
function alternarCarrito() {
    const carritoLateral = document.getElementById('carrito-lateral');
    if (carritoLateral) {
        if (carritoLateral.classList.contains('carrito-cerrado')) {
            carritoLateral.classList.remove('carrito-cerrado');
            carritoLateral.classList.add('carrito-abierto');
        } else {
            carritoLateral.classList.remove('carrito-abierto');
            carritoLateral.classList.add('carrito-cerrado');
        }
    }
}

// ==========================================
// 2. SELECCIÓN INTERACTIVA DE BOTONES DE TALLAS
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-talla')) {
        const grupo = e.target.closest('.grupo-tallas');
        if (grupo) {
            grupo.querySelectorAll('.btn-talla').forEach(btn => {
                btn.classList.remove('seleccionada');
            });
            e.target.classList.add('seleccionada');
        }
    }
});

// ==========================================
// 3. AGREGAR PRODUCTOS AL CARRITO
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-agregar-carrito')) {
        const boton = e.target;
        const tarjeta = boton.closest('.tarjeta-producto');
        if (!tarjeta) return;

        // Extraer datos del producto
        const nombre = tarjeta.querySelector('.nombre-prod') ? tarjeta.querySelector('.nombre-prod').innerText : tarjeta.querySelector('h3').innerText;
        const precioTexto = tarjeta.querySelector('.precio').getAttribute('data-precio') || tarjeta.querySelector('.precio').innerText;
        
        // Buscar si tiene una talla seleccionada
        const botonTalla = tarjeta.querySelector('.btn-talla.seleccionada');
        const talla = botonTalla ? botonTalla.getAttribute('data-talla') : null;

        // Convertir precio a número puro para poder sumarlo
        const precioNumero = parseInt(precioTexto.replace(/[^0-9]/g, ''));

        // Crear el objeto del producto
        const producto = {
            nombre: nombre,
            talla: talla,
            precioTexto: precioTexto,
            precioNumero: precioNumero
        };

        // Agregar al arreglo del carrito
        carrito.push(producto);

        // Actualizar la interfaz del carrito
        actualizarInterfazCarrito();

        // Abrir el carrito automáticamente para mostrarle al cliente que se agregó
        const carritoLateral = document.getElementById('carrito-lateral');
        if (carritoLateral && carritoLateral.classList.contains('carrito-cerrado')) {
            alternarCarrito();
        }
    }
});

// ==========================================
// 4. ACTUALIZAR LA INTERFAZ Y EL TOTAL del CARRITO
// ==========================================
function actualizarInterfazCarrito() {
    const contenedorItems = document.getElementById('items-carrito');
    const contador = document.getElementById('contador-carrito');
    const contenedorTotal = document.getElementById('precio-total-carrito');

    if (!contenedorItems || !contador || !contenedorTotal) return;

    // Limpiar contenedor viejo
    contenedorItems.innerHTML = '';

    let totalSuma = 0;

    // Renderizar cada producto dentro del carrito
    carrito.forEach((item, index) => {
        totalSuma += item.priceNumero || item.precioNumero; // Soporte por si se tipió de ambas formas

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-en-carrito');
        
        // Texto de la talla si aplica
        const textoTalla = item.talla ? ` (Talla: ${item.talla})` : '';

        itemDiv.innerHTML = `
            <div class="info-item-carrito">
                <h4>${item.nombre}${textoTalla}</h4>
                <p>${item.precioTexto}</p>
            </div>
            <button class="btn-eliminar-item" onclick="eliminarDelCarrito(${index})">❌</button>
        `;
        contenedorItems.appendChild(itemDiv);
    });

    // Actualizar contador superior
    contador.innerText = carrito.length;

    // Formatear el total general en dinero colombiano
    contenedorTotal.innerText = `$${totalSuma.toLocaleString('es-CO')} COP`;
}

// ==========================================
// 5. ELIMINAR UN PRODUCTO DEL CARRITO
// ==========================================
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfazCarrito();
}

// ==========================================
// 6. ENVIAR TODO EL PEDIDO SUMADO A WHATSAPP
// ==========================================
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. ¡Agrega algunos productos antes de confirmar!");
        return;
    }

    let numeroTelefono = "573246670248"; 
    let mensaje = `Hola JADARA, quiero realizar el siguiente pedido:\n\n`;

    carrito.forEach((item, index) => {
        const textoTalla = item.talla ? ` - Talla: ${item.talla}` : '';
        mensaje += `${index + 1}. *${item.nombre}*${textoTalla} (${item.precioTexto})\n`;
    });

    const contenedorTotal = document.getElementById('precio-total-carrito').innerText;
    mensaje += `\n💰 *Total del Pedido:* ${contenedorTotal}`;

    const urlWhatsApp = `https://wa.me{numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
}

// ==========================================
// 7. EFECTO ZOOM / EXPANDIR FOTOS AL DAR CLIC
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'IMG' && e.target.closest('.tarjeta-producto')) {
        const modal = document.getElementById('modal-zoom');
        const imagenAmpliada = document.getElementById('imagen-ampliada');
        
        if (modal && imagenAmpliada) {
            modal.style.display = "block";
            imagenAmpliada.src = e.target.src;
        }
    }
    
    if (e.target && (e.target.classList.contains('cerrar-modal') || e.target.id === 'modal-zoom')) {
        const modal = document.getElementById('modal-zoom');
        if (modal) {
            modal.style.display = "none";
        }
    }
});
