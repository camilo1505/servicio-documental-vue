<template>
    <div id="app">
        <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
        <v-switch @change="cargarDocumentos()" :label="`Mis Documentos`" v-model="misDocumentos" color="blue darken-3"></v-switch>
        <p>{{actualizarDocumentos()}}</p>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    data() {
        return {
            misDocumentos: false,
            documentos: null
        }
    },
    methods: {
        cargarDocumentos() {
            if(this.misDocumentos) {
                Axios
                .get("http://localhost:8080/api/v1/documento/misDocumentos?usuario=" + localStorage.user)
                .then(Response => (this.documentos = Response.data))
            }
            else {
                Axios
                .get("http://localhost:8080/api/v1/documento/documentos?usuario=" + localStorage.user)
                .then(Response => (this.documentos = Response.data))
            }
        },
        actualizarDocumentos() {
            this.$emit('cambioDocumentos', this.documentos);
            this.documentos = null;
        },
    }
}
</script>

<style>

</style>
