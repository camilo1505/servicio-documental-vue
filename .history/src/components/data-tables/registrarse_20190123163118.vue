<template>
    <div id="app">
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
                                    <v-text-field v-model="usuarioDTO.nombre" prepend-icon="name" label="Nombre" required></v-text-field>
                                    <v-text-field v-model="usuarioDTO.usuario" prepend-icon="person" label="Usuario" required></v-text-field>
                                    <v-text-field v-model="usuarioDTO.password" prepend-icon="lock" label="Contraseña" type="password" required></v-text-field>
                                    <v-text-field v-model="comprobarPass" prepend-icon="lock" label="Comprobar Contraseña" type="password" required></v-text-field>
                                    <v-card-actions>
                                        <v-btn primary large block @click="guardarUsuario() " v-if="usuarioDTO.password == comprobarPass && usuarioDTO.nombre && usuarioDTO.password">Registrarse</v-btn>
                                        <v-btn primary large block @click="redirigir()">Cancelar</v-btn>
                                        <p v-if="respuesta">{{limpiarFormulario()}}</p>
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
            Axios.post("http://localhost:8080/api/v1/usuario/crearUsuario", this.usuarioDTO)
            .then(Response => (this.respuesta = Response.data))
        },

        redirigir() {
            this.$router.push({name:'login'})
        },
        limpiarFormulario() {
            this.usuarioDTO.nombre = null;
            this.usuarioDTO.usuario = null;
            this.usuarioDTO.password = null;
            this.comprobarPass = null;
            this.respuesta = null
        }
    }
}
</script>