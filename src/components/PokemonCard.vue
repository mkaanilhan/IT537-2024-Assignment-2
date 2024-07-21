<script>
import { RouterLink } from "vue-router";

export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      imageUrl: "",
      id: "",
    };
  },
  mounted() {
    const id = parseInt(
      this.pokemon.url?.split("/")?.[this.pokemon.url.split("/").length - 2] ??
        "0"
    );
    this.id = `/pokemon/${id}`;

    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  },
};
</script>

<template>
  <RouterLink
    :to="id"
    class="max-w-[150px] flex justify-center items-center flex-col bg-slate-400 shadow-md rounded-md p-3"
  >
    <img :src="imageUrl" />

    <div>
      {{ pokemon.name }}
    </div>
  </RouterLink>
</template>
