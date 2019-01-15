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
            documentos: this.$route.params.documento,
            documento: null
        }
    },
    mounted() {
        axios
        .get()
    }
}
</script>


<style>

</style>
