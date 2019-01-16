<template>
    <div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            usuario: null,
        }
    },
    methods: {
        consultarUsuario(nombreUsuario, password) {
            axios
            .get()
        }

    }
}
</script>

<style>

</style>
