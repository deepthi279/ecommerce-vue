<!-- src/components/Navbar.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/cartStore'

const cart = useCartStore()

// if you have a getter called itemCount use that, otherwise fallback to items.length
const cartCount = computed(() => {
  if (typeof cart.itemCount === 'number') return cart.itemCount
  if (Array.isArray(cart.items)) return cart.items.length
  return 0
})

const isOpen = ref(false)
const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu = () => { isOpen.value = false }
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Brand -->
      <router-link
        to="/"
        class="text-2xl font-bold text-green-600"
        @click="closeMenu"
      >
        Sivaji Nursery
      </router-link>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-2xl text-gray-700 dark:text-gray-100"
        type="button"
        @click="toggleMenu"
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      <!-- Links -->
      <nav
        class="hidden md:flex items-center gap-8 text-sm"
      >
        <router-link to="/" class="hover:text-green-600">Home</router-link>
        <router-link to="/about" class="hover:text-green-600">About</router-link>
        <router-link to="/shop" class="hover:text-green-600">Shop</router-link>
        <router-link to="/services" class="hover:text-green-600">Services</router-link>
        <router-link to="/contact" class="hover:text-green-600">Contact</router-link>
        <router-link to="/cart" class="hover:text-green-600 font-semibold">
          Cart ({{ cartCount }})
        </router-link>
      </nav>
    </div>

    <!-- Mobile dropdown -->
    <nav
      v-if="isOpen"
      class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 pb-4 space-y-2 text-sm"
    >
      <router-link to="/" @click="closeMenu" class="block py-1">Home</router-link>
      <router-link to="/about" @click="closeMenu" class="block py-1">About</router-link>
      <router-link to="/shop" @click="closeMenu" class="block py-1">Shop</router-link>
      <router-link to="/services" @click="closeMenu" class="block py-1">Services</router-link>
      <router-link to="/contact" @click="closeMenu" class="block py-1">Contact</router-link>
      <router-link to="/cart" @click="closeMenu" class="block py-1 font-semibold">
        Cart ({{ cartCount }})
      </router-link>
    </nav>
  </header>
</template>
