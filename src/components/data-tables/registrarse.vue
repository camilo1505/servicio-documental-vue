<template>
    <v-form>
        <v-container>
            <v-layout justify-center=true>
                <v-flex xs12 md4>
                    <v-text-field v-model="usuarioDTO.nombre" label="Nombre" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center=true>
                <v-flex xs12 md4>
                    <v-text-field v-model="usuarioDTO.usuario" label="Usuario" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-flex xs12 md4>
                    <v-text-field v-model="usuarioDTO.password" label="Contraseña" required :type="'password'"></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
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