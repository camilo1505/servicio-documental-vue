<template>
    <div>
        <link href='https://fonts.googleapis.com/css?family=Material+Icons' rel="stylesheet" type="text/css">
        <!-- Titulo de la vista de documentos toolbar con barra de busqueda -->
        <v-toolbar flat color="white">
            <v-toolbar-title> Documentos </v-toolbar-title>
            <!-- Pequeño divisor para el titulo de la vista, tamaño mx-2 -->
            <v-divider class="mx-2" inset vertical> </v-divider>
            <!-- Espacio en blanco -->
            <v-spacer></v-spacer>
            <!-- componente de Busqueda cambia los documentos a traves del $event -->
            <buscar-documentos @cambioMensage="documentos = $event"></buscar-documentos>
        </v-toolbar>
        <!-- Componente para crear nuevo documento, se abre en un dialogo -->
        <nuevo-documento></nuevo-documento>
        
        <v-data-table :headers="headers" :items="documentos" class="elevation-1" hide-actions item-key="id.counter"> </v-data-table>
    </div>
</template>


<script>
import Axios from 'axios'
import NuevoDocumento from './nuevoDocumento.vue'
import BuscarDocumentos from './BuscarDocumentos.vue'

export default {
    name: 'tabla',
    components: {
        NuevoDocumento,
        BuscarDocumentos
    },
    data() {
        return {
            documentos: null,
            usuario: null,
            dialogo: false
        }
    },
    methods: {
        initialize() {
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
            .then(Response => (this.documentos = Response.data));
            if(localStorage.user) {
                this.usuario = localStorage.user;
            }
            else {
                this.$router.push({name:'login'})
            }
        },
    }
}
</script>