<template>
    <div class="container">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
            <div class="jumbotron">
                <h3>Iniciar Sesion</h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Usuario" v-model="nombreUsuario">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Contraseña" v-model="password">
                </div>
                <button class="btn btn-primary form-control" @click="consultarUsuario(nombreUsuario, password)">Entrar</button>
                <h1 v-if="respuesta">{{respuesta}}</h1>
            </div>
        </div>
        <div class="col-lg-4"></div>
    </div>
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
            console.log("pasando la solicitud");
            if(this.respuesta === '200') {
                console.log("Login exitoso")
            }
        }

    }
}
</script>

<style>

</style>
