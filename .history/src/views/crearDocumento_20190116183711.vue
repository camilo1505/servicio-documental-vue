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
            },
            respuesta: null
        }
    },
    methods: {
        crearDocumento(documento) {
            axios
            .post("http://localhost:8080/api/v1/documento/crearDocumento", documento)
            .then(Response => (this.respuesta = Response.data))
        }
    }
}
</script>

<style>

</style>
