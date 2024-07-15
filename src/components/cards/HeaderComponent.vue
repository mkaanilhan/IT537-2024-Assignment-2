<template>
      <header class="sticky top-0 z-40 backdrop-blur border-b border-slate-300/5 supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
        <div class="container w-2/3 mx-auto px-16 flex justify-between items-center">
            <router-link :to="{ path: `/` }">
                <img src="../../../public/logo.png" alt="YAPA" class="w-24">
            </router-link>  
            <router-link :to="{ path: `/about` }">
                <nav class="hidden md:flex space-x-6">
                    <a class="text-lg text-gray-200 hover:text-yellow-200">About</a>
                </nav>
            </router-link>
        </div>
    </header>
</template>

<script>
</script>
