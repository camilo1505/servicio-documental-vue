<template>
  <v-layout row justify-center>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      visualizar
    </v-btn>

    <v-dialog
      v-model="dialog"
    >
      <v-card>
        <v-card-title class="headline">{{nombre}}</v-card-title>
        <v-card-text>
          <div class="embed-container" v-if="frame">
            <iframe width="1200" height="1000" :src="archivo.value" frameborder="0" allowfullscreen></iframe>
          </div>
          <form>
            <v-btn
            dark
            color="primary"
              @click="descargar()"
              >
              Descargar
            </v-btn>

          </form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  import Axios from 'axios';
  export default {
    props: {
        url:null,
        nombre:null
    },
    data () {
      return {
        archivo:'',
        dialog: false,
        extension:"",
        frame:false
      }
    },
    mounted(){
    
    const type = this.url.split(".");
      this.extension = type[1];
      if(this.extension=="pdf" || this.extension=="png" || this.extension=="jpg"){
        this.frame=true;
      }
      this.archivo = Axios.get(this.url).then(function (response) {
        // handle success
        //console.log(response.request.responseURL);
        //return response.request.responseURL;
        return  response.data;
      });
      console.log(this.archivo);

    },
    methods:{
      descargar(){
        window.location.href=this.archivo.value;
      }
    }
    
  }
</script>
<style>
.embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}
.embed-container iframe {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
