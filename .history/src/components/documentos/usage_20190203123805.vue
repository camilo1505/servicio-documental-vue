<template>
  <div id="app">
    <v-app>
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
      <v-toolbar flat color="white" extended>
        <v-toolbar-title slot="extension" class="white--text">Title</v-toolbar-title>
        <v-toolbar-title>Documentos</v-toolbar-title>
        <v-divider class="mx-2" inset vertical> </v-divider>
        <!-- Nuevo Documento -->
        <nuevo-documento></nuevo-documento>
        <v-divider class="mx-2" inset vertical> </v-divider>
        <!--CloudTag-->
        <v-btn color="warning" dark class="mb-2" @click="redirigir()">Busqueda por etiqueta</v-btn>
        <v-divider class="mx-2" inset vertical> </v-divider>
        <!--Mis Documentos-->
        <mis-documentos @misDocs="documentos = $event" @tipoCons="tipoConsulta = $event"></mis-documentos>
        <v-spacer></v-spacer>
        <!-- Buscar Documento -->
        <buscar-documentos @cambioMensage="documentos = $event" :shareDocs = "documentos" :tipoCons = "tipoConsulta"></buscar-documentos>
           <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
      </v-toolbar>
      <!--Tabla con los documentos-->
      <tabla @cambioDocumentos="documentos = $event" :shareDocs = "documentos"></tabla>
      <p v-if="respuesta == 200">{{redirigir()}}</p>
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
        error: null,
        tipoConsulta: false,
        respuesta: null
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
      },
      redirigir() {
            this.$router.push({name:'cloud'})
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
