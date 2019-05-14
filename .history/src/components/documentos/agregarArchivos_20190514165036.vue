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
        </v-flex>
    </v-layout>
</template>

<script>
import Axios from 'axios';
export default {
    props: {
        documento: null
    },
    data() {
        return{
            nombre: '',
            selectedFile: [],
            usuario:null
        }
    },
    methods: {
        onFileChanged() {
            this.selectedFile = this.$refs.myFiles.files
        },
        onUpload(){
            this.usuario = localStorage.user;
            this.nombre = this.documento;
            var formData = new FormData()
            for(var file of this.selectedFile) {
                formData.append('file', file)
            }
            Axios.post("/documento/guardarArchivo?nombreDocumento="+this.nombre+"&usuario="+this.usuario, formData, {
                    onFileChanged: ProgressEvent => {
                        console.log(ProgressEvent.loaded / ProgressEvent.total);
                    }
                });
            this.$router.go();
        }
    }
}
</script>