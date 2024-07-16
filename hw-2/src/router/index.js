import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../views/Pokemon.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: Pokemon
  }
]

const router = createRouter({
  history: createWebHistory
  (import.meta.env.BASE_URL),
  routes,
})

export default router