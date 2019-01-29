<template>
    <div>
        <link href='https://fonts.googleapis.com/css?family=Material+Icons' rel="stylesheet" type="text/css">
        <v-toolbar flat color="white">
            <v-toolbar-title> Documentos </v-toolbar-title>
            <v-divider class="mx-2" inset vertical> </v-divider>
            <v-spacer></v-spacer>
            <buscar-documentos @cambioMensage="documentos = $event"></buscar-documentos>
        </v-toolbar>
        <v-dialog v-model="dialog" max-width="600px">
    </div>
</template>


<script>
export default {
    
}
</script>