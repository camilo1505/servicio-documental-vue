import Vue from 'vue'
import Router from 'vue-router'
import Documentos from './views/Documentos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'documentos',
      component: Documenntos
    },
  ]
})
