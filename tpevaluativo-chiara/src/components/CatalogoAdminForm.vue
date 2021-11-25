<template>
    <div class="row">
        <div class="col-4">
            <div class="form-floating mb-3">
                <input v-model="Descripcion" class="form-control bg-light" placeholder="name" type="text" id="floatingInput">
                <label for="floatingImput"><em>Descripcion</em></label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="Precio" class="form-control bg-light" placeholder="name" type="number" id="floatingInput">
                <label for="floatingImput"><em>Precio</em></label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="Descuento" class="form-control bg-light" placeholder="number" type="text" id="floatingInput">
                <label for="floatingImput"><em>Porcentaje de descuento</em></label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="Categoria" class="form-control bg-light" placeholder="name" type="text" id="floatingInput">
                <label for="floatingImput"><em>Categoria</em></label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="Stock" class="form-control bg-light" placeholder="name" type="number" id="floatingInput">
                <label for="floatingImput"><em>Stock</em></label>
            </div>
            <div class="form-floating mb-3">
                <select v-model="estado_producto" class="form-select bg-light" aria-label="Default select example">
                    <option selected>Estado</option>
                    <option value="0">Inactivo</option>
                    <option value="1">Activo</option>
                </select>
                <label for="floatingImput"><em>Estado</em></label>
            </div>
            <div class="mb-3">
                <input id="inp-files" type="file">
            </div>
            <button v-if="Estado==0"  @click="guardar()" class="btn btn-success">Guardar</button>
            <button v-if="Estado==1"  @click="actualizar_catalogo(Catalogo) " class="btn btn-primary btn-sm">Actualizar</button>
        </div>
        <div class="col-8">
            <table class="table">
                <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                </tr>
                <tbody>
                    <tr v-for="Catalogo of lista_catalogo" v-bind:key="Catalogo.id">
                        <td><img style="width:3rem" :src="Catalogo.url" alt=""></td>
                        <td>{{Catalogo.Descripcion}}</td>
                        <td>{{Catalogo.Precio}}</td>
                        <td>{{Catalogo.Descuento}}</td>
                        <td>{{Catalogo.Categoria}}</td>
                        <td>{{Catalogo.Stock}}</td>
                        <td>{{Catalogo.estado_producto}}</td>
                        <td>
                            <button @click="eliminar_catalogo(Catalogo.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                            <button @click="editar_catalogo(Catalogo) " class="btn btn-success btn-sm"><i class="fa fa-pencil"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from '@firebase/firestore'
import{ uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import{ db, storage } from '../utils/firebase.js'
export default {
    name:'CatalogoAdminForm',
    data(){
        return{
            Descripcion:'',
            Precio:null,
            Descuento:null,
            Categoria: '',
            Stock: null,
            lista_catalogo:[],
            Estado:0,
            id:null,
            estado_producto:1,
            url:''
        }
    },
    methods:{
        async subir_imagen(){
            const files=document.getElementById("inp-files").files[0]
            const config= ref(storage,'Catalogo_imagenes/'+files.name)

            await uploadBytes(config, files).then(()=>{
                alert('Operacion exitosa!!')
                document.getElementById("inp-files").value=''
            })

            this.url= await getDownloadURL(config)
        },

        vaciar(){
            this.Descripcion =  ''
            this.Precio = null
            this.Descuento = null
            this.Categoria = ''
            this.Stock= null
            this.url=''
        },

        async guardar(){

            await this.subir_imagen()

            const objetos={
                Descripcion:this.Descripcion,
                Precio:this.Precio,
                Descuento: this.Descuento,
                Categoria:this.Categoria,
                Stock:this.Stock,
                estado_producto:this.estado_producto,
                url:this.url
            }
            const coleccion= collection(db, 'Catalogo')
            addDoc(coleccion, objetos )
            this.vaciar()
        },

        obtener_catalogo(){
            onSnapshot( collection(db, 'Catalogo'), (snapshot)=>{
                this.lista_catalogo=[]
                snapshot.docs.map((doc) =>{
                    this.lista_catalogo.push({...doc.data(), id:doc.id})
                })
            })
        },

        eliminar_catalogo(id){
            /*
            Para eliminar, necesito acceso a la base, especificar
            la coleccion y el ID
            */
            deleteDoc(doc(db, 'Catalogo', id))
        },

        editar_catalogo(Catalogo){
            this.Descripcion=Catalogo.Descripcion;
            this.Precio=Catalogo.Precio;
            this.Descuento=Catalogo.Descuento;
            this.Categoria=Catalogo.Categoria;
            this.Stock=Catalogo.Stock;
            this.id=Catalogo.id;
            this.url=Catalogo.url;
            

            this.estado=1;
        },

        async actualizar_catalogo(){
            await this. subir_imagen()

            const catalogo_modificado={
                Descripcion:this.Descripcion,
                Precio:this.Precio,
                Descuento:this.Descuento,
                Categoria:this.Categoria,
                Stock:this.Stock,
                estado_producto:this.estado_producto,
                id:this.id,
                url:this.url
            }
            updateDoc(doc(db, 'Catalogo', this.id), catalogo_modificado)

            this.Estado=0;

            this.vaciar()
        }
    },
    mounted(){
        this.obtener_catalogo()
    }
}
</script>