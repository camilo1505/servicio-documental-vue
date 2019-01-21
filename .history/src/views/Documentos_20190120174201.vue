<template>
   <div v-for="id in [1,2,3,4,5]" :key="id" class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" :href="'#collapse-'+index" >@{{ booking.description_title }}</a>
        </h4>
      </div>
      <div :id="'collapse-'+index" class="panel-collapse collapse in">
        <div class="panel-body">
          <ul>
            <li>Business Type: @{{ getBusinessType(booking.id) }}</li>
            <li>Asking Price: $ @{{ booking.price }}</li>
            <li>Date Created: @{{ booking.created_at }}</li>
            <li>Date Expires: @{{ booking.date_expire }}</li>
          </ul>
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
