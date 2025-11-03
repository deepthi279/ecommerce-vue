<template>
  <div class="dark:bg-gray-900 dark:text-white">
    <section class="relative bg-cover bg-center text-white">
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative z-10 text-center py-24">
        <h1 class="text-5xl font-bold mb-2">About Us</h1>
        <p class="text-lg">
          <router-link to="/" class="hover:underline">Home</router-link> / About
        </p>
      </div>
    </section>

    <section class="container mx-auto px-2 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <img
        src="/nursery-about.jpg"
        alt="About Sivaji Nursery"
        class="rounded-lg shadow-lg w-full max-w-[520px] mx-auto md:mx-0"
      />
      <div>
        <h2 class="text-3xl font-bold mb-4 text-green-600">Welcome to Sivaji Nursery</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          Sivaji Nursery has been a trusted name in gardening for over two decades. We specialize in indoor and outdoor plants,
          ornamental trees, succulents, and seasonal flowers — offering everything you need to create thriving green spaces.
        </p>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          Our mission is simple: make gardening accessible and sustainable for everyone. From curated plant collections to
          personalized guidance and workshops, we are committed to helping you nurture your passion for plants.
        </p>
      </div>
    </section>

    <section class="bg-gray-100 dark:bg-gray-800 py-16">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-3xl font-bold mb-12">Our Core Values</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="flex flex-col items-center text-center">
            <h5 class="text-xl font-semibold mb-2">Perfect Service</h5>
            <p class="text-gray-600 dark:text-gray-300 text-sm">Friendly support to help you at every step of your plant journey.</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <h5 class="text-xl font-semibold mb-2">Environmentally Friendly</h5>
            <p class="text-gray-600 dark:text-gray-300 text-sm">Committed to preserving nature with every plant we sell.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <h3 class="text-2xl font-bold mb-6 text-green-600 text-center">Customer Reviews</h3>
      <div class="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-900 p-6">
        <div class="flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(review, index) in reviews" :key="index" class="w-full flex-shrink-0 text-center px-4">
            <p class="text-lg italic text-gray-700 dark:text-gray-300 mb-4 transition-transform duration-500"
               :class="{ 'scale-105': currentSlide === index }">
              “{{ review.comment }}”
            </p>
            <div class="text-yellow-400 mb-2">★★★★★</div>
            <h4 class="text-green-600 font-semibold">— {{ review.name }}</h4>
          </div>
        </div>

        <button @click="prevSlide"
                class="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70">‹</button>
        <button @click="nextSlide"
                class="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70">›</button>

        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          <span v-for="(dot, index) in reviews" :key="'dot-' + index" class="w-3 h-3 rounded-full"
                :class="currentSlide === index ? 'bg-green-600' : 'bg-gray-300'"></span>
        </div>
      </div>

      <div class="text-center mt-6">
        <a href="https://www.google.com/search?q=Sivaji+Plant+Nursery&stick=H4sIAAAAAAAA_-NgU1I1qDBONDUyTUkySTVMNbU0TzS2MqgwNUpKAQobmhmkpKYZpZkuYhUJzixLzMpUCMhJzCtR8CstKk4tqgQAuZ7QzEAAAAA&hl=en"
           target="_blank"
           class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg transition">
          View All Google Reviews
        </a>
      </div>
    </section>

    <div class="flex justify-center gap-6 mt-6 pb-10">
      <a href="https://www.instagram.com/sivaji_nursery/" target="_blank" aria-label="Instagram"
         class="text-green-600 hover:text-green-800 text-2xl"><i class="bi bi-instagram"></i></a>
      <a href="mailto:veenasivaji8@gmail.com" class="text-green-600 hover:text-green-800 text-2xl"><i class="bi bi-envelope-fill"></i></a>
      <a href="tel:+919840626841" class="text-green-600 hover:text-green-800 text-2xl"><i class="bi bi-telephone-fill"></i></a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const reviews = [
  { comment: 'Healthy plants and excellent service. Staff guided me very well for beginners.', name: 'Anitha M.' },
  { comment: 'Wide variety of indoor and outdoor plants at reasonable prices.', name: 'Karthik S.' },
  { comment: 'Quick delivery and neatly packed plants. Loved their customer support!', name: 'Deepa R.' },
  { comment: 'Beautiful nursery with eco-friendly approach and good maintenance tips.', name: 'Vijay K.' },
  { comment: 'Best place to buy gardening tools and seeds in the city.', name: 'Meenakshi P.' }
]

const currentSlide = ref(0)
let t
const nextSlide = () => (currentSlide.value = (currentSlide.value + 1) % reviews.length)
const prevSlide = () => (currentSlide.value = (currentSlide.value - 1 + reviews.length) % reviews.length)

onMounted(() => { t = setInterval(nextSlide, 4000) })
onUnmounted(() => { clearInterval(t) })

</script>
