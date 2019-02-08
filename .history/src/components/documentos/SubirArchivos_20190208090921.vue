<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <input type="file" @change="onfileChanged">
            <v-btn @click="onUpload()">Upload</v-btn>
        </v-app>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name:"pruebas",
    data() {
        return{
            selectedFile: null
        }
    },
    methods: {
        onFileChanged(event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            const formData = new FormData()
            formData.append('myFile', this.selectedFile, this.selectedFile.name)
            Axios.post('my-domain.com/file-upload', formData)
        }
    }
}
</script>

<style>

</style>
