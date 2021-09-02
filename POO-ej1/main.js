import Bhaskara from './bhaskara.js';
const mostrar=() =>{
    const a =document. getElementById("inp-a").value;
    const b =document. getElementById("inp-b").value;
    const c =document. getElementById("inp-c").value;

    const instancia= new Bhaskara(a,b,c);
    const raiz1=instancia.calcular_r1()
    const raiz2=instancia.calcular_r2()

    document.getElementById("r1").textContent='raiz 1= '+ raiz1;
    document.getElementById("r2").textContent='raiz 2= '+ raiz2;
}

const boton = document.getElementById("btn-calcular");
boton. addEventListener("click", mostrar);