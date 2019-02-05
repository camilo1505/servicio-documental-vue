<template>
    <div>
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
import VueClip from 'vue-clip'
export default {
    components: {
        VueClip
    },
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
