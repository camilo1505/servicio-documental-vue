<template>
    <div id="app">
        <v-container align-center=true>
            <v-layout row class="text-xs-center">
                <v-flex xs3>
                    <img src="https://cdn.pixabay.com/photo/2014/09/23/15/03/background-457811_960_720.png" alt="login">
                </v-flex>
                    <v-flex xs4 class="grey darken-1">
                        <v-container style="position: relative;top: 13%;" class="text-xs-center">
                            <v-card flat>
                                <v-card-title primary-title>
                                    <h4>Login</h4>
                                </v-card-title>
                                <v-form>
                                    <v-text-field prepend-icon="person" name="Username" label="Username"></v-text-field>
                                    <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
                                    <v-card-actions>
                                        <v-btn primary large block>Login</v-btn>
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
