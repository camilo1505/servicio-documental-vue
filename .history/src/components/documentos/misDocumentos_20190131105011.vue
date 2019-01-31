<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-switch :label="`Mis Documentos`" v-model="misDocumentos">

            </v-switch>
        </v-app>
    </div>
</template>

<script>
export default {
    data() {
        return {
            misDocumentos: false,
            documentos: null
        }
    }
}
</script>

<style>

</style>
