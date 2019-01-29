<template>
    <div>
        <v-dialog v-model="dialogo" max-width="600px">
            <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Documento</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Nuevo Documento</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md10>
                                <h4 class="text-to-left">Nombre del Documento</h4>
                                <v-text-field v-model="nuevoDocumento.nombre" label="Nombre del documento"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <h4 class="text-to-left">Descripcion</h4>
                                <v-text-field v-model="nuevoDocumento.descripcion" label="Descripcion"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <h4 class="text-to-left">Agregar Etiquetas, Escribe e Ingresalas con Enter.</h4>
                                <v-combobox v-model="chips" :items="items" label="Agrega Etiquetas" chips clearable prepend-icon="filter_list" solo multiple>
                                    <template slot="selection" slot-scope="data">
                                        <v-chip :selected="data.selected" close @input="remove(data.item)">
                                            <strong>{{data.item}}</strong>&nbsp;
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <h4 class="text-to-left">Hacer Publico este Documento?</h4>
                                <v-switch @change="cambiarSwitch()" :label="`${labelSwitch}`" v-model="nuevoDocumento.estado" color="blue darken-3"></v-switch>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                                <h4 class="text-to-left">Añade archivos</h4>
                                <multiple-file-uploader postURL="" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
                            </v-flex>
                            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialogo = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="guardarDocumento()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Axios from 'axios';
import MultipleFileUploader from './MultipleFileUploader.vue'
export default {
    components: {
        MultipleFileUploader
    },
    data() {
        return {
            nuevoDocumento: {
                nombre: '',
                descripcion: '',
                etiquetas: '',
                estado: false,
                archivos: [],
                autor: ''
            },
            chips: [],
            items: [],
            labelSwitch: "Privado",
            dialogo: false
        }
    },
    methods: {
        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1);
            this.chips = [...this.chips];
        },
        cambiarSwitch() {
            if(this.nuevoDocumento.estado) {
                this.labelSwitch = "Publico";
            }
            else{
                this.labelSwitch = "Privado";
            }
        },
        guardarDocumento() {
            var documento = this.nuevoDocumento
            documento.etiquetas = this.chips
            documento.autor = this.$localStorage.user

            Axios
            .post("http://localhost:8080/api/v1/documento/crearDocumento",documento)
        }
    }
}
</script>