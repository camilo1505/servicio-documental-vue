<template>
    <div v-if="documentos">
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
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=")
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
