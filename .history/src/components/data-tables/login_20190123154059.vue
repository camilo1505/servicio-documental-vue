<template>
    <div id="app">
        <v-container align-center=true>
            <v-layout row class="text-xs-center">
                <v-flex xs3>
                    <v-card height="500px" color="light-blue darken-4"></v-card>
                </v-flex>
                    <v-flex xs4 class="grey lighten-2">
                        <v-container style="position: relative;top: 13%;" class="text-xs-center">
                            <v-card flat>
                                <v-card-title primary-title>
                                    <h4>Login</h4>
                                </v-card-title>
                                <v-form>
                                    <v-text-field v-model="user" prepend-icon="person" name="Username" label="Username"></v-text-field>
                                    <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
                                    <v-card-actions>
                                        <v-btn primary large block @click="comprobarUsuario()">Iniciar</v-btn>
                                        <v-btn primary large block @click="cerrarSecion()">Cerrar</v-btn>
                                        <p v-if="respuesta">{{usuario()}}</p>
                                        <p v-if="respuesta == 200">{{usuario()}}</p>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </v-container>
                    </v-flex>
            </v-layout>
        </v-container>
    </div>
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
            this.user="";
        },
        redirigir() {
            this.$router.push({name:'tabla'})
        }
    },
}
</script>

<style>
img {
    height: 200px;
    width: 200px;
}
</style>
