<template>
  <div class="dark:bg-gray-900 dark:text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-green-800 text-white">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <div class="relative z-10 text-center py-10 md:py-14 px-4">
        <h1 class="text-3xl md:text-5xl font-bold mb-2">Shop</h1>
        <p class="text-sm md:text-base">
          <router-link to="/" class="hover:underline">Home</router-link> / Shop
        </p>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 py-10 md:py-12 space-y-12">
      <!-- PLANTS -->
      <section ref="plantsSection">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-green-600">Plants</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="plant in plants"
            :key="plant.id"
            :product="plant"
            @add-to-cart="addToCart"
            class="card-hover"
          />
        </div>
      </section>

      <!-- TOOLS -->
      <section ref="toolsSection">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-green-600">Gardening Tools</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="tool in tools"
            :key="tool.id"
            :product="tool"
            @add-to-cart="addToCart"
            class="card-hover"
          />
        </div>
      </section>

      <!-- SEEDS -->
      <section ref="seedsSection">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-green-600">Seeds</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="seed in seeds"
            :key="seed.id"
            :product="seed"
            @add-to-cart="addToCart"
            class="card-hover"
          />
        </div>
      </section>

      <!-- POTS -->
      <section ref="potsSection">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-green-600">Pots</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="pot in pots"
            :key="pot.id"
            :product="pot"
            @add-to-cart="addToCart"
            class="card-hover"
          />
        </div>
      </section>

      <!-- GROW BAGS -->
      <section ref="growBagsSection">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-green-600">Grow Bags</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            v-for="bag in growBags"
            :key="bag.id"
            :product="bag"
            @add-to-cart="addToCart"
            class="card-hover"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../assets/data/products'
import { useCartStore } from '../store/cartStore'

const cart = useCartStore()
const route = useRoute()

// Sections DOM refs
const plantsSection = ref(null)
const toolsSection = ref(null)
const seedsSection = ref(null)
const potsSection = ref(null)
const growBagsSection = ref(null)

const plants = products.filter(p => p.category === 'plants')
const tools = products.filter(p => p.category === 'tools')
const seeds = products.filter(p => p.category === 'seeds')
const pots = products.filter(p => p.category === 'pots')
const growBags = products.filter(p => p.category === 'grow-bags')

function addToCart(product) {
  cart.addToCart(product)
}

// Map query name -> section ref
const sectionMap = {
  plants: plantsSection,
  tools: toolsSection,
  seeds: seedsSection,
  pots: potsSection,
  'grow-bags': growBagsSection,
}

function scrollToSection(name) {
  const targetRef = sectionMap[name]
  const el = targetRef?.value
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Initial load
onMounted(() => {
  const { section } = route.query
  if (section) {
    setTimeout(() => scrollToSection(section), 50)
  }
})

// If the query changes while on /shop
watch(
  () => route.query.section,
  newSection => {
    if (newSection) scrollToSection(newSection)
  }
)
</script>

<style>
.card-hover img {
  transition: transform 0.5s ease;
}
.card-hover:hover img {
  transform: scale(1.08);
}
</style>
