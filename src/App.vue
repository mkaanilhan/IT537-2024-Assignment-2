

<template>
  <header class="bg-red-500 text-white p-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold">Pokedex</h1>
    <a href="#" class="text-white hover:underline">Login</a>
</header>

<main class="p-4">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4" >
      <div class="bg-white rounded-lg shadow p-4" v-for="item in list">
          <img src="https://via.placeholder.com/150" alt="Image 1" class="rounded-t-lg w-full">
          <p class="text-center mt-2">{{item.name}}</p>
      </div>
   
      <!-- Daha fazla kart ekleyebilirsiniz -->
  </div>
</main>
</template>

<script>

  export default {
    data (){

      return {

        list: []
      }
    },

   async created(){

      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')

      const res = await response.json()

      this.list = res.results



    }
    
  }
</script>

<style lang="scss" scoped>

</style>