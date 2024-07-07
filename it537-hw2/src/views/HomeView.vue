<template>
  <div>
    <main class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          class="bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition cursor-pointer"
          v-for="item in displayedList"
          :key="item.name"
          @click="viewDetails(item.name)"
        >
          <img
            :src="getPokemonImageUrl(item.url)"
            alt="Pokemon Image"
            class="rounded-t-lg w-full"
          />
          <p class="text-center mt-2 font-bold text-black">{{ item.name }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      displayedList: [],
      limit: 12,
      offset: 0,
      isLoading: true,
    };
  },
  async created() {
    await this.fetchPokemon();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`);
      const res = await response.json();
      this.list = [...this.list, ...res.results];
      this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      this.offset += this.limit;
    },
    getPokemonImageUrl(url) {
      const pokemonId = url.split('/')[6];
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        this.loadMore();
      }
    },
    loadMore() {
      if (this.displayedList.length < this.list.length) {
        this.displayedList = this.list.slice(0, this.displayedList.length + this.limit);
      } else {
        this.fetchPokemon();
      }
    },
    viewDetails(name) {
      this.$router.push({ name: 'PokemonDetails', params: { name } });
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1em;
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

.bg-white {
  background-color: white;
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-4 {
  padding: 1rem;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.transition {
  transition: background-color 0.2s;
}

.text-center {
  text-align: center;
}

.mt-2 {
  margin-top: 0.5rem;
}

.font-bold {
  font-weight: bold;
}

.text-black {
  color: black;
}

.w-full {
  width: 100%;
}

.rounded-t-lg {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
