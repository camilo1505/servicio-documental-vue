<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            respuesta: null,
        }
    },
    methods: {
        consultarUsuario(nombreUsuario, password) {
            axios
            .get("http://localhost:8080/api/v1/usuario/consultarUsuario?nombreUsuario=" + nombreUsuario + "&password=" + password)
            .then(Response => (this.respuesta = Response))
        }

    }
}
</script>

<style>

</style>
