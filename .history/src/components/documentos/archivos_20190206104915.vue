<template>
<div>
  <v-icon small class="mr-3" @click="activador=true">visibility</v-icon>
  <v-layout>
    <v-dialog
      v-model="activador"
      max-width="auto"
    >
      <v-card>
        <v-card-title class="headline">Archivos en "{{shareName}}"</v-card-title>

        <v-card-text>
           <v-data-table
        :headers="headers"
        :items="archivos"
        class="elevation-1"
        item-key="id.counter"
        
        >
        <template slot="items" slot-scope="props">
            
            <td> {{ props.item.nombreArchivo}}</td>
            <td>{{ props.item.textoCompleto }}</td>
            <td>
                <a :href="props.item.url">Descargar</a>
            </td>

            <td class="text-xs-left">
                <v-btn flat small v-if="shareUser === usuario" @click="eliminarArchivo(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            </td>
        </template>
        </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="activador=false"> cerrar </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
        <p v-if="shareDoc != null">{{initialize()}}</p>
        <p>{{actualizarDocumentos()}}</p>
        <p v-if="estadoSolicitud == 200"> {{manejadorRespuestas()}} </p>
  </v-layout>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
</div>
</template>

<script>
import Axios from 'axios';
export default {
    props: {
        shareDoc,
        shareName
    },
    data () {
        return {
            headers: [
                    { text: 'Nombre del Archivo', value: 'Nombre del Archivo', sortable: false },
                    { text: 'Descripcion', value: 'Descripcion', sortable: false },
                    { text: 'URL', value: 'URL', sortable: false },
                    { text: 'Actions', align: 'center', value: 'name', sortable: false }
                ],
            activador:false,
            archivos:[],
            usuario: null,
            estadoSolicitud: null,
            snack: false,
            snackColor: '',
            snackText: '',     
        }
    },
        methods: {
            initialize(){
                this.archivos = this.shareDoc
                if(localStorage.user) {
                    this.usuario = localStorage.user;
                }
                else {
                    this.$router.push({name:'login'})
                }
                this.activador=this.dialog
                
            },
            actualizarDocumentos() {
                this.$emit('cambioDocumentos', this.archivos);
            },
            borrar(archivo) {
                Axios
                .put("http://localhost:8080/documento/eliminarArchivo?documento=" + this.shareName + "&archivo="+ archivo.nombreArchivo + "&usuario=" + localStorage.user)
                .then(Response => (this.estadoSolicitud = Response.status))
            },
            eliminarArchivo(archivo){
                const index = this.archivos.indexOf(archivo)
                confirm("Esta seguro que quiere eliminar este Archivo?") && this.archivos.splice(index,1) && this.borrar(archivo);
            },
            save(archivo) {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Guardado'
                this.editarArchivo(archivo)
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Cancelado'
            },
            open () {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Editar Abierto'
            },
            close () {
                console.log('Dialogo cerrado')
            },
            editarArchivo(archivo) {
                Axios
                .put("http://localhost:8080/documento/cambiarNombreArchivo?documento=" + this.shareName + "&archivo="+ archivo.nombreArchivo + "&usuario=" + this.shareUser)
                .then(Response => (this.estadoSolicitud = Response.status))
            }
        }
}
</script>

<style>

</style>
