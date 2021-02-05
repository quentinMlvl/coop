import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/creer-compte',
    component: () => import('../views/CreerCompte.vue')
  },
  {
    path: '/membres',
    component: () => import('../views/Membres.vue')
  },
  {
    path: '/membres/:id',
    name: 'Membre',
    component: () => import('../views/Membre.vue')
  },
  {
    path: '/se-connecter',
    component: () => import('../views/SeConnecter.vue')
  },
  {
    path: '/conversation/:id',
    name: 'Conversation',
    component: () => import('../views/Conversation.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
