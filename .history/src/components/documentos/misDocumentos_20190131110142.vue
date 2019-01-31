<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-switch label="Mis Documentos" v-model="misDocumentos" color="blue" @change="cargarDocumentos(misDocumentos)">

            </v-switch>
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
            if(misDocumentos) {
                Axios
                .get("http://localhost:8080/api/v1/documento/misDocumentos?usuario=" + localStorage.user)
            }
        }
    }
}
</script>

<style>

</style>
