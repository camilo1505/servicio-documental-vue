import Vue from 'vue'
import Router from 'vue-router'
import tabla from './components/documentos/usage.vue'
import MultipleFileUpload from './components/sort.vue'
import Registrarse from './components/registrarse.vue'
import Tabla2 from './components/documentos/Tabla.vue'


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
      path: '/crud',
      name: 'crud',
      component: MultipleFileUpload,
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: Registrarse
    }
  ]
})
