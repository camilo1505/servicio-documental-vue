<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
        <table class="misDocumentos">
            <thead>
                <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col"> Estado Documento </th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.nombre">
                    <th>Icon</th>
                    <th> {{ documento.nombre }} </th>
                    <th> {{ documento.descripcion }} </th>
                    <th> {{documento.estado}} </th>
                    <th>
                        <button type="button" class="btn btn-primary">
                            <span class="glyphicon glyphicon-pencil" aria-hidden="true">Edit</span>
                        </button>
                    </th>
                    <th>
                        <button type="button" class="btn btn-danger">
                            <span class="glyphicon glyphicon-trash" aria-hidden="true">Delete</span>
                        </button>
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
            usuario: "camilo",
            documentos: null
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=" + this.usuario 
        + "&etiquetas=")
        .then(Response => (this.documentos = Response.data))
    },
}
</script>

<style>
.misDocumentos {
    border: 2cm;
}
</style>