<template>
<div>
  <v-layout>
    <v-btn flat small @click="dialog=true">
        <v-icon  small="" > visibility </v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="auto">
        <v-card>
            <v-card-title class="headline">Archivos en "{{shareName}}"</v-card-title>
            <v-card-text> 
                <v-data-table :headers="headers" :items="archivos" class="elevation-1" item-key="id.counter">
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
                <v-btn color="green darken-1" flat="flat" @click="dialog = false"> cerrar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        <p v-if="shareDocs != null">{{initialize()}}</p>
        <p>{{actualizarDocumentos()}}</p>
        <p v-if="estadoSolicitud == 200"> {{manejadorRespuestas()}} </p>
  </v-layout>
</div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['shareDocs', 'shareUser', 'shareName'],
    data () {
        return {
            dialog: false,
            headers: [
                    { text: 'Nombre del Archivo', value: 'Nombre del Archivo', sortable: false },
                    { text: 'Descripcion', value: 'Descripcion', sortable: false },
                    { text: 'URL', value: 'URL', sortable: false },
                    { text: 'Actions', align: 'center', value: 'name', sortable: false }
                ],
            archivos:[],
            usuario: null,
            estadoSolicitud: null
            }
        },
        methods: {
            initialize(){
                this.archivos = this.shareDocs
                if(localStorage.user) {
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
                .put("http://localhost:8080/api/v1/documento/eliminarArchivo?documento=" + this.shareName + "&archivo="+ archivo.nombreArchivo + "&usuario=" + this.shareUser)
                .then(Response => (this.estadoSolicitud = Response.status))
            },
            eliminarArchivo(archivo){
                const index = this.archivos.indexOf(archivo)
                confirm("Esta seguro que quiere eliminar este Archivo?") && this.archivos.splice(index,1) && this.borrar(archivo);
            },
        }
}
</script>

<style>

</style>
