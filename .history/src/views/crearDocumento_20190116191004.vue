<template>
    <div class="container">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
            <div class="jumbotron">
                <h3>Crear Documento</h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Nombre Documento" v-model="documentoDTO.nombre">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Autor" v-model="documentoDTO.autor">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Descripcion" v-model="documentoDTO.descripcion">
                </div>
                <button class="btn btn-primary form-control" @click="consultarUsuario(nombreUsuario, password)">Login</button>
            </div>
            <button v-if="consultaValida(respuesta)" type="button" class="btn btn-success" @click="redireccionar(nombreUsuario)">Acceder</button>
        </div>
        <div class="col-lg-4"></div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'CrearDocumento',
    data() {
        return {
            documentoDTO: {
                nombre: null,
                etiquetas: [],
                descripcion: null,
                estado: null,
                archivos: null,
                autor: null
            },
            respuesta: null
        }
    },
    mounted() {
        this.documentoDTO.autor = this.$route.params.usuario
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
