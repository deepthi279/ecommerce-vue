<!-- src/components/ProductCard.vue -->
<template>
  <article
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-[1.02] overflow-hidden flex flex-col"
  >
    <router-link :to="`/product/${product.id}`" class="block">
      <img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        class="w-full h-48 object-cover"
      />
    </router-link>

    <div class="p-4 flex flex-col flex-1">
      <h3 class="text-base md:text-lg font-semibold mb-1 dark:text-green-100 truncate">
        {{ product.name }}
      </h3>
      <p
        v-if="product.description"
        class="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2"
      >
        {{ product.description }}
      </p>

      <div class="mt-auto flex items-center justify-between pt-2">
        <span class="font-semibold text-green-700 dark:text-green-300">
          ₹{{ product.price }}
        </span>
        <button
          type="button"
          @click.stop="$emit('add-to-cart', product)"
          class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-xs md:text-sm text-white rounded shadow-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>
