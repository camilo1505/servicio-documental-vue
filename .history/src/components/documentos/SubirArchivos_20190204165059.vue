<template>
    <div id="app">
        <v-app>
            <vue-clip :options="options">
                <template slot="clip-uploader-action">
                    <div class="uploader-action">
                        <p>Drag and Drop file here or browse</p>
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
