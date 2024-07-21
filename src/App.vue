<script>
import { routerViewLocationKey } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="flex flex-col justify-between items-center min-h-[100vh]">
    <header class="bg-black text-white w-full px-3 py-2">
      <RouterLink to="/"> POKEMON </RouterLink>
    </header>

    <RouterView> </RouterView>

    <footer class="bg-black text-white w-full text-center px-3 py-2">
      <div>Pokemon_App</div>

      <div>by Eray Ermis</div>
    </footer>
  </div>
</template>
