<template>
    <div>
        <v-text-field v-model="search"></v-text-field>
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