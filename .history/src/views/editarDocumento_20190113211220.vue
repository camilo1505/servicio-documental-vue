<template>
    <div>
        
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'editarDocumento',
    data(){
        return {
            nombreDocumento: this.$route.params.documento,
            documento: null
        }
    },

}
</script>


<style>

</style>
