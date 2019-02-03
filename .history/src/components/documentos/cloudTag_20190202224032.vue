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
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import Axios from 'axios'

export default {
  name: 'app',
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);
    }
  },
  data() {
    return {
      myColors: ['#1f77b4', '#EC4CAD', '#629fc9', '#EC4C4C', '#94bedb', '#138025' ,'#c9e0ef'],
      etiquetas:[],
    }
  },
    mounted(){
      Axios
      .get("http://localhost:8080/api/v1/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    }
}
</script>