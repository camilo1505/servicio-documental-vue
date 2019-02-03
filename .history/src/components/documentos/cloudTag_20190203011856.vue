<template>
  <div id="app">
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
      <v-toolbar flat color="white">
        <!--CloudTag-->
        <v-btn color="primary" dark class="mb-2" @click="redirigir()">Pagina de inicio</v-btn>
        <v-divider class="mx-2" inset vertical> </v-divider>
      </v-toolbar>
      <wordcloud
      :data="etiquetas"
      nameKey="id"
      valueKey="value"
      :color="myColors"
      :showTooltip="false"
      :wordClick="wordClickHandler">
      </wordcloud>
      <tabla @cambioDocumentos="documentos = $event" :shareDocs = "documentos"></tabla>
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
    },
    redirigir() {
            this.$router.push({name:'tabla'})
      }
  },
  data() {
    return {
      myColors: ['#1f77b4', '#EC4CAD', '#0017FF', '#629fc9', '#E8FF00','#EC4C4C', '#94bedb', '#138025' ,'#c9e0ef', '#FFA200' , '#FF00D4', '#0A0109'],
      etiquetas:[],
      documentos: null
    }
  },
    mounted(){
      Axios
      .get("http://localhost:8080/api/v1/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    }
}
</script>