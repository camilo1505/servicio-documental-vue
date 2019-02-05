<template>
    <div>
        <vue-clip :options="options">

        </vue-clip>
    </div>
</template>

<script>
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
