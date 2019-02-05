<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <p>Hello</p>
            <vue-clip :options="options">
                <p>Hello2</p>
                <template slot="clip-uploader-action">
                    <p>Hello3</p>
                    <div class="uploader-action">
                        <p>Hello4</p>
                        <div class="dz-message">
                            <p>Hello5</p>
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
