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
           <v-data-table
        :headers="headers"
        :items="documentos.archivo"
        class="elevation-1"
        item-key="id.counter"
        
        >
        <template slot="items" slot-scope="props">
            
            <td> {{ props.item.archivo.nombreArchivo}}</td>
            <td>{{ props.item.descr }}</td>

            <td class="text-xs-left">
            <v-btn flat small v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            </td>
        </template>
        </v-data-table>
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
    <p v-if="shareDocs != null">{{initialize()}}</p>
        <p>{{actualizarDocumentos()}}</p>
        <p v-if="estadoSolicitud == 200"> {{manejadorRespuestas()}} </p>
  </v-layout>
</template>

<script>
export default {
    props: ['shareDocs'],
    data () {
        return {
            dialog: false,
            headers: [
                    { text: 'Nombre del Archivo', value: 'Nombre del Archivo', sortable: false },
                    { text: 'Descripcion', value: 'Descripcion', sortable: false },
                    { text: 'Actions', align: 'center', value: 'name', sortable: false }
                ],
            documentos:{
                nombre:""
            },
            usuario: null,
            estadoSolicitud: null
            }
        },
        methods: {
            initialize(){
                this.documentos = this.shareDocs
                if(localStorage.user) {
                    this.usuario = localStorage.user;
                }
                else {
                    this.usuario = "";
                }
                
            console.log(this.documentos.nombre)
            },
        actualizarDocumentos() {
            this.$emit('cambioDocumentos', this.documentos);
        },
        }
}
</script>

<style>

</style>
