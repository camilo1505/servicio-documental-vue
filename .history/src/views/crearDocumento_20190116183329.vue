<template>
    <div>
        
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data() {
        return {
            documentoDTO: {
                nombre: null,
                etiquetas: [],
                descripcion: null,
                estado: null,
                archivos: null
            }
        }
    },
    methods: {
        crearDocumento() {
            axios
            .post("http://localhost:8080/api/v1/documento/crearDocumento")
        }
    }
}
</script>

<style>

</style>
