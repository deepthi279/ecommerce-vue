<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold mb-6">Your Cart</h2>

    <div v-if="cart.items.length">
      <div v-for="item in cart.items" :key="item.id" class="flex justify-between items-center mb-4 border-b pb-2">
        <div class="flex items-center gap-4">
          <img :src="item.image" :alt="item.name" class="w-20 h-20 rounded" />
          <div>
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">₹{{ item.price }} x {{ item.qty }}</p>
          </div>
        </div>
        <button @click="cart.removeFromCart(item.id)" class="text-red-500 hover:underline">Remove</button>
      </div>

      <div class="text-right mt-6">
        <p class="text-xl font-bold">Total: ₹{{ cart.totalPrice }}</p>
        <router-link to="/checkout" class="mt-4 inline-block px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800">
          Proceed to Checkout
        </router-link>
      </div>
    </div>

    <p v-else class="text-gray-600 text-center">Your cart is empty</p>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cartStore'
const cart = useCartStore()
</script>
