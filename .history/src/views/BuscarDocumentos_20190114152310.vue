<template>
    <div>
        
    </div>
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
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento="+nombreDocumento+"&autor="+autor + "&etiquetas="+etiquetas)
            .then(response => (this.documentos = response.data))
        }
    }
}
</script>


<style>

</style>
