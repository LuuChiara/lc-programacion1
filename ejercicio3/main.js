const calcular= () => {
    const radio= document. getElementById("inp-radio").value;

    const resul= Math.PI * Math.sqrt(radio);

    document.getElementById("radio").textContent= 'El resultado es: '+resul;
}
const boton = document.getElementById("btn-calcular");
boton. addEventListener("click", calcular);