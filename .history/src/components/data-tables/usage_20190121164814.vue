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
      
      <v-spacer></v-spacer>
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
                    <img :src="imageUrl" height="150" v-if="imageUrl"/>
                    <v-text-field label="Selecciona un archivo" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      @change="onFilePicked"
                    >
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
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
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
  </div>
</template>

<script>
import Axios from 'axios';
import VueTagsInput from '@johmun/vue-tags-input';
  export default {
    
    components: {
        VueTagsInput
    },
    data: () => ({
      dialog: false,
            tag: '',
            tags: [],
            title: "Image Upload",
        imageName: '',
        imageUrl: '',
        imageFile: '',
      headers: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: ''
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
      },
    }),
    mounted() {
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
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
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

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
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
    }
    }
  }
</script>
<style>

</style>
