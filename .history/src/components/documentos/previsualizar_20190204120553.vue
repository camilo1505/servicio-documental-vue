<template>
  <div id="app">
    <viewer :options="options" :images="images"
            @inited="inited"
            class="viewer" ref="viewer"
    >
      <template slot-scope="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        {{scope.options}}
      </template>
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from "v-viewer/src/component.vue"
  export default {
    components: {
      Viewer
    },
    data() {
        return{
            images: ['https://www.google.com/search?q=imagenes&rlz=1C1NDCM_esCO810CO810&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiBnaGHyKLgAhXQs1kKHbW8D04Q_AUIDigB&biw=1366&bih=626#', '2.jpg']
        }
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  }
</script>