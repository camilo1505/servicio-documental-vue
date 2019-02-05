<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-uploader>
                <p>Hello</p>
            </v-uploader>
        </v-app>
    </div>
</template>

<script>
export default {
    name:"pruebas",
    data() {
        return{
            options: {
                url: '/upload'
            }
        }
    }
}
</script>

<style>

</style>
