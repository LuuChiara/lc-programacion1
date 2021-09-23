
const db= firebase.firestore()

const guardarcliente = async () =>{

    const nombre= document.getElementById("inp-nom").value
    const apellido= document.getElementById("inp-ape").value
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
    listar_clientes();
}
const boton= document.getElementById("btn-obtener")
boton.addEventListener("click", guardarcliente);


function eliminar(id) {
    db.collection("Clientes").doc(id).delete()
    listar_clientes();

}

const listar_clientes = async () =>{

    const clientes= await db.collection("Clientes").get()
    let lista_clientes=[]

    const lista= clientes.docs.map(doc=> {
        lista_clientes=doc.data()
        lista_clientes.id=doc.id;
        return lista_clientes;
    });

    let totalfilas=[]
    lista.forEach(element => {
        let fila=`
            <tr class="table-success">
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>${element.dni}</td>
                <td>
                    <button onclick="eliminar('${element.id}')" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `
        totalfilas.push(fila)
    });
    document.getElementById("tbody").innerHTML=totalfilas.join('')
}

listar_clientes()