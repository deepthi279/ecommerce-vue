<template>
  <div class="min-h-screen dark:bg-gray-900 dark:text-white">
    <div class="max-w-5xl mx-auto px-4 py-10 md:py-12">
      <router-link to="/shop" class="text-sm text-green-700 dark:text-green-300 hover:underline">
        ← Back to Shop
      </router-link>

      <div v-if="product" class="mt-6 grid md:grid-cols-2 gap-8 items-start">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full rounded-lg shadow-md h-72 md:h-96 object-cover"
        />

        <div>
          <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ product.name }}</h1>
          <p class="text-green-700 dark:text-green-300 text-xl font-semibold mb-4">
            ₹{{ product.price }}
          </p>

          <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
            {{ product.description || 'Beautiful plant from Sivaji Nursery.' }}
          </p>

          <button
            type="button"
            @click="addToCart(product)"
            class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div v-else class="mt-10 text-center text-gray-600 dark:text-gray-300">
        Product not found.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '../store/cartStore'
import { products } from '../assets/data/products'

const route = useRoute()
const cart = useCartStore()

const product = products.find(p => p.id === Number(route.params.id))

function addToCart(product) {
  cart.addToCart(product)
}
</script>
