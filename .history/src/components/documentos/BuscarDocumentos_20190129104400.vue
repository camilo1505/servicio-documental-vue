<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details @submit="buscarDocumentos()"></v-text-field>
        <p v-if="documentos">{{cambiarDocumentos(docs)}}</p>
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
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=" + this.busqueda)
            .then(Response =>(this.documentos = Response.data));
        },
        cambiarDocumentos(docs) {
            docs = this.documentos;
            this.$emit('cambioMensage', this.documentos);
        }
    }
}
</script>