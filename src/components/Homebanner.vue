<template>
  <section class="relative bg-green-200 dark:bg-gray-700 py-16 flex flex-col items-center justify-center text-center">
    <transition name="fade" appear>
      <h1 class="text-4xl md:text-5xl font-bold text-green-900 dark:text-green-100 mb-4">
        Welcome to Sivaji Plant Nursery
      </h1>
    </transition>
    <transition name="fade" appear>
      <p class="text-lg md:text-xl text-green-700 dark:text-green-200 max-w-2xl">
        Fresh plants, curated for your home and garden. Explore our collection of indoor, outdoor, and succulent plants.
      </p>
    </transition>
    <router-link to="/products"
      class="mt-6 px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800 transition">
      Shop Now
    </router-link>
  </section>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
