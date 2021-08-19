
const calcular = () => {
    const dato1 = document.getElementById("inp-dato1").value;
    const dato2 = document.getElementById("inp-dato2").value;

    const parte1 = Math.pow(dato1,2) +  Math.pow(dato2,2);
    const resultado = Math.sqrt(parte1);

    document.getElementById("h-resultado").textContent= 'el resultado es: '+resultado;

}

const boton = document.getElementById("btn-calcular");
boton.addEventListener("click",calcular);