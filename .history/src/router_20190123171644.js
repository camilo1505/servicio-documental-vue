import Vue from 'vue'
import Router from 'vue-router'
import tabla from './components/data-tables/usage.vue'
import MultipleFileUpload from './components/data-tables/sort.vue'
import Registrarse from './components/data-tables/registrarse.vue'


import Login from './components/data-tables/login.vue'

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
