<template>
  <div id="weaknesses" class="my-4">
    <h4 id="weaknesses-title" class="text-xl font-bold mb-3">Weaknesses</h4>
    <table class="w-full border-collapse">
      <tr v-for="weakness in pokemon.types" :key="weakness.type.name">
        <td class="p-2 border border-gray-300 text-left">
          <div class="type-box inline-block px-2 py-1 border border-gray-300 rounded-full" :class="getTypeClass(weakness.type.name)">
            {{ weakness.type.name }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Weaknesses",
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTypeClass(type) {
      switch(type) {
        case 'fire':
          return 'bg-red-500 text-white';
        case 'water':
          return 'bg-blue-500 text-white';
        case 'grass':
          return 'bg-green-500 text-white';
        default:
          return 'bg-gray-500 text-white';
      }
    }
  }
};
</script>

<style scoped>
</style>
