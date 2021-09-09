import Area from './area.js'

const mostrar= () =>{

    const base_s= document.getElementById("inp-bs").value;
    const base_i= document.getElementById("inp-bi").value;
    const alt= document.getElementById("inp-a").value;
    

    const instancia= new Area(base_s, base_i, alt)

    const respuesta= instancia.calcular_area_trap ()
    
    document.getElementById("r1").textContent='El area del trapecio es: '+ respuesta;
}
const boton = document.getElementById("btn-calcular");
boton. addEventListener("click", mostrar);


const mostrar1= ()=>{
    const base= document.getElementById("inp-base").value;
    const altura= document.getElementById("inp-altura").value;

    const instancia= new Area('','','',base, altura)

    const respuesta1= instancia.calcular_area_triangulo ()
    
    document.getElementById("r2").textContent='El area del triangulo es: '+ respuesta1;
}
const boton1 = document.getElementById("btn-calcular1");
boton1. addEventListener("click", mostrar1);