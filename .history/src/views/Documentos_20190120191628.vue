<template>
    <div class="jumbotron">
        
        <form>
            <div class="row">
                <div class="col-sm-3">
                    <input type="text" class="form-control" placeholder="Buscar en Documentos">
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary">Buscar</button>
                </div>
                <div class="col-sm-2">
                    <input class="form-check-input" type="checkbox" value="" id="misDocumentos">
                    <label class="form-check-label" for="misDocumentos"> Mis Documentos </label>
                </div>
            </div>
        </form>
        
        <br>

        <div role="tablist">
            <div v-for="documento in documentos" :key="documento.id.counter">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle="'accordion-' + documento.id.counter" variant="info">
                            {{documento.nobre}}
                        </b-btn>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + documento.id.counter" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <p class="card-text">
                                {{documento.nobre}}
                            </p>
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
        }
    },
    mounted() {
        Axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=&etiquetas=")
        .then(Response => (this.documentos = Response.data))
    },
    methods: {
        getDocumentos() {
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?nombreDocumento=&autor=&etiquetas=")
            .then(Response => (this.documentos = Response.data))
        }
    }
}
</script>

<style>

</style>
