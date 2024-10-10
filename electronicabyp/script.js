const productos = [
    { id: 1, nombre: 'Llaveros', precio: 800, imagen: 'https://via.placeholder.com/150' },
    { id: 2, nombre: 'Collares', precio: 800, imagen: 'https://via.placeholder.com/150' },
    { id: 3, nombre: 'Aros', precio: 800, imagen: 'https://via.placeholder.com/150' },
    { id: 4, nombre: 'Dijes', precio: 800, imagen: 'https://via.placeholder.com/150' },
    { id: 5, nombre: 'Soportes para celulares', precio: 3800, imagen: 'https://via.placeholder.com/150' },
    
];

let carrito = [];

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        listaProductos.appendChild(productoElement);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function actualizarCarrito() {
    const itemsCarrito = document.getElementById('items-carrito');
    const carritoCount = document.getElementById('carrito-count');
    const carritoTotal = document.getElementById('carrito-total');

    itemsCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item-carrito');
        itemElement.innerHTML = `
            <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
            <button class="btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        itemsCarrito.appendChild(itemElement);
        total += item.precio;
    });

    carritoCount.textContent = carrito.length;
    carritoTotal.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

function mostrarSeccion(seccionId) {
    const secciones = document.querySelectorAll('main > section');
    secciones.forEach(seccion => {
        seccion.style.display = seccion.id === seccionId ? 'block' : 'none';
    });
}

document.querySelectorAll('nav a').forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const seccionId = e.target.getAttribute('href').substring(1);
        mostrarSeccion(seccionId);
    });
});

document.getElementById('btn-whatsapp').addEventListener('click', () => {
    let mensaje = 'Hola, me gustaría hacer un pedido con los siguientes productos:\n\n';
    let total = 0;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    const numeroWhatsApp = '3812117595'; // Reemplaza con tu número de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');
});

// Inicializar la tienda
cargarCarritoDesdeLocalStorage();
mostrarProductos();
mostrarSeccion('inicio');





