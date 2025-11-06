


// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// pages (relative imports; keep the file name exactly "Login.vue")
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Shop from '../pages/Shop.vue'
import Services from '../pages/Services.vue'
import Contact from '../pages/Contact.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/Login.vue'
import CreateAccount from '../pages/CreateAccountModal.vue'

// pinia stores used in guards
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/services', name: 'Services', component: Services },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true, requiresCart: true },
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount,
  },
  { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const cart = useCartStore()
  // allow routes that don't need anything
  if (!to.meta?.requiresAuth && !to.meta?.requiresCart) return true

  // needs auth?
  if (to.meta?.requiresAuth && !auth.isAuthed) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  // needs items?
  if (to.meta?.requiresCart) {
    const empty = !cart.items || cart.items.length === 0
    if (empty && to.name !== 'Shop') return { name: 'Shop' }
  }

  return true
})

export default router
