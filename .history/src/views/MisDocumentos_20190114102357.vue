<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
        <table class="table table-hover">
            <thead class="thead-light">
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
                    <td scope="row">
                        <img class="folder" src="@/assets/img/folder-icon.png" alt="Icon">
                    </td>
                    <td > {{ documento.nombre }} </td>
                    <td> {{ documento.descripcion }} </td>
                    <td> {{documento.estado}} </td>
                    <td>
                        <button  class="btn btn-secondary btn-sm" type="button">Ver</button>
                    </td>
                    <td>
                        <button class="btn btn-secondary btn-sm" type="button">Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><icon name="flag"></icon></button>
                    </td>
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
.btn .fa-icon {
    vertical-align: middle;
    margin-right: 0.5rem;
}
.btn .fa-icon:last-child {
    margin-right: 0;
}
</style>