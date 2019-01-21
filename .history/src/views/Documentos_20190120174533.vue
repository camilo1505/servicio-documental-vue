<template>
   <div>
       <div v-for="id in [1,2,3,4,5]" :key="id" class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" :href="'#collapse-'+id" >Prueba {{id}}</a>
        </h4>
      </div>
      <div :id="'collapse-'+id" class="panel-collapse collapse in">
        <div class="panel-body">
          <ul>
            <li>prueba a</li>
            <li>prueba b</li>
            <li>prueba c</li>
            <li>prueba d</li>
          </ul>
        </div>
      </div>
    </div>
   </div>
</template>


<script>
import Axios from 'axios';
export default {
    name: 'Documentos',
    data(){
        return {
            documentos: null,
        }
    }
}
</script>

<style>

</style>
