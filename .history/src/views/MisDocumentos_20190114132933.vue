<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Estado Documento</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.nombre">
                    <td scope="row">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                    </td>
                    <td> {{ documento.nombre }} </td>
                    <td> {{ documento.descripcion }} </td>
                    <td> {{documento.estado}} </td>
                    <td>
                        <button @click="verArchivos(docuemento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                    </td>
                    <td>
                        <button class="btn btn-secondary btn-sm" type="button"><i class="fa fa-cogs" aria-hidden="true"></i> Editar</button>
                    </td>
                    <td>
                        <button @click="deleteDocument(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            {{archivos}}
        </div>
    </div>    
</template>

<script>

import 'mdbvue';
import axios from "axios";

export default {  
    name: 'MisDocumentos',
    data(){
        return {
            usuario: this.$route.params.usuario,
            documentos: null,
            respuesta: null,
            archivos: null,
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/misDocumentos?autor=" + this.usuario)
        .then(Response => (this.documentos = Response.data))
    },
    methods: {
        deleteDocumento(documento) {
            axios
            .delete("http://localhost:8080/api/v1/documento/eliminarDocumento", documento)
            .then(Response => (this.respuesta = Response.data))
        },

        verArchivos(documento) {
            this.archivos = documento.archivo
        }
    },
}
</script>

<style>
.folder {
    height: 30px;
    width: 30px;
}

</style>