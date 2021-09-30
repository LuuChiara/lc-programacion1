
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

    listar_clientes();
    vaciar();
}
const boton= document.getElementById("btn-obtener")
boton.addEventListener("click", guardarcliente);


function eliminar() {
    const id=document.getElementById("inp-id").value
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
                    <button onclick="llenar_input_oculto('${element.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                    <button onclick="editar_cliente('${element.nombre}', '${element.apellido}', ${element.dni}, '${element.id}')" class="btn btn-success btn-sm"><i class="fa fa-edit"></i></button>

                </td>
            </tr>
        `
        totalfilas.push(fila)
    });
    document.getElementById("tbody").innerHTML=totalfilas.join('')
}

listar_clientes();

function llenar_input_oculto(id) {
    document.getElementById("inp-id").value=id;
}

function editar_cliente(nom,ape,dni,id) {
    document.getElementById("inp-nom").value= nom;
    document.getElementById('inp-ape').value= ape;
    document.getElementById('inp-dni').value= dni;
    document.getElementById('inp-id').value=id;
}

function actualizar_cliente() {
    const nom= document.getElementById("inp-nom").value;
    const ape= document.getElementById('inp-ape').value;
    const dni= document.getElementById('inp-dni').value;
    const id= document.getElementById('inp-id').value;

    const clienteActualizado={
        nombre: nom,
        apellido: ape,
        dni: dni
    }

    db.collection("Clientes").doc(id).update(clienteActualizado)
    listar_clientes();
    vaciar();
}

function vaciar() {
    document.getElementById("inp-nom").value= '';
    document.getElementById('inp-ape').value= '';
    document.getElementById('inp-dni').value= '';
    document.getElementById('inp-id').value= '';
}