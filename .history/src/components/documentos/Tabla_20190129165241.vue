<template>
    <div>
        <v-data-table :headers="headers" :items="desserts">
            <template slot="items" slot-scope="props">
                <td>
                    <v-edit-dialog :return-value.sync="props.item.name" lazy @save="save" @cancel="cancel" @open="open" @close="close">
                        {{ props.item.name }}
                        <v-text-field slot="input" v-model="props.item.name" label="Edit" single-line counter> </v-text-field>
                    </v-edit-dialog>
                </td>
            </template>
        </v-data-table>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}
            <v-btn flat @click="snack = false">Close</v-btn>
        </v-snackbar>
        <p v-if="autorizarEdicion">{{editarDocumento()}}</p>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'Tabla',
    created() {
        this.initialize();
    },
    data() {
        return {
            headers: [
                { text: '', align: 'left', sortable: false, },
                { text: 'Nombre del documento', value: 'Nombre del documento', sortable: false },
                { text: 'Descripcion', value: 'Descripcion', sortable: false },
                { text: 'Autor', value: 'Autor', sortable: false },
                { text: 'Etiquetas', align: 'center', value: 'Etiquetas', sortable: false },
                { text: 'Accciones', value: 'name', sortable: false }
            ],
            snack: false,
            snackText: '',
            snackColor: '',
            documentos: null,
            usuario: '',
            documentoEditable: {
                id: null,
                nombre:'',
                descripcion: '',
                etiquetas: [],
                estado: false,
                archivo: [],
                autor: ''
            },
            estadoSolicitud: null,
            autorizarEdicion: false,
        }
    },
    methods: {
        initialize() {
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
            .then(Response => (this.documentos = Response.data));
            if(localStorage.user) {
                this.usuario = localStorage.user;
            }
            else {
                this.$router.push({name:'login'})
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
        save(documento) {
            this.snack = true;
            this.snackColor = 'success';
            this.snackText = 'Guardando';
            this.documentoEditable.archivo = documento.archivo;
            this.documentoEditable.id = documento.id;
            this.documentoEditable.etiquetas = documento.etiquetas;
            this.autorizarEdicion = true;
        },
        editarDocumento() {
            var documentoActual = this.documentoEditable;
            if(documentoActual.nombre != '' && documentoActual.descripcion != '') {
                Axios
                .put("http://localhost:8080/api/v1/documento/editarDocumento", documentoActual)
                .then(Response => (this.estadoSolicitud = Response.status))
            }
            else {
                console.log("Error, atributos vacios nombre: " + documentoActual.nombre + " descripcion: " + documentoActual.descripcion);
            }
            this.autorizarEdicion = false;
        }
    }
}
</script>