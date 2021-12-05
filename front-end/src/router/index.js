import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Prioritized from '../views/Prioritized.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/priority',
  //   name: 'Priority',
  //   component: Prioritized,
  // },
  {
    path: '/class',
    name: 'Classes',
    component: () => import('../views/Classes.vue')
  },
  {
    path: '/class/:class',
    name: 'Class',
    component: () => import('../views/Class.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
