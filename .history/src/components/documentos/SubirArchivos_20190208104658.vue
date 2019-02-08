<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
            <v-btn @click="onUpload()">Upload</v-btn>
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
        onUpload() {
            const formData = new FormData()
            console.log(this.selectedFile)
            formData.append('file', this.selectedFile.name)
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }
            //Axios.post("http://localhost:8080/documento/guardarArchivo?nombreDocumento=pruebaCamiloArchivos" + "&usuario=camilo" + "&ocr=false", formData)
        }
    }
}
</script>

<style>

</style>
