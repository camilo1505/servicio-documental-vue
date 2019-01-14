import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.component('modal', {
  template: '#modal-template'
})
new Vue({
  el: '#app',
  data: {
    showModal: false
  }
})