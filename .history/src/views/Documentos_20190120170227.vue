<template>
    <div class="jumbotron">
        <div role="tablelist">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion1 variant="info">Accordion 1</b-btn>
                </b-card-header>
                <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">Prueba de contenido</p>
                    </b-card-body>
                </b-collapse>
            </b-card>

             <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-btn block href="#" v-b-toggle.accordion1 variant="info">Accordion 2</b-btn>
                </b-card-header>
                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <p class="card-text">Prueba de contenido2</p>
                    </b-card-body>
                </b-collapse>
            </b-card>
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
