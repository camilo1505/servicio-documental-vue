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
            <td v-if="props.item.estado"><v-btn color="blue lighten-5" @click="props.item.estado=false">Publico <v-icon>lock_open</v-icon></v-btn></td>
            <td v-else @click="props.item.estado=true"> <v-btn  color="lime lighten-5">Privado <v-icon>lock</v-icon></v-btn> </td>
            <td v-if="props.item.estado">
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
                slot="input"
                v-model="props.item.nombre"
                label="Edit"
                single-line
                counter
                ></v-text-field>
            </v-edit-dialog>
            </td>
            <td v-if="props.item.estado">
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
                slot="input"
                v-model="props.item.descripcion"
                label="Edit"
                single-line
                counter
                ></v-text-field>
            </v-edit-dialog>
            </td>
            <td v-if="props.item.estado" class="text-xs-right">{{ props.item.usuario }}</td>
            <td v-if="props.item.estado">
            <v-chip 
                v-for="tag in props.item.etiquetas" 
                :key="tag" 
            >
                {{tag}}
            </v-chip>
            </td>
            <td v-if="props.item.estado" class="text-xs-left">
            <v-icon
                small
                @click="deleteItem(props.item)"
            >
                delete
            </v-icon>
            </td>
        </template>
        </v-data-table>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
        </v-app>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: ['docs'],
    data() {
        return {
                headers: [
                {
                text: '',
                align: 'left',
                sortable: false,
                },
                { text: 'Nombre del documento', value: 'Nombre del documento', sortable: false },
                { text: 'Descripcion', value: 'Descripcion', sortable: false },
                { text: 'Autor', value: 'Autor', sortable: false },
                { text: 'Etiquetas', align: 'center', value: 'Etiquetas', sortable: false },
                { text: 'Actions', value: 'name', sortable: false }
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
            usuario: null
        }
    },
    created() {
      this.initialize();
    },
    methods: {
        initialize(){
            Axios
            .get("http://localhost:8080/api/v1/documento/documentos?usuario=" + localStorage.user)
            .then((response) => {
            console.log("GET Response")
            console.log(response.data)
            this.documentos = response.data
            })
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
        this.snackText = 'Data saved'
        this.editedItem.archivo = documento.archivo
        this.editedItem.etiquetasEdit = documento.etiquetas
        this.editedItem.id = documento.id
        this.editarDocumento()
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      },
      editarDocumento(){
        var documentoActual = this.editedItem
            Axios
            .put("http://localhost:8080/api/v1/documento/editarDocumento", documentoActual)
            .then(Response => (this.estadoSolicitud = Response.status))
            this.cargarDocumentos()
        },
        iniciarDocumentos(docs) {
            this.documentos = docs;
        }
        
    },
}
</script>

<style>

</style>
