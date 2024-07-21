<template>
  <div>
    <main class="p-8 bg-gray-100 min-h-screen">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          class="bg-white rounded-lg shadow-lg p-4 hover:bg-gray-200 transition cursor-pointer"
          v-for="item in displayedList"
          :key="item.name"
          @click="viewDetails(item.name)"
        >
          <img
            :src="getPokemonImageUrl(item.url)"
            alt="Pokemon Image"
            class="rounded-t-lg w-full"
          />
          <p class="text-center mt-4 font-bold text-gray-900 capitalize">{{ item.name }}</p>
        </div>
      </div>
      <div class="mt-8 text-center">
        <button @click="loadMore" class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition">Load More</button>
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
      limit: 16,
      offset: 0,
      isLoading: true,
    };
  },
  async created() {
    await this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
      const res = await response.json();
      this.list = [...this.list, ...res.results];
      this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      this.offset += this.limit;
      this.isLoading = false;
    },
    getPokemonImageUrl(url) {
      const pokemonId = url.split('/')[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    },
    loadMore() {
      const additionalLimit = 12;
      this.displayedList = this.list.slice(0, this.displayedList.length + additionalLimit);
      if (this.displayedList.length >= this.list.length) {
        this.fetchPokemon();
      }
    },
    async viewDetails(name) {
      this.isLoading = true;
      this.$router.push({ name: 'detail', params: { name } });
    }
  }
};
</script>

<style scoped>
.main {
  background-color: #f3f4f6;
  min-height: 100vh;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: background-color 0.2s;
  cursor: pointer;
}

.card:hover {
  background-color: #e5e7eb;
}

.card img {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  width: 100%;
}

.card p {
  margin-top: 1rem;
  font-weight: bold;
  color: #1f2937;
  text-align: center;
  text-transform: capitalize;
}

button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2563eb;
}
</style>
