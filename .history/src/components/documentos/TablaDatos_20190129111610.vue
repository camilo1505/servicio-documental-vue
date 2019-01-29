<template>
    <div>
        <link href='https://fonts.googleapis.com/css?family=Material+Icons' rel="stylesheet" type="text/css">
        <!-- Titulo de la vista de documentos toolbar con barra de busqueda -->
        <v-toolbar flat color="white">
            <v-toolbar-title> Documentos </v-toolbar-title>
            <!-- Pequeño divisor para el titulo de la vista, tamaño mx-2 -->
            <v-divider class="mx-2" inset vertical> </v-divider>
            <!-- Espacio en blanco -->
            <v-spacer></v-spacer>
            <!-- componente de Busqueda cambia los documentos a traves del $event -->
            <buscar-documentos @cambioMensage="documentos = $event"></buscar-documentos>
        </v-toolbar>
        <!-- Dialogo para crear un nuevo documento -->
        <v-dialog v-model="dialog" max-width="600px">
            <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo Documento</v-btn>
            <!-- Componente de nuevo documento -->
            <nuevo-documento></nuevo-documento>
        </v-dialog>
    </div>
</template>


<script>
export default {
    
}
</script>