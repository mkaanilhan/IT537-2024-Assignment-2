<script>
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      pokemon: {},
      imageUrl: "",
    };
  },
  methods: {
    fetchPokemons(id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((res) => (this.pokemon = res))
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    const id = useRoute().params.id;
    this.fetchPokemons(id);

    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};
</script>

<template>
  <div
    class="grid grid-cols-1 gap-3 bg-slate-400 bg-opacity-50 shadow-md rounded-md p-6"
  >
    <img class="max-w-[200px] m-auto" :src="imageUrl" :alt="pokemon.name" />

    <h1 class="text-2xl font-bold uppercase text-center">
      {{ pokemon.name }}
    </h1>

    <ul>
      <li>
        <strong> Height: </strong>
        {{ pokemon.height }}
      </li>

      <li>
        <strong> Weight: </strong>

        {{ pokemon.weight }}
      </li>

      <li>
        <strong> Base Experience: </strong>

        {{ pokemon.base_experience }}
      </li>

      <li>
        <span>
          <strong> Abilities: </strong>
        </span>

        <span v-for="(ability, index) in pokemon.abilities" :key="index">
          {{ ability.ability.name }}
          {{ index + 1 !== pokemon.abilities.length ? "," : "" }}
        </span>
      </li>
    </ul>
  </div>
</template>
