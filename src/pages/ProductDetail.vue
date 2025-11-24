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

