<template>
    <div>
        <v-icon small class="mr-3" @click="dialog=true">details</v-icon>
        <v-dialog v-model="dialog" max-width="600px">
            <v-card v-if="shareDoc != null">
                <v-card-title>
                    <span class="headline">Detalles del Documento: {{shareDoc.nombre}}</span>
                    <v-divider class="mx-2" inset vertical> </v-divider>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md> 
                        <v-layout wrap> 
                            <v-flex xs12 sm6 md10>
                                <v-card dark color="grey darken-2" elevation=1>
                                    <h4 class="text-to-left">Nombre del Documento:</h4>
                                    {{shareDoc.nombre}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card dark color="grey darken-2" elevation=1>
                                    <h4 class="text-to-left">Descripcion:</h4>
                                    {{shareDoc.descripcion}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card dark color="grey darken-2" elevation=1>
                                    <h4 class="text-to-left">Autor:</h4>
                                    {{shareDoc.autor}}
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm6 md10>
                                <v-card dark color="grey darken-2 elevation=1>
                                    <h4 class="text-to-left">Archivos:</h4>
                                    {{shareDoc.archivos}}
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="dialog=false"> cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        shareDoc: null,
    },
    data() {
        return {
            dialog: false,
        }
    },
}
</script>

<style>

</style>
