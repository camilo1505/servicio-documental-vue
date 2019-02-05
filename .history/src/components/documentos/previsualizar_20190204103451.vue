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

  </div>
</template>

<script>
import Viewer from 'src'
import Vue from 'vue'
Vue.use(Viewer, {
  debug: true,
  defaultOptions: {
    zIndex: 9999
  }
})
const sourceImages = []
const base = parseInt((Math.random() * 60), 10) + 10
for (let i = 0; i < 10; i++) {
  sourceImages.push({
    thumbnail: 'https://picsum.photos/346/216/?image=' + (base + i),
    source: 'https://picsum.photos/1440/900/?image=' + (base + i)
  })
}
export default {
  data () {
    return {
      options: {
        toolbar: true,
        url: 'data-source'
      },
      images: [...sourceImages].splice(0, 5)
    }
  },
  computed: {
  },
  methods: {
    toggleToolbar (toolbar) {
      // this.options = Object.assign({}, this.options, {toolbar})
      this.options.toolbar = toolbar
    },
    add () {
      this.images.push(sourceImages[this.images.length])
    },
    remove () {
      this.images.pop()
    },
    show () {
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
    }
  }
}
</script>
<style>
.image {
    height: 200px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>

