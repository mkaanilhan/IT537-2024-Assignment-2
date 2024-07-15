<template>
  <div class="container mx-auto px-4">
    <header class="bg-red-500 text-white p-4 flex justify-between items-center mb-4">
      <router-link to="/" class="text-2xl font-bold">Pokedex</router-link>
      <a href="#" class="text-white hover:underline">Login</a>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>