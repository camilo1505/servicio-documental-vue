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
                <div class="col">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1"> Mis Documentos </label>
                </div>
            </div>
        </form>

        <div role="tablist">
            <div v-for="id in [1,2,3,4,5]" :key="id">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle="'accordion-' + id" variant="info">Accordion {{id}}</b-btn>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + id" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <p class="card-text">
                                prueba {{id}}
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
    }
}
</script>

<style>

</style>
