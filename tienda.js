// Abrir y cerrar carrito
const toggleCarrito = document.querySelector("#toggleCarrito");
const abrirCarrito = document.querySelector(".imgCarrito");
const cerrarCarrito = document.querySelector("#cerrarCarrito");
// Elementos tienda
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const tiendaContenedor = document.querySelector(".tiendaContenedor");
const divCarrito = document.querySelector(".contenido-carrito");
const inputBuscar = document.querySelector(".buscador");
const botonComprarCarrito = document.querySelector("#botonComprarCarritoContenedor");

//Elementos notificacion
let notificacionContenedor = document.querySelector("#notificacion");
let notificacionCantidad = document.querySelector("#notificacionSpan");

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
    this.cargarRegistros(); 
    
  }
  async cargarRegistros(){
    const resultado = await fetch(`productos.json`);
    this.productos = await resultado.json();
    cargarProductos(this.productos);
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
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

class Carrito {
  constructor() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    this.carrito = carritoStorage || [];
    this.total = 0;
    this.cantidadProductos = 0;
  this.listar();
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
    // Actualizo storage
  localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
    notificacionCarrito();
  }
  // Saca del carrito
  quitar(id) {
    const indice = this.carrito.findIndex((producto) => producto.id === id);

    if (this.carrito[indice].cantidad > 1) {
      this.carrito[indice].cantidad--;
    } else {
      this.carrito.splice(indice, 1);
    }
    //Actualizo storage
    localStorage.setItem("carrito", JSON.stringify(this.carrito));
    this.listar();
    notificacionCarrito();
  }
  //Agrega al HTML
  listar() {
    this.total = 0;
    this.cantidadProductos = 0;
   divCarrito.innerHTML= "";

    for (const producto of this.carrito){
divCarrito.innerHTML += `
<div class= "contenedorCarrito">
<h3> ${producto.nombre} </h3>
<div class="precioCantidad"> <h4>$${producto.precio} </h4>
<h4> Cantidad: ${producto.cantidad} </h4> </div>
<button class="eliminarDelCarrito" data-id="${producto.id}">Eliminar del carrito</button>
</div>
`;
this.total +=  producto.precio * producto.cantidad;
this.cantidadProductos+= producto.cantidad;
    }
    if(this.cantidadProductos > 0){
      botonComprarCarrito.style.display="block";
          }else{
            botonComprarCarrito.style.display="none";
          }
const botonesQuitar = document.querySelectorAll(".eliminarDelCarrito");

for(const boton of botonesQuitar){
boton.addEventListener("click", function (event){
    event.preventDefault();
    const idProducto = Number(boton.dataset.id);
    carrito.quitar(idProducto);
})
}
spanCantidadProductos.innerText =  this.cantidadProductos;
spanTotalCarrito.innerText = this.total;
}
 }
// Ejecuta la base de datos (crea array y agrega productos)
const bd = new BaseDeDatos();
// Lo mismo con carrito
const carrito = new Carrito();



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
      //Alerta 
      Toastify({
        text: `Se ha añadido ${producto.nombre}`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });
  }
}
//Buscador

inputBuscar.addEventListener("input", (event) => {
   event.preventDefault();
   const palabra = inputBuscar.value;
   const producto = bd.registrosPorNombre(palabra);
   cargarProductos(producto);
} )

//Filtros
const botonMostrasTodos = document.querySelector("#mostrarTodo");
const botonAdidas = document.querySelector("#adidas");
const botonNike=document.querySelector("#nike");
const botonNewBalance=document.querySelector("#newBalance");
const botonWilson =document.querySelector("#wilson");

const main = document.querySelector("#main");


function quitarClaseActiva() {
  const botonesFiltro = [botonMostrasTodos, botonAdidas, botonNike, botonNewBalance, botonWilson];
  botonesFiltro.forEach((boton) => {
    boton.classList.remove("filtrosActivo");
  });
}



botonMostrasTodos.addEventListener("click", () =>{
  cargarProductos(bd.traerRegistros());
  quitarClaseActiva();
  botonMostrasTodos.classList.add("filtrosActivo");
 main.style.height = "420vh";
})

botonAdidas.addEventListener("click", () =>{
  const adidasEcontrado = bd.productos.filter((producto)=> producto.marca === "Adidas");
  cargarProductos(adidasEcontrado);
  quitarClaseActiva();
  botonAdidas.classList.add("filtrosActivo");
  main.style.height = "auto";
});
botonNike.addEventListener("click", () =>{
  const nikeEcontrado = bd.productos.filter((producto)=> producto.marca === "Nike");
  cargarProductos(nikeEcontrado);
  quitarClaseActiva();
  botonNike.classList.add("filtrosActivo");
  main.style.height = "auto";
});
botonNewBalance.addEventListener("click", () =>{
  const newBalanceEcontrado = bd.productos.filter((producto)=> producto.marca === "New Balance");
  cargarProductos(newBalanceEcontrado);
  quitarClaseActiva();
  botonNewBalance.classList.add("filtrosActivo");
  main.style.height = "auto";
});
botonWilson.addEventListener("click", () =>{
  const wilsonEcontrado = bd.productos.filter((producto)=> producto.marca === "Wilson");
  cargarProductos(wilsonEcontrado);
  quitarClaseActiva();
  botonWilson.classList.add("filtrosActivo");
  main.style.height = "auto";
});

// Notificacion del carrito

function notificacionCarrito(){
  if(carrito.cantidadProductos >= 1){
  notificacionContenedor.style.display = "flex";
  notificacionCantidad.innerText = carrito.cantidadProductos;
} else{
  notificacionCantidad.innerText = "0";
  notificacionContenedor.style.display ="none";
}
}