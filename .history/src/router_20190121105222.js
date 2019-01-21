import Vue from 'vue'
import Router from 'vue-router'
import Documentos from './views/Documentos.vue'
import CrearDocumento from './views/crearDocumento.vue'
import tabla from './views/tabla.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'documentos',
      component: Documentos
    },
    {
      path: '/crearDocumento',
      name: 'crearDocumento',
      component: CrearDocumento
    },
    {
      path: '/tabla',
      name: 'tabla',
      component: tabla
    }
  ]
})
