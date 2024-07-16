<script>
    export default {
        data(){
            return{
                
            }
        },
        
    }
</script>

<template>
    <div class='p-4 flex justify-between bg-gray-600'>
      <div class="container flex gap-4 justify-start">
      <div class="w-10 h-10">
        <img 
        src="https://img.icons8.com/?size=100&id=TYcqVDaDnqWb&format=png&color=000000"
        />
      </div>
      <div class="text-3xl text-white capitalize">
        Pokemon Name
      </div>
    </div>
      <button class="text-2xl text-white" @click="goBack">
      Back
      </button>  
    </div>
</template>
