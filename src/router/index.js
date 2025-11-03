// import { createRouter, createWebHistory } from 'vue-router'

// // pages (relative imports)
// import Home from '../pages/Home.vue'
// import About from '../pages/About.vue'
// import Shop from '../pages/Shop.vue'
// import Services from '../pages/Services.vue'
// import Contact from '../pages/Contact.vue'
// import Cart from '../pages/Cart.vue'
// import Checkout from '../pages/Checkout.vue'
// import Login from '../pages/login.vue'

// // pinia stores used in guards (relative imports)
// import { useAuthStore } from '../store/authStore'
// import { useCartStore } from '../store/cartStore'

// const routes = [
//   { path: '/', name: 'Home', component: Home },
//   { path: '/about', name: 'About', component: About },
//   { path: '/shop', name: 'Shop', component: Shop },
//   { path: '/services', name: 'Services', component: Services },
//   { path: '/contact', name: 'Contact', component: Contact },
//   { path: '/cart', name: 'Cart', component: Cart },
//   { path: '/login', name: 'Login', component: Login },
//   {
//     path: '/checkout',
//     name: 'Checkout',
//     component: Checkout,
//     meta: { requiresAuth: true, requiresCart: true }
//   },
//   { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
//   scrollBehavior: () => ({ top: 0 })
// })

// router.beforeEach((to) => {
//   const auth = useAuthStore()
//   const cart = useCartStore()

//   // allow everything that doesn't need auth/cart
//   if (!to.meta?.requiresAuth && !to.meta?.requiresCart) return true

//   // needs auth?
//   if (to.meta?.requiresAuth && !auth.isAuthed) {
//     // (optional) open your modal if your UI listens to this
//     auth.openModal?.()
//     if (to.name !== 'Home') return { name: 'Home', query: { login: '1' } }
//     return true
//   }

//   // needs items?
//   if (to.meta?.requiresCart) {
//     const empty = !cart.items || cart.items.length === 0
//     if (empty && to.name !== 'Shop') return { name: 'Shop' }
//   }

//   return true
// })

// export default router


import { createRouter, createWebHistory } from 'vue-router'

// pages (relative imports)
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Shop from '../pages/Shop.vue'
import Services from '../pages/Services.vue'
import Contact from '../pages/Contact.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/login.vue' // make sure the file casing matches this import!


// pinia stores used in guards
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
// import CreateAccountModal from '../pages/CreateAccountModal.vue'
import CreateAccount from "../pages/CreateAccountModal.vue";
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
    meta: { requiresAuth: true, requiresCart: true }
  },
  {
    path: "/create-account",
    name: "CreateAccount",
    component: CreateAccount,
  },

  { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const cart = useCartStore()

  // allow routes that don't need anything
  if (!to.meta?.requiresAuth && !to.meta?.requiresCart) return true

  // needs auth?
  if (to.meta?.requiresAuth && !auth.isAuthed) {
    // send to Login and remember where we wanted to go
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
