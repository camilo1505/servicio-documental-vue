<template>
    <div>
        <v-text-field v-model="search" append-icon="search" label="Buscar Documentos"></v-text-field>
    </div>
</template>

<script>
export default {
    data() {
        return {
            busqueda: null,
        }
    }
}
</script>