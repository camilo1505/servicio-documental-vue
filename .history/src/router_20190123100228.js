import Vue from 'vue'
import Router from 'vue-router'
import Documentos from './views/Documentos.vue'
import CrearDocumento from './views/crearDocumento.vue'
import tabla from './components/data-tables/usage.vue'
import MultipleFileUpload from './components/data-tables/sort.vue'

import Login from './components/data-tables/login.vue'

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
    },
    {
      path: '/crud',
      name: 'crud',
      component: MultipleFileUpload
      path: '/pruebasDesigne',
      name: 'pruebasDesigne',
      component: PruebasDesigne
    },
    {
      path: '/login',
      name: 'login',
      component: Login
>>>>>>> be7ae31b43a98031af26cacb2091868040ce1a64
    }

  ]
})
