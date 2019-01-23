import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

import Vuetify from 'vuetify'


Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

Vue.use(Vuetify);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
