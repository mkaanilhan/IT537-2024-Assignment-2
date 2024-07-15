<template>

  <main>
    <div class="grid gap-16 px-32 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      <div v-for="item in results">
        <CardComponent :name="item.name"/>
      </div>
    </div>
  </main>

</template>



<script>
  import CardComponent from '../components/cards/CardComponent.vue';

  export default{

    name:"Home",

    components: {
      CardComponent
    },

    data() {
      return {
        count: 0,
        next: 'https://pokeapi.co/api/v2/pokemon/?limit=24',
        results: [],
        loading: false
      }
    },

    methods: {

      async fetchPokemonList() {
        if (this.loading || !this.next) 
          return;
        this.loading = true;
        try {
          const response = await fetch(this.next);
          const data = await response.json();
          this.count = data.count;
          this.next = data.next;
          this.results.push(...data.results.map(result => ({name: result.name, url: result.url})));
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        } finally {
          this.loading = false;
        }
      },

      handleScroll() {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.fetchPokemonList();
        }
      }      
    },

    mounted() {
      this.fetchPokemonList();
      window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }

  }
</script>

<style>
</style>