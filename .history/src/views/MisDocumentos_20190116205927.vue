<template>
    <div v-if="documentos">
        <div><h1>Mis Documentos : {{$route.params.usuario}}</h1></div>
        <button type="button" class="btn btn-success" id="NDocumento" @click="crearDocumento(usuario)">Nuevo Documento</button>
        <button type="button" class="btn btn-success" id="Actualizar" @click="recargarDocumentos()">Actualizar</button>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Estado Documento</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.id.counter">
                    <td scope="row"><i class="fa fa-folder" aria-hidden="true"></i></td>
                    <td> {{ documento.nombre }} </td>
                    <td> <p>{{ documento.descripcion }}</p> </td>
                    <td> {{ documento.estado }} </td>
                    <td><button @click="verArchivos(documento),verDocumento=documento,showModal=true" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button></td>
                    <div v-if="showEditarDocumento">
                        <transition name="EditarDocumento">
                                <div class="modal-mask">
                                    <div class="modal-wrapper">
                                        <div class="modal-container">
                                            <div class="modal-header">
                                                <slot name="header">
                                                Editar un Documento
                                                </slot>
                                            </div>

                                            <div class="modal-body">
                                                <slot name="body">
                                                    <table class="table">
                                                        <tr>
                                                            <td><h4>Nombre del documento</h4></td>
                                                            <td><input class="form-control" v-model="nuevoNombre" type="text" placeholder="nombre del documento" ></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h4>etiquetas</h4></td>
                                                            <td><input class="form-control" v-model="etiquetas" type="text" placeholder="etiquetas" ></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h4>descripcion</h4></td>
                                                            <td><input class="form-control" v-model="descripcion" type="text" placeholder="descripcion" ></td>
                                                        </tr>
                                                        <tr>
                                                            <td><h4>publicar este documento?</h4></td>
                                                            <td><input class="form-control" v-model="estado" type="checkbox" placeholder="Estado del documento" ></td>
                                                        </tr>
                                                    </table>
                                                </slot>
                                            </div>
                                            <div class="modal-footer">
                                                <slot name="footer">
                                                <button class="modal-default-button" @click="showEditarDocumento=false">
                                                    cancelar
                                                </button>
                                                <button class="modal-default-button" @click="guardarDocumentoEditado()">
                                                    guardar
                                                </button>
                                                </slot>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </transition>
                    </div>
                    <td><button @click="editarDocumento(),showEditarDocumento=true,EditarDocumento=documento" class="btn btn-secondary btn-sm" type="button"><i class="fa fa-cogs" aria-hidden="true"></i> Editar</button></td>
                    <div v-if="showBorrarDocumento">
                        <transition name="BorrarDocumento">
                                <div class="modal-mask">
                                    <div class="modal-wrapper">
                                        <div class="modal-container">
                                            <div class="modal-header">
                                                <slot name="header">
                                                Borrar un Documento
                                                </slot>
                                            </div>

                                            <div class="modal-body">
                                                <slot name="body">
                                                    Esta usted seguro de borrar este documento?                
                                                </slot>
                                            </div>
                                            <div class="modal-footer">
                                                <slot name="footer">
                                                <button class="modal-default-button" @click="showBorrarDocumento=false">
                                                    cancelar
                                                </button>
                                                <button class="modal-default-button" @click="Documento()">
                                                    acepto
                                                </button>
                                                </slot>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </transition>
                    </div>
                    <td><button @click="showBorrarDocumento=true,documentoEliminar=documento" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button></td>
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
                                            <table class="table table-hover">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Nombre Archivo</th>
                                                    <th scope="col">Tipo de archivo</th>
                                                    <th scope="col">Url del archivo</th>
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
                                                    <td> {{ archivo.type }} </td>
                                                    <td> {{ archivo.url }} </td>
                                                    <td>
                                                        <button class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-secondary btn-sm" type="button"><i class="fa fa-cogs" aria-hidden="true"></i> Editar</button>
                                                    </td>
                                                    <td>
                                                        <button @click="eliminarArchivo(archivo.url),eliminarArchivo=archivo" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button>
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
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>

import 'mdbvue';
import axios from "axios";

export default {  
    name: 'MisDocumentos',
    data(){
        return {
            showModal: false,
            showBorrarDocumento: false,
            showEditarDocumento: false,
            usuario: this.$route.params.usuario,
            documentos: null,
            respuesta: null,
            documentoEliminar: null,
            documentoEditar: null,
            archivoEliminar: null,
            archivoEditar: null,
            archivos: null,
            verDocumento:null,
            nuevoNombre:null,
            etiquetas:null,
            descripcion:null,
            estado:null

        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/misDocumentos?autor=" + this.usuario)
        .then(Response => (this.documentos = Response.data))
    },
    methods: {
        recargarDocumentos() {
            axios
            .get("http://localhost:8080/api/v1/documento/misDocumentos?autor=" + this.usuario)
            .then(Response => (this.documentos = Response.data))
        },
        deleteDocumento() {
            axios
            .post("http://localhost:8080/api/v1/documento/eliminarDocumento", this.documentoEliminar)
            this.showBorrarDocumento=false
        },
        verArchivos(documento) {
            this.archivos = documento.archivo
        },
        eliminarArchivo(urlArchivo){
            axios
            .post("http://localhost:8080/api/v1/documento/eliminarArchivo?archivo="+urlArchivo,this.verDocumento)
            .then(Response => (this.respuesta = Response.data))
            
        },
        editarDocumento(){
            this.nuevoNombre = this.editarDocumento.nombre
            this.descripcion = this.editarDocumento.descripcion
            this.etiquetas = this.editarDocumento.etiquetas
        },
        guardarDocumentoEditado(){
            this.nuevoNombre = this.editarDocumento.nombre
            this.descripcion = this.editarDocumento.descripcion
            this.etiquetas = this.editarDocumento.etiquetas
              axios
            .put("http://localhost:8080/api/v1/documento/editarDocumento",this.editarDocumento)
            .then(Response => (this.respuesta = Response.data))
        },
        crearDocumento(nombreUsuario){
            this.$router.push({name:'CrearDocumento', params: {usuario: nombreUsuario}})
        }
    },
    
}
</script>

<style>
.folder {
    height: 30px;
    width: 30px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

table td {
  text-align: left;
}

#NDocumento {
    margin-top: 7px;
    position: absolute;
    right: 0px;
}
#Actualizar {
    margin-top: 7px;
    position: absolute;
    right: 150px;
}

td{
    height: auto;
    width: 200px;
}

</style>