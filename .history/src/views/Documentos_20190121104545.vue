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
                <b-card no-body class="mb-1" >
                    <b-card-header header-tag="header" class="p-1" role="tab" @click="archivos=null">
                        <b-btn block href="#" v-b-toggle="'accordion-' + documento.id.counter"  variant="info">
                            {{documento.nombre}}
                        </b-btn>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + documento.id.counter" accordion="my-accordion" role="tabpanel" >
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
                                    
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-secondary" v-if="propietario(documento)">Editar</button>
                                </div>
                                <div class="col-sm-2">
                                    <toggle-button :labels="{checked: 'Publico', unchecked: 'Privado'}" @change="cambiarEstadoDocumento(documento)" v-if="propietario(documento)"/>
                                </div>
                            </div>
                        </b-card-body>
                        <div v-if="archivos">
                                    <transition name="modal">
                                        <div class="container">
                                            <div class="card">
                                            <h3 class="card-header text-center font-weight-bold text-uppercase py-4">Editable table</h3>
                                            <div class="card-body">
                                                <mdb-table-editable
                                                :columns="columns"
                                                :rows="rows"
                                                class="text-center"
                                                striped
                                                bordered/>
                                            </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                    </b-collapse>
                </b-card>
            </div>
        </div>

    </div>
</template>


<script>
import Axios from 'axios';
import { mdbTableEditable } from 'mdbvue';

export default {
    name: 'Documentos',
    components: {
        mdbTableEditable
    },
    data(){
        return {
            documentos: null,
            usuario: null,
            misDocumentos: false,
            parametroBusqueda: "",
            estadoSolicitud: null,
            archivos:null,
            archivo:null,
            columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Position',
          field: 'position',
        },
        {
          label: 'Office',
          field: 'office',
        },
        {
          label: 'Age',
          field: 'age',
        },
        {
          label: 'Start date',
          field: 'date',
          sort: 'asc'
        },
        {
          label: 'Salary',
          field: 'salary',
        }
      ],
      rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: '$320'
        },
        {
          name: 'Garrett Winters',
          position: 'Accountant',
          office: 'Tokyo',
          age: '63',
          date: '2011/07/25',
          salary: '$170'
        },
        {
          name: 'Ashton Cox',
          position: 'Junior Technical Author',
          office: 'San Francisco',
          age: '66',
          date: '2009/01/12',
          salary: '$86'
        },
        {
          name: 'Cedric Kelly',
          position: 'Senior Javascript Developer',
          office: 'Edinburgh',
          age: '22',
          date: '2012/03/29',
          salary: '$433'
        }
      ]
    
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
            this.$router.push({name:'crearDocumento'})
        },
        verArchivo(documentoActual){
            this.archivos = documentoActual.archivo
        },
        previsualizarArchivo(archivo)
        {
            let routeData = this.$router.resolve(archivo.url); 
            window.open(routeData.href, '_blank');       
        },
    }
}
</script>

<style>

</style>
