<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details @keyup.enter.native="buscarDocumentos()"></v-text-field>
        <p v-if="documentos">{{cambiarDocumentos()}}</p>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['docs'],
    data() {
        return {
            documentos: null,
            busqueda: null
        }
    },
    methods: {
        buscarDocumentos() {
            console.log("Buscando Documentos");
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=" + this.busqueda)
            .then(Response =>(this.documentos = Response.data));
            console.log("Documentos encontrados");
        },
        cambiarDocumentos() {
            this.$emit('cambioMensage', this.documentos);
            this.documentos = null;
        }
    }
}
</script>