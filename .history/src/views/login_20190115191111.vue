<template>
    <div class="container">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
            <div class="jumbotron">
                <h3>Iniciar Sesion</h3>
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Usuario">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Contraseña">
                    </div>
                    <button type="submit" class="btn btn-primary form-control">Entrar</button>
                </form>
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
