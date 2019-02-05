<template>
    <div>
        <v-app>
            <v-item-group>
            <v-container grid-list-md>
                <v-layout wrap>
                <v-flex
                v-for="n in 2"
                :key="n"
                xs12
                md4
                >
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
                    <v-edit-dialog
                        :return-value.sync="props.item.etiquetas"
                        lazy
                        @save="save(props.item)"
                        @cancel="cancel"
                        @open="open"
                        @close="close"
                        v-model="editedItem.etiquetasEdit"
                    >
                    <v-chip
                        v-for="tag in props.item.etiquetas" 
                        :key="tag" 
                    >{{tag}}
                    </v-chip>
                    <v-text-field
                        v-if="!props.item.etiquetas"
                        slot="input"
                        v-model="props.item.etiquetas"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </v-edit-dialog>
                    </td>
                    <td class="justify-center layout px-0">
                        <v-icon small class="mr-3" v-if="props.item.estado" @click="cambiarEstado(props.item)" >lock_open</v-icon>
                        <v-icon small class="mr-3" v-if="!props.item.estado"  @click="cambiarEstado(props.item)">lock</v-icon>
                        <v-icon small class="mr-3" @click="activador=true">visibility</v-icon>
                        <archivos :dialog="activador" @updateDialog="activador = $event" :shareDocs = "props.item.archivo" :shareUser = "props.item.usuario" :shareName = "props.item.nombre"></archivos>
                        <v-icon  small class="mr-3" v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)" > delete </v-icon>
                    </td>
                </template>
            </v-data-table>
                     <div class="cloud">
            <cloud-tag></cloud-tag>
         </div>
        </div>


        

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
import archivos from './archivos.vue';
import cloudTag from './cloudTag.vue';
export default {
    components: {
      archivos,
      cloudTag
    },
    props: ['shareDocs'],
    data() {
        return {
                headers: [
                { text: 'Nombre del documento', value: 'Nombre del documento', sortable: false },
                { text: 'Descripcion', value: 'Descripcion', sortable: false },
                { text: 'Autor', align: 'rigth' ,value: 'Autor', sortable: false },
                { text: 'Etiquetas', align: 'center', value: 'Etiquetas', sortable: false },
                { text: 'acciones',sortable: false }
            ],
            activador:false,
            hola:true,
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
            this.editarDocumento(documento)
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      borrar (documento) {
        Axios
        .put("http://localhost:8080/api/v1/documento/eliminarDocumento?nombreDocumento=" + documento.nombre + "&usuario=" + localStorage.user)
        .then(Response => (this.estadoSolicitud = Response.status))
        this.snack = true;
        this.snackColor = 'success';
        this.snackText = 'Documento Eliminado'
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
        this.snackText = 'Listo para editar'
      },
      close () {
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
                confirm("Esta seguro que quiere eliminar este Archivo?") && this.documentos.splice(index,1) && this.borrar(documento);
            }
        },
        manejadorRespuestas() {
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
.tabla{
    width: 800px;
    height: 500px;
}
</style>
