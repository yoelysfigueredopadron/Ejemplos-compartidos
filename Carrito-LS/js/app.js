// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaBebidas = document.querySelector('#lista-bebidas');
let total = document.querySelector('#total');
let articulosCarrito = [];

class Producto {
    constructor(id, imagen, titulo, precio) {
        this.id = id;
        this.imagen = imagen;
        this.titulo = titulo;
        this.precio = precio;
        this.cantidad = 1;
        this.subtotal = 0;
    }
}

cargarEventListeners();
function cargarEventListeners() {
    // Agregamos un producto presionando "Agregar al Carrito"
    listaBebidas.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Muestra los productos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {

        articulosCarrito = []; // reseteamos el arreglo
        localStorage.removeItem('carrito');
        limpiarHTML(); // Eliminamos todo el  HTML
        console.clear();
        console.log(articulosCarrito);
    });
}

// Funciones
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSelecionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSelecionado);
    }
}

// Elimina un producto del carrito
function eliminarProducto(e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains('borrar-producto')) {
        // console.log(e.target.getAttribute('data-id'));
        const productoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        console.clear();
        console.log(articulosCarrito); // Muestra el arreglo actualizado. Sin el producto que fue eliminado
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del producto
function leerDatosProducto(producto) {
    // console.log(producto);

    const id = producto.querySelector('a').getAttribute('data-id');
    const imagen = producto.querySelector('img').src;
    const titulo = producto.querySelector('h4').textContent;
    const precio = producto.querySelector('.precio span').textContent;

    // Creo el nuevo producto
    const infoProducto = new Producto(id, imagen, titulo, precio);
    // console.log(infoProducto);

    infoProducto.subtotal = Number(infoProducto.precio.replace('$', '')) * infoProducto.cantidad;
    // console.log(infoProducto);

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.subtotal = Number(producto.precio.replace('$', '')) * producto.cantidad;
                return producto; // retorna el objeto actualizado
            } else {
                return producto; // retorna los objetos que no son los duplicados
            }
        });

        // spread operator
        articulosCarrito = [...productos];

        // // Si se usa spread operator no tenemos que vaciar el carrito.
        // articulosCarrito = [];

        // // utilizamos un for para agregar los objetos(productos) al carrito
        // for (let i = 0; i < productos.length; i++) {
        //     articulosCarrito.push(productos[i]);
        // }

    } else {
        // Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
        // articulosCarrito.push(infoProducto);
    }

    // console.clear();
    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el Carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, subtotal, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>$${subtotal}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `;

        // Agregamos el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar el carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los productos del tbody
function limpiarHTML() {
    // forma lenta de limpiar el HTML
    // contenedorCarrito.innerHTML = '';

    // mejor performance para limpiar nuestro HTML
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    total.innerHTML = `Total : $${totalGeneral()}`;
}

function totalGeneral() {
    let productoTotal = articulosCarrito.reduce((total, producto) => total + producto.subtotal, 0);
    console.log(`Total : $${productoTotal}`);

    return productoTotal;
}