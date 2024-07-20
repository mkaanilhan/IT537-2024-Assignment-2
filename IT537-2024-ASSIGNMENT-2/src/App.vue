<template>
  <div id="app">
    <header class="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/"> 
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Pokemon Ball"
            class="w-10 h-10 cursor-pointer mr-2"
          />
        </router-link>
        <router-link to="/" class="text-2xl font-bold cursor-pointer">
          Pokedex
        </router-link>
      </div>
      <a href="#" class="text-white hover:underline">Login</a>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style scoped>
</style>
