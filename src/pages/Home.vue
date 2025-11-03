<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Carousel Wrapper -->
    <div class="absolute inset-0 w-full h-full">
      <transition-group name="fade" tag="div">
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="slide.id"
          class="absolute inset-0 bg-cover bg-center zoom-bg"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
      </transition-group>
    </div>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
        "What you plant now, you will harvest later."
      </h1>
      <p class="text-white text-lg mb-6 max-w-2xl mx-auto">
        "To plant a garden is to believe in tomorrow."
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Image slides
const slides = [
  { id: 1, image: '/src/assets/images/1.jpg' },
  { id: 2, image: '/src/assets/images/2.jpg' }
]

const currentSlide = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000) // change slide every 5 seconds
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* Zoom In and Out */
@keyframes zoomInOut {
  0% {
    background-size: 100%;
  }
  50% {
    background-size: 110%;
  }
  100% {
    background-size: 100%;
  }
}

.zoom-bg {
  animation: zoomInOut 15s ease-in-out infinite;
}

/* Fade Transition Between Slides */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
