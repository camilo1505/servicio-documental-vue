<template>
    <div>
        <v-data-table :headers="headers" :items="documentos" class="elevation-1" hide-actions item-key="id.counter">
            <template slot="items" slot-scope="props">
                <td v-if="props.item.estado"><v-btn color="blue lighten-5" @click="props.item.estado=false">Publico <v-icon>lock_open</v-icon></v-btn></td>
                <td v-else-if="!props.item.estado && propietario(props.item)" @click="props.item.estado=true"> <v-btn  color="lime lighten-5">Privado <v-icon>lock</v-icon></v-btn> </td>
                <td v-if="props.item.estado || propietario(props.item)">
                    <v-edit-dialog :return-value.sync="props.item.nombre" lazy @save="save(props.item)" @cancel="cancel" @open="open" @close="close" v-model="documentoEditable.nombre">
                        {{ props.item.nombre }}
                        <v-text-field slot="input" v-model="props.item.nombre" label="Edit" single-line counter v-if="propietario(props.item)"> </v-text-field>
                    </v-edit-dialog>
                </td>
                <td v-if="props.item.estado || propietario(props.item)">
                    <v-edit-dialog :return-value.sync="props.item.descripcion" lazy @save="save(props.item)" @cancel="cancel" @open="open" @close="close" v-model="documentoEditable.descripcion">
                        {{ props.item.descripcion }}
                        <v-text-field slot="input" v-model="props.item.descripcion" label="Edit" single-line counter> </v-text-field>
                    </v-edit-dialog>
                </td>
                <td v-if="props.item.estado || propietario(props.item)" class="text-xs-right">{{ props.item.usuario }}</td>
                <td v-if="props.item.estado || propietario(props.item)">
                    <v-chip v-for="tag in props.item.etiquetas" :key="tag.id" v-model="editedItem.etiquetasEdit"> {{tag}} </v-chip>
                </td>
                <td v-if="props.item.estado || propietario(props.item)" class="text-xs-left">
                    <v-icon small @click="deleteItem(props.item)">delete</v-icon>
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