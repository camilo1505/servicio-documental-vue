import Vue from 'vue'
import Router from 'vue-router'
import tabla from './components/documentos/usage.vue'
import MultipleFileUpload from './components/sort.vue'
import Registrarse from './components/registrarse.vue'
import cloudTag from './components/documentos/cloudTag.vue'
import previ from './components/documentos/previsualizar.vue'


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
      path: '/previsualizar',
      name: 'previsualizar',
      component: MultipleFileUpload,
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
