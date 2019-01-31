<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details @keyup.enter.native="buscarDocumentos()"></v-text-field>
        <p v-if="documentos">{{cambiarDocumentos()}}</p>
        <p v-if="shareDocs != null">{{asignarDocumentos()}}</p>
        <p v-if="tipoCons != null">{{asignarTipoConsulta()}}</p>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['shareDocs', 'tipoCons'],
    data() {
        return {
            documentos: null,
            busqueda: null,
            tipoConsulta: null
        }
    },
    methods: {
        buscarDocumentos() {
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=" + this.busqueda + "&usuario=" + localStorage.user + "&tipoConsulta=" + this.tipoConsulta)
            .then(Response =>(this.documentos = Response.data));
        },
        cambiarDocumentos() {
            this.$emit('cambioMensage', this.documentos);
            this.documentos = null;
        },
        asignarTipoConsulta() {
            this.tipoConsulta = this.tipoCons;
        }
    }
}
</script>