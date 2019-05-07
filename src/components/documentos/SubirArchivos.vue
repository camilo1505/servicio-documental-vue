<template>
    <v-layout column wrap>
        <v-flex xs5>
            <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
            <v-btn @click="onUpload()">Guardar</v-btn>
            <ul>
                <li v-for="archivo in selectedFile" :key="archivo.id">
                    <h3>Archivo: {{archivo.name}} Listo para subir</h3>
                </li>
            </ul>
            <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                {{ snackText }}
                <v-btn flat @click="snack = false">Close</v-btn>
            </v-snackbar>
        </v-flex>

    </v-layout>
</template>

<script>
import Axios from 'axios';
export default {
    name:"pruebas",
    props: {
        documento:null,
        chips:null,
        snack: false,
        snackColor: '',
        snackText: ''
    },
    data() {
        return{
            selectedFile: []
        }
    },
    methods: {
        onFileChanged() {
            this.selectedFile = this.$refs.myFiles.files
        },
        onUpload(){
            var documento = this.documento;
            documento.etiquetas = this.chips;

            Axios
            .post("http://localhost:8080/documento/crearDocumento",documento);


            var formData = new FormData()
            for(var file of this.selectedFile) {
                formData.append('file', file)
            }
            Axios.post("http://localhost:8080/documento/guardarArchivo?nombreDocumento="+documento.nombre+"&usuario="+documento.usuario, formData, {
                    onFileChanged: ProgressEvent => {
                        console.log(ProgressEvent.loaded / ProgressEvent.total)
                    }
                })
            this.archivoGuardado()
        },
            archivoGuardado() {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Archivos guardados'
            }
    }
}
</script>

<style>

</style>