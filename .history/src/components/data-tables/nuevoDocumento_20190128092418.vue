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
                        </v-flex>
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