<template>
  <div id="app">
    <!-- Top navbar -->
    <header class="top-nav">
      <div class="nav-container">
        <!-- Brand -->
        <router-link to="/" class="brand">
          Sivaji Nursery
        </router-link>

        <!-- Mobile menu button -->
        <button class="menu-toggle" @click="isOpen = !isOpen" aria-label="Toggle navigation">
          ☰
        </button>

        <!-- Links (desktop & mobile) -->
        <nav class="nav-links" :class="{ 'is-open': isOpen }">
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
          <router-link to="/cart" class="nav-link nav-cart" @click="closeMenu">
            Cart ({{ cartStore.items.length }})
          </router-link>
        </nav>
      </div>
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

/* top nav styling */
.top-nav {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.nav-container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
}

/* brand text */
.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #16a34a; /* green */
  text-decoration: none;
}

/* -------- mobile-first styles -------- */

/* hamburger visible by default (mobile) */
.menu-toggle {
  margin-left: auto;
  font-size: 1.6rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* nav hidden by default (mobile) */
.nav-links {
  display: none;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
  gap: 0.75rem;
  font-size: 1rem;
  color: #4b5563;
}

.nav-links.is-open {
  display: flex;
}

/* normal link style */
.nav-link {
  text-decoration: none;
  color: inherit;
}

/* active route highlight */
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: #111827;
  font-weight: 600;
}

/* -------- desktop styles -------- */
@media (min-width: 768px) {
  .menu-toggle {
    display: none; /* hide hamburger on desktop */
  }

  .nav-container {
    display: flex;
    align-items: center;
  }

  .nav-links {
    display: flex;        /* always visible on desktop */
    flex-direction: row;
    gap: 2.5rem;
    margin-left: 2.5rem;
    width: auto;
    margin-top: 0;
    align-items: center;
  }

  .nav-link {
    font-size: 1.05rem;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: #000;
    text-decoration: underline;
  }

  /* push Cart to the far right on desktop */
  .nav-cart {
    margin-left: auto;
    font-weight: 500;
  }
}

/* avoid horizontal scroll */
body {
  margin: 0;
  overflow-x: hidden;
}
</style>
