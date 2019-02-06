<template>
  <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
</template>
 
<script>
export default {
    data () {
      return {
        slide1: [
          {
            src: 'http://localhost:8081/src/main/resources/archivos/misterySnow/tesis%20publico/img003 (2).jpg',
            msrc: '',
            alt: 'visualizar',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ]
      }
    },
    methods: {
      handleClose () {
        console.log('close event')
      }
    }
  }
</script> 