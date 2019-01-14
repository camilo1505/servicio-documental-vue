import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'

new Vue({
  router,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
