<template>
    <div class="row">
        <template v-for="catalogo of lista_producto" v-bind:key="catalogo.id" >
            <div v-if="catalogo.estado_producto==1" class="col-lg-3 col-md-4 col-12 me-1">
                <div class="card" >
                    <img :src="catalogo.url" class="card-img-top" style="height:10rem">
                    <div class="card-body">
                        <h5 class="card-title">{{catalogo.Descripcion}}</h5>
                        <h5 class="card-text" v-if="catalogo.Descuento>0">${{ (catalogo.Descuento*catalogo.precio)/100}}<del class="card text">(${{catalogo.precio}})</del></h5>
                        <h5 class="card-text" v-else>${{catalogo.Precio}}</h5>
                        <p class="card-text">{{catalogo.Opcion}}</p>
                        <a class="btn btn-success">Comprar</a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import{collection, onSnapshot} from '@firebase/firestore'
import{db} from '../utils/firebase.js'
export default {
    name:'Catalogo',
    data(){
        return{
            lista_producto:[]
        }
    }, 
    methods:{
        obtener_catalogo(){
            onSnapshot(collection(db,'Catalogo'), (snapshot) =>{
                this.lista_producto = []
                snapshot.docs.map((doc) =>{
                    this.lista_producto.push({...doc.data(), id:doc.id})
                })
            })
        }
    },
    mounted(){
        this.obtener_catalogo()
    }
}
</script>