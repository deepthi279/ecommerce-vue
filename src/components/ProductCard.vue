<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 p-4"
  >
    <img :src="product.image" :alt="product.name" class="rounded-md w-full h-48 object-cover" />
    <h3 class="mt-4 text-xl font-semibold dark:text-green-200">{{ product.name }}</h3>
    <p class="text-gray-600 dark:text-gray-400">₹{{ product.price }}</p>
    <button
      @click="$emit('add-to-cart', product)"
      class="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
      Add to Cart
    </button>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>
