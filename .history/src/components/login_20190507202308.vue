<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-container align-center=true>
                <v-layout row class="text-xs-center">
                    <v-flex xs3>
                        <v-card height="500px" color="light-blue darken-4"></v-card>
                    </v-flex>
                        <v-flex xs4 class="grey lighten-2">
                            <v-container style="position: relative;top: 13%;" class="text-xs-center">
                                <v-card flat>
                                    <v-card-title primary-title>
                                        <h4>Iniciar Sesion</h4>
                                    </v-card-title>
                                    <v-form>
                                        <v-text-field v-model="user" prepend-icon="person" name="Username" label="Usuario"></v-text-field>
                                        <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Contraseña" type="password"></v-text-field>
                                        <v-card-actions>
                                            <v-btn color="dark" primary large block @click="comprobarUsuario()">Iniciar</v-btn>
                                            <v-btn primary large block @click="registrarse()">Registrarse</v-btn>
                                            <p v-if="respuesta">{{usuario()}}</p>
                                            <p v-if="respuesta == 200">{{redirigir()}}</p>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </v-container>
                        </v-flex>
                                    <v-carousel>
                <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                ></v-carousel-item>
            </v-carousel>
                </v-layout>
            </v-container>
        </v-app>
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
            respuesta: null,
            items: [
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
            },
            {
                src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
            }
            ]
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
            .get("http://localhost:8080/usuario/consultarUsuario?usuario="+this.user+"&password="+this.password)
            .then(Response =>(this.respuesta = Response.status ));
        },
        usuario() {
            if(this.respuesta == '200') {
                console.log("Login correcto.");
                localStorage.user = this.user;
            }else{
                console.log("Login incorrecto.");
            }
        },
        registrarse() {
           this.$router.push({name:'registrarse'})
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
