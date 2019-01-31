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
        <v-divider class="mx-2" inset vertical> </v-divider>
        <!--Mis Documentos-->
        <mis-documentos @cambioDocumentos="documentos = $event"></mis-documentos>
        <v-spacer></v-spacer>
        <!-- Buscar Documento -->
        <buscar-documentos @cambioMensage="documentos = $event" :shareDocs = "documentos"></buscar-documentos>
      </v-toolbar>
      <!--Tabla con los documentos-->
      <tabla @cambioDocumentos="documentos = $event" :shareDocs = "documentos"></tabla>
    </v-app>
  </div>
</template>

<script>
import Axios from 'axios';
import NuevoDocumento from './nuevoDocumento.vue';
import BuscarDocumentos from './BuscarDocumentos.vue';
import Tabla from './Tabla.vue';
import MisDocumentos from './misDocumentos.vue'
  export default {
    components: {
      NuevoDocumento,
      BuscarDocumentos,
      Tabla,
      MisDocumentos
    },
    data() {
      return {
        documentos: null,
        error: null
      }
    },
    created() {
      this.inicializar();
    },
    methods: {
      inicializar() {
        Axios
        .get("http://localhost:8080/api/v1/documento/documentos?usuario=" + localStorage.user)
        .then(Response =>(this.documentos = Response.data))
        if(localStorage.user) {
          this.usuario = localStorage.user;
        }
        else {
          this.$router.push({name:'login'})
        }
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
