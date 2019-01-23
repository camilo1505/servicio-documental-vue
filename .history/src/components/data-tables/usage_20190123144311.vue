<template>

  <div>
    <link href='https://fonts.googleapis.com/css?family=Material+Icons' rel="stylesheet" type="text/css">
    <v-toolbar flat color="white">
      <v-toolbar-title>Documentos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      >
      </v-divider>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Documento</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Nuevo Documento</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md10>
                  <h4 class="text-to-left">Añade un nombre a tu nuevo Documento</h4>
                  <v-text-field v-model="addItem.nombre" label="Nombre del documento"></v-text-field>
                </v-flex>
                  
                <v-flex xs12 sm6 md10>
                  <h4 class="text-to-left">Descripcion</h4>
                  <v-text-field v-model="addItem.descripcion" label="Descripcion"></v-text-field>
                </v-flex>
                <v-flex xs12 md6 md10>
                  <h4 class="text-to-left">Agrega etiquetas a tu documento, solo escribe y presiona enter!</h4>
                  <v-combobox
                    v-model="chips"
                    :items="items"
                    label="Aqui todas las etiquetas que quieras!"
                    chips
                    clearable
                    prepend-icon="filter_list"
                    solo
                    multiple
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        :selected="data.selected"
                        close
                        @input="remove(data.item)"
                      >
                        <strong>{{ data.item }}</strong>&nbsp;
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-flex>
                
                <v-flex xs12 sm6 md6>
                  <h4 class="text-to-left">Quieres que todo el mundo vea tu documento?</h4>
                      <v-switch @change="cambiarSwitch()"
                        :label="`${addItem.estado}`"
                        v-model="switch1"
                        color="blue darken-3"
                      ></v-switch>
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                    <h4 class="text-to-left">Añade archivos!</h4>
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
            
    <v-data-table
      :headers="headers"
      :items="documentos"
      class="elevation-1"
      hide-actions
      item-key="id.counter"
      :search="search"
    >
      
      <template slot="items" slot-scope="props">
        <td class="publico" v-if="props.item.estado" >Publico <v-icon small color="black">lock_open</v-icon></td>
        <td class="privado" v-else-if="props.item.estado===false && propietario(props.item)">Privado <v-icon small>lock</v-icon></td>
        
        <td v-if="props.item.estado || propietario(props.item)">
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
              v-if="propietario(props.item)"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td v-if="props.item.estado || propietario(props.item)">
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
        <td v-if="props.item.estado || propietario(props.item)" class="text-xs-right">{{ props.item.usuario }}</td>
        <td v-if="props.item.estado || propietario(props.item)">
          <v-chip 
            v-for="tag in props.item.etiquetas" 
            :key="tag.id" 
            v-model="tag.isOpen"
          >
            {{tag}}
          </v-chip>
        </td>
        <td v-if="props.item.estado || propietario(props.item)" class="text-xs-left">
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
  </div>
</template>

<script>
import Axios from 'axios';
 
import MultipleFileUploader from '../../MultipleFileUploader.vue'
  export default {
    
    components: {
        MultipleFileUploader
    },
    data: () => ({
        dialog: false,
        chips: [],
        items: [],
        title: "Image Upload",
        imageName: '',
        imageUrl: '',
        imageFile: '',
        switch1: false,
        snack: false,
        snackColor: '',
        snackText: '',
        documentos:[],
        usuario:null,
      pagination: {
        sortBy: 'nombre'
      },
      selected: [],
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        },
        { text: 'Nombre del documento', value: 'Nombre del documento' },
        { text: 'Descripcion', value: 'Descripcion' },
        { text: 'Autor', value: 'Autor' },
        { text: 'Etiquetas', align: 'center', value: 'Etiquetas' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      search: '',
      addItem: {
        nombre: '',
        descripcion: '',
        estado: "privado",
        autor:null
      }
    }),
    created() {
      this.initialize();
        
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
      cambiarSwitch(){
        if(this.switch1){
          this.addItem.estado = "Publico"
        }
        else{
          this.addItem.estado = "Privado"
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
      propietario(documento) {
        if(documento.usuario == this.usuario) {
            return true;
        }
        else {
            return false;
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
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.desserts.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>
<style>
.publico{
  background-color: beige;
}
.privado{
  background-color: lightcyan;
}
.text-to-left{
  text-align: left;
}
</style>
