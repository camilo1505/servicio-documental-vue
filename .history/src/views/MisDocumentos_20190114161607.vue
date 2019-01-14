<template>
    <div v-if="documentos">
        <div>
            <h1>Mis Documentos : {{$route.params.usuario}}</h1> 
        </div>
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
                <tr v-for="documento in documentos" :key="documento.nombre">
                    <td scope="row">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                    </td>
                    <td> {{ documento.nombre }} </td>
                    <td> {{ documento.descripcion }} </td>
                    <td> {{ documento.estado }} </td>
                    <td>
                        <button @click="verArchivos(documento),showModal=true" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                    </td>
                    <td>
                        <button class="btn btn-secondary btn-sm" type="button"><i class="fa fa-cogs" aria-hidden="true"></i> Editar</button>
                    </td>
                    <td>
                        <button @click="deleteDocumento(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="archivos">
            {{archivos}}
            <script type="text/x-template" id="modal-template" hidden="true">
            <transition name="modal">
                <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                        default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        default footer
                        <button class="modal-default-button" @click="$emit('close')">
                            OK
                        </button>
                        </slot>
                    </div>
                    </div>
                </div>
                </div>
            </transition>
            </script>

            <!-- app -->
            <div id="app">
            <button id="show-modal" @click="showModal = true">Show Modal</button>
            <!-- use the modal component, pass in the prop -->
            <modal v-if="showModal" @close="showModal = false">
                <!--
                you can use custom content here to overwrite
                default content
                -->
                <h3 slot="header">custom header</h3>
            </modal>
            </div>
        </div>
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
            usuario: this.$route.params.usuario,
            documentos: null,
            respuesta: null,
            archivos: null,
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/misDocumentos?autor=" + this.usuario)
        .then(Response => (this.documentos = Response.data))
    },
    methods: {
        deleteDocumento(documento) {
            axios
            .delete("http://localhost:8080/api/v1/documento/eliminarDocumento", documento)
            .then(Response => (this.respuesta = Response.data))
        },
        verArchivos(documento) {
            this.archivos = documento.archivo
        },
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
  width: 300px;
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

</style>