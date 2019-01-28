<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">Nuevo Documento</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Nombre del Documento</h4>
                            <v-text-field v-model="addItem.nombre" label="Nombre del documento"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Descripcion</h4>
                            <v-text-field v-model="addItem.descripcion" label="Descripcion"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Agregar Etiquetas, Escribe e Ingresalas con Enter.</h4>
                            <v-combobox v-model="chips" :items="items" label="Aqui todas las etiquetas que quieras!" chips clearable prepend-icon="filter_list" solo multiple>
                                <template slot="selection" slot-scope="data">
                                    <v-chip :selected="data.selected" close @input="remove(data.item)">
                                        <strong>{{data.item}}</strong>&nbsp;
                                    </v-chip>
                                </template>
                            </v-combobox>
                        </v-flex>
                        <v-fle xs12 sm6 md10>
                            <h4 class="text-to-left">Hacer Publico este Documento?</h4>
                            <v-switch @change="cambiarSwitch()" :label="`${addItem.estado}`" v-model="switch1" color="blue darken-3"></v-switch>
                        </v-fle>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import Axios from 'axios';
import MultipleFileUploader from './MultipleFileUploader.vue'
export default {
    components: {
        MultipleFileUploader
    }
}
</script>