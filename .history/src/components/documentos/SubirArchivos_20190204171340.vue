<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <vue-clip :options="options">
                <template slot="clip-uploader-action">
                    <div class="uploader-action">
                        <div class="dz-message">
                            Drag and Drop file here or browse
                        </div>
                    </div>
                </template>
            </vue-clip>
        </v-app>
    </div>
</template>

<script>
export default {
    name:"prueba",
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
