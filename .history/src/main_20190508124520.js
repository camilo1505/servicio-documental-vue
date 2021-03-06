import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

import VueWordCloud from 'vuewordcloud'

Vue.component(VueWordCloud.name, VueWordCloud);

import VuePreview from 'vue-preview'
 
// defalut install
Vue.use(VuePreview)
 
// with parameters install
Vue.use( {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})


Vue.use(Vuetify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
