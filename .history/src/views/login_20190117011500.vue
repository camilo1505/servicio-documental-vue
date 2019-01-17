
<template>
<section class="form-elegant">
  <mdb-row>
    <mdb-col md="5">
      <mdb-card>
        <mdb-card-body class="mx-4">
          <div class="text-center">
            <h3 class="dark-grey-text mb-5"><strong>Sign in</strong></h3>
          </div>
          <mdb-input label="Your email" type="email"/>
          <mdb-input label="Your password" type="password" containerClass="mb-0"/>
          <p class="font-small blue-text d-flex justify-content-end pb-3">Forgot <a href="#" class="blue-text ml-1"> Password?</a></p>
          <div class="text-center mb-3">
            <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a">Sign in</mdb-btn>
          </div>
          <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
          <div class="row my-3 d-flex justify-content-center">
            <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon icon="facebook" class="blue-text text-center"/></mdb-btn>
            <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon icon="twitter" class="blue-text"/></mdb-btn>
            <mdb-btn type="button" color="white" rounded class="z-depth-1a"><mdb-icon icon="google-plus" class="blue-text"/></mdb-btn>
          </div>
        </mdb-card-body>
        <mdb-modal-footer class="mx-5 pt-3 mb-1">
          <p class="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" class="blue-text ml-1"> Sign Up</a></p>
        </mdb-modal-footer>
      </mdb-card>
    </mdb-col>
  </mdb-row>
</section>
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
.form-elegant .font-small {
font-size: 0.8rem; }

.form-elegant .z-depth-1a {
-webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); }

.form-elegant .z-depth-1-half,
.form-elegant .btn:hover {
-webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); }
</style>
