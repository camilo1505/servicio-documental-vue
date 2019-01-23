<template>

  <div>
    <link href='https://fonts.googleapis.com/css?family=Material+Icons' rel="stylesheet" type="text/css">
    <v-toolbar flat color="white">
      <v-toolbar-title>Documentos</v-toolbar-title>
      
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="documentos"
      class="elevation-1"
      item-key="counter"
    >
      <template slot="items" slot-scope="props">
        <td color="primary" v-if="props.item.estado" >Publico <v-icon small color="black">lock_open</v-icon></td>
        <td  v-else>Privado <v-icon small>lock</v-icon>{{props.item.estado}}</td>
        
        <td>
        <v-edit-dialog
            :return-value.sync="props.item.nombre"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
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
        <td>
        <v-edit-dialog
            :return-value.sync="props.item.descripcion"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
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
        <td class="text-xs-right">{{ props.item.usuario }}</td>
        <td>
        <v-edit-dialog
            :return-value.sync="props.item.etiquetas"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          > {{ props.item.etiquetas }}
            <v-text-field
              slot="input"
              v-model="props.item.etiquetas"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      
      <template slot="no-data">
        <v-btn color="primary" @click="cargarDocumentos">Reset</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Documento</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Nuevo Documento</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="addItem.nombre" label="Nombre del documento"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md10>
                  <v-text-field v-model="addItem.descripcion" label="Descripcion"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
                </v-flex>
                <v-flex xs12 sm6 md6>
                    <toggle-button :labels="{checked: 'Privado', unchecked: 'Publico'}" @change="cambioBusqueda()" />
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                    <multiple-file-uploader postURL="" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Axios from 'axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import VueTagsInput from '@johmun/vue-tags-input';
import MultipleFileUploader from '../../MultipleFileUploader.vue'
  export default {
    
    components: {
        VueTagsInput,
        MultipleFileUploader
    },
    data: () => ({
      dialog: false,
            tag: '',
            tags: [],
            title: "Image Upload",
        imageName: '',
        imageUrl: '',
        imageFile: '',
        snack: false,
        snackColor: '',
        snackText: '',
        documentos: null,
      headers: [
        {
          text: 'counter',
          align: 'left',
          sortable: false,
          value: 'counter'
        },
        { text: 'Nombre del Documento', value: 'Nombre del Documento' },
        { text: 'Descripcion', value: 'Descripcion' },
        { text: 'Autor', value: 'Autor' },
        { text: 'Etiquetas', value: 'Etiquetas' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      addItem: {
        nombre: '',
        descripcion: '',
        estado: false,
        autor:null
      }
    }),
    created() {
      this.initialize()
        
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      initialize(){
        Axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
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
      cambioBusqueda() {
        if(this.addItem.estado) {
            this.addItem.estado = false;
        }
        else {
            this.addItem.estado = true;
        }
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},
    cargarDocumentos(){
         Axios
        .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
        .then(Response => (this.documentos = Response.data))

        if(localStorage.user) {
            this.usuario = localStorage.user;
        }
        else {
            this.usuario = "";
        }
    },
    save () {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel () {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open () {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close () {
        console.log('Dialog closed')
      }
    }
  }
</script>
<style>
.deshabilitado{
  background-color: bisque;
}
</style>
