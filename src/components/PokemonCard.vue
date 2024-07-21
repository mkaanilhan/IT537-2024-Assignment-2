<script>
export default{
    name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
    
}



</script>

<template>

    <div>

        {{ pokemon.name }}


    </div>


</template>