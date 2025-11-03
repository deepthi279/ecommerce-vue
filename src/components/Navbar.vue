<!-- src/components/Navbar.vue -->
<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cartStore'    // <-- correct import

const cart = useCartStore()                         // <-- create the store

// Show a safe count even when the store is still hydrating
const cartCount = computed(() => cart.itemCount ?? 0)
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-green-600">
        Sivaji Nursery
      </router-link>

      <div class="flex items-center gap-6">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link to="/about" class="hover:underline">About</router-link>
        <router-link to="/shop" class="hover:underline">Shop</router-link>
        <router-link to="/services" class="hover:underline">Services</router-link>
        <router-link to="/contact" class="hover:underline">Contact</router-link>

        <!-- Cart link with count -->
        <router-link to="/cart" class="hover:underline">
          Cart ({{ cartCount }})
        </router-link>
      </div>
    </div>
  </nav>
</template>
