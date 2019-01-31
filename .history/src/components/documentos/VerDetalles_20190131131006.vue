<template>
    <div id="app">
        <v-app>
            <v-dialog v-model="dialogo" max-width="600px">
                <v-btn flat small><v-icon>mdi-file-chart</v-icon></v-btn>
                <v-card>
                    <v-card-title>
                        <span class="headline">Detalles: </span>
                    </v-card-title>
                </v-card>
            </v-dialog>
        </v-app>
    </div>
</template>

<script>
export default {
    props: ['documento'],
    data() {
        return {
            documento: null,
        }
    },
}
</script>

<style>

</style>
