<template>
    <div class="jumbotron">
        <h1>Buscar Documentos</h1>
        <br>
        <form>
            <div class="row">
                <div class="col-sm-3">
                    <input type="text" class="form-control" placeholder="Buscar en Documentos" v-model="parametroBusqueda">
                </div>
                <div class="col-sm-1">
                    <toggle-button :labels="{checked: 'Mios', unchecked: 'Todos'}" @change="cambioBusqueda()"/>
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-primary" @click="buscarDocumentos()">Buscar</button>
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-primary" @click="nuevoDocumento()">Nuevo Documento</button>
                </div>
            </div>
        </form>
        
        <br>

        <div role="tablist">
            <div v-for="documento in documentos" :key="documento.id.counter">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle="'accordion-' + documento.id.counter" variant="info">
                            {{documento.nombre}}
                        </b-btn>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + documento.id.counter" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <div class="row">
                                <div class="col-sm-2">
                                    <h3>Autor:</h3>
                                    <h4>{{documento.usuario}}</h4>
                                </div>
                                <div class="col-sm-4">
                                    <h3>Etiquetas: </h3>
                                    {{documento.etiquetas}}
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-secondary" @click="verArchivo(documento)" >Archivos</button>
                                </div>
                                    <div v-if="archivos">
                                    <transition name="modal">
                                    <div class="modal-mask">
                                        <div class="modal-wrapper">
                                            <div class="modal-container">
                                                <div class="modal-header">
                                                    <slot name="header">
                                                    Archivos del documento
                                                    </slot>
                                                </div>
                                                <div class="modal-body">
                                                    <slot name="body">
                                                        <table v-if="archivos" class="table table-hover">
                                                        <thead class="thead-light">
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">Nombre Archivo</th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="archivo in archivos" :key="archivo.nombreArchivo">
                                                                <td scope="row">
                                                                    <i class="fa fa-folder" aria-hidden="true"></i>
                                                                </td>
                                                                <td> {{ archivo.nombreArchivo }} </td>
                                                                <td>
                                                                    <button class="btn btn-secondary btn-sm" @click="previsualizarArchivo(), archivo=archivo" type="button"> Ver Archivo</button>
                                                                </td>
                                                                <td>
                                                                    <button class="btn btn-secondary btn-sm" type="button"> Editar Nombre</button>
                                                                </td>
                                                                <td>
                                                                    <button class="btn btn-secondary btn-sm"  type="button"> Borrar </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>                
                                                    </slot>
                                                </div>
                                                <div class="modal-footer">
                                                    <slot name="footer">
                                                    <button class="modal-default-button" @click="archivos=null">
                                                        OK
                                                    </button>
                                                    </slot>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </transition>
                                </div>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-secondary" v-if="propietario(documento)">Editar</button>
                                </div>
                                <div class="col-sm-2">
                                    <toggle-button :labels="{checked: 'Publico', unchecked: 'Privado'}" @change="cambiarEstadoDocumento(documento)" v-if="propietario(documento)"/>
                                </div>
                            </div>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
        </div>

    </div>
</template>


<script>
import Axios from 'axios';
export default {
    name: 'Documentos',
    data(){
        return {
            documentos: null,
            usuario: null,
            misDocumentos: false,
            parametroBusqueda: "",
            estadoSolicitud: null,
            archivos:null,
            archivo:null
        }
    },
    mounted() {
        Axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
        .then(Response => (this.documentos = Response.data))

        if(localStorage.user) {
            this.usuario = localStorage.user;
        }
        else {
            this.usuario = "";
        }
    },
    methods: {
        buscarDocumentos() {
            if(this.misDocumentos) {
                Axios
                .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=" + this.usuario)
                .then(Response => (this.documentos = Response.data))
            }
            else {
                Axios
                .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=" + this.parametroBusqueda)
                .then(Response => (this.documentos = Response.data))
            }
        },
        cambioBusqueda() {
            if(this.misDocumentos) {
                this.misDocumentos = false;
            }
            else {
                this.misDocumentos = true;
            }
        },
        propietario(documento) {
            if(documento.usuario == this.usuario) {
                return true;
            }
            else {
                return false;
            }
        },
        cambiarEstadoDocumento(documento) {
            var documentoActual = documento;
            this.cambiarEstado(documentoActual)
            Axios
            .put("http://localhost:8080/api/v1/documento/editarDocumento", documentoActual)
            .then(Response => (this.estadoSolicitud = Response.status))
            this.buscarDocumentos()
        },
        cambiarEstado(documentoActual) {
            if(documentoActual.estado) {
                documentoActual.estado = false;
            }
            else {
                documentoActual.estado = true;
            }
        },
        nuevoDocumento() {
            this.$router.push({name:'crearDocumento', params:{user:this.usuario}})
        },
        verArchivo(documentoActual){
            this.archivos = documentoActual.archivo
        },
        previsualizarArchivo(archivo){
            window.open(this.archivo.URL, '_blank')

        }
    }
}
</script>

<style>

</style>
