// Abrir y cerrar carrito
const toggleCarrito = document.querySelector("#toggleCarrito");
const abrirCarrito = document.querySelector(".imgCarrito");
const cerrarCarrito = document.querySelector("#cerrarCarrito");

abrirCarrito.addEventListener("click", function () {
  toggleCarrito.style.right = "0";
});

cerrarCarrito.addEventListener("click", function () {
  toggleCarrito.style.right = "-300px";
});

class Producto {
  constructor(id, nombre, precio, marca, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.marca = marca;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

class BaseDeDatos {
  constructor(id, nombre, precio, marca, categoria, imagen) {
    // Array para los producto q tengo
    this.productos = [];
    // Productos//
    this.agregarRegistro(
      1,
      "Nike Vapor Lite Clay",
      99000,
      "Nike",
      "Zapatillas",
      "nikecourtvapor.jpg"
    );
    this.agregarRegistro(
      2,
      "Asics Solution Speed",
      119000,
      "Asics",
      "Zapatillas",
      "AcicsSolutionSwift.jpg"
    );
    this.agregarRegistro(
      3,
      "Adidas Game Court 2",
      60000,
      "Adidas",
      "Zapatillas",
      "adidasgamecourt.jpg"
    );
    this.agregarRegistro(
      4,
      "Asics Gel Dedicate 8 Clay",
      60000,
      "Asics",
      "Zapatillas",
      "asicsgeldedicate.jpg"
    );
    this.agregarRegistro(
      5,
      "Adidas Adizero Ubersonic",
      50000,
      "Adidas",
      "Zapatillas",
      "AdidasAdizeroUbersonic4.jpg"
    );
    this.agregarRegistro(
      6,
      "Raqueta Wilson Blade",
      150000,
      "Wilson",
      "Otro",
      "raquetawilsonblade.jpeg"
    );
    this.agregarRegistro(
      7,
      "New Balance Fresh Foam M",
      40000,
      "New Balance",
      "Zapatillas",
      "NewBalanceFreshFoamMoreMujer.jpg"
    );
    this.agregarRegistro(
      8,
      "Vincha Nike",
      7000,
      "Nike",
      "Otro",
      "VinchaNike.jpg"
    );
    this.agregarRegistro(
      9,
      "Adidas Game Court Mujer",
      60000,
      "Adidas",
      "Zapatillas",
      "NikeCourtAirMaxMujer.jpg"
    );
    this.agregarRegistro(
      10,
      "Nike Court Zoom Vapor",
      104000,
      "Nike",
      "Zapatillas",
      "NikeCourtAirZoomVapor.jpg"
    );
    this.agregarRegistro(
      11,
      "Adidas Barricade",
      80000,
      "Adidas",
      "Zapatillas",
      "AdidasBarricade12.jpg"
    );
    this.agregarRegistro(
      12,
      "New Balance Fresh Foam",
      95000,
      "New Balance",
      "Zapatillas",
      "NewBalanceFrehFoam1080.jpg"
    );
    this.agregarRegistro(
      13,
      "Muñequera Nike",
      6000,
      "Nike",
      "Otro",
      "muñequeraNike.jpg"
    );
    this.agregarRegistro(
      14,
      "New Balance FuelCell Rebel",
      90000,
      "New Balance",
      "Zapatillas",
      "NewBalanceFuelCellRebelMujer.jpg"
    );
    this.agregarRegistro(
      15,
      "Nike Dunk Low",
      130000,
      "Nike",
      "Zapatillas",
      "nikesbdunk.png"
    );
    this.agregarRegistro(
      16,
      "New Balance 990 v4 Jupiter",
      150000,
      "New Balance",
      "Zapatillas",
      "NewBalance990v4Jupiter.jpg"
    );
    this.agregarRegistro(
      17,
      "Wilson Rush Pro",
      40000,
      "Nike",
      "Zapatillas",
      "WilsonRushPro.jpg"
    );
    this.agregarRegistro(
      18,
      "Pelota Wilson x3",
      9000,
      "Wilson",
      "Otro",
      "PelotaWilson.jpg"
    );
  }
  // Crea el objeto producto y lo agrega al catalogo (array)
  agregarRegistro(id, nombre, precio, marca, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, marca, categoria, imagen);
    this.productos.push(producto);
  }
  //Devuelve el catalogo de productos
  traerRegistros() {
    return this.productos;
  }
  // Devuelve un producto segun si coincide el id
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }
  // Devuelve un array con las coincidencias de la palabra con el nombre del producto
  registrosPorNombre(palabra) {
    return this.producto.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

class Carrito {
  constructor() {
    this.carrito = [];
    this.total = 0;
    this.cantidadProductos = 0;
  }
  //Recorre el array carrito y compara el id de los elementos
  estaEnCarrito({ id }) {
    return this.carrito.find((producto) => producto.id === id);
  }

  //Agrega al carrito
  agregar(producto) {
    const productoEnCarrito = this.estaEnCarrito(producto);
    // Si esta en el carrito, o si no lo esta
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.listar();
  }
  // Saca del carrito
  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);

    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      this.carrito.splice(indice, 1);
    }
    this.listar();
  }
  //Agrega al HTML
  listar() {
    this.total = 0;
    this.cantidadProductos = 0;
   divCarrito.innerHTML=` <h2 class="tituloCarrito">Carrito</h2>
   <h3 class="cantidadProductosTexto">Cantidad de productos: <span id="cantidadProductos">0</span></h3>
    <h3 class="totalProductosTexto">Total: $ <span id="totalCarrito">0</span></h3>
   <button id="cerrarCarrito">Cerrar Carrito</button>`;

    for (const producto of this.carrito){
divCarrito.innerHTML += `
<div class= "contenedorCarrito">
<h3> ${producto.nombre} </h3>
<h4> $${producto.precio} </h4>
<h4> Cantidad: ${producto.cantidad} </h4>
<button class="eliminarDelCarrito" data-id="${producto.id}">Eliminar del carrito</button>
</div>
`;
this.total +=  producto.precio * producto.cantidad;
this.cantidadProductos+= producto.cantidad;
    }
const botonesQuitar = document.querySelectorAll(".eliminarDelCarrito");

for(const boton of botonesQuitar){
boton.addEventListener("click", function (event){
    event.preventDefault();
    const idProducto = Number(boton.dataset.id);
    carrito.quitar(idProducto);
})
}

}
 }
// Ejecuta la base de datos (crea array y agrega productos)
const bd = new BaseDeDatos();
// Lo mismo con carrito
const carrito = new Carrito();

// Elementos tienda
const tiendaContenedor = document.querySelector(".tiendaContenedor");
const divCarrito = document.querySelector(".contenido-carrito");

//
cargarProductos(bd.traerRegistros());

function cargarProductos(productos) {
  tiendaContenedor.innerHTML = "";
  // Recorro los elementos del array y los agrego al html
  for (const producto of productos) {
    tiendaContenedor.innerHTML += `
<div class="productoTienda"> 
<img class="img-productoTienda" src="./imagenes_tenis/${producto.imagen}" alt="producto">
<h2>${producto.nombre}</h2>
<h2>$${producto.precio}</h2>
<button class="botonAgregarCarrito" data-id="${producto.id}">Agregar al carrito</button>
</div>`;
  }

  const botonesAgregar = document.querySelectorAll(".botonAgregarCarrito");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
      // Se fija el id del producto del data-id del HTML del boton de producto
      const idProducto = Number(boton.dataset.id);
      // Se fija el objeto que tenga ese ID
      const producto = bd.registroPorId(idProducto);
      carrito.agregar(producto);
    });
  }
}
