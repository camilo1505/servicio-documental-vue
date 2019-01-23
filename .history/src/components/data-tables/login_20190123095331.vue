<template>
    <v-form>
        <v-container dark class="indigo lighten-4">
            <v-layout justify-center>
                <v-img :src="`https://pngimage.net/wp-content/uploads/2018/06/user-login-images-png-5.png`"></v-img>
            </v-layout>
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
                <v-btn slot="activator" color="primary" dark class="mb-2" @click="comprobarUsuario()">Iniciar</v-btn>
                <v-btn slot="activator" color="primary" dark class="mb-2" @click="cerrarSecion()" >Cerrar Secion</v-btn>
            </v-layout>
            <p v-if="respuesta">{{usuario()}}</p>
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
        else {
            localStorage.user = "";
        }
    },
    methods: {
        comprobarUsuario() {
            Axios
            .get("http://localhost:8080/api/v1/usuario/consultarUsuario?nombreUsuario="+this.user+"&password="+this.password)
            .then(Response =>(this.respuesta = Response.status))
        },
        usuario() {
            console.log(this.respuesta)
            if(this.respuesta == 200) {
                console.log("Login correcto.");
                localStorage.user = this.user;
            }
            else {
                console.log("Login incorrecto.");
            }
        },
        cerrarSecion() {
            localStorage.user = "";
        }
    },
}
</script>