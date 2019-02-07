<template>
      <!--CloudTag-->
        <v-card color="withe" elevation="0" max-width="auto" max-height="auto">
          <v-card-title primary-title>
              <h3 class="headline">Consulta por etiquetas, solo dale click a una!</h3>

          </v-card-title>
          <wordcloud
          :data="etiquetas"
          nameKey="id"
          valueKey="value"
          :color="myColors"
          :showTooltip="false"
          :wordClick="wordClickHandler">
          </wordcloud>
          <p v-if="documentos">{{enviarDocumentos()}}</p>
          <p v-if="etiqueta">{{enviarEtiqueta()}}</p>
        </v-card>
</template>

<script>
import wordcloud from 'vue-wordcloud'
import Axios from 'axios'

export default {
  name: 'cloud',
  components: {
    wordcloud
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
      .get("http://localhost:8080/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    },
    methods: {
    wordClickHandler(name) {
      Axios
      .get("http://localhost:8080/documento/consultarEtiqueta?etiqueta=" + name+"&usuario="+localStorage.user)
      .then(Response =>(this.documentos = Response.data ) )
      
      this.dialog = true
      this.etiqueta = name
      this.transicion = false
    },
    redirigir() {
      this.$router.push({name:'tabla'})
    },
    enviarDocumentos() {
      this.$emit('updateDocumentos',this.documentos)
    },
    enviarEtiqueta() {
      console.log(this.etiqueta)
      this.$emit('updateEtiqueta', this.etiqueta)
    }
  },
}
</script>