<template>
    <v-layout column wrap>
        <v-flex xs5>
            <input type="file" id="file" ref="myFiles" class="custom-file-input" @change="onFileChanged()" multiple>
            <v-btn @click="crearDocumento()">Guardar</v-btn>
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
        documento:null,
        chips:null
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
        crearDocumento(){
            confirm("Esta seguro que quiere agregar este nuevo documento?") && this.onUpload();
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
            alert("Documento guardado, si quiere puede terminar o crear un nuevo documento");
        }
    }
}
</script>

<style>

</style>