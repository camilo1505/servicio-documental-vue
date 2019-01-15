<template>
    <div v-if="documentos">
        <div>
            <h1>Documentos</h1> 
        </div>
        <div class="form-group">
            <label for="usr">Nombre:</label>
            <input type="text" class="form-control">
            <label for="usr">Autor:</label>
            <input type="text" class="form-control">
            <label for="usr">Descripcion:</label>
            <input type="text" class="form-control">
        </div>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Estado Documento</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.id.machineidentifier">
                    <td scope="row">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                    </td>
                    <td> {{ documento.nombre }} </td>
                    <td> {{ documento.autor }} </td>
                    <td> {{ documento.descripcion }} </td>
                    <td> {{ documento.estado }} </td>
                    <td>
                        <button @click="verArchivos(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="archivos">
            {{archivos}}
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'BuscarDocumento',
    data(){
        return {
            documentos: null,
            archivos: null
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=&etiquetas=")
        .then(response => (this.documentos = response.data))
    },
    
    methods: {
        filtrarDocumentos: function(nombreDocumento,autor,etiquetas){
            axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento="+nombreDocumento+"&autor="+autor+"&etiquetas="+etiquetas)
            .then(response => (this.documentos = response.data))
        },
        verArchivos(documento) {
            this.archivos = documento.archivo
        },
    }
}
</script>


<style>

</style>
