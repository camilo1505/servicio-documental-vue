import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'

import VueWordCloud from 'vuewordcloud'
import VueClip from 'vue-clip'

Vue.component(VueWordCloud.name, VueWordCloud);
Vue.component(VueClip)


Vue.use(Vuetify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')