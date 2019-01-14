<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Estado Documento</th>
                    <th scope="col">Ver</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.nombre">
                    <th>
                        <img class="folder" src="@/assets/img/folder-icon.png" alt="Icon">
                    </th>
                    <th> {{ documento.nombre }} </th>
                    <th> {{ documento.descripcion }} </th>
                    <th> {{documento.estado}} </th>
                    <th>
                        <button type="button">Ver</button>
                    </th>
                    <th>
                        <button type="button">Edit</button>
                    </th>
                    <th>
                        <button type="button">Delete</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>
import axios from "axios";

export default {  
    name: 'MisDocumentos',
    data(){
        return {
            usuario: this.$route.params.usuario,
            documentos: null
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/misDocumentos?autor=" + this.usuario)
        .then(Response => (this.documentos = Response.data))
    },
}
</script>

<style>
.folder {
    height: 30px;
    width: 30px;
}
</style>