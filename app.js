const cambiarComentarios = document.getElementById("comentarios");
const primerLi = document.getElementById("primerLi");
const segundoLi = document.getElementById("segundoLi");
const tercerLi = document.getElementById("tercerLi");
const fotoAutor = document.getElementsByClassName("fotoAutor")[0];
const autorNombre = document.querySelector("#autorNombre h4");

primerLi.addEventListener("click", cambiarPrimerLi);
segundoLi.addEventListener("click", cambiarSegundoLi);
tercerLi.addEventListener("click", cambiarTercerLi);


function cambiarPrimerLi() {
  cambiarComentarios.innerHTML =
    "<h3>Las zapatillas de tenis son alucinantes y super comodas, me hicieron amar este deporte ademas de hacerme sentir que juego como federer, sinceramente se lleva mis dieces.</h3>";
  fotoAutor.style.backgroundImage = 'url("./imagenes_tenis/autor1messi.webp")';
  autorNombre.innerText = "Lionel Andres Messi";
  }
function cambiarSegundoLi() {
  cambiarComentarios.innerHTML =
    "<h3> A mi las raquetas que compre me parecieron muy comodas y versatiles ademas de golpear la pelota con mejor direccion, tambien aumento la fuerza de mi disparo.</h3>";
    fotoAutor.style.backgroundImage = 'url("./imagenes_tenis/autor2.jpg")';
    autorNombre.innerText = "Jose Deodo";
  }
function cambiarTercerLi() {
  cambiarComentarios.innerHTML =
  "<h3>Gran comodidas en las zapatillas, buena calidad de raquetas y la vincha que me compre esta espectacular.</h3>";
  fotoAutor.style.backgroundImage = 'url("./imagenes_tenis/autor3.jpg")';
  autorNombre.innerText = "Julieta Lopez";
}
