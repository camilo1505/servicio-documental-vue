<template>
    <v-form v-model="valid">
        <v-container>
            <v-layout>
                <v-flex xs12 md4>
                    <v-text-field v-model="user" label="Usuario" required></v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field v-model="password" label="Contraseña" required :type="'password'"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-btn slot="activator" color="primary" dark class="mb-2">Iniciar</v-btn>
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
}
</script>