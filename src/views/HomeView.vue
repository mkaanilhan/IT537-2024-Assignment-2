<script>
import PokemonCard from "@/components/PokemonCard.vue";

export default {
  components: { PokemonCard },

  data() {
    return {
      pokemons: [],
      offset: 50,
    };
  },
  methods: {
    fetchPokemons() {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${this.offset}`)
        .then((res) => res.json())
        .then((res) => (this.pokemons = [...this.pokemons, ...res.results]))
        .catch((err) => console.log(err));
    },
    handleclick() {
      this.offset += 50;
      this.fetchPokemons();
    },
  },
  mounted() {
    this.fetchPokemons();
  },
};
</script>

<template>
  <div
    class="max-w-[1200px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5"
  >
    <PokemonCard
      v-for="(pokemon, index) in pokemons"
      :key="index"
      :pokemon="pokemon"
    />
  </div>

  <button
    class="font-bold bg-slate-500 text-white px-4 py-2 m-auto mb-5"
    @click="handleclick"
  >
    Load More
  </button>
</template>
