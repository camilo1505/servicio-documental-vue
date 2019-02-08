<template>
    <div id="app">
        <v-app>
            <v-layout row wrap>
                <v-flex>
                    <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
                </v-flex>
                <v-flex>
                    <v-btn @click="onUpload()">Guardar</v-btn>
                </v-flex>
                <v-layout row wrap>
                    <v-flex v-for="archivo in selectedFile" :key="archivo.id">
                        <p>Archivo: {{archivo.name}} Listo para subir</p>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-app>
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
                Axios.post("http://localhost:8080/documento/guardarArchivo?nombreDocumento=pruebaCamiloArchivos" + "&usuario=camilo" + "&ocr=true", formData, {
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
