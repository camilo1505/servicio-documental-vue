<template>
    <div v-if="documentos">
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
        },
    },
}
</script>

<style>
.folder {
    height: 30px;
    width: 30px;
}

</style>