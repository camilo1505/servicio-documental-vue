
<template>
<!-- Card -->
<div class="card mx-xl-5">

  <!-- Card body -->
  <div class="card-body">

      <!-- Default form subscription -->
      <form>
          <p class="h4 text-center py-4">Subscribe</p>

          <!-- Default input name -->
          <label for="defaultFormCardNameEx" class="grey-text font-weight-light">Your name</label>
          <input type="text" id="defaultFormCardNameEx" class="form-control">

          <br>

          <!-- Default input email -->
          <label for="defaultFormCardEmailEx" class="grey-text font-weight-light">Your email</label>
          <input type="email" id="defaultFormCardEmailEx" class="form-control">

          <div class="text-center py-4 mt-3">
              <button class="btn btn-outline-purple" type="submit">Send<i class="fa fa-paper-plane-o ml-2"></i></button>
          </div>
      </form>
      <!-- Default form subscription -->

  </div>
  <!-- Card body -->

</div>
<!-- Card -->
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
