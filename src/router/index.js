import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonDetailsView from '../views/PokemonDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'Home', component: HomeView},
    {path: '/pokemon/:name', name: 'Pokemon Details', component: PokemonDetailsView},
    {path: '/about', name: 'About', component: () => import('../views/AboutView.vue') }
  ]})

export default router
