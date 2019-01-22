<template>
    <div>
        <v-toolbar flat color="white">
            <v-toolbar-title>Documentos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="expand = !expand">
                {{ expand ? 'Close' : 'Keep' }} other rows
            </v-btn>
        </v-toolbar>
        
        <v-data-table
            :headers="headers"
            :items="documentos"
            :expand="expand"
            item-key="id"
        >
        
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.id.count }}</td>
                    <td class="text-xs-left">{{ props.item.nombre }}</td>
                    <td class="justify-center">{{ props.item.descripcion }}</td>
                    <td class="text-xs-left">{{ props.item.usuario }}</td>
                    <v-icon small class="mr-2">edit</v-icon>
                </tr>
            </template>
                    
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>Peek-a-boo!</v-card-text>
                </v-card>
            </template>

        </v-data-table>
    </div>
</template>

<script>
    import Axios from 'axios';
    import VueTagsInput from '@johmun/vue-tags-input';
    export default {
        data () {
            return {
                documentos: null,
                expand: false,
                headers: [
                    { text: '', align: 'left', sortable: true, value:'id' },
                    { text: 'Nombre del Documento', align: 'left', sortable: true, value:'name' },
                    { text: 'Descripcion', align: 'left', sortable: true, value:'descripcion' },
                    { text: 'Autor', align: 'left', sortable: true, value:'autor' },
                    { text: 'Actions', value: 'name', sortable: false }
                ]
            }
        },
        mounted() {
            Axios
            .get("http://localhost:8080/api/v1/documento/consultarDocumento?consulta=")
            .then(Response => (this.documentos = Response.data))
        },
        methods: {
            getDocuments() {
                Axios
                .get()
                .then()
            }
        },
    }
</script>