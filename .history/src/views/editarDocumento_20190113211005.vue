<template>
    <div>
        
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'editarDocumento',
    data(){
        data(){
            return {
                nombreDocumento: this.$route.params.documento,
                archivos: null
            }
        }
    }    
}
</script>


<style>

</style>
