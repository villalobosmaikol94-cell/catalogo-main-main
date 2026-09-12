// ==========================================
// 1. INTERACTIVIDAD PARA SELECCIONAR TALLAS
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
// 2. ENVIAR PEDIDO A WHATSAPP CON LA TALLA DEL BOTÓN
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('btn-pedido-whatsapp')) {
        e.preventDefault();
        
        const boton = e.target;
        const tarjeta = boton.closest('.tarjeta-producto');
        if (!tarjeta) return;
        
        const elementoNombre = tarjeta.querySelector('.nombre-prod');
        const elementoPrecio = tarjeta.querySelector('.precio');
        
        const nombreProducto = elementoNombre ? elementoNombre.innerText : "Producto";
        const precioProducto = elementoPrecio ? (elementoPrecio.getAttribute('data-precio') || elementoPrecio.innerText) : "";
        const numeroTelefono = boton.getAttribute('data-phone') || "573246670248";
        
        let mensaje = `Hola JADARA, me interesa el producto *${nombreProducto}* de ${precioProducto}`;
        
        const botonTallaActivo = tarjeta.querySelector('.btn-talla.seleccionada');
        if (botonTallaActivo) {
            const tallaSeleccionada = botonTallaActivo.getAttribute('data-talla');
            mensaje += ` en *Talla: ${tallaSeleccionada}*`;
        }
        
        const urlWhatsApp = `https://wa.me{numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
        window.open(urlWhatsApp, '_blank');
    }
});

// ==========================================
// 3. EFECTO ZOOM / EXPANDIR FOTOS AL DAR CLIC
// ==========================================
document.addEventListener('click', function(e) {
    // Detecta clics en cualquier imagen dentro de tus productos
    if (e.target && e.target.tagName === 'IMG' && e.target.closest('.tarjeta-producto')) {
        const modal = document.getElementById('modal-zoom');
        const imagenAmpliada = document.getElementById('imagen-ampliada');
        
        if (modal && imagenAmpliada) {
            modal.style.display = "block";
            imagenAmpliada.src = e.target.src;
        }
    }
    
    // Cierra el zoom al tocar la X o el fondo negro
    if (e.target && (e.target.classList.contains('cerrar-modal') || e.target.id === 'modal-zoom')) {
        const modal = document.getElementById('modal-zoom');
        if (modal) {
            modal.style.display = "none";
        }
    }
});
