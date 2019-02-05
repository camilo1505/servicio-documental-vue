<template>
    <div id="app">
        <vue-clip :options="options">
            <template slot="clip-uploader-action">
                <div class="uploader-action">
                    <div class="dz-message">
                        Drag and Drop file here or browse
                    </div>
                </div>
            </template>
        </vue-clip>
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
