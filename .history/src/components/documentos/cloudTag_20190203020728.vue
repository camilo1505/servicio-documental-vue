<template>
  <div id="app">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <v-toolbar flat color="white">
      <v-toolbar-title>Busqueda por Etiquetas</v-toolbar-title>
      <v-divider class="mx-2" inset vertical> </v-divider>
      <!--CloudTag-->
      <v-btn color="primary" dark class="mb-2" @click="redirigir()">Pagina de inicio</v-btn>        
    </v-toolbar>
    <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card color="#F7EFF6" elevation="2" max-width="auto" max-height="auto">
        <v-card-title primary-title>
          <div>
            <h3 class="headline">Selecciona una etiqueta!</h3>
            <div>Busca en la tabla de abajo los resultados</div>
          </div>
        </v-card-title>
        <wordcloud
        :data="etiquetas"
        nameKey="id"
        valueKey="value"
        :color="myColors"
        :showTooltip="false"
        :wordClick="wordClickHandler">
        </wordcloud>
      </v-card>
    </v-flex>
  </v-layout>
  <div class="text-xs-center">
    <v-dialog  
    v-model="dialog"
    max-width="auto">
    <v-card>
      <v-card-title class="headline">Archivos de la etiqueta "{{etiqueta}}"</v-card-title>
        <v-card-text>
          <tabla @cambioDocumentos="documentos = $event" :shareDocs = "documentos"></tabla>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="dialog = false"
        >
        cerrar
        </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
      
  </div>
    </div>
  
</template>

<script>
import wordcloud from 'vue-wordcloud'
import Axios from 'axios'
import Tabla from './Tabla.vue';

export default {
  name: 'cloud',
  components: {
    Tabla,
    wordcloud
  },
  methods: {
    wordClickHandler(name) {
      Axios
      .get("http://localhost:8080/api/v1/documento/consultarEtiqueta?etiqueta=" + name)
      .then(Response =>(this.documentos = Response.data))
      this.dialog = true
      this.etiqueta = name
    },
    redirigir() {
      this.$router.push({name:'tabla'})
    }
  },
  data() {
    return {
      myColors: ['#1f77b4', '#EC4CAD', '#0017FF', '#629fc9', '#E8FF00','#EC4C4C', '#94bedb', '#138025' ,'#c9e0ef', '#FFA200' , '#FF00D4', '#0A0109'],
      etiquetas:[],
      tipoConsulta: false,
      documentos: null,
      etiqueta:"hola",
      dialog:false
    }
  },
    mounted(){
      Axios
      .get("http://localhost:8080/api/v1/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    }
}
</script>