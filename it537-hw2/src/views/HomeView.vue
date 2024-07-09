<template>
  <div>
    <main class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          class="bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition cursor-pointer"
          v-for="item in displayedList"
          :key="item.name"
          @click="viewDetails(item.name)"
        >
          <img
            :src="getPokemonImageUrl(item.url)"
            alt="Pokemon Image"
            class="rounded-t-lg w-full"
          />
          <p class="text-center mt-2 font-bold text-black">{{ item.name }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      list: [],
      displayedList: [],
      limit: 12,
      offset: 0,
      isLoading: true,
    };
  },
  async created() {
    await this.fetchPokemon();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
      const res = await response.json();
      this.list = [...this.list, ...res.results];
      this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      this.offset += this.limit;
    },
    getPokemonImageUrl(url) {
      const pokemonId = url.split('/')[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.displayedList.length < this.list.length) {
        this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      } else {
        this.fetchPokemon();
      }
    },
    async viewDetails(name) {
      this.isLoading = true;
      this.$router.push({ name: 'PokemonDetails', params: { name } });
    }
  }
};
</script>

<style scoped>
</style>

