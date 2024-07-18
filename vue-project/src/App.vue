<template>
  <div class="container mx-auto px-4">
    <header class="bg-red-500 text-white p-4 flex justify-between items-center mb-4">
      <router-link to="/" class="text-4xl font-bold mx-auto">Pokedex</router-link>
      <a href="#" class="text-white hover:underline border border-gray-300 p-2 rounded">Login</a>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>