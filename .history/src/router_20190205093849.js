import Vue from 'vue'
import Router from 'vue-router'
import tabla from './components/documentos/usage.vue'
import Registrarse from './components/registrarse.vue'
import cloudTag from './components/documentos/cloudTag.vue'



import Login from './components/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/tabla',
      name: 'tabla',
      component: tabla
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: Registrarse
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: cloudTag
    }
  ]
})
