// src/store/cartStore.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // each item: { id, name, price, qty, image }
    items: []
  }),
  getters: {
    itemCount: (s) => s.items.reduce((n, it) => n + (it.qty || 1), 0),
    totalPrice: (s) => s.items.reduce((sum, it) => sum + it.price * (it.qty || 1), 0)
  },
  actions: {
    addToCart(product) {
      const found = this.items.find(i => i.id === product.id)
      if (found) {
        found.qty = (found.qty || 1) + 1
      } else {
        this.items.push({ ...product, qty: 1 })
      }
    },
    removeFromCart(id) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clearCart() {
      this.items = []
    }
  }
})
