const calcular_tiempo= () => {
    const vi= document. getElementById("inp-vi").value;
    const vf= document. getElementById("inp-vf").value;

    const t= (vf - vi)/ 9.81;
    return t;
}

const mostrar= () => {
    const respuesta= calcular_tiempo()

    document.getElementById("h-tiempo").textContent= 'El resultado es: '+respuesta;
}
const boton = document.getElementById("btn-calcular");
boton. addEventListener("click", mostrar);