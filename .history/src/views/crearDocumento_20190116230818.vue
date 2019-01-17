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
                    <textarea class="form-control" rows="5" placeholder="Descripcion" v-model="documentoDTO.descripcion"></textarea>
                </div>
                <div class="form-group" v-if="documentoDTO.etiquetas">
                    <div class="row">
                        <div v-for="eti in documentoDTO.etiquetas" :key="eti.id">
                            <div class="col-sm">
                                <span class="badge badge-primary">{{eti}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-5">
                            <input type="text" class="form-control" placeholder="Etiqueta" v-model="etiqueta">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn btn-success" @click="addEtiqueta(etiqueta)">Añadir</button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="radio" id="borrador" value="borrador" name="estado" v-model="documentoDTO.estado">
                    <label for="borrador">Borrador</label>
                    <input type="radio" id="publicado" value="publicado" name="estado" v-model="documentoDTO.estado">
                    <label for="publicado">Publicado</label>
                </div>
                <div class="row">
                        <div class="col-sm-5">
                            <button class="btn btn-primary form-control" @click="crearDocumento(documentoDTO)">Guardar</button>
                        </div>
                        <div class="col-sm-5">
                            <button class="btn btn-warning form-control" @click="redireccionar()">Cancelar</button>
                        </div>
                    </div>
            </div>
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
            etiqueta: null,
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
            this.redireccionar()
        },
        addEtiqueta(etiqueta) {
            this.documentoDTO.etiquetas.push(etiqueta)
            this.etiqueta = null
        },
        redireccionar() {
            this.$router.push({name:'MisDocumentos', params:{usuario:this.documentoDTO.autor}})
        }
    }
}
</script>

<style>
.container  {
    margin-top: 0px;
    margin-left: 900px;
}
#publicado {
    margin-left: 3px;
}
</style>
