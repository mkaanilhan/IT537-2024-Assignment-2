import { createRouter, createWebHistory } from "vue-router";
import PokemonDetail from "../views/PokemonDetail.vue";
import PokemonList from "../components/PokemonList.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: PokemonList },
    { path: "/pokemon/:id", name: "PokemonDetail", component: PokemonDetail },
    { path: "/login", name: "Login", component: Login },
  ],
});

export default router;
