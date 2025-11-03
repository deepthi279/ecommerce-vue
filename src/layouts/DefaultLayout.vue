<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
   
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
</script>
