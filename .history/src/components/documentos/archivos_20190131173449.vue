<template>
  <v-layout>
    <v-btn 
        flat small 
        @click="dialog=true"
        ><v-icon  small="" > visibility </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="auto"
    >
      <v-card>
        <v-card-title class="headline">Archivos en este documento</v-card-title>

        <v-card-text>
           <v-data-table
        :headers="headers"
        :items="documentos.archivo"
        class="elevation-1"
        item-key="id.counter"
        
        >
        
        <template slot="items" slot-scope="props">
            
            <td>
            <v-edit-dialog
                :return-value.sync="props.item.nombreArchivo"
                lazy
                @save="save(props.item)"
                @cancel="cancel"
                @open="open"
                @close="close"
                v-model="editedItem.nombreEdit"
                
            > {{ props.item.nombreArchivo }}
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
                v-if="props.item.OCR==true"
                :return-value.sync="props.item.textoCompleto"
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
            <archivos></archivos>
            <v-btn flat small v-if="props.item.usuario === usuario" @click="eliminarDocumento(props.item)"><v-icon  small="" > delete </v-icon></v-btn>
            </td>
        </template>
        </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
data () {
      return {
        dialog: false,
        headers: [
                { text: 'Nombre del Archivo', value: 'Nombre del Archivo', sortable: false },
                { text: 'Descripcion', value: 'Descripcion', sortable: false },
                { text: 'Actions', align: 'center', value: 'name', sortable: false }
            ],
        documentos:[]
      }
    }
}
</script>

<style>

</style>
