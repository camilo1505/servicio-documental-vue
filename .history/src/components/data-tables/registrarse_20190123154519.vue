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
                                    <h4>Registrarse</h4>
                                </v-card-title>
                                <v-form>
                                    <v-text-field v-model="user" prepend-icon="person" name="Username" label="Username"></v-text-field>
                                    <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
                                    <v-text-field v-model="password" prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
                                    <v-card-actions>
                                        <v-btn primary large block @click="comprobarUsuario()">Guardar</v-btn>
                                        <v-btn primary large block @click="cerrarSecion()">Cancelar</v-btn>
                                        <p v-if="respuesta">{{usuario()}}</p>
                                        <p v-if="respuesta == 200">{{redirigir()}}</p>
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
                nombre:"",
                usuario:"",
                password:"",
                tipoUsuario:false
            }
        }
    }
}
</script>