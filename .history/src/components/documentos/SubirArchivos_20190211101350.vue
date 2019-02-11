<template>
    <div id="app">
            <v-layout column wrap>
                <v-flex xs5>
                    <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
                    <v-btn @click="onUpload()">Guardar</v-btn>
                    <ul>
                        <li v-for="archivo in selectedFile" :key="archivo.id">
                            <h3>Archivo: {{archivo.name}} Listo para subir</h3>
                        </li>
                    </ul>
                </v-flex>
            </v-layout>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name:"pruebas",
    props: {
        documento:null
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
            var formData = new FormData()
            for(var file of this.selectedFile) {
                formData.append('file', file)
                Axios.post("http://localhost:8080/documento/guardarArchivo?nombreDocumento=" + this.documento.nombre + "&usuario="+ localStorage.user + "&ocr=true", formData, {
                    onFileChanged: ProgressEvent => {
                        console.log(ProgressEvent.loaded / ProgressEvent.total)
                    }
                })
                formData = new FormData()
            }
        }
    }
}
</script>

<style>

</style>
