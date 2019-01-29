<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details @submit="buscarDocumentos()"></v-text-field>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['docs'],
    data() {
        return {
            documentos: null,
            busqueda: null
        }
    },
    methods: {
        buscarDocumentos() {

        }
    }
}
</script>