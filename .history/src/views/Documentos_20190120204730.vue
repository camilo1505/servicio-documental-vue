<template>
    <div class="jumbotron">
        <h1>Buscar Documentos</h1>
        <br>
        <form>
            <div class="row">
                <div class="col-sm-3">
                    <input type="text" class="form-control" placeholder="Buscar en Documentos">
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary" @click="buscarDocumentos()">Buscar</button>
                </div>
                <div class="col-sm-2">
                    <toggle-button :labels="{checked: 'Mios', unchecked: 'Todos'}" @change="cambioBusqueda()"/>
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
                                <div class="col-sm-3">
                                    <h3>Autor:</h3>
                                    <h4>{{documento.autor}}</h4>
                                </div>
                                <div class="col-sm-3">
                                    <h3>Etiquetas: </h3>
                                    {{documento.etiquetas}}
                                </div>
                                <div class="col-sm-3">
                                    <h3>{{misDocumentos}}</h3>
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
            misDocumentos: false
        }
    },
    mounted() {
        Axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=&etiquetas=")
        .then(Response => (this.documentos = Response.data))

        if(localStorage.user) {
            this.usuario = localStorage.user;
        }
    },
    methods: {
        buscarDocumentos() {
            if(this.misDocumentos) {
                Axios
                .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor="+ this.usuario +"&etiquetas=")
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
        }
    }
}
</script>

<style>

</style>
