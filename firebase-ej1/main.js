
const db= firebase.firestore()

const guardarcliente = async () =>{

    const apellido= document.getElementById("inp-nom").value
    const nombre= document.getElementById("inp-ape").value
    const dni= document.getElementById("inp-dni").value

    const uncliente={
        nombre,
        apellido,
        dni
    }

    await db.collection("Clientes").doc().set(uncliente)

    document.getElementById("inp-ape").value='';
    document.getElementById("inp-nom").value='';
    document.getElementById("inp-dni").value='';
}
const boton= document.getElementById("btn-obtener")
boton.addEventListener("click", guardarcliente);