<template>
    <div id="app">
        <v-app>
            <v-dialog v-model="dialogo" max-width="600px">
                <v-btn flat small><v-icon>mdi-file-chart</v-icon></v-btn>
                <v-card v-if="documento != null">
                    <v-card-title>
                        <span class="headline">Detalles del Documento: {{documento.nombre}}</span>
                        <v-divider class="mx-2" inset vertical> </v-divider>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md> 
                            <v-layout wrap> 
                                <v-flex xs12 sm6 md10>
                                    <h4 class="text-to-left">Nombre del Documento:</h4>
                                    <v-card dark color="primary">{{documento.nombre}}</v-card>
                                </v-flex>
                                <v-flex xs12 sm6 md10>
                                    <h4 class="text-to-left">Descripcion:</h4>
                                    <v-card dark color="primary">{{documento.descripcion}}</v-card>
                                </v-flex>
                                <v-flex xs12 sm6 md10>
                                    <h4 class="text-to-left">Autor:</h4>
                                    <v-card dark color="primary">{{documento.autor}}</v-card>
                                </v-flex>
                                <v-flex xs12 sm6 md10>
                                    <h4 class="text-to-left">Archivos:</h4>
                                    <v-card dark color="primary">{{documento.archivos}}</v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-app>
    </div>
</template>

<script>
export default {
    props: ['shareDoc'],
    data() {
        return {
            documento: null,
        }
    },
}
</script>

<style>

</style>
