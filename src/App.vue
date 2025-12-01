<template>
  <div id="app">
    <!-- Top info bar -->
    <div class="top-info">
      <div class="top-info-inner">
        <span>🌱 Free delivery on orders above ₹999</span>
        <span class="top-info-right">
          Call / WhatsApp: <b>+91-98765 43210</b>
        </span>
      </div>
    </div>

    <!-- Main navbar -->
    <header class="top-nav">
      <div class="nav-container">
        <!-- Brand -->
        <router-link to="/" class="brand" @click="closeMenu">
          <div class="brand-logo">SN</div>
          <div class="brand-text">
            <div class="brand-title">Sivaji Nursery</div>
            <div class="brand-subtitle">Plants • Pots • Seeds</div>
          </div>
        </router-link>

        <!-- Right (mobile: cart + hamburger) -->
        <div class="mobile-right">
          <router-link to="/cart" class="mobile-cart" @click="closeMenu">
            🛒
            <span v-if="cartStore.items.length" class="mobile-cart-badge">
              {{ cartStore.items.length }}
            </span>
          </router-link>

          <button
            class="menu-toggle"
            @click="isOpen = !isOpen"
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        <!-- Links (desktop) -->
        <nav class="nav-links">
          <router-link to="/" class="nav-link">
            Home
          </router-link>
          <router-link to="/about" class="nav-link">
            About
          </router-link>
          <router-link to="/shop" class="nav-link">
            Shop
          </router-link>
          <router-link to="/services" class="nav-link">
            Services
          </router-link>
          <router-link to="/contact" class="nav-link">
            Contact
          </router-link>
          <router-link to="/cart" class="nav-link nav-cart">
            Cart ({{ cartStore.items.length }})
          </router-link>
        </nav>
      </div>

      <!-- Links (mobile dropdown) -->
      <nav class="nav-links-mobile" :class="{ 'is-open': isOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">
          Home
        </router-link>
        <router-link to="/about" class="nav-link" @click="closeMenu">
          About
        </router-link>
        <router-link to="/shop" class="nav-link" @click="closeMenu">
          Shop
        </router-link>
        <router-link to="/services" class="nav-link" @click="closeMenu">
          Services
        </router-link>
        <router-link to="/contact" class="nav-link" @click="closeMenu">
          Contact
        </router-link>
        <router-link to="/cart" class="nav-link" @click="closeMenu">
          Cart ({{ cartStore.items.length }})
        </router-link>
      </nav>
    </header>

    <!-- Page content -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from './store/cartStore'

const cartStore = useCartStore()
const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}
</script>

<style>
#app {
  min-height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

/* ---------- Top info bar ---------- */
.top-info {
  background: #064e3b; /* dark emerald */
  color: #ecfdf5;
  font-size: 0.75rem;
}

.top-info-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.4rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-info-right {
  display: none;
}

@media (min-width: 640px) {
  .top-info-right {
    display: inline;
  }
}

/* ---------- Main nav ---------- */
.top-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 40;
}

.nav-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* brand block */
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.brand-logo {
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 999px;
  background: #059669;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.95rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #064e3b;
}

.brand-subtitle {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  color: #6ee7b7;
}

/* desktop links */
.nav-links {
  display: none;
  align-items: center;
  gap: 1.75rem;
  font-size: 0.9rem;
  color: #4b5563;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.2rem;
  width: 0;
  height: 2px;
  background: #059669;
  transition: width 0.2s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #065f46;
  font-weight: 600;
}

/* desktop cart pill */
.nav-cart {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #a7f3d0;
  background: #ecfdf5;
  font-weight: 600;
}

/* mobile right side */
.mobile-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* mobile cart icon */
.mobile-cart {
  position: relative;
  font-size: 1.4rem;
  text-decoration: none;
  color: #065f46;
}

.mobile-cart-badge {
  position: absolute;
  top: -0.35rem;
  right: -0.6rem;
  background: #dc2626;
  color: #ffffff;
  border-radius: 999px;
  padding: 0.05rem 0.35rem;
  font-size: 0.6rem;
}

/* hamburger */
.menu-toggle {
  font-size: 1.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #111827;
}

/* mobile dropdown nav */
.nav-links-mobile {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem 0.8rem;
  font-size: 0.9rem;
  color: #4b5563;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
}

.nav-links-mobile.is-open {
  display: flex;
}

/* -------- desktop breakpoint -------- */
@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .mobile-cart {
    display: none;
  }

  .nav-links {
    display: flex;
  }

  .nav-links-mobile {
    display: none !important;
  }
}

/* avoid horizontal scroll */
body {
  margin: 0;
  overflow-x: hidden;
}
</style>
