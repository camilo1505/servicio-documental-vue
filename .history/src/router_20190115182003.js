import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MisDocumentos from './views/MisDocumentos.vue'
import BuscarDocumentos from './views/BuscarDocumentos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/misDocumentos/:usuario',
      name: 'MisDocumentos',
      component: MisDocumentos
    },
    {
      path: '/buscarDocumentos',
      name: 'BuscarDocumentos',
      component: BuscarDocumentos
    }
  ]
})
