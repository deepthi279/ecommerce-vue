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
  <template>
  <article class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
    <router-link :to="`/product/${product.id}`" class="block">
      <img
        :src="product.image"
        :srcset="product.srcset"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
        class="w-full h-44 sm:h-56 object-cover"
        :alt="product.title"
      />
      <div class="p-4">
        <h3 class="text-base font-medium truncate">{{ product.title }}</h3>
        <p class="text-sm text-gray-500 mt-2 line-clamp-2">{{ product.shortDescription }}</p>
        <div class="mt-3 flex items-center justify-between">
          <span class="font-semibold">{{ formatPrice(product.price) }}</span>
          <button class="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">Add</button>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    formatPrice(p) { return '$' + parseFloat(p).toFixed(2) }
  }
}
</script>

</template>

<script setup>
defineProps({
  product: Object
})
</script>
