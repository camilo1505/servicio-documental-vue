<template>
<div>
  <v-icon small class="mr-3" @click="dialog=true">visibility</v-icon>
  <v-layout>
    <v-dialog
      v-model="dialog"
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
            <td>
                <v-edit-dialog :return-value.sync="props.item.nombreArchivo" lazy @save="editarArchivo(props.item)" @cancel="cancel" @open="open" @close="close">
                    {{ props.item.nombreArchivo}}
                    <v-text-field v-if="propietario()" slot="input" v-model="nuevoNombre" label="Nombre Archivo" single-line counter></v-text-field>
                </v-edit-dialog>
            </td>
            <td>
                <v-edit-dialog :return-value.sync="props.item.textoCompleto" lazy  @open="open" @close="close">
                    {{ props.item.textoCompleto}}
                    <v-text-field v-if="propietario()" slot="input" v-model="nuevoNombre" label="Nombre Archivo" single-line counter></v-text-field>
                </v-edit-dialog>
            </td>
            <td>
                <preview :url="props.item.url" :nombre="props.item.nombreArchivo"/>
            </td>

            <td class="text-xs-left">
                <v-btn flat small v-if="propietario()" @click="eliminarArchivo(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            </td>
        </template>
        </v-data-table>
        </v-card-text>

        <v-card-actions>
            <td v-if="propietario()" class="text-xs-left">
                <agregar-archivos :documento="nombreDocumento"></agregar-archivos>
            </td>
          <v-spacer></v-spacer>
          <v-btn  color="green darken-1" flat="flat" @click="dialog=false"> cerrar </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
        <p v-if="shareDoc != null">{{initialize()}}</p>
        <p>{{actualizarDocumentos()}}</p>
  </v-layout>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
</div>
</template>

<script>
import Axios from 'axios';
import preview from './preview.vue';
import agregarArchivos from './agregarArchivos.vue';

export default {
    props: {
        shareDoc:null,
        shareName:null,
        shareOwner: null
    },
    components:{
        preview,
        agregarArchivos
    },
    data () {
        return {
            headers: [
                    { text: 'Nombre del Archivo', value: 'Nombre del Archivo', sortable: false },
                    { text: 'Descripcion', value: 'Descripcion', sortable: false },
                    { text: 'URL', value: 'URL', sortable: false },
                    { text: 'Actions', align: 'center', value: 'name', sortable: false }
                ],
            nombreDocumento:null,
            chips: [],
            dialog:false,
            archivos:[],
            usuario: null,
            estadoSolicitud: null,
            snack: false,
            snackColor: '',
            snackText: '',
            nuevoNombre: null
        }
    },
        methods: {
            initialize(){
                this.nombreDocumento = this.shareName;
                this.archivos = this.shareDoc;
                if(localStorage.user != '') {
                    this.usuario = localStorage.user;
                }
                else {
                    this.$router.push({name:'login'})
                }
            },
            actualizarDocumentos() {
                this.$emit('cambioDocumentos', this.archivos);
            },
            borrar(archivo) {
                Axios
                .put("/documento/eliminarArchivo?documento=" + this.shareName + "&archivo="+ archivo.nombreArchivo + "&usuario=" + localStorage.user)
                .then(Response => (this.estadoSolicitud = Response.status))
                this.archivoBorrado()
            },
            eliminarArchivo(archivo){
                const index = this.archivos.indexOf(archivo)
                confirm("Esta seguro que quiere eliminar este Archivo?") && this.archivos.splice(index,1) && this.borrar(archivo);
            },
            save() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Guardado'
            },
            archivoBorrado() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Archivo eliminado'
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Cancelado'
            },
            open () {
                if(this.propietario()){    
                    this.snack = true
                    this.snackColor = 'info'
                    this.snackText = 'Editar Abierto'
                }
            },
            close () {
                console.log('Dialogo cerrado')
            },
            editarArchivo(archivo) {
                Axios
                .put("/documento/editarArchivo?usuario=" + localStorage.user + "&documento=" + this.shareName + "&nombreViejo=" + archivo.nombreArchivo + "&nombreNuevo="+ this.nuevoNombre)
                .then(Response => (this.estadoSolicitud = Response.status))
                archivo.nombreArchivo = this.nuevoNombre
                this.save()
            },
            propietario() {
                if(this.shareOwner == localStorage.user) {
                    return true
                }
                else {
                    return false
                }
            },
        }
}
</script>

<style>
.break {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.short{
    
    width:600px;
}
</style>