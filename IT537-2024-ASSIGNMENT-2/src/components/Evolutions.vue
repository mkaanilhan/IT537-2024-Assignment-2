<template>
  <div id="evol-container" v-if="previousEvolutions.length || nextEvolutions.length">
    <h4 id="evol-title" class="text-xl font-bold mb-3">Evolutions</h4>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="evolution in limitedEvolutions"
        :key="evolution.name"
        class="pokemon-evol-sprite-container text-center"
      >
        <router-link :to="{ name: 'PokemonDetails', params: { name: evolution.name } }">
          <img class="pokemon-evol-sprite w-20 h-20 mx-auto" :src="evolution.sprite" />
          <p class="capitalize">{{ evolution.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evolutions",
  props: {
    pokemon: {
      type: Object,
      required: true
    },
  },
  computed: {
    previousEvolutions() {
      return this.pokemon.previous_evolution || [];
    },
    nextEvolutions() {
      return this.pokemon.next_evolution || [];
    },
    limitedEvolutions() {
      const allEvolutions = [...this.previousEvolutions, ...this.nextEvolutions];
      return allEvolutions.slice(0, 3);
    }
  },
  methods: {
    /**
     * Retrieve a Pokemon sprite.
     * @param {String} url - The URL of the Pokemon species.
     */
    getSprite(url) {
      const id = url.split('/').filter(Boolean).pop();
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    },
  },
};
</script>

<style scoped>
#evol-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.pokemon-evol-sprite-container {
  flex: 1;
}

.pokemon-evol-sprite {
  max-width: 100%;
  height: auto;
}

.text-center {
  text-align: center;
}
</style>
