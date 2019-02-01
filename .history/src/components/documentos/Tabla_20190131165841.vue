<template>
    <div>
        <v-app>
         <v-data-table
        :headers="headers"
        :items="documentos"
        class="elevation-1"
        item-key="id.counter"
        
        >
        
        <template slot="items" slot-scope="props">
            
            <td>
            <v-edit-dialog
                :return-value.sync="props.item.nombre"
                lazy
                @save="save(props.item)"
                @cancel="cancel"
                @open="open"
                @close="close"
                v-model="editedItem.nombreEdit"
                
            > {{ props.item.nombre }}
                <v-text-field
                v-if="!props.item.estado"
                slot="input"
                v-model="props.item.nombre"
                label="Edit"
                single-line
                counter
                ></v-text-field>
            </v-edit-dialog>
            </td>
            <td>
            <v-edit-dialog
                :return-value.sync="props.item.descripcion"
                lazy
                @save="save(props.item)"
                @cancel="cancel"
                @open="open"
                @close="close"
                v-model="editedItem.descripcionEdit"
            > {{ props.item.descripcion }}
                <v-text-field
                v-if="!props.item.estado"
                slot="input"
                v-model="props.item.descripcion"
                label="Edit"
                single-line
                counter
                ></v-text-field>
            </v-edit-dialog>
            </td>
            <td class="text-xs-right">{{ props.item.usuario }}</td>
            <td>
            <v-chip 
                v-for="tag in props.item.etiquetas" 
                :key="tag" 
            >
                {{tag}}
            </v-chip>
            </td>
            <div>            
                <td v-if="props.item.estado"><v-btn color="blue lighten-5" @click="cambiarEstado(props.item)"><v-icon>lock_open</v-icon></v-btn></td>
                <td v-else @click="cambiarEstado(props.item)"> <v-btn color="lime lighten-5"><v-icon>lock</v-icon></v-btn> </td>
            </div>

            <td class="text-xs-left">
            <v-btn flat small v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            <v-btn flat small v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            </td>
        </template>
        </v-data-table>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
        <p v-if="shareDocs != null">{{initialize()}}</p>
        <p>{{actualizarDocumentos()}}</p>
        <p v-if="estadoSolicitud == 200"> {{manejadorRespuestas()}} </p>
        </v-app>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['shareDocs'],
    data() {
        return {
                headers: [
                { text: 'Nombre del documento', value: 'Nombre del documento', sortable: false },
                { text: 'Descripcion', value: 'Descripcion', sortable: false },
                { text: 'Autor', align: 'rigth' ,value: 'Autor', sortable: false },
                { text: 'Etiquetas', align: 'center', value: 'Etiquetas', sortable: false },
                { text: 'Publicado o no publicado',
                sortable: false,
                },
                { text: 'Actions', align: 'left', value: 'name', sortable: false }
            ],
            editedItem:{
                id:null,
                nombreEdit:'',
                descripcionEdit:'',
                estadoEdit:false,
                etiquetasEdit:[],
                archivo:[],
                usuario:localStorage.user
            },
            snack: false,
            snackColor: '',
            snackText: '',
            documentos:[],
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
        },
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        save (documento) {
            this.snack = true
            this.snackColor = 'success'
            this.snackText = 'Cambio Realizado'
            console.log(documento)
            this.editarDocumento(documento)
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      borrar (documento) {
        this.snack = true;
        this.snackColor = 'success';
        this.snackText = 'Documento Eliminado'
        Axios
        .delete("http://localhost:8080/api/v1/documento/eliminarDocumento?nombreDocumento=" + documento.nombre + "&usuario=" + localStorage.user)
        .then(Response => (this.estadoSolicitud = Response.status))
      },
      error() {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Oops, Ha ocurrido un error'
            this.estadoSolicitud = null;
        },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
      editarDocumento(documento){
            Axios
            .put("http://localhost:8080/api/v1/documento/editarDocumento", documento)
            .then(Response => (this.estadoSolicitud = Response.status))
        },
        actualizarDocumentos() {
            this.$emit('cambioDocumentos', this.documentos);
        },
        cambiarEstado(documento) {
            if(documento.usuario == localStorage.user) {
                if(documento.estado) {
                    documento.estado = false;
                }
                else {
                    documento.estado = true;
                }
                this.save(documento);
            }
        },
        eliminarDocumento(documento) {
            if(documento.usuario == localStorage.user) {
                const index = this.documentos.indexOf(documento)
                confirm("Esta seguro que quiere eliminar este Documento?") && this.documentos.splice(index,1);
                this.borrar(documento)
            }
        },
        manejadorRespuestas() {
            console.log(this.estadoSolicitud)
            if(this.estadoSolicitud == 200) {
                this.save();
                this.estadoSolicitud = null;
            }
            else {
                this.error();
                this.estadoSolicitud = null;
            }
        }
    }
}
</script>

<style>

</style>
