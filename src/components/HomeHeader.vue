<script>
export default{
    data (){
        return{
          header:"POKEDEX",
          login:"Login",
          searchCriteria:"",
        }
    },
    methods:{

    }
}
</script>
<template>
    <div class='p-4 flex justify-between bg-gray-400 rounded-lg'>
      <div class="container flex gap-4 justify-start">
      <div class="w-10 h-10">
        <img 
        src="https://img.icons8.com/?size=100&id=TYcqVDaDnqWb&format=png&color=000000"
        />
      </div>
      <div class="text-3xl text-white">
        {{ header }}
      </div>
    </div>
      <input class="text-xl w-2/5 rounded-lg" v-model="searchCriteria" placeHolder=" Search pokemon">
      </input>
    </div>
</template>