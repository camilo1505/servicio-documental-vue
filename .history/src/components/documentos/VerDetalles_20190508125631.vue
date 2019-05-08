<template>
    <div>
        <v-icon small class="mr-3" @click="dialog=true">dehaze</v-icon>
        <p v-if="shareDoc != null">{{inicializar()}}</p>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card v-if="shareDoc != null">
                <v-card-title>
                    <span class="headline">Detalles del Documento</span>
                    <v-divider class="mx-2" inset vertical> </v-divider>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md> 
                        <v-layout wrap column> 
                            <v-flex xs12 sm6 md10>
                                <v-card color="brown lighten-5" elevation=1>
                                    <h4 class="text-to-left">Nombre del Documento:</h4>
                                    {{shareDoc.nombre}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card color="brown lighten-5" elevation=1>
                                    <h4 class="text-to-left">Descripcion:</h4>
                                    {{shareDoc.descripcion}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card color="brown lighten-5" elevation=1>
                                    <h4 class="text-to-left">Autor:</h4>
                                    {{shareDoc.usuario}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card color="brown lighten-5" elevation=1>
                                    <h4 class="text-to-left">Etiquetas:</h4>
                                    <div v-if="isPropietario()">
                                        <v-combobox v-model="chips" :items="items" label="Etquetas" chips clearable prepend-icon="filter_list" solo multiple>
                                            <template slot="selection" slot-scope="data">
                                                <v-chip :selected="data.selected" close @input="remove(data.item)">
                                                    <strong>{{ data.item }}</strong>
                                                </v-chip>
                                            </template>
                                        </v-combobox>
                                    </div>
                                    <div v-else>
                                        <v-chip v-for="chip in shareDoc.etiquetas" :key="chip.id" outline color="blue" dark> <v-icon small left>label</v-icon> {{chip}}</v-chip>
                                    </div>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div v-if="isChanged()">
                        <v-btn color="green darken-1" flat="flat" @click="editarDocumento()"> Guardar </v-btn>
                    </div>
                    <v-btn color="green darken-1" flat="flat" @click="dialog=false"> Cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <p v-if="estadoSolicitud == 200"> {{manejadorRespuestas()}} </p>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    props: {
        shareDoc: null,
    },
    data() {
        return {
            dialog: false,
            chips: [],
            items: [],
            estadoSolicitud: null,
            snack: null,
            snackColor: '',
            snackText: ''
        }
    },
    methods: {
        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
        },
        inicializar() {
            this.chips = this.shareDoc.etiquetas
        },
        isPropietario() {
            if(localStorage.user == this.shareDoc.usuario) {
                return true
            }
            else {
                return false
            }
        },
        isChanged() {
            if(this.chips.length != this.shareDoc.etiquetas.length) {
                return true
            }
            else {
                return false
            }
        },
        editarDocumento() {
            var nuevoDocumento = this.shareDoc
            nuevoDocumento.etiquetas = this.chips
            Axios
            .put("/documento/editarDocumento?usuario=" + localStorage.user, nuevoDocumento)
            .then(Response => (this.estadoSolicitud = Response.status))
        },
        manejadorRespuestas() {
            if(this.estadoSolicitud == 200) {
                this.correct()
                this.estadoSolicitud = null
            }
            else {
                this.error()
                this.estadoSolicitud = null
            }
        }
    },
}
</script>

<style>

</style>
