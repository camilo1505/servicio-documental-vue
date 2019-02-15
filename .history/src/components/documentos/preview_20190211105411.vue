<template>
  <pdf src="http://localhost:8080/resources/misterySnow/japones/08_Compiladores_.pdf" :page=1></pdf>
</template>

<script>
import pdf from 'pdfvuer'
import axios from 'axios'

export default {
  components: {
    pdf
  },
  mounted(){
    const board = this.props.routeParams.tag;
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