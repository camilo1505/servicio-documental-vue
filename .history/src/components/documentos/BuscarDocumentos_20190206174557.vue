<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details @keyup.enter.native="buscarDocumentos()"></v-text-field>
        <p v-if="documentos">{{cambiarDocumentos()}}</p>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: {
        switchMios: null,
    },
    data() {
        return {
            documentos: null,
            busqueda: null
        }
    },
    methods: {
        buscarDocumentos() {
            console.log("Esto es lo que esta en el switch " + this.switchMios)
            Axios
            .get("http://localhost:8080/documento/consultar?consulta=" + this.busqueda + "&usuario=" + localStorage.user + "&etiqueta=historia" + "&misDocumentos=" + this.switchMios)
            .then(Response =>(this.documentos = Response.data));
        },
        cambiarDocumentos() {
            this.$emit('cambioMensage', this.documentos);
            this.documentos = null;
        }
    }
}
</script>