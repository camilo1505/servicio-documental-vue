<template>
    <div>
        
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