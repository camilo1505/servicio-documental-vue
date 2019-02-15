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

this.$http.get('http://localhost:8080/api/v1/users',
      {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        ).then(function (response) {
          // Success
        }, function (response) {
          // Error
        })

Vue.use(Vuetify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
