import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePokemonDetailStore = defineStore('pokemonDetail', {  
  state(){
    return{
      pokemonDetailList:[]
    }
  },
  actions:{
    add(pokemonDetail){
      this.pokemonDetailList.push(pokemonDetail)
    },
    removeAllList(){
      this.pokemonDetailList=[]
    }
    /*remove(pizza){
      const index = this.basketList.findIndex((element) => element.id===pizza.id)
      this.basketList.splice(index,1)
    }*/
  }
})