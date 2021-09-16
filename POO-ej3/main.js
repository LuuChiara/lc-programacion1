import Anime from './Anime.js'

const obtener= ()=>{
    const instancia = new Anime()
    instancia.obtenerCatalogo()
}

const boton= document.getElementById("btn-obtener")
boton.addEventListener("click",obtener)