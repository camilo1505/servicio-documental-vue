<template>
    <div>
        <vue-clip :options="options">

        </vue-clip>
    </div>
</template>

<script>
import VueClip from 'vue-clip'
export default {
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
