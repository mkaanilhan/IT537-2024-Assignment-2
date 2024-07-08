<template>
  <div class="mb-6">
    <input 
      type="text" 
      v-model="searchQuery"
      @input="search"
      placeholder="Search Pokémon by name..."
      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const search = () => {
  emit('search', searchQuery.value.trim());
};
</script>