<template>
    <div id="app">
        <v-app>
            <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
            <v-container align-center=true>
                <v-layout row class="text-xs-center">
                    <v-flex xs3>
                        <v-card height="600px" color="light-blue darken-4"></v-card>
                    </v-flex>
                        <v-flex xs4 class="grey lighten-2">
                            <v-container style="position: relative;top: 13%;" class="text-xs-center">
                                <v-card flat>
                                    <v-card-title primary-title>
                                        <h4>Registrarse</h4>
                                    </v-card-title>
                                    <v-form>
                                        <v-text-field v-model="usuarioDTO.nombre" prepend-icon="edit" label="Nombre" required></v-text-field>
                                        <v-text-field v-model="usuarioDTO.usuario" prepend-icon="person" label="Usuario" required></v-text-field>
                                        <v-text-field v-model="usuarioDTO.password" prepend-icon="lock" label="Contraseña" type="password" required></v-text-field>
                                        <v-text-field v-model="comprobarPass" prepend-icon="lock" label="Comprobar Contraseña" type="password" required></v-text-field>
                                        <v-card-actions>
                                            <v-btn primary large block @click="guardarUsuario() " v-if="usuarioDTO.password == comprobarPass && usuarioDTO.nombre && usuarioDTO.password">Registrarse</v-btn>
                                            <v-btn primary large block @click="redirigir()">Cancelar</v-btn>
                                            <p v-if="respuesta == 200">{{limpiarFormulario()}}</p>
                                        </v-card-actions>
                                    </v-form>
                                </v-card>
                            </v-container>
                        </v-flex>
                </v-layout>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name:'registrarse',
    data() {
        return {
            usuarioDTO: {
                nombre:null,
                usuario:null,
                password:null,
                tipoUsuario:false
            },
            comprobarPass: null,
            respuesta: null
        }
    },
    methods: {
        guardarUsuario() {
            if(this.usuarioDTO.nombre && this.usuarioDTO.usuario && this.usuarioDTO.password) {
                Axios.post("http://localhost:8080/crearUsuario", this.usuarioDTO)
                .then(Response => (this.respuesta = Response.status))
            }
        },

        redirigir() {
            this.$router.push({name:'login'})
        },
        limpiarFormulario() {
            this.usuarioDTO.nombre = null;
            this.usuarioDTO.usuario = null;
            this.usuarioDTO.password = null;
            this.comprobarPass = null;
            this.respuesta = null;
            this.redirigir();
        }
    }
}
</script>