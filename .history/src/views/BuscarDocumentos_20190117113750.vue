<template>
    <div v-if="documentos">
        <div>
            <h1>Documentos</h1> 
        </div>
        <form>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Nombre Documento" v-model="nombreDocumento">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Autor" v-model="autor">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Tags: fisica,ingles,tesis,..." v-model="etiquetas">
                </div>
                <div class="col">
                    <button @click="filtrarDocumentos(nombreDocumento,autor,etiquetas)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-search" aria-hidden="true"></i> Buscar</button>
                </div>
            </div>
        </form>
        <br>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Nombre Documento</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Etiquetas</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="documento in documentos" :key="documento.id.machineidentifier">
                    <td scope="row">
                        <i class="fa fa-folder" aria-hidden="true"></i>
                    </td>
                    <td> {{ documento.nombre }} </td>
                    <td> {{ documento.autor }} </td>
                    <td> {{ documento.descripcion }} </td>
                    <td> {{ documento.etiquetas }} </td>
                    <td>
                        <button @click="verArchivos(documento)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-archive" aria-hidden="true"></i> Ver Archivos</button>
                    </td>

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
                                                        <button @click="eliminarArchivo(documento,archivo.url)" class="btn btn-secondary btn-sm"  type="button"><i class="fa fa-trash" aria-hidden="true"></i> Borrar </button>
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
        <div v-if="archivos">
            {{archivos}}
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'BuscarDocumento',
    data(){
        return {
            documentos: null,
            archivos: null,
            nombreDocumento : "",
			autor: "",
			etiquetas: ""
        }
    },
    mounted(){
        axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=&etiquetas=")
        .then(response => (this.documentos = response.data))
    },
    
    methods: {
        filtrarDocumentos: function(nombreDocumento,autor,etiquetas){
            axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento="+nombreDocumento+"&autor="+autor+"&etiquetas="+etiquetas)
            .then(response => (this.documentos = response.data))
        },
        verArchivos(documento) {
            this.archivos = documento.archivo
        },
    }
}
</script>


<style>
.celdaNombre {
    word-wrap: break-word;
    max-width:200px; 
    width:200px;
    text-align: justify;
}
.celdaDescripcion {
    word-wrap: break-word;
    max-width:200px; 
    width:200px;
    text-align: justify;
}
.celdaEstado {
    word-wrap: break-word;
    max-width:150px; 
    width:200px;
    text-align: center;
}
</style>
