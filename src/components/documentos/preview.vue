<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          visualizar
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{nombre}}
        </v-card-title>

        <v-card-text>
        <iframe :src="url" width="1200" height="800">
          <p>No se puede mostrar el archivo</p>
        </iframe>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 
<script>
  export default {
    props: {
        url:null,
        nombre:null
    },
    data () {
      return {
        archivo:"",
        dialog: false
      }
    }
  }
</script>