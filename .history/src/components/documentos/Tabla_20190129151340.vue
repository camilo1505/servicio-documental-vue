<template>
    <div>
        <v-data-table :headers="headers" :items="documentos" class="elevation-1" hide-actions item-key="id.counter">
            <template slot="items" slot-scope="props">
                <td v-if="props.item.estado"><v-btn color="blue lighten-5" @click="props.item.estado=false">Publico <v-icon>lock_open</v-icon></v-btn></td>
                <td v-else-if="!props.item.estado && propietario(props.item)" @click="props.item.estado=true"> <v-btn  color="lime lighten-5">Privado <v-icon>lock</v-icon></v-btn> </td>
                <td v-if="props.item.estado || propietario(props.item)">
                    <v-edit-dialog :return-value.sync="props.item.nombre" lazy @save="save(props.item)" @cancel="cancel" @open="open" @close="close" v-model="editedItem.nombreEdit">
                        {{ props.item.nombre }}
                        <v-text-field slot="input" v-model="props.item.nombre" label="Edit" single-line counter v-if="propietario(props.item)"> </v-text-field>
                    </v-edit-dialog>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    
}
</script>