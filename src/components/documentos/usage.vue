<template>
  <div id="app">
    <v-app>
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
      <v-toolbar flat color="white" extended>
        <v-toolbar-title slot="extension">Documentos</v-toolbar-title>
        <v-divider slot="extension" class="mx-2" inset vertical> </v-divider>
        <!-- Nuevo Documento -->
        <nuevo-documento slot="extension" :mis-documentos="tipoConsulta"></nuevo-documento>
        <v-divider slot="extension" class="mx-2" inset vertical> </v-divider>
        <!--Mis Documentos-->
        <mis-documentos slot="extension" @misDocs="documentos = $event" @tipoCons="tipoConsulta = $event"></mis-documentos>
        <v-spacer slot="extension" ></v-spacer>
        <!-- Buscar Documento -->
        <buscar-documentos slot="extension" @cambioMensage="documentos = $event" :switchMios="tipoConsulta"></buscar-documentos>
        <v-spacer></v-spacer>
        <v-btn @click="salirSesion()" dark>
          <v-icon dark left>power_settings_new</v-icon>Salir de la sesion
        </v-btn>
      </v-toolbar>
      <!--Etiqueta seleccionada-->
      <div>
        <p v-if="etiqueta">Etiqueta Seleccionada: <v-chip dark primary><v-icon left>label</v-icon>{{etiqueta}} <v-icon right small dark v-if="etiqueta" @click="showEtiqueta()" >close</v-icon> </v-chip>   </p>
      </div>
      <!--Tabla con los documentos-->
      <v-layout row wrap>
        <v-flex xs7>
          <tabla @cambioDocumentos="documentos = $event" :shareDocs = "documentos"></tabla>
        </v-flex>
        <v-flex xs5>
          <cloud-tag @updateDocumentos="documentos = $event" @updateEtiqueta="etiqueta = $event"></cloud-tag>
        </v-flex>
      </v-layout>
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
import cloudTag from './cloudTag.vue';
  export default {
    components: {
      NuevoDocumento,
      BuscarDocumentos,
      Tabla,
      MisDocumentos,
      cloudTag
    },
    data() {
      return {
        documentos: null,
        error: null,
        tipoConsulta: false,
        respuesta: null,
        etiqueta: null
      }
    },
    created() {
      this.inicializar();
    },
    methods: {
      inicializar() {
        Axios
        .get("http://localhost:8080/documento/documentos?usuario=" + localStorage.user)
        .then(Response =>(this.documentos = Response.data))
        if(localStorage.user) {
          this.usuario = localStorage.user;
        }
        else {
          this.$router.push({name:'login'})
        }
      },
      salirSesion(){
          localStorage.user = "";
          this.usuario = "";
          this.$router.push({name:'login'})
      },
      redirigir() {
            this.$router.push({name:'cloud'})
      },
      showEtiqueta() {
        this.etiqueta = null
        this.inicializar()
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
