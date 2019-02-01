<template>
  <v-layout>
    <v-btn 
        flat small 
        @click="dialog=true"
        ><v-icon  small="" > visibility </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="auto"
    >
      <v-card>
        <v-card-title class="headline">Archivos en este documento</v-card-title>

        <v-card-text>
          <table>
              <thead>
                  <th>Nombre del archivo</th>
                  <th>Descripcion Automatica</th>
              </thead>
          </table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
data () {
      return {
        dialog: false
      }
    }
}
</script>

<style>

</style>
