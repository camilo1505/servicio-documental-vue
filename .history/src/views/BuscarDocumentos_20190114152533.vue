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
                    <td> {{ documento.estado }} </td>
                    <td>
                        <button @click="verArchivos(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                    </td>
                    <td>
                        <button class="btn btn-secondary btn-sm" type="button"><i class="fa fa-cogs" aria-hidden="true"></i> Editar</button>
                    </td>
                    <td>
                        <button @click="deleteDocumento(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button>
                    </td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import axios from "axios";
export default {
    name: 'editarDocumento',
    data(){
        return {
            documentos: null
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=")
        .then(response => (this.documentos = response.data))
    },
    
    methods: {
        filtrarDocumentos: function(nombreDocumento,autor,etiquetas){
            axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento="+nombreDocumento+"&autor="+autor+"&etiquetas="+etiquetas)
            .then(response => (this.documentos = response.data))
        }
    }
}
</script>


<style>

</style>
