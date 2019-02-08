<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-layout row wrap>
                <v-flex xs7>
                    <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
                </v-flex>
                <v-flex xs7>
                    <v-btn @click="onUpload()">Upload</v-btn>
                </v-flex>
            </v-layout>
            <p>{{selectedFile}}</p>
        </v-app>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name:"pruebas",
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
