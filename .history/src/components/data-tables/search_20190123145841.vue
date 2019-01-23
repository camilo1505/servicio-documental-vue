<template>
  <v-card>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="documentos"
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
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import Axios from 'axios';
 
import MultipleFileUploader from '../../MultipleFileUploader.vue'
  export default {
    
    components: {
        MultipleFileUploader
    },
    data: () => ({
        search: '',
        documentos:[],
        usuario:null,
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
    methods:{
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

    }
  }
</script>
