<template>
  <section
    class="relative bg-green-100 dark:bg-gray-700 py-16 md:py-24 flex flex-col items-center justify-center text-center px-4"
  >
    <transition name="fade" appear>
      <h1 class="text-3xl md:text-5xl font-bold text-green-900 dark:text-green-100 mb-4">
        Welcome to Sivaji Plant Nursery
      </h1>
    </transition>

    <transition name="fade" appear>
      <p class="text-base md:text-xl text-green-700 dark:text-green-200 max-w-2xl">
        Fresh plants curated for your home and garden. Explore our collection of indoor plants,
        outdoor plants, seeds, pots and grow bags – everything you need to build your green corner.
      </p>
    </transition>

    <router-link
      to="/shop"
      class="mt-8 inline-flex items-center px-8 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition shadow"
    >
      Shop Now
    </router-link>
  </section>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
