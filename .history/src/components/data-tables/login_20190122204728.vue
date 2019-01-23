<template>
    <v-form v-model="valid">
        <v-container dark class="indigo lighten-4">
            <v-layout justify-center>
                <v-flex xs12 md4>
                    <v-text-field v-model="user" label="Usuario" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs12 md4>
                    <v-text-field v-model="password" label="Contraseña" required :type="'password'"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-btn slot="activator" color="primary" dark class="mb-2" @click="usuario()">Iniciar</v-btn>
                <v-btn slot="activator" color="primary" dark class="mb-2">Cancelar</v-btn>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>
import Axios from 'axios';
export default {
    name:'Login',
    data() {
        return {
            user: null,
            password: null,
            respuesta: null
        }
    },
    mounted() {
        if(localStorage.user){
            this.user = localStorage.user;
        }
    },
    methods: {
        comprobarUsuario() {
            Axios
            .get("http://localhost:8080/api/v1/usuario/consultarUsuario?user="+this.user+"&password="+this.password)
            .then(Response =>(this.respuesta = Response.status))
        },
        usuario() {
            this.comprobarUsuario
        }
    },
}
</script>