import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import PokemonDetail from '@/views/PokemonDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:id', component: PokemonDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
