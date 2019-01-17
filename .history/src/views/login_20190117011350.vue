
<template>
<!-- Material form subscription -->
<form>
  <p class="h5 text-center mb-4">Subscribe</p>
  <div class="grey-text">
    <mdb-input label="Your name" icon="user" type="text"/>
    <mdb-input label="Your email" icon="envelope" type="email"/>
  </div>
  <div class="text-center">
    <mdb-btn outline="info">Send <mdb-icon icon="paper-plane-o" class="ml-1"/></mdb-btn>
  </div>
</form>
<!-- Material form subscription -->
</template>

<script>

import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            respuesta: null,
            nombreUsuario: null,
            password: null,
        }
    },
    methods: {
        consultarUsuario(nombreUsuario, password) {
            axios
            .get("http://localhost:8080/api/v1/usuario/consultarUsuario?nombreUsuario=" + nombreUsuario + "&password=" + password)
            .then(Response => (this.respuesta = Response.status))
            this.consultaValida()
            console.log("pasando la solicitud");
        },
        consultaValida(respuesta) {
            if(respuesta == 200) {
                console.log("Valida")
                return true
            }
            return false
        },
        redireccionar(nombreUsuario){
            console.log("Redireccionar")
            this.$router.push({name:'MisDocumentos', params:{usuario:nombreUsuario}})
        }
    }
}
</script>

<style>

</style>
