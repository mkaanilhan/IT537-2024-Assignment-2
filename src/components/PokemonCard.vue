<script>
export default{
    name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  data(){
    return{
        imageUrl:""
    }
  },
  mounted(){
    const id = parseInt(
    this.pokemon.url?.split("/")?.[(this.pokemon.url).split("/").length - 2] ?? "0"
  );

  this.imageUrl=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }
    
}



</script>

<template>




    <div class="max-w-[150px] flex justify-center items-center flex-col bg-slate-400 shadow-md rounded-md p-3">

        <img :src="imageUrl"/>

        <div>
            {{ pokemon.name }}

        </div>


    </div>




</template>