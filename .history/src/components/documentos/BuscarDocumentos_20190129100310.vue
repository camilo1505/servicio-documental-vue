<template>
    <div>
        <v-text-field v-model="busqueda" append-icon="search" label="Buscar Documentos" single-line hide-details></v-text-field>
    </div>
</template>

<script>
export default {
    props: ['docs'],
    data() {
        return {
            documentos: null,
            busqueda: null
        }
    }
}
</script>