import { createRouter, createWebHistory } from "vue-router";
import PokemonDetail from "../views/PokemonDetail.vue";
import PokemonList from "../components/PokemonList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { checkUser } from "@/utils/utils";
import { message } from "ant-design-vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: PokemonList },
    { path: "/pokemon/:id", name: "PokemonDetail", component: PokemonDetail },
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = checkUser();

  if (authRequired && !loggedIn) {
    message.error("Please login first !");
    return next("/login");
  }

  next();
});

export default router;
