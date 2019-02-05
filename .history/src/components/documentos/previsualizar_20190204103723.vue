<template>
  <div>
    <link href="//unpkg.com/viewerjs/dist/viewer.css" rel="stylesheet">
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/viewerjs/dist/viewer.js"></script>
<script src="//unpkg.com/v-viewer/dist/v-viewer.js"></script>
<div id="app">
  <div v-viewer class="images clearfix">
    <template v-for="image in images">
      <img :src="image" class="image" :key="image">
    </template>
  </div>
</div>

</template>

<script>
Vue.use(VueViewer.default)
console.log(VueViewer.default)
var Main = {
  methods: {
    toggle() {

    }
  },
  data() {
    return {
			images: [
        'https://picsum.photos/200/200',
      	'https://picsum.photos/300/200',
        'https://picsum.photos/250/200'
      ]
    }
  }
}
var App = Vue.extend(Main)
new App().$mount('#app')

</script>
<style>
.image {
    height: 200px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>

