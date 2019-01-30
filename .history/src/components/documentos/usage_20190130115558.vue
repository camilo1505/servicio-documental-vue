<template>
  
  <div id="app">
    <v-app>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <v-toolbar flat color="white">
      <v-toolbar-title>Documentos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      >
      </v-divider>
      <!-- Nuevo Documento -->
      <nuevo-documento></nuevo-documento>
      <v-spacer></v-spacer>
      <!-- Buscar Documento -->
      <buscar-documentos @cambioMensage="documentos = $event"></buscar-documentos>
    </v-toolbar>

    <tabla></tabla>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import Axios from 'axios';
import NuevoDocumento from './nuevoDocumento.vue';
import BuscarDocumentos from './BuscarDocumentos.vue';
import Tabla from './Tabla.vue';
  export default {
    components: {
      NuevoDocumento,
      BuscarDocumentos,
      Tabla
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
      selected: [],
      
      desserts: [],
      editedIndex: -1,
      search: '',
      addItem: {
        nombre: '',
        descripcion: '',
        estado: "privado",
        autor:null
      },
      editedItem:{
        id:null,
        nombreEdit:'',
        descripcionEdit:'',
        estadoEdit:false,
        etiquetasEdit:[],
        archivo:[],
        usuario:localStorage.user
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
