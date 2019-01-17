import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import MisDocumentos from './views/MisDocumentos.vue'
import BuscarDocumentos from './views/BuscarDocumentos.vue'
import archivosEjemplo from './views/archivosEjemplo'
import CrearDocumento from './views/crearDocumento'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
    },
    {
      path: '/archivosEjemplo',
      name: 'archivosEjemplo',
      component: archivosEjemplo
    },
    {
      path: '/crearDocumento/:usuario',
      name: 'CrearDocumento',
      component: CrearDocumento
    },
  ]
})
