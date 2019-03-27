<template>
  <pdf src="http://localhost:8080/resources/misterySnow/japones/08_Compiladores_.pdf" :page=1></pdf>
</template>

<script>
import axios from 'axios'

export default {
  components: {
  },
  mounted(){
    const board = 'resources/misterySnow/japones/08_Compiladores_.pdf';
    var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    axios.get('http://localhost:8080' + board + '/threads.json', config)
        .then(function (response) {
            console.log(response.data);
    });
  }
}
</script>