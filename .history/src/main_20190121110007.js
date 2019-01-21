import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueTableRowEdit from 'vue-table-row-edit'
import 'vue-table-row-edit/dist/vue-table-row-edit.min.css'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)


Vue.use(ElementUI)
Vue.use(VueTableRowEdit)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
