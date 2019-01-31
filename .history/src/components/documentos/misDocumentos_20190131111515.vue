<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-switch :label="`Mis Documentos`" v-model="misDocumentos" @change="cargarDocumentos(misDocumentos)"></v-switch>
            <p v-if="documentos">{{actualizarDocumentos()}}</p>
        </v-app>
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
