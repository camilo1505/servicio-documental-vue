<template>
  <div id="app">
      <!--CloudTag-->
      <v-layout>
      <v-flex xs12 sm9 offset-sm4>
        <v-card color="#F7EFF6" elevation="20" max-width="auto" max-height="auto">
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
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import Axios from 'axios'

export default {
  name: 'cloud',
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name) {
      Axios
      .get("http://localhost:8080/api/v1/documento/consultarEtiqueta?etiqueta=" + name)
      .then(Response =>(this.documentos = Response.data))
      this.dialog = true
      this.etiqueta = name
      this.transicion = false
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
      dialog:false,
      transicion:true
    }
  },
    mounted(){
      Axios
      .get("http://localhost:8080/api/v1/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    }
}
</script>