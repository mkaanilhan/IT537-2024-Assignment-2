<template>
  <div class="home container mx-auto px-4">
    <SearchBar @search="searchPokemon" />
    <div v-if="isLoading" class="text-center my-8">Loading...</div>
    <div v-else-if="error" class="text-center my-8 text-red-500">{{ error }}</div>
    <PokemonList v-else :pokemons="pokemons" />
    <div v-if="!isSearching" class="mt-8 flex justify-center items-center space-x-2">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import PokemonList from '@/components/PokemonList.vue';

const pokemons = ref([]);
const currentPage = ref(1);
const itemsPerPage = 20;
const totalPokemons = ref(0);
const isLoading = ref(false);
const error = ref(null);
const isSearching = ref(false);

const fetchPokemons = async (page = 1) => {
  isLoading.value = true;
  error.value = null;
  try {
    const offset = (page - 1) * itemsPerPage;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
    const data = await response.json();
    pokemons.value = data.results;
    totalPokemons.value = data.count;
  } catch (err) {
    console.error('Error fetching pokemons:', err);
    error.value = 'Failed to fetch Pokémon. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const searchPokemon = async (query) => {
  if (query.trim() === '') {
    isSearching.value = false;
    currentPage.value = 1;
    await fetchPokemons(1);
    return;
  }

  isSearching.value = true;
  isLoading.value = true;
  error.value = null;

  try {
    // Fetch all Pokémon (you might want to limit this in a real application)
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    
    // Filter Pokémon based on the query
    const filteredPokemon = data.results.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredPokemon.length > 0) {
      pokemons.value = filteredPokemon;
      totalPokemons.value = filteredPokemon.length;
    } else {
      pokemons.value = [];
      totalPokemons.value = 0;
      error.value = 'No Pokémon found matching that name.';
    }
  } catch (err) {
    console.error('Error searching pokemon:', err);
    error.value = 'Error occurred while searching. Please try again.';
    pokemons.value = [];
    totalPokemons.value = 0;
  } finally {
    isLoading.value = false;
  }
};


const totalPages = computed(() => Math.ceil(totalPokemons.value / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchPokemons(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchPokemons(currentPage.value);
  }
};

onMounted(() => fetchPokemons(1));
</script>