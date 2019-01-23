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
  export default {
    data () {
      return {
        search: '',
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
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    }
  }
</script>
