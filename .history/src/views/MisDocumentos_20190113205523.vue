<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
        <table border="1">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Nombre Documento</th>
                    <th>Descripcion</th>
                    <th>Estado Documento</th>
                    <th>Ver</th>
                    <th>Edit</th>
                    <th>Delete</th>
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
                        <button type="button">View</button>
                    </th>
                    <th>
                        <button type="button">View</button>
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