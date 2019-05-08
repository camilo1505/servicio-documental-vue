<template>
    <v-dialog v-model="dialogo" max-width="700px" persistent>
        <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Documento</v-btn>
        <v-card>
            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                {{ snackText }}
                <v-btn flat @click="snack = false">Close</v-btn>
            </v-snackbar>
            <v-card-title>
                <span class="headline">Nuevo Documento</span>
                <v-divider class="mx-2" inset vertical> </v-divider>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Nombre del Documento*</h4>
                            <v-text-field v-model="nuevoDocumento.nombre" label="Nombre del documento"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Descripcion</h4>
                            <v-text-field v-model="nuevoDocumento.descripcion" label="Descripcion"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md10>
                            <h4 class="text-to-left">Agregar Etiquetas, Escribe e Ingresalas con Enter.*</h4>
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
                            <h4 class="text-to-left">Añade archivos*</h4>
                            <subir-archivos :documento="nuevoDocumento" :chips="chips"></subir-archivos>
                        </v-flex>
                        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="guardarDocumento()">Terminar</v-btn>
            </v-card-actions>
            <p v-if="documentos">{{enviarDocumentos()}}</p>
            <p>{{establecerUsuario()}}</p>
        </v-card>
    </v-dialog>
</template>

<script>
import Axios from 'axios';
import SubirArchivos from './SubirArchivos.vue'
export default {
    props: {
        misDocumentos: null,
    },
    components: {
        SubirArchivos
    },
    data() {
        return {
            nuevoDocumento: {
                nombre: '',
                descripcion: '',
                etiquetas: [],
                estado: false,
                archivos: [],
                usuario: localStorage.user
            },
            chips: [],
            items: [],
            snack: false,
            snackColor: '',
            snackText: '',
            labelSwitch: "Privado",
            dialogo: false,
            documentos: null
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
            this.dialog=false;
            this.snack = true
            this.snackColor = 'DocumentoCreado'
            this.snackText = 'Nuevo documento creado'
            this.$router.go();
        },
        cargarDocumentos() {
            Axios
            .get("http://localhost:8080/documento/consultar?consulta=&usuario=" + localStorage.user + "&etiqueta=&misDocumentos=" + this.misDocumentos)
            .then(Response => (this.documentos = Response.data))
        },
        enviarDocumentos() {
            this.$emit('cambioMensage', this.documentos);
            this.documentos = null;
            this.dialogo = false
        },
        todosLosCampos() {
            if(this.nuevoDocumento.nombre != '' && this.nuevoDocumento.descripcion != ''
               && this.chips.length >> 0){
                return true
            }
            else {
                return false
            }
        },
        establecerUsuario() {
            this.nuevoDocumento.autor = localStorage.user
        },
        onFileChange() {
            
        }
    }
}
</script>