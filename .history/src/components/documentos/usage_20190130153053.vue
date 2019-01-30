<template>
  <div id="app">
    <v-app>
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
      <v-toolbar flat color="white">
        <v-toolbar-title>Documentos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical> </v-divider>
        <!-- Nuevo Documento -->
        <nuevo-documento></nuevo-documento>
        <v-spacer></v-spacer>
        <!-- Buscar Documento -->
        <buscar-documentos @cambioMensage="documentos = $event"></buscar-documentos>
      </v-toolbar>
      <!--Tabla con los documentos-->
      <tabla></tabla>
    </v-app>
  </div>
</template>

<script>
import Axios from 'axios';
import NuevoDocumento from './nuevoDocumento.vue';
import BuscarDocumentos from './BuscarDocumentos.vue';
import Tabla from './Tabla.vue';
  export default {
    components: {
      NuevoDocumento,
      BuscarDocumentos,
      Tabla
    },
    data() {
      return {
        documentos: null,
        error: null
      }
    },
    methods: {
      inicializar() {
        Axios
        .get("http://localhost:8080/api/v1/documento/documentos?usuario=" + localStorage.user)
        .then(Response =>(this.documentos = Response.data))
        .catch(Response => (this.error = Response.error))
      }
    }
  }
</script>
<style>
.publico{
  background-color: beige;
}
.privado{
  background-color: lightcyan;
}
.text-to-left{
  text-align: left;
}
</style>
