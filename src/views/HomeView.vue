<script>
import PokemonCard from '@/components/PokemonCard.vue';

export default{

  components:{PokemonCard},


data(){
    return{

        pokemons:[]
    }
},
methods:{

    fetchPokemons(){
      fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=100")
      .then((res)=> (res.json()))
      .then((res)=>this.pokemons=res.results)
      .then((res)=>console.log(res))
      .catch((err)=>console.log(err))}

},
mounted(){
    this.fetchPokemons()
}

}

</script>

<template>

  <div class="max-w-[1200px] grid grid-cols-4 gap-5 py-5">
    <PokemonCard v-for="(pokemon, index) in pokemons" :key="index":pokemon="pokemon"/>

  </div>


</template>