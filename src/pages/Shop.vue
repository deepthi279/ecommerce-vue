<template>
  <div class="dark:bg-gray-900 dark:text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center text-white">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center py-12">
        <h1 class="text-5xl font-bold mb-1">Shop</h1>
        <p class="text-lg">
          <router-link to="/" class="hover:underline">Home</router-link> / Shop
        </p>
      </div>
    </section>

    <div class="container mx-auto px-4 py-12">
      <!-- Indoor PLANTS -->
      <h2 class="text-3xl font-bold mb-6 text-green-600">Plants</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <router-link
          v-for="plant in plants"
          :key="plant.id"
          :to="`/product/${plant.id}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 block card-hover"
        >
          <img :src="plant.image" :alt="plant.name" class="h-48 w-full object-cover rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ plant.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ plant.description }}</p>
          <p class="text-green-600 font-bold mb-4">₹{{ plant.price }}</p>
          <button
            @click.stop.prevent="addToCart(plant)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </router-link>
      </div>

      <!-- TOOLS -->
      <h2 class="text-3xl font-bold mb-6 text-green-600">Gardening Tools</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <router-link
          v-for="tool in tools"
          :key="tool.id"
          :to="`/product/${tool.id}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 block card-hover"
        >
          <img :src="tool.image" :alt="tool.name" class="h-48 w-full object-cover rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ tool.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ tool.description }}</p>
          <p class="text-green-600 font-bold mb-4">₹{{ tool.price }}</p>
          <button
            @click.stop.prevent="addToCart(tool)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </router-link>
      </div>

      <!-- SEEDS -->
      <h2 class="text-3xl font-bold mb-6 text-green-600">Seeds</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <router-link
          v-for="seed in seeds"
          :key="seed.id"
          :to="`/product/${seed.id}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 block card-hover"
        >
          <img :src="seed.image" :alt="seed.name" class="h-48 w-full object-cover rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ seed.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ seed.description }}</p>
          <p class="text-green-600 font-bold mb-4">₹{{ seed.price }}</p>
          <button
            @click.stop.prevent="addToCart(seed)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </router-link>
      </div>

      <!-- POTS -->
      <h2 class="text-3xl font-bold mb-6 text-green-600">Pots</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <router-link
          v-for="pot in pots"
          :key="pot.id"
          :to="`/product/${pot.id}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 block card-hover"
        >
          <img :src="pot.image" :alt="pot.name" class="h-48 w-full object-cover rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ pot.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ pot.description }}</p>
          <p class="text-green-600 font-bold mb-4">₹{{ pot.price }}</p>
          <button
            @click.stop.prevent="addToCart(pot)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </router-link>
      </div>
      <!-- Responsive grid: 1 column mobile, 2 md, 3 lg -->
      <div class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard v-for="product in products" :key="product.id" :product="product"/>
        </div>
      </div>


      <!-- GROW BAGS -->
      <h2 class="text-3xl font-bold mb-6 text-green-600">Grow Bags</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <router-link
          v-for="bag in growBags"
          :key="bag.id"
          :to="`/product/${bag.id}`"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-4 block card-hover"
        >
          <img :src="bag.image" :alt="bag.name" class="h-48 w-full object-cover rounded mb-4" />
          <h3 class="text-xl font-bold mb-2">{{ bag.name }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ bag.description }}</p>
          <p class="text-green-600 font-bold mb-4">₹{{ bag.price }}</p>
          <button
            @click.stop.prevent="addToCart(bag)"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Add to Cart
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { products } from '../assets/data/products'
import { useCartStore } from '../store/cartStore'

const cart = useCartStore()

const plants = products.filter(p => p.category === 'plants')
const tools = products.filter(p => p.category === 'tools')
const seeds = products.filter(p => p.category === 'seeds')
const pots = products.filter(p => p.category === 'pots')
const growBags = products.filter(p => p.category === 'grow-bags')

function addToCart(product) {
  cart.addToCart(product)
}
</script>

<style>
.card-hover img {
  transition: transform 0.5s ease;
}
.card-hover:hover img {
  transform: scale(1.08);
}
</style>
