<template>
    <div>
      <h1 class="text-5xl font-bold mb-4 capitalize">{{ pokemon.name }}</h1>
      <p class="text-lg">{{ getFlavorText(pokemon.species.flavor_text_entries) }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderInformation",
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    methods: {
      getFlavorText(entries) {
        const entry = entries.find(entry => entry.language.name === 'en');
        return entry ? entry.flavor_text : 'No description available.';
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  </style>
  