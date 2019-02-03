<template>
  <div id="app">
      <wordcloud
      :data="etiquetas"
      nameKey="id"
      valueKey="value"
      :color="myColors"
      :showTooltip="true"
      :wordClick="wordClickHandler">
      </wordcloud>
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
                <archivos  @cambioDocumentos="documentos = $event" :shareDocs = "props.item.archivo" :shareUser = "props.item.usuario" :shareName = "props.item.nombre"></archivos>
                <v-btn flat small v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
                </td>
            </template>
            </v-data-table>
        </v-app>
  </div>
  
</template>

<script>
import wordcloud from 'vue-wordcloud'
import Axios from 'axios'

export default {
  name: 'app',
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log('wordClickHandler', name, value, vm);

    }
  },
  data() {
    return {
      myColors: ['#1f77b4', '#EC4CAD', '#0017FF', '#629fc9', '#E8FF00','#EC4C4C', '#94bedb', '#138025' ,'#c9e0ef', '#FFA200' , '#FF00D4', '#0A0109'],
      etiquetas:[],
    }
  },
    mounted(){
      Axios
      .get("http://localhost:8080/api/v1/documento/cloudEtiquetas")
      .then(Response =>(this.etiquetas = Response.data))
    }
}
</script>