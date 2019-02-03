<template>
  <div id="app">
      <wordcloud
      :data="etiquetas"
      nameKey="id"
      valueKey="value"
      :color="myColors"
      :showTooltip="true"
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
  name: 'app',
  components: {
    Tabla,
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
      Axios
      .get("http://localhost:8080/api/v1/documento/consultarEtiqueta?etiqueta=" + name)
      .then(Response =>(this.documentos = Response.data))

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